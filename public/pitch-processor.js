// AudioWorklet processor: McLeod Pitch Method (MPM) with FFT-accelerated NSDF.
// Window 4096, hop 2048, clarity threshold 0.93, parabolic interpolation.

const WINDOW = 4096;
const HOP = 2048;
const FFT_SIZE = 8192; // 2 * WINDOW for linear (not circular) autocorrelation
const CLARITY_MIN = 0.9;
const RMS_GATE = 0.005; // ~ -46 dBFS

// In-place radix-2 Cooley-Tukey FFT. inverse=false -> forward.
function fft(real, imag, inverse) {
  const n = real.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      let tmp = real[i]; real[i] = real[j]; real[j] = tmp;
      tmp = imag[i]; imag[i] = imag[j]; imag[j] = tmp;
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const halfLen = len >> 1;
    const ang = (inverse ? 2 : -2) * Math.PI / len;
    const wReal = Math.cos(ang);
    const wImag = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let curReal = 1, curImag = 0;
      for (let k = 0; k < halfLen; k++) {
        const idxA = i + k;
        const idxB = idxA + halfLen;
        const tReal = curReal * real[idxB] - curImag * imag[idxB];
        const tImag = curReal * imag[idxB] + curImag * real[idxB];
        const uReal = real[idxA], uImag = imag[idxA];
        real[idxA] = uReal + tReal;
        imag[idxA] = uImag + tImag;
        real[idxB] = uReal - tReal;
        imag[idxB] = uImag - tImag;
        const newCurReal = curReal * wReal - curImag * wImag;
        curImag = curReal * wImag + curImag * wReal;
        curReal = newCurReal;
      }
    }
  }
  if (inverse) {
    for (let i = 0; i < n; i++) {
      real[i] /= n;
      imag[i] /= n;
    }
  }
}

class PitchProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.ring = new Float32Array(WINDOW);
    this.writePos = 0;
    this.samplesSinceHop = 0;
    this.fftReal = new Float32Array(FFT_SIZE);
    this.fftImag = new Float32Array(FFT_SIZE);
    this.window = new Float32Array(WINDOW);

    this.enabled = true;
    this.port.onmessage = (e) => {
      if (e.data && e.data.type === 'enabled') this.enabled = !!e.data.value;
    };
  }

  // Compute NSDF via FFT, find best peak, return {frequency, clarity, rms} or null.
  detect(buffer) {
    const N = WINDOW;

    let rms = 0;
    for (let i = 0; i < N; i++) rms += buffer[i] * buffer[i];
    const sumSquares = rms;
    rms = Math.sqrt(rms / N);
    if (rms < RMS_GATE) return null;

    // ACF via FFT: zero-pad to 2N, FFT, |F|^2, IFFT, take first N.
    const real = this.fftReal;
    const imag = this.fftImag;
    real.fill(0);
    imag.fill(0);
    for (let i = 0; i < N; i++) real[i] = buffer[i];

    fft(real, imag, false);
    for (let i = 0; i < FFT_SIZE; i++) {
      const re = real[i], im = imag[i];
      real[i] = re * re + im * im;
      imag[i] = 0;
    }
    fft(real, imag, true);
    // real[tau] = sum_{i=0}^{N-1-tau} x[i] * x[i+tau]   for tau in [0, N)

    // m'(tau) = sum_{i=0}^{N-1-tau} (x[i]^2 + x[i+tau]^2)
    // Recurrence: m'(0) = 2 * sumSquares
    //             m'(tau) = m'(tau-1) - x[tau-1]^2 - x[N-tau]^2
    const nsdf = new Float32Array(N);
    let m = 2 * sumSquares;
    nsdf[0] = m === 0 ? 0 : (2 * real[0]) / m;
    for (let tau = 1; tau < N; tau++) {
      const a = buffer[tau - 1];
      const b = buffer[N - tau];
      m -= a * a + b * b;
      nsdf[tau] = m <= 0 ? 0 : (2 * real[tau]) / m;
    }

    // Find positive peaks (key max in each positively-sloped region after first
    // negative zero crossing).
    const peaks = [];
    let pos = 1;
    while (pos < N - 1 && nsdf[pos] > 0) pos++; // skip the lobe at tau=0
    while (pos < N - 1 && nsdf[pos] <= 0) pos++; // first zero-crossing back to positive

    let curMax = 0;
    while (pos < N - 1) {
      if (nsdf[pos] > nsdf[pos - 1] && nsdf[pos] >= nsdf[pos + 1]) {
        if (curMax === 0 || nsdf[pos] > nsdf[curMax]) curMax = pos;
      }
      pos++;
      if (pos < N - 1 && nsdf[pos] <= 0) {
        if (curMax > 0) {
          peaks.push(curMax);
          curMax = 0;
        }
        while (pos < N - 1 && nsdf[pos] <= 0) pos++;
      }
    }
    if (curMax > 0) peaks.push(curMax);
    if (peaks.length === 0) return null;

    // Clarity threshold: pick first peak above 0.93 * highest.
    let highest = 0;
    for (let i = 0; i < peaks.length; i++) {
      const v = nsdf[peaks[i]];
      if (v > highest) highest = v;
    }
    const threshold = highest * 0.93;
    let chosen = peaks[0];
    for (let i = 0; i < peaks.length; i++) {
      if (nsdf[peaks[i]] >= threshold) { chosen = peaks[i]; break; }
    }
    if (nsdf[chosen] < CLARITY_MIN) return null;

    // Parabolic interpolation around chosen peak.
    let period = chosen;
    let clarity = nsdf[chosen];
    if (chosen > 0 && chosen < N - 1) {
      const s0 = nsdf[chosen - 1], s1 = nsdf[chosen], s2 = nsdf[chosen + 1];
      const denom = 2 * (2 * s1 - s2 - s0);
      if (denom !== 0) {
        const adj = (s2 - s0) / denom;
        period = chosen + adj;
        clarity = s1 - 0.25 * (s0 - s2) * adj;
      }
    }
    if (period <= 0) return null;
    const frequency = sampleRate / period;
    return { frequency, clarity, rms };
  }

  process(inputs) {
    if (!this.enabled) return true;
    const input = inputs[0];
    if (!input || input.length === 0 || !input[0]) return true;
    const channel = input[0];
    const len = channel.length;

    for (let i = 0; i < len; i++) {
      this.ring[this.writePos] = channel[i];
      this.writePos = (this.writePos + 1) % WINDOW;
      this.samplesSinceHop++;
      if (this.samplesSinceHop >= HOP) {
        this.samplesSinceHop = 0;
        // Linearize ring into window buffer (oldest first).
        const out = this.window;
        let r = this.writePos;
        for (let j = 0; j < WINDOW; j++) {
          out[j] = this.ring[r];
          r = (r + 1) % WINDOW;
        }
        const result = this.detect(out);
        if (result) {
          this.port.postMessage(result);
        } else {
          this.port.postMessage({ silent: true });
        }
      }
    }
    return true;
  }
}

registerProcessor('pitch-processor', PitchProcessor);

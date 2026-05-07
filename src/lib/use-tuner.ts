"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TunerStatus = "idle" | "requesting" | "running" | "error";

export interface TunerReading {
  frequency: number;
  clarity: number;
  rms: number;
  // sinal vivo: timestamp da última leitura confiável
  timestamp: number;
}

interface InternalState {
  ctx: AudioContext | null;
  stream: MediaStream | null;
  source: MediaStreamAudioSourceNode | null;
  filter: BiquadFilterNode | null;
  worklet: AudioWorkletNode | null;
  history: number[]; // últimas frequências para median(5)
  smoothed: number; // EMA frequência
}

const HISTORY = 5;
const EMA_ALPHA = 0.25;
// se passa esse tempo sem leitura confiável, marca como silêncio
const SILENCE_TIMEOUT_MS = 250;

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

export function useTuner() {
  const [status, setStatus] = useState<TunerStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<TunerReading | null>(null);
  const [silent, setSilent] = useState(true);

  const stateRef = useRef<InternalState>({
    ctx: null,
    stream: null,
    source: null,
    filter: null,
    worklet: null,
    history: [],
    smoothed: 0,
  });
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(async () => {
    const s = stateRef.current;
    try {
      s.worklet?.disconnect();
      s.filter?.disconnect();
      s.source?.disconnect();
      s.stream?.getTracks().forEach((t) => t.stop());
      if (s.ctx && s.ctx.state !== "closed") await s.ctx.close();
    } catch {
      // ignore
    }
    s.ctx = null;
    s.stream = null;
    s.source = null;
    s.filter = null;
    s.worklet = null;
    s.history = [];
    s.smoothed = 0;
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    setReading(null);
    setSilent(true);
  }, []);

  const stop = useCallback(async () => {
    await cleanup();
    setStatus("idle");
  }, [cleanup]);

  const start = useCallback(async () => {
    if (stateRef.current.ctx) return;
    setError(null);
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
          // @ts-expect-error: hint para alguns navegadores não-padrão
          googAutoGainControl: false,
        },
        video: false,
      });

      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx({ latencyHint: "interactive" });
      if (ctx.state === "suspended") await ctx.resume();

      await ctx.audioWorklet.addModule("/pitch-processor.js");

      const source = ctx.createMediaStreamSource(stream);
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 70;
      filter.Q.value = 0.707;

      const worklet = new AudioWorkletNode(ctx, "pitch-processor", {
        numberOfInputs: 1,
        numberOfOutputs: 0,
        channelCount: 1,
        channelCountMode: "explicit",
      });

      worklet.port.onmessage = (e) => {
        const data = e.data as
          | { silent: true }
          | { frequency: number; clarity: number; rms: number };

        if ("silent" in data) {
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            setSilent(true);
            setReading(null);
            stateRef.current.history = [];
            stateRef.current.smoothed = 0;
          }, SILENCE_TIMEOUT_MS);
          return;
        }

        const st = stateRef.current;
        st.history.push(data.frequency);
        if (st.history.length > HISTORY) st.history.shift();
        const med = median(st.history);
        st.smoothed = st.smoothed === 0
          ? med
          : st.smoothed + EMA_ALPHA * (med - st.smoothed);

        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
        setSilent(false);
        setReading({
          frequency: st.smoothed,
          clarity: data.clarity,
          rms: data.rms,
          timestamp: performance.now(),
        });
      };

      source.connect(filter);
      filter.connect(worklet);

      stateRef.current = {
        ctx,
        stream,
        source,
        filter,
        worklet,
        history: [],
        smoothed: 0,
      };
      setStatus("running");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Falha ao acessar microfone";
      setError(msg);
      setStatus("error");
      await cleanup();
    }
  }, [cleanup]);

  useEffect(() => {
    return () => {
      void cleanup();
    };
  }, [cleanup]);

  return { status, error, reading, silent, start, stop };
}

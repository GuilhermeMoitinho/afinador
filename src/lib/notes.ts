export const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

export const SOLFEGE: Record<NoteName, string> = {
  C: "Dó", "C#": "Dó#", D: "Ré", "D#": "Ré#", E: "Mi", F: "Fá",
  "F#": "Fá#", G: "Sol", "G#": "Sol#", A: "Lá", "A#": "Lá#", B: "Si",
};

export function noteToMidi(note: NoteName, octave: number): number {
  return (octave + 1) * 12 + NOTE_NAMES.indexOf(note);
}

export function midiToFrequency(midi: number, a4 = 440): number {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

export function frequencyToMidi(frequency: number, a4 = 440): number {
  return 12 * Math.log2(frequency / a4) + 69;
}

export interface DetectedNote {
  note: NoteName;
  octave: number;
  midi: number;
  cents: number;
  targetFrequency: number;
}

export function frequencyToNote(frequency: number, a4 = 440): DetectedNote {
  const midiFloat = frequencyToMidi(frequency, a4);
  const midi = Math.round(midiFloat);
  const cents = (midiFloat - midi) * 100;
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = ((midi % 12) + 12) % 12;
  return {
    note: NOTE_NAMES[noteIndex],
    octave,
    midi,
    cents,
    targetFrequency: midiToFrequency(midi, a4),
  };
}

// Cents from a known target (used when locking onto a specific string).
export function centsFromTarget(frequency: number, targetFrequency: number): number {
  return 1200 * Math.log2(frequency / targetFrequency);
}

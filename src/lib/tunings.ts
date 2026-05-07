import { NoteName, midiToFrequency, noteToMidi } from "./notes";

export interface TuningString {
  index: number; // 1 = mais aguda
  note: NoteName;
  octave: number;
  midi: number;
  frequency: number;
  label: string;
}

export interface Tuning {
  id: string;
  name: string;
  description: string;
  // strings ordenadas da mais aguda (1ª) para a mais grave (6ª)
  strings: TuningString[];
}

function s(
  index: number,
  note: NoteName,
  octave: number,
  label: string,
  a4 = 440,
): TuningString {
  const midi = noteToMidi(note, octave);
  return { index, note, octave, midi, frequency: midiToFrequency(midi, a4), label };
}

export function buildTunings(a4 = 440): Tuning[] {
  const S = (i: number, n: NoteName, o: number, l: string) => s(i, n, o, l, a4);
  return [
    {
      id: "standard",
      name: "Padrão",
      description: "E A D G B E — afinação clássica",
      strings: [
        S(1, "E", 4, "1ª"),
        S(2, "B", 3, "2ª"),
        S(3, "G", 3, "3ª"),
        S(4, "D", 3, "4ª"),
        S(5, "A", 2, "5ª"),
        S(6, "E", 2, "6ª"),
      ],
    },
    {
      id: "drop-d",
      name: "Drop D",
      description: "D A D G B E — 6ª corda baixada um tom",
      strings: [
        S(1, "E", 4, "1ª"),
        S(2, "B", 3, "2ª"),
        S(3, "G", 3, "3ª"),
        S(4, "D", 3, "4ª"),
        S(5, "A", 2, "5ª"),
        S(6, "D", 2, "6ª"),
      ],
    },
    {
      id: "half-step-down",
      name: "Meio tom abaixo",
      description: "Eb Ab Db Gb Bb Eb",
      strings: [
        S(1, "D#", 4, "1ª"),
        S(2, "A#", 3, "2ª"),
        S(3, "F#", 3, "3ª"),
        S(4, "C#", 3, "4ª"),
        S(5, "G#", 2, "5ª"),
        S(6, "D#", 2, "6ª"),
      ],
    },
    {
      id: "full-step-down",
      name: "Um tom abaixo",
      description: "D G C F A D",
      strings: [
        S(1, "D", 4, "1ª"),
        S(2, "A", 3, "2ª"),
        S(3, "F", 3, "3ª"),
        S(4, "C", 3, "4ª"),
        S(5, "G", 2, "5ª"),
        S(6, "D", 2, "6ª"),
      ],
    },
    {
      id: "open-g",
      name: "Open G",
      description: "D G D G B D — usada por Keith Richards",
      strings: [
        S(1, "D", 4, "1ª"),
        S(2, "B", 3, "2ª"),
        S(3, "G", 3, "3ª"),
        S(4, "D", 3, "4ª"),
        S(5, "G", 2, "5ª"),
        S(6, "D", 2, "6ª"),
      ],
    },
    {
      id: "open-d",
      name: "Open D",
      description: "D A D F# A D",
      strings: [
        S(1, "D", 4, "1ª"),
        S(2, "A", 3, "2ª"),
        S(3, "F#", 3, "3ª"),
        S(4, "D", 3, "4ª"),
        S(5, "A", 2, "5ª"),
        S(6, "D", 2, "6ª"),
      ],
    },
    {
      id: "dadgad",
      name: "DADGAD",
      description: "Afinação celta",
      strings: [
        S(1, "D", 4, "1ª"),
        S(2, "A", 3, "2ª"),
        S(3, "G", 3, "3ª"),
        S(4, "D", 3, "4ª"),
        S(5, "A", 2, "5ª"),
        S(6, "D", 2, "6ª"),
      ],
    },
    {
      id: "drop-c",
      name: "Drop C",
      description: "C G C F A D — pesado",
      strings: [
        S(1, "D", 4, "1ª"),
        S(2, "A", 3, "2ª"),
        S(3, "F", 3, "3ª"),
        S(4, "C", 3, "4ª"),
        S(5, "G", 2, "5ª"),
        S(6, "C", 2, "6ª"),
      ],
    },
  ];
}

export const DEFAULT_TUNINGS = buildTunings();

// Acha a string mais próxima da frequência detectada (em cents absolutos).
export function nearestString(
  frequency: number,
  strings: TuningString[],
): { string: TuningString; cents: number } {
  let best = strings[0];
  let bestAbsCents = Infinity;
  let bestCents = 0;
  for (const str of strings) {
    const cents = 1200 * Math.log2(frequency / str.frequency);
    const abs = Math.abs(cents);
    if (abs < bestAbsCents) {
      bestAbsCents = abs;
      best = str;
      bestCents = cents;
    }
  }
  return { string: best, cents: bestCents };
}

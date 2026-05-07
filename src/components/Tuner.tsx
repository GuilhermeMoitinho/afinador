"use client";

import { useMemo, useState } from "react";
import { NeedleGauge } from "./NeedleGauge";
import { useTuner } from "@/lib/use-tuner";
import { centsFromTarget, frequencyToNote, SOLFEGE } from "@/lib/notes";
import { buildTunings, nearestString, TuningString } from "@/lib/tunings";

type Mode = "auto" | "manual";

export function Tuner() {
  const { status, error, reading, silent, start, stop } = useTuner();

  const [tuningId, setTuningId] = useState<string>("standard");
  const [mode, setMode] = useState<Mode>("auto");
  const [manualStringIndex, setManualStringIndex] = useState<number>(6);
  const [a4, setA4] = useState<number>(440);

  const tunings = useMemo(() => buildTunings(a4), [a4]);
  const tuning = tunings.find((t) => t.id === tuningId) ?? tunings[0];

  // Determina string ativa e cents
  const view = useMemo(() => {
    if (!reading || silent) return null;
    if (mode === "auto") {
      const { string, cents } = nearestString(reading.frequency, tuning.strings);
      return { string, cents };
    }
    const target = tuning.strings.find((s) => s.index === manualStringIndex);
    if (!target) return null;
    const cents = centsFromTarget(reading.frequency, target.frequency);
    return { string: target, cents };
  }, [reading, silent, mode, manualStringIndex, tuning]);

  // Note name (independente de string-lock) para o display grande quando auto
  const detected = useMemo(() => {
    if (!reading || silent) return null;
    return frequencyToNote(reading.frequency, a4);
  }, [reading, silent, a4]);

  const isRunning = status === "running";
  const noteLabel = view ? `${view.string.note}${view.string.octave}` : "—";
  const noteSolfege = view ? SOLFEGE[view.string.note] : "";
  const cents = view?.cents ?? null;
  const inTune = cents !== null && Math.abs(cents) < 5;

  const centsLabel =
    cents === null
      ? "—"
      : Math.abs(cents) < 0.5
        ? "0"
        : `${cents > 0 ? "+" : ""}${cents.toFixed(0)}`;

  const targetHz = view?.string.frequency;
  const detectedHz = reading?.frequency;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card principal */}
      <div
        className={`relative rounded-3xl p-8 sm:p-10 transition-colors duration-300 ${
          inTune
            ? "bg-gradient-to-br from-emerald-950/40 to-slate-900/80 ring-1 ring-emerald-500/40"
            : "bg-gradient-to-br from-slate-900/80 to-slate-950/80 ring-1 ring-slate-800"
        }`}
      >
        {/* Top: nota + cents */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">
              {mode === "auto" ? "Auto detect" : "Modo manual"}
            </div>
            <div className="flex items-baseline gap-3">
              <span
                className={`text-7xl sm:text-8xl font-bold tabular-nums tracking-tight transition-colors ${
                  inTune
                    ? "text-emerald-400"
                    : view
                      ? "text-slate-100"
                      : "text-slate-600"
                }`}
                style={{
                  textShadow: inTune
                    ? "0 0 30px rgba(34,197,94,0.4)"
                    : "none",
                }}
              >
                {noteLabel}
              </span>
              {noteSolfege && (
                <span className="text-2xl text-slate-500">{noteSolfege}</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">
              cents
            </div>
            <div
              className={`text-5xl font-mono tabular-nums ${
                cents === null
                  ? "text-slate-700"
                  : inTune
                    ? "text-emerald-400"
                    : Math.abs(cents) < 15
                      ? "text-yellow-400"
                      : "text-red-400"
              }`}
            >
              {centsLabel}
            </div>
          </div>
        </div>

        {/* Gauge */}
        <div className="mt-6">
          <NeedleGauge cents={cents} range={50} />
        </div>

        {/* Frequência detectada / alvo */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
          <div className="rounded-lg bg-slate-900/60 px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-slate-500">
              Detectada
            </div>
            <div className="font-mono tabular-nums text-slate-200">
              {detectedHz ? `${detectedHz.toFixed(1)} Hz` : "—"}
            </div>
          </div>
          <div className="rounded-lg bg-slate-900/60 px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-slate-500">
              Alvo
            </div>
            <div className="font-mono tabular-nums text-slate-200">
              {targetHz ? `${targetHz.toFixed(2)} Hz` : "—"}
            </div>
          </div>
        </div>

        {/* Status / Start */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {!isRunning ? (
            <button
              onClick={start}
              disabled={status === "requesting"}
              className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-wait text-emerald-950 font-semibold py-3 px-6 transition-colors shadow-[0_0_24px_rgba(34,197,94,0.25)]"
            >
              {status === "requesting" ? "Pedindo permissão..." : "Iniciar afinador"}
            </button>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span
                  className={`relative flex h-2 w-2 ${silent ? "" : "animate-pulse"}`}
                >
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${
                      silent ? "bg-slate-600" : "bg-emerald-400"
                    }`}
                  />
                </span>
                {silent ? "Aguardando som..." : "Captando"}
                {detected && !silent && (
                  <span className="text-slate-500 ml-1">
                    · nota livre {detected.note}
                    {detected.octave}
                  </span>
                )}
              </div>
              <button
                onClick={stop}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 text-sm transition-colors"
              >
                Parar
              </button>
            </>
          )}
        </div>

        {error && (
          <div className="mt-3 text-sm text-red-400 bg-red-950/30 ring-1 ring-red-900 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
      </div>

      {/* Cordas */}
      <div className="mt-6 grid grid-cols-6 gap-2">
        {tuning.strings.map((str) => (
          <StringPill
            key={str.index}
            string={str}
            active={view?.string.index === str.index && !silent}
            inTune={view?.string.index === str.index && cents !== null && Math.abs(cents) < 5}
            selected={mode === "manual" && manualStringIndex === str.index}
            onClick={() => {
              setMode("manual");
              setManualStringIndex(str.index);
            }}
          />
        ))}
      </div>

      {/* Controles */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {/* Mode toggle */}
        <div>
          <label className="text-xs uppercase tracking-widest text-slate-500">
            Modo
          </label>
          <div className="mt-2 grid grid-cols-2 rounded-lg bg-slate-900/60 p-1 ring-1 ring-slate-800">
            <button
              onClick={() => setMode("auto")}
              className={`rounded-md py-1.5 text-sm font-medium transition-colors ${
                mode === "auto"
                  ? "bg-slate-800 text-slate-100"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Auto
            </button>
            <button
              onClick={() => setMode("manual")}
              className={`rounded-md py-1.5 text-sm font-medium transition-colors ${
                mode === "manual"
                  ? "bg-slate-800 text-slate-100"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Manual
            </button>
          </div>
        </div>

        {/* Tuning */}
        <div>
          <label className="text-xs uppercase tracking-widest text-slate-500">
            Afinação
          </label>
          <select
            value={tuningId}
            onChange={(e) => setTuningId(e.target.value)}
            className="mt-2 w-full rounded-lg bg-slate-900/60 ring-1 ring-slate-800 text-slate-100 px-3 py-2 text-sm"
          >
            {tunings.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.description}
              </option>
            ))}
          </select>
        </div>

        {/* A4 calibração */}
        <div className="sm:col-span-2">
          <label className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-500">
            <span>Calibração A4</span>
            <span className="font-mono text-slate-300">{a4} Hz</span>
          </label>
          <input
            type="range"
            min={415}
            max={466}
            step={1}
            value={a4}
            onChange={(e) => setA4(Number(e.target.value))}
            className="mt-2 w-full accent-emerald-500"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-600 font-mono">
            <span>415</span>
            <span>440 (padrão)</span>
            <span>466</span>
          </div>
        </div>
      </div>

      {/* Tip */}
      <p className="mt-6 text-xs text-slate-500 text-center">
        Toque a corda solta. Para máxima precisão, evite ruído de fundo e mantenha
        o microfone perto do violão.
      </p>
    </div>
  );
}

interface PillProps {
  string: TuningString;
  active: boolean;
  inTune: boolean;
  selected: boolean;
  onClick: () => void;
}

function StringPill({ string, active, inTune, selected, onClick }: PillProps) {
  let ring = "ring-slate-800";
  let bg = "bg-slate-900/60";
  let textColor = "text-slate-300";
  if (inTune) {
    ring = "ring-emerald-500";
    bg = "bg-emerald-500/15";
    textColor = "text-emerald-300";
  } else if (active) {
    ring = "ring-yellow-500";
    bg = "bg-yellow-500/10";
    textColor = "text-yellow-200";
  } else if (selected) {
    ring = "ring-slate-500";
    bg = "bg-slate-800/80";
    textColor = "text-slate-100";
  }
  return (
    <button
      onClick={onClick}
      className={`rounded-xl py-3 ring-1 transition-all ${ring} ${bg} hover:bg-slate-800/80`}
      title={`${string.label} · ${string.frequency.toFixed(2)} Hz`}
    >
      <div className={`text-xl font-bold tabular-nums ${textColor}`}>
        {string.note}
        <span className="text-xs align-super opacity-70">{string.octave}</span>
      </div>
      <div className="text-[10px] text-slate-500 mt-0.5">{string.label}</div>
    </button>
  );
}


"use client";

interface Props {
  cents: number | null;
  range?: number; // ±range em cents (default ±50)
}

export function NeedleGauge({ cents, range = 50 }: Props) {
  const clamped = cents === null ? 0 : Math.max(-range, Math.min(range, cents));
  const t = clamped / range; // -1..1
  // posição em % no eixo X dentro do "track" (5% a 95%)
  const needleLeftPct = 50 + t * 45;

  const isSilent = cents === null;
  const abs = Math.abs(clamped);
  let color = "#475569";
  let shadow = "none";
  if (!isSilent) {
    if (abs < 5) {
      color = "#22c55e";
      shadow = "0 0 24px rgba(34,197,94,0.7), 0 0 8px rgba(34,197,94,0.9)";
    } else if (abs < 15) {
      color = "#eab308";
      shadow = "0 0 16px rgba(234,179,8,0.55)";
    } else {
      color = "#ef4444";
      shadow = "0 0 16px rgba(239,68,68,0.45)";
    }
  }

  const ticks: { pos: number; major: boolean; label?: string }[] = [];
  for (let c = -range; c <= range; c += 5) {
    const pos = 50 + (c / range) * 45;
    const major = c % 10 === 0;
    ticks.push({
      pos,
      major,
      label: major ? (c === 0 ? "0" : `${c > 0 ? "+" : ""}${c}`) : undefined,
    });
  }

  const inTuneStart = 50 - (5 / range) * 45;
  const inTuneWidth = (10 / range) * 45;

  return (
    <div className="relative w-full select-none">
      <div className="relative w-full h-24">
        {/* Track + ticks (estáticos) */}
        <svg
          viewBox="0 0 100 28"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <rect x="4" y="13" width="92" height="2" rx="1" fill="rgba(148,163,184,0.15)" />
          <rect
            x={inTuneStart}
            y="11"
            width={inTuneWidth}
            height="6"
            rx="1"
            fill="rgba(34,197,94,0.10)"
          />
          {ticks.map((tick, i) => (
            <g key={i}>
              <line
                x1={tick.pos}
                x2={tick.pos}
                y1={tick.major ? 9 : 11}
                y2={tick.major ? 19 : 17}
                stroke="rgba(148,163,184,0.45)"
                strokeWidth={tick.major ? 0.4 : 0.25}
              />
              {tick.label && (
                <text
                  x={tick.pos}
                  y={26}
                  fontSize="3"
                  fill="rgba(148,163,184,0.7)"
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                >
                  {tick.label}
                </text>
              )}
            </g>
          ))}
        </svg>

        {/* Needle (div, animado via CSS transform com transition) */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0"
          style={{
            left: `${needleLeftPct}%`,
            transform: "translateX(-50%)",
            transition:
              "left 90ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="h-full w-[2px] rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: shadow,
              transition: "background-color 150ms ease, box-shadow 150ms ease",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: shadow,
              transition: "background-color 150ms ease, box-shadow 150ms ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

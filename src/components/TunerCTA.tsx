import Link from "next/link";

export function TunerCTA() {
  return (
    <aside className="not-prose my-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 ring-1 ring-slate-800 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <div className="text-xs uppercase tracking-widest text-emerald-400/80 mb-1">
          Use agora
        </div>
        <div className="text-lg font-semibold text-slate-100">
          Afinador online grátis
        </div>
        <p className="text-sm text-slate-400">
          Direto no navegador, sem instalar nada. Algoritmo de detecção de pitch em tempo real.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold px-5 py-2.5 transition-colors shrink-0"
      >
        Abrir afinador
      </Link>
    </aside>
  );
}

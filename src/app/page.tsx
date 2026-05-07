import { Tuner } from "@/components/Tuner";

export default function Page() {
  return (
    <main className="flex-1 flex flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,0.08), transparent 70%), radial-gradient(60% 50% at 50% 100%, rgba(59,130,246,0.05), transparent 70%)",
        }}
      />

      <header className="px-6 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400/80">
          <span className="h-px w-6 bg-emerald-400/40" />
          Afinador
          <span className="h-px w-6 bg-emerald-400/40" />
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Afinador de Violão
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
          Detecção em tempo real com algoritmo MPM. Sensível a fração de cent.
        </p>
      </header>

      <section className="flex-1 px-4 sm:px-6 pb-16">
        <Tuner />
      </section>

      <footer className="px-6 py-6 text-center text-xs text-slate-600">
        <p>Funciona melhor em ambientes silenciosos. Permita acesso ao microfone.</p>
      </footer>
    </main>
  );
}

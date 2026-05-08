import Link from "next/link";
import { Tuner } from "@/components/Tuner";
import { POSTS } from "@/lib/posts";
import { safeJsonForScript } from "@/lib/safe-json";

export default function Page() {
  const recentPosts = POSTS.slice(0, 3);

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Afinador de Violão",
    url: "/",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    inLanguage: "pt-BR",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    description:
      "Afinador online de violão com detecção em tempo real. Algoritmo MPM, sub-cent.",
  };

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

      <nav className="px-6 pt-6 flex items-center justify-between max-w-2xl mx-auto w-full">
        <span className="text-xs uppercase tracking-widest text-slate-500">
          Afinador
        </span>
        <Link
          href="/blog"
          className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
        >
          Blog
        </Link>
      </nav>

      <header className="px-6 pt-6 pb-6 text-center">
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

      <section className="flex-1 px-4 sm:px-6 pb-12">
        <Tuner />
      </section>

      <section className="px-4 sm:px-6 pb-16 max-w-2xl mx-auto w-full">
        <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-4">
          Guias
        </h2>
        <ul className="grid gap-3">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-xl bg-slate-900/40 hover:bg-slate-900 ring-1 ring-slate-800 p-4 transition-colors"
              >
                <div className="text-slate-200 font-medium">{post.title}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {post.readingTime} min · {post.description}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          Ver todos os guias →
        </Link>
      </section>

      <footer className="px-6 py-6 text-center text-xs text-slate-600">
        <p>Funciona melhor em ambientes silenciosos. Permita acesso ao microfone.</p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonForScript(softwareLd) }}
      />
    </main>
  );
}

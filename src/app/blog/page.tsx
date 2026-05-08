import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog · Afinador de Violão",
  description:
    "Artigos sobre afinação de violão, métodos, drop D, treino de ouvido e cuidados com cordas.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <main className="flex-1">
      <header className="px-6 pt-12 pb-8 text-center max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-emerald-400/80 hover:text-emerald-300 transition-colors"
        >
          ← Afinador
        </Link>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Blog
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Guias práticos para afinar e tocar violão melhor.
        </p>
      </header>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
        <ul className="grid gap-4">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-2xl bg-slate-900/60 hover:bg-slate-900 ring-1 ring-slate-800 hover:ring-emerald-500/30 p-5 transition-all"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {post.description}
                </p>
                <div className="mt-3 text-[11px] uppercase tracking-widest text-slate-500">
                  {post.readingTime} min de leitura
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

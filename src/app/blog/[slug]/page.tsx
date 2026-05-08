import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS, getPost } from "@/lib/posts";
import { safeJsonForScript } from "@/lib/safe-json";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      locale: "pt_BR",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Content } = post;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: "Afinador de Violão" },
  };

  return (
    <main className="flex-1">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/blog"
          className="text-xs uppercase tracking-widest text-emerald-400/80 hover:text-emerald-300 transition-colors"
        >
          ← Blog
        </Link>

        <header className="mt-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50 leading-tight">
            {post.title}
          </h1>
          <div className="mt-3 text-xs uppercase tracking-widest text-slate-500">
            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readingTime} min de leitura
          </div>
        </header>

        <div
          className="
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-slate-100
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-slate-100
            [&_p]:my-4 [&_p]:text-slate-300 [&_p]:leading-relaxed
            [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
            [&_ul_li]:text-slate-300 [&_ul_li]:leading-relaxed
            [&_a]:text-emerald-400 [&_a]:underline [&_a]:underline-offset-2
            hover:[&_a]:text-emerald-300
            [&_strong]:text-slate-100 [&_strong]:font-semibold
            [&_.lead]:text-lg [&_.lead]:text-slate-200/90 [&_.lead]:leading-relaxed
          "
        >
          <Content />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonForScript(articleLd) }}
        />
      </article>
    </main>
  );
}

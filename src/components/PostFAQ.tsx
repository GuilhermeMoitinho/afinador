import { safeJsonForScript } from "@/lib/safe-json";

interface FAQItem {
  q: string;
  a: string;
}

export function PostFAQ({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
  return (
    <section className="not-prose my-10">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">
        Perguntas frequentes
      </h2>
      <div className="divide-y divide-slate-800 rounded-2xl bg-slate-900/40 ring-1 ring-slate-800">
        {items.map((it, i) => (
          <details key={i} className="group p-5">
            <summary className="cursor-pointer list-none flex justify-between items-center text-slate-100 font-semibold">
              <span>{it.q}</span>
              <span className="text-emerald-400 transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-300/90 leading-relaxed">
              {it.a}
            </p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonForScript(jsonLd) }}
      />
    </section>
  );
}

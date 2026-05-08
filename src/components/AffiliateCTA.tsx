interface Props {
  headline: string;
  body: string;
  href: string;
  label: string;
}

export function AffiliateCTA({ headline, body, href, label }: Props) {
  return (
    <aside className="not-prose my-8 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-950 ring-1 ring-emerald-500/30 p-5 sm:p-6">
      <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
        Indicação
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-1">{headline}</h3>
      <p className="text-sm text-slate-300/90 mb-4">{body}</p>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold px-5 py-2.5 transition-colors"
      >
        {label}
        <span aria-hidden>→</span>
      </a>
      <p className="mt-3 text-[11px] text-slate-500">
        Link de afiliado. Ao comprar pelo link você apoia o projeto sem custo extra para você.
      </p>
    </aside>
  );
}

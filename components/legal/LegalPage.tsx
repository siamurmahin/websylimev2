import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import type { LegalSection } from "@/content/pages/legal";
import { PhotoHero, type PhotoHeroData } from "@/components/sections/PhotoHero";
import { Copy } from "@/lib/copy";

const l = site.legal;

type LegalDoc = {
  hero: Omit<PhotoHeroData, "image">;
  updated: string;
  summary: string[];
  sections: LegalSection[];
};

/**
 * Shared layout for /privacy and /terms: photo hero → "short version" box →
 * numbered sections (#policy) with a sticky table of contents on desktop and
 * a collapsible one on phones → "questions?" box.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const toc = (
    <ol className="space-y-0.5 text-sm">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex gap-2.5 rounded-lg px-3 py-1.5 text-muted-foreground outline-none transition-colors hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-lime/60"
          >
            <span className="w-5 shrink-0 font-mono text-xs leading-5 text-muted-foreground/70 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <main id="main" className="relative">
      <PhotoHero data={{ ...doc.hero, image: l.image }} />

      <section id="policy" aria-label={doc.hero.headline} className="scroll-mt-16 py-14 sm:py-20">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[17rem_minmax(0,1fr)]">
          {/* ---------- table of contents ---------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={l.tocTitle} className="hidden lg:block">
              <p className="mb-3 px-3 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">{l.tocTitle}</p>
              {toc}
            </nav>
            <details className="group rounded-2xl border bg-surface lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                {l.tocTitle}
                <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" aria-hidden />
              </summary>
              <nav aria-label={l.tocTitle} className="px-2 pb-3">
                {toc}
              </nav>
            </details>
          </aside>

          {/* ---------- document ---------- */}
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground">
              {l.updatedLabel}: <Copy text={doc.updated} />
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-lime/50 bg-lime-soft/60 p-6 sm:p-7 dark:bg-lime/[0.06]">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{l.summaryTitle}</h2>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {doc.summary.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                      <Check className="size-3" strokeWidth={3.5} aria-hidden />
                    </span>
                    <span>
                      <Copy text={s} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-[16px] leading-[1.75] text-foreground/85 sm:text-[17px]">
              {doc.sections.map((s, i) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28 border-b py-9 last:border-b-0">
                  <h2 id={`${s.id}-title`} className="flex items-baseline gap-3 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] leading-tight font-bold tracking-[-0.025em] text-foreground">
                    <span className="font-mono text-sm font-semibold text-lime-strong tabular-nums dark:text-lime">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  {s.body.map((b, j) =>
                    b.type === "ul" ? (
                      <ul key={j} className="mt-4 space-y-2">
                        {b.items.map((it) => (
                          <li key={it} className="flex gap-3">
                            <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-lime-strong dark:bg-lime" />
                            <span>
                              <Copy text={it} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j} className="mt-4">
                        <Copy text={b.text} />
                      </p>
                    ),
                  )}
                </section>
              ))}
            </div>

            {/* questions */}
            <div className="mt-6 flex flex-col gap-5 rounded-[1.5rem] bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7 dark:border dark:border-white/10 dark:bg-surface">
              <div>
                <p className="font-display text-xl font-bold tracking-[-0.02em]">{l.questions.title}</p>
                <p className="mt-1 text-sm text-white/70">
                  <Copy text={l.questions.body} />
                </p>
              </div>
              <Link
                href={l.questions.cta.href}
                className="group inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50 sm:self-auto"
              >
                {l.questions.cta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

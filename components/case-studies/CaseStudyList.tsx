import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { stories } from "@/components/case-studies/shared";

const p = site.caseStudiesPage;

/** /case-studies stories (#stories). Only the card fields reach the browser. */
export function CaseStudyList() {
  const cards = stories.map((s) => ({
    slug: s.slug,
    label: s.label,
    category: s.project.category,
    image: s.image,
    headline: s.headline,
    stat: s.stats[0],
  }));
  return (
    <section id="stories" aria-label="Case studies" className="scroll-mt-16 py-14 sm:py-20">
      <CaseStudyGrid stories={cards} allLabel={p.allLabel} moreLabel={p.moreLabel} readMore={p.readMore} />
    </section>
  );
}

/** "Want a story like this?" dark band with the two usual CTAs. */
export function CaseStudyCta() {
  const c = p.cta;
  return (
    <section aria-labelledby="cs-cta-title" className="container-site pb-14 sm:pb-20">
      <div className="flex flex-col gap-6 rounded-[2rem] bg-ink p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between dark:border dark:border-white/10 dark:bg-surface">
        <div>
          <h2 id="cs-cta-title" className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight font-bold tracking-[-0.035em]">
            {c.title}
          </h2>
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-white/70">{c.body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={c.primary.href}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
          >
            {c.primary.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link
            href={c.secondary.href}
            className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-lime/50"
          >
            {c.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

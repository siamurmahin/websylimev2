import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Shot, Stats, stories, Tags } from "@/components/case-studies/shared";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const p = site.caseStudiesPage;

/** /case-studies stories (#stories): one wide row per client, screenshot side alternating. */
export function CaseStudyList() {
  return (
    <section id="stories" aria-label="Case studies" className="scroll-mt-16 py-14 sm:py-20">
      <StaggerReveal className="container-site space-y-6 sm:space-y-8">
        {stories.map((s, i) => (
          <article key={s.slug} data-reveal>
            <Link
              href={`/case-studies/${s.slug}`}
              className="group grid grid-cols-1 items-center gap-8 rounded-[2rem] border bg-surface p-5 outline-none transition-[border-color] duration-500 hover:border-lime/60 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10"
            >
              <div className={cn("overflow-hidden rounded-[1.5rem]", i % 2 === 1 && "lg:order-2")}>
                <Shot
                  src={s.image}
                  alt={`${s.project.name} website`}
                  sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
                  className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                />
              </div>
              <div>
                <Tags story={s} />
                <p className="mt-5 text-sm font-semibold text-muted-foreground">{s.project.name}</p>
                <h2 className="mt-1.5 font-display text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
                  <Copy text={s.headline} />
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  <Copy text={s.summary} />
                </p>
                <Stats stats={s.stats} className="mt-6" />
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-lime-strong dark:text-lime">
                  {p.readMore}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </StaggerReveal>
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

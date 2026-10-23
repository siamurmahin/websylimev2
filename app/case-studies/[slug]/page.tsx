import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import { site } from "@/content/site";
import { Shot, Stats, stories, Tags } from "@/components/case-studies/shared";
import { CaseStudyCta } from "@/components/case-studies/CaseStudyList";
import { FadeUp } from "@/components/motion/SplitReveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { Copy, plain } from "@/lib/copy";

const p = site.caseStudiesPage;
const t = p.study;

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = stories.find((x) => x.slug === slug);
  if (!s) return {};
  const url = `/case-studies/${s.slug}`;
  const title = `${s.project.name} case study`;
  const description = plain(s.summary);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, images: [{ url: s.image, alt: `${s.project.name} website` }] },
  };
}

// Blocking route on purpose (same as blog posts): an unknown slug returns a
// real 404 status. Every story is prerendered, so navigation stays fast.
export const instant = false;

/**
 * One case study: header + screenshot → stats band → challenge / what we did /
 * results with a facts sidebar → client quote → next story → CTA band → final CTA.
 */
export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const i = stories.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const s = stories[i];
  const next = stories.length > 1 ? stories[(i + 1) % stories.length] : null;

  const facts = [
    { label: t.facts.industry, value: s.industry },
    { label: t.facts.location, value: s.location },
    { label: t.facts.services, value: s.services.join(", ") },
    { label: t.facts.timeline, value: s.timeline },
  ];

  return (
    <main id="main" className="relative">
      {/* ---------- header + screenshot ---------- */}
      <header className="pt-header">
        <div className="container-site pt-8 sm:pt-12">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-lime/60"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
              {t.back}
            </Link>
            <div className="mt-6 flex justify-center">
              <Tags story={s} />
            </div>
            <p className="mt-5 text-sm font-semibold text-muted-foreground">{s.project.name}</p>
            <h1 className="mt-2 font-display text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.02] font-bold tracking-[-0.045em] text-balance">
              <Copy text={s.headline} />
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              <Copy text={s.summary} />
            </p>
            {s.project.url && (
              <a
                href={s.project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-lime-strong outline-none hover:underline focus-visible:ring-2 focus-visible:ring-lime/60 dark:text-lime"
              >
                {t.visit}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            )}
          </FadeUp>
          {/* portfolio shots are 1170px wide → keep this ≤ 48rem so it stays sharp */}
          <Shot src={s.image} alt={`${s.project.name} website`} sizes="(min-width: 800px) 768px, 100vw" preload className="mx-auto mt-10 max-w-3xl" />
          <Stats stats={s.stats} className="mx-auto mt-6 max-w-3xl" />
        </div>
      </header>

      {/* ---------- story + facts ---------- */}
      <article className="container-site py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="space-y-12 text-[17px] leading-[1.75] text-foreground/85 sm:text-lg">
            <section aria-labelledby="cs-challenge">
              <h2 id="cs-challenge" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.03em] text-foreground">
                {t.challengeTitle}
              </h2>
              <p className="mt-4">
                <Copy text={s.challenge} />
              </p>
            </section>
            <section aria-labelledby="cs-did">
              <h2 id="cs-did" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.03em] text-foreground">
                {t.didTitle}
              </h2>
              <ul className="mt-5 space-y-3">
                {s.did.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                      <Check className="size-3" strokeWidth={3.5} aria-hidden />
                    </span>
                    <span>
                      <Copy text={d} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="cs-results">
              <h2 id="cs-results" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.03em] text-foreground">
                {t.resultsTitle}
              </h2>
              <p className="mt-4">
                <Copy text={s.results} />
              </p>
            </section>

            {s.quote && (
              <figure className="rounded-[1.75rem] bg-ink p-7 text-white sm:p-9 dark:border dark:border-white/10 dark:bg-surface">
                <Quote className="size-8 text-lime" aria-hidden />
                <blockquote className="mt-4 font-display text-xl leading-snug font-semibold tracking-[-0.02em] sm:text-2xl">
                  <Copy text={s.quote.text} />
                </blockquote>
                <figcaption className="mt-5 text-sm text-white/65">
                  <span className="font-semibold text-white">
                    <Copy text={s.quote.name} />
                  </span>{" "}
                  · <Copy text={s.quote.role} />
                </figcaption>
              </figure>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <dl className="divide-y rounded-[1.5rem] border bg-surface">
              {facts.map((f) => (
                <div key={f.label} className="px-5 py-4">
                  <dt className="text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">{f.label}</dt>
                  <dd className="mt-1 text-[15px] font-semibold">
                    <Copy text={f.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </article>

      {/* ---------- next story ---------- */}
      {next && (
        <section aria-label={t.nextLabel} className="container-site pb-14 sm:pb-20">
          <Link
            href={`/case-studies/${next.slug}`}
            className="group mx-auto flex max-w-5xl flex-col gap-5 rounded-[1.75rem] border bg-surface p-5 outline-none transition-[border-color] duration-500 hover:border-lime/60 focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex-row sm:items-center sm:p-6"
          >
            <Shot src={next.image} alt={`${next.project.name} website`} sizes="(min-width: 640px) 240px, 100vw" className="sm:w-60 sm:shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.14em] text-lime-strong uppercase dark:text-lime">{t.nextLabel}</p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{next.project.name}</p>
              <p className="mt-1 font-display text-xl leading-snug font-bold tracking-[-0.02em] sm:text-2xl">
                <Copy text={next.headline} />
              </p>
            </div>
            <ArrowRight className="hidden size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:block" aria-hidden />
          </Link>
        </section>
      )}

      <CaseStudyCta />
      <FinalCta />
    </main>
  );
}

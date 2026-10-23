import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Check } from "lucide-react";
import { site } from "@/content/site";
import { FadeUp, SplitReveal } from "@/components/motion/SplitReveal";
import { PricingExplorer } from "@/components/pricing-page/PricingExplorer";
import { CharityCard } from "@/components/sections/pricing/CharityCard";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";

const pp = site.pricingPage;

export const metadata: Metadata = {
  title: pp.meta.title,
  description: pp.meta.description,
  alternates: { canonical: "/pricing" },
  openGraph: { url: "/pricing", title: `${pp.meta.title} · ${site.brand.name}`, description: pp.meta.description },
};

/**
 * Pricing page (simplicity rule): a compact hero with the headline, then the one
 * switch + three cards right away, an optional comparison table, "included with
 * every plan", the 2% promise, FAQ and the final CTA.
 */
export default function PricingPage() {
  const h = pp.hero;
  return (
    <main id="main" className="relative isolate overflow-hidden">
      {/* hero: grid + glow, plans start just below */}
      <section aria-label={h.headline} className="relative pt-header">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent_75%)] bg-[size:56px_56px] opacity-70"
        />
        <div aria-hidden className="absolute top-20 left-1/2 -z-10 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-lime/20 blur-[120px] dark:bg-lime/[0.07]" />

        <div className="container-site flex flex-col items-center pt-14 pb-10 text-center sm:pt-20 lg:pt-24">
          <FadeUp>
            <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground backdrop-blur">
              <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
              {h.eyebrow}
            </p>
          </FadeUp>
          <SplitReveal
            text={h.headline}
            accent={h.headlineAccent}
            delay={0.1}
            className="mt-6 max-w-[16ch] font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance"
          />
          <FadeUp delay={0.4}>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{h.subheadline}</p>
          </FadeUp>
          <FadeUp delay={0.5}>
            <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {h.chips.map((c) => (
                <li key={c} className="inline-flex items-center gap-2">
                  <span className="grid size-4 place-items-center rounded-full bg-lime text-ink">
                    <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* switch + plans + comparison */}
      <section aria-label="Plans" className="container-site pb-16 sm:pb-20">
        <FadeUp delay={0.55}>
          <PricingExplorer />
        </FadeUp>

        {/* included with every plan + not sure? */}
        <div className="mt-16 grid grid-cols-1 gap-5 rounded-[2rem] border bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{pp.included.title}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 text-[15px] sm:grid-cols-2">
              {pp.included.items.map((it) => (
                <li key={it} className="flex items-center gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                    <Check className="size-3" strokeWidth={3.5} aria-hidden />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end lg:text-right">
            <p className="text-sm text-muted-foreground">{pp.unsure.text}</p>
            <Link
              href={pp.unsure.href}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white outline-none transition-colors hover:bg-ink/90 focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-lime dark:text-ink"
            >
              <CalendarDays className="size-4" aria-hidden />
              {pp.unsure.label}
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <CharityCard />
        </div>
      </section>

      <FAQ categories={["Websites", "Monthly plans", "Billing"]} />
      <FinalCta />
    </main>
  );
}

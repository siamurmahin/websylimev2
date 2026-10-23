import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { CharityCard } from "@/components/sections/pricing/CharityCard";
import { PlanCards, growthCards } from "@/components/sections/pricing/PlanCards";
import { PricingHeading, ROW_ICONS, pricing as p } from "@/components/sections/pricing/shared";
import { href } from "@/lib/copy";

/**
 * Pricing: the three All-in-One Growth plans side by side. The recommended
 * plan is dark, raised and wrapped in a slowly rotating lime border; every
 * card lists the same rows (with icons) so they compare at a glance.
 * The 2% charity card sits underneath.
 */
export function Pricing({ needSiteLink = true }: { needSiteLink?: boolean } = {}) {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative isolate overflow-hidden py-14 sm:py-20">
      {/* soft glow behind the recommended plan */}
      <div aria-hidden className="absolute top-1/3 left-1/2 -z-10 h-[34rem] w-[42rem] -translate-x-1/2 rounded-full bg-lime/15 blur-[120px] dark:bg-lime/[0.04]" />

      <StaggerReveal className="container-site">
        <div data-reveal>
          <PricingHeading id="pricing-title" center />
          {/* Growth plans need an existing site, so point newcomers to Website Design first
              (hidden on the Growth page, which has its own banner for this) */}
          {needSiteLink && (
            <div className="mt-6 flex justify-center">
              <Link
                href={href(p.needSite.href)}
                className="group inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border bg-surface px-4 py-2 text-[13px] sm:text-sm outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="text-muted-foreground">{p.needSite.text}</span>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  {p.needSite.label}
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
                <span className="hidden rounded-full bg-lime-soft px-2 py-0.5 text-xs font-semibold text-lime-strong sm:inline">{p.needSite.note}</span>
              </Link>
            </div>
          )}
        </div>

        <PlanCards plans={growthCards(p)} rows={p.rows} rowIcons={ROW_ICONS} ctaLabel={p.cta} cardBadge={p.cardBadge} />

        <div data-reveal className="mt-10 flex flex-col items-center gap-2 text-center">
          <Link
            href={href(p.compare.href)}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold outline-none hover:text-lime-strong focus-visible:ring-2 focus-visible:ring-ring/60 dark:hover:text-lime"
          >
            {p.compare.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">{p.footnote}</p>
        </div>

        <div data-reveal className="mt-12">
          <CharityCard />
        </div>
      </StaggerReveal>
    </section>
  );
}

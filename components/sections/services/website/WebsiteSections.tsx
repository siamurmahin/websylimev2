import Link from "next/link";
import { ArrowDown, ArrowRight, Check, TrendingUp } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { PlanCards } from "@/components/sections/pricing/PlanCards";
import { WEBSITE_ICONS, websiteCards } from "@/components/sections/pricing/website";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const w = site.services.websiteDesign;
const web = site.pricingPage.website;

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold",
        dark ? "border-white/15 bg-white/5 text-white/70" : "bg-surface/70 text-muted-foreground",
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", dark ? "bg-lime" : "bg-lime-strong dark:bg-lime")} />
      {children}
    </p>
  );
}

const h2Cls = "mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance";

/** "Sound familiar?": six website problems in the client's own words. */
export function WebsitePains() {
  const p = w.pains;
  return (
    <section aria-labelledby="wd-pains-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="wd-pains-title" className={h2Cls}>
            {p.headline}
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {p.items.map((it) => {
            const Icon = icons[it.icon];
            return (
              <li key={it.title} data-reveal className="flex gap-4 rounded-[1.5rem] border bg-surface p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg leading-snug font-bold tracking-[-0.02em]">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </StaggerReveal>
    </section>
  );
}

/** "How we fix it": the four things every site does well, on a dark panel. */
export function WebsitePillars() {
  const p = w.pillars;
  return (
    <section aria-labelledby="wd-pillars-title" className="pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-12 dark:border dark:border-white/10 dark:bg-surface">
          <div data-reveal className="max-w-2xl">
            <Eyebrow dark>{p.eyebrow}</Eyebrow>
            <h2 id="wd-pillars-title" className={cn(h2Cls, "text-[clamp(2.25rem,5vw,3.75rem)]")}>
              {p.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{p.subheadline}</p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.items.map((it) => {
              const Icon = icons[it.icon];
              return (
                <li key={it.title} data-reveal className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-lime text-ink">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">{it.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">{it.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </StaggerReveal>
    </section>
  );
}

/**
 * Packages: the same three cards as the Pricing page (one source), then
 * "Not sure which one?" — three profiles that jump to the matching card.
 * Cards carry ids, so menu links like /services/website-design#business land on them.
 */
export function WebsitePackages() {
  const p = w.packages;
  return (
    <section id="packages" aria-labelledby="wd-packages-title" className="scroll-mt-16 py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="wd-packages-title" className={h2Cls}>
            {p.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.subheadline}</p>
        </div>

        <PlanCards plans={websiteCards} rows={web.rows} rowIcons={WEBSITE_ICONS} ctaLabel={web.cta} />

        <p data-reveal className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          <Copy text={web.footnote} />
        </p>

        {/* which one fits you */}
        <div data-reveal className="mt-14 rounded-[2rem] border bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em]">{p.fitTitle}</h3>
            <Link
              href={p.compare.href}
              className="group inline-flex items-center gap-1 rounded-sm text-sm font-semibold underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              {p.compare.label}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            {p.fits.map((f) => {
              const Icon = icons[f.icon];
              const plan = websiteCards.find((c) => c.id === f.plan);
              return (
                <li key={f.who}>
                  <a
                    href={`#${f.plan}`}
                    className="group flex h-full flex-col rounded-2xl border bg-background p-5 outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-lime-soft text-lime-strong transition-colors group-hover:bg-lime group-hover:text-ink">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="mt-4 block font-semibold">{f.who}</span>
                    <span className="mt-1 block flex-1 text-sm text-muted-foreground">{f.body}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                      {plan && <Copy text={p.fitCta.replace("{name}", plan.name)} />}
                      <ArrowDown className="size-3.5 -rotate-90 transition-transform duration-300 group-hover:rotate-0" aria-hidden />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </StaggerReveal>
    </section>
  );
}

/** "Every website includes": honest promises instead of made-up "worth $X" prices. */
export function WebsiteIncluded() {
  const inc = w.included;
  return (
    <section aria-labelledby="wd-included-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{inc.eyebrow}</Eyebrow>
          <h2 id="wd-included-title" className={h2Cls}>
            {inc.headline}
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {inc.items.map((it) => (
            <li key={it.title} data-reveal className="flex gap-3.5 rounded-[1.5rem] border bg-surface p-5">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-lime text-ink">
                <Check className="size-3.5" strokeWidth={3.5} aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  <Copy text={it.body} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </StaggerReveal>
    </section>
  );
}

/** Slim banner pointing to Growth plans. Also used on the Graphic Design page with its own copy. */
export function WebsiteGrowthUpsell({ data = w.growthUpsell }: { data?: typeof w.growthUpsell } = {}) {
  const u = data;
  return (
    <section aria-label={u.title} className="container-site">
      <div className="flex flex-col gap-5 rounded-[1.75rem] border bg-lime-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-lime/[0.06]">
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime text-ink">
            <TrendingUp className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{u.title}</h2>
            <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{u.body}</p>
          </div>
        </div>
        <Link
          href={u.cta.href}
          className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border bg-background px-5 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50 sm:self-auto"
        >
          {u.cta.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

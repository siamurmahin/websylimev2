import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Image as ImageIcon, Megaphone, Palette, Repeat, Send, type LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import { designPortfolio, designTypeLabels } from "@/content/design-portfolio";
import { icons } from "@/components/icons";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { PlanCards, type PlanCardData } from "@/components/sections/pricing/PlanCards";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const g = site.services.graphicDesign;

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

/** "What we design": four kinds of work. Card ids are the header menu anchors (#social, #ads). */
export function GraphicWhat() {
  const wd = g.what;
  return (
    <section aria-labelledby="gd-what-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{wd.eyebrow}</Eyebrow>
          <h2 id="gd-what-title" className={h2Cls}>
            {wd.headline}
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {wd.items.map((it) => {
            const Icon = icons[it.icon];
            return (
              <li
                key={it.id}
                id={it.id}
                data-reveal
                className="group scroll-mt-28 rounded-[1.5rem] border bg-surface p-6 transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-lime-soft text-lime-strong transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-[-0.02em]">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </li>
            );
          })}
        </ul>
      </StaggerReveal>
    </section>
  );
}

/**
 * Design work preview: a masonry of the latest items from content/design-portfolio.ts,
 * or a friendly "coming soon" card while it's empty (no stock or fake work).
 */
export function GraphicWork() {
  const wk = g.work;
  const items = designPortfolio.slice(0, wk.max);
  return (
    <section aria-labelledby="gd-work-title" className="pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{wk.eyebrow}</Eyebrow>
            <h2 id="gd-work-title" className={h2Cls}>
              {wk.headline}
            </h2>
          </div>
          {items.length > 0 && (
            <Link
              href={wk.all.href}
              className="group inline-flex items-center gap-1 rounded-sm text-sm font-semibold underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              {wk.all.label}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          )}
        </div>

        {items.length > 0 ? (
          <ul className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4">
            {items.map((it) => (
              <li key={it.image} data-reveal className="mb-4 break-inside-avoid overflow-hidden rounded-[1.25rem] border bg-surface">
                <Image src={it.image} alt={`${it.title} — ${it.client}`} width={it.width} height={it.height} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="h-auto w-full" />
                <p className="px-4 py-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{it.client}</span> · {designTypeLabels[it.type]}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyWork />
        )}
      </StaggerReveal>
    </section>
  );
}

/** Placeholder tiles (abstract shapes, clearly not real work) + "coming soon" message. */
function EmptyWork() {
  const e = g.work.empty;
  const tiles: { Icon: LucideIcon; cls: string }[] = [
    { Icon: ImageIcon, cls: "bg-lime-soft text-lime-strong" },
    { Icon: Megaphone, cls: "bg-ink text-lime dark:bg-white/10" },
    { Icon: Palette, cls: "bg-muted text-muted-foreground" },
  ];
  return (
    <div data-reveal className="mt-10 grid grid-cols-1 items-center gap-8 rounded-[2rem] border bg-surface p-6 sm:p-10 lg:grid-cols-2">
      <div aria-hidden className="grid grid-cols-3 gap-3">
        {tiles.map(({ Icon, cls }, i) => (
          <span key={i} className={cn("grid aspect-[4/5] place-items-center rounded-2xl", cls, i === 1 && "translate-y-4")}>
            <Icon className="size-7" />
          </span>
        ))}
      </div>
      <div>
        <h3 className="font-display text-2xl font-bold tracking-[-0.03em]">{e.title}</h3>
        <p className="mt-2 max-w-md text-muted-foreground">{e.body}</p>
        <Link
          href={e.cta.href}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border bg-background px-5 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <CalendarDays className="size-4" aria-hidden />
          {e.cta.label}
        </Link>
      </div>
    </div>
  );
}

/** One icon per plan row, same order as graphicDesign.plans.rows */
const PLAN_ICONS: LucideIcon[] = [Repeat, ImageIcon, Megaphone, ImageIcon, Palette, Repeat, Clock];

const planCards: PlanCardData[] = g.plans.items.map((p) => ({
  id: p.id,
  name: p.name,
  tagline: p.tagline,
  price: p.price,
  per: g.plans.per,
  badge: p.badge,
  featured: p.badge === "Recommended",
  href: `/start-project?package=${p.id}`,
  values: p.values,
}));

/** Three monthly design plans (same card component as Pricing / Growth). */
export function GraphicPlans() {
  const p = g.plans;
  return (
    <section id="plans" aria-labelledby="gd-plans-title" className="scroll-mt-16 py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="gd-plans-title" className={h2Cls}>
            {p.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.subheadline}</p>
        </div>

        <PlanCards plans={planCards} rows={p.rows} rowIcons={PLAN_ICONS} ctaLabel={p.cta} />

        <p data-reveal className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          <Copy text={p.footnote} />
        </p>
      </StaggerReveal>
    </section>
  );
}

/** "Ask. We design. You post.": three steps on a dark panel. */
export function GraphicHow() {
  const h = g.how;
  const stepIcons = [Send, Palette, ArrowRight];
  return (
    <section aria-labelledby="gd-how-title" className="pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-12 dark:border dark:border-white/10 dark:bg-surface">
          <div data-reveal>
            <Eyebrow dark>{h.eyebrow}</Eyebrow>
            <h2 id="gd-how-title" className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">
              {h.headline}
            </h2>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {h.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={s.title} data-reveal className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-full bg-lime font-mono text-sm font-bold text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="size-5 text-white/40" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">
                    <Copy text={s.body} />
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </StaggerReveal>
    </section>
  );
}

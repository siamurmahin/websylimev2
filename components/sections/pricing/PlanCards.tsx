import Link from "next/link";
import { ArrowRight, HeartHandshake, Minus, Sparkles, type LucideIcon } from "lucide-react";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { isNone } from "@/components/sections/pricing/shared";

export type PlanCardData = {
  id: string;
  name: string;
  tagline: string;
  /** Display text, e.g. "$1,999" or "$[X]" (placeholders are highlighted) */
  price: string;
  /** "/month", "one-time" … */
  per: string;
  wasPrice?: string | null;
  /** Shown as a pill; the featured plan shows it as the ribbon instead */
  badge?: string | null;
  featured?: boolean;
  href: string;
  /** One value per row, "—" = not included */
  values: string[];
};

/**
 * Three plan cards side by side: the featured one is dark, raised and wrapped
 * in a slowly rotating lime border; every card lists the same rows (with
 * icons) so they compare at a glance. Used by the homepage Pricing section,
 * the Growth page and the Pricing page.
 */
export function PlanCards({
  plans,
  rows,
  rowIcons,
  ctaLabel,
  cardBadge,
}: {
  plans: PlanCardData[];
  rows: string[];
  rowIcons: LucideIcon[];
  ctaLabel: string;
  cardBadge?: string;
}) {
  return (
    <ul className="mx-auto mt-14 grid max-w-xl grid-cols-1 items-stretch gap-5 sm:mt-16 lg:max-w-none lg:grid-cols-3 lg:gap-4 xl:gap-6">
      {plans.map((plan) => {
        const featured = Boolean(plan.featured);

        const card = (
          <div
            className={cn(
              "relative flex h-full flex-col rounded-[1.7rem] p-7 sm:p-8 lg:p-6 xl:p-8",
              featured ? "bg-ink text-white" : "border bg-surface",
            )}
          >
            {/* name + badge */}
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <h3 className={cn("text-sm font-bold tracking-[0.14em] uppercase", featured ? "text-lime" : "text-lime-strong dark:text-lime")}>
                <Copy text={plan.name} />
              </h3>
              {plan.badge && !featured && (
                <span className="rounded-full bg-lime-soft px-3 py-1 text-xs font-bold text-lime-strong">{plan.badge}</span>
              )}
            </div>

            {/* price */}
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold tracking-[-0.045em] tabular-nums sm:text-6xl lg:text-5xl xl:text-6xl">
                <Copy text={plan.price} />
              </span>
              <span className={cn("text-sm", featured ? "text-white/55" : "text-muted-foreground")}>{plan.per}</span>
            </p>
            <p className="mt-1 h-5 text-sm">
              {plan.wasPrice && (
                <span className={cn("line-through", featured ? "text-white/40" : "text-muted-foreground")}>{plan.wasPrice}</span>
              )}
            </p>
            <p className={cn("mt-2 text-[15px] leading-relaxed", featured ? "text-white/70" : "text-muted-foreground")}>
              <Copy text={plan.tagline} />
            </p>

            <Link
              href={plan.href}
              className={cn(
                "group mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold outline-none transition-[background-color,border-color,filter] focus-visible:ring-3 focus-visible:ring-ring/50",
                featured ? "bg-lime text-ink hover:brightness-105" : "border bg-background hover:border-lime",
              )}
            >
              {ctaLabel}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* comparable rows */}
            <ul className={cn("mt-7 mb-6 space-y-1 border-t pt-5", featured && "border-white/10")}>
              {rows.map((label, r) => {
                const Icon = rowIcons[r];
                const value = plan.values[r];
                const none = isNone(value);
                return (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center gap-3 rounded-xl py-1.5 text-sm lg:gap-2.5 lg:text-[13px] xl:gap-3 xl:text-sm",
                      none && (featured ? "text-white/30" : "text-muted-foreground/55"),
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-lg lg:size-7 xl:size-8",
                        none ? (featured ? "bg-white/[0.03]" : "bg-muted/60") : featured ? "bg-lime/12 text-lime" : "bg-lime-soft text-lime-strong dark:text-lime",
                      )}
                    >
                      {none || !Icon ? <Minus className="size-3.5" aria-hidden /> : <Icon className="size-4" aria-hidden />}
                    </span>
                    <span className="flex-1 leading-snug">{label}</span>
                    <span className={cn("shrink-0 text-right font-semibold", none && "sr-only")}>
                      {none ? "Not included" : <Copy text={value} />}
                    </span>
                  </li>
                );
              })}
            </ul>

            {cardBadge && (
              <p
                className={cn(
                  "mt-auto inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-semibold",
                  featured ? "bg-white/10 text-white/80" : "bg-surface-2 text-muted-foreground",
                )}
              >
                <HeartHandshake className="size-3.5 text-rose-500" aria-hidden />
                {cardBadge}
              </p>
            )}
          </div>
        );

        return (
          <li
            key={plan.id}
            // anchor target for links like /services/growth#lead-growth
            id={plan.id}
            data-reveal
            className={cn("relative scroll-mt-28 transition-[translate] duration-500 ease-out-expo hover:-translate-y-1.5", featured && "lg:-my-5")}
          >
            {featured ? (
              <>
                {/* "recommended" ribbon */}
                <span className="absolute -top-3.5 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-lime px-3.5 py-1 text-xs font-bold whitespace-nowrap text-ink shadow-lg">
                  <Sparkles className="size-3.5" aria-hidden />
                  {plan.badge}
                </span>
                {/* rotating lime border */}
                <div className="relative h-full overflow-hidden rounded-[1.8rem] p-[1.5px] shadow-[0_40px_90px_-40px_var(--lime)] dark:shadow-[0_30px_70px_-45px_color-mix(in_oklch,var(--lime)_45%,transparent)]">
                  <span
                    aria-hidden
                    className="absolute inset-[-60%] animate-spin bg-[conic-gradient(from_0deg,transparent_0deg,var(--lime)_70deg,transparent_150deg,transparent_360deg)] [animation-duration:6s]"
                  />
                  {card}
                </div>
              </>
            ) : (
              <div className="h-full rounded-[1.7rem] transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgb(0_0_0/0.35)]">{card}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Growth plans (content/home/pricing.ts) → card data. One source for every page. */
export function growthCards(p: {
  perMonth: string;
  plans: readonly {
    id: string;
    name: string;
    tagline: string;
    price: number;
    wasPrice: number | null;
    badge: string | null;
    values: string[];
  }[];
}): PlanCardData[] {
  const money = (n: number) => `$${n.toLocaleString("en-US")}`;
  return p.plans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    tagline: plan.tagline,
    price: money(plan.price),
    per: p.perMonth,
    wasPrice: plan.wasPrice ? money(plan.wasPrice) : null,
    badge: plan.badge,
    featured: plan.badge === "Recommended",
    href: `/start-project?package=${plan.id}`,
    values: plan.values,
  }));
}

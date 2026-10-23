"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { PlanCards, growthCards } from "@/components/sections/pricing/PlanCards";
import { ROW_ICONS, isNone } from "@/components/sections/pricing/shared";
import { WEBSITE_ICONS, websiteCards } from "@/components/sections/pricing/website";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const pp = site.pricingPage;
const growth = site.home.pricing;

type TabId = "website" | "growth";

const VIEWS = {
  website: { cards: websiteCards, rows: pp.website.rows, icons: WEBSITE_ICONS, cta: pp.website.cta, intro: pp.website.intro, footnote: pp.website.footnote, badge: undefined },
  growth: { cards: growthCards(growth), rows: growth.rows, icons: ROW_ICONS, cta: growth.cta, intro: pp.growth.intro, footnote: growth.footnote, badge: growth.cardBadge },
} satisfies Record<TabId, unknown>;

/**
 * The Pricing page's interactive part: one switch (Website Design / Growth),
 * three plan cards, a footnote, and an optional full comparison table.
 * Server-rendered with Website Design; /pricing#growth opens the Growth tab.
 */
export function PricingExplorer() {
  const [tab, setTab] = useState<TabId>("website");
  const [compareOpen, setCompareOpen] = useState(false);
  const reduce = useReducedMotion();
  const view = VIEWS[tab];

  // /pricing#growth (e.g. the homepage "Compare every feature" link) → Growth tab
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1);
      if (pp.tabs.some((t) => t.id === id)) setTab(id as TabId);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const choose = (id: TabId) => {
    setTab(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div>
      {/* the one switch */}
      <div className="flex justify-center">
        <div role="tablist" aria-label="Choose a service" className="inline-flex rounded-full border bg-surface p-1.5 shadow-sm">
          {pp.tabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                id={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="plans-panel"
                onClick={() => choose(t.id as TabId)}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-6",
                  active ? "text-ink" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="pricing-tab"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-lime"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative flex flex-col items-center leading-tight sm:flex-row sm:gap-2">
                  {t.label}
                  <span className={cn("text-[11px] font-medium", active ? "text-ink/70" : "text-muted-foreground/80")}>{t.note}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="plans-panel" role="tabpanel" aria-labelledby={tab}>
        <p className="mt-6 text-center text-[15px] text-muted-foreground">{view.intro}</p>

        <motion.div key={tab} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          <PlanCards plans={view.cards} rows={view.rows} rowIcons={view.icons} ctaLabel={view.cta} cardBadge={view.badge} />
        </motion.div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          <Copy text={view.footnote} />
        </p>

        {/* full comparison, folded away by default */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={compareOpen}
            aria-controls="compare-table"
            onClick={() => setCompareOpen((o) => !o)}
            className="group inline-flex h-11 items-center gap-2 rounded-full border bg-surface px-5 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {compareOpen ? pp.compare.close : pp.compare.open}
            <ChevronDown className={cn("size-4 transition-transform duration-300", compareOpen && "rotate-180")} aria-hidden />
          </button>
        </div>
        {compareOpen && (
          <div id="compare-table" className="mt-6 overflow-x-auto rounded-[1.5rem] border bg-surface">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b">
                  {/* first column stays put while the plans scroll sideways on phones */}
                  <th scope="col" className="sticky left-0 z-10 bg-surface px-5 py-4 font-semibold text-muted-foreground">
                    {pp.compare.feature}
                  </th>
                  {view.cards.map((c) => (
                    <th key={c.id} scope="col" className={cn("px-5 py-4 font-display text-base font-bold", c.featured && "bg-lime-soft/50 dark:bg-lime/[0.06]")}>
                      <Copy text={c.name} />
                      <span className="mt-0.5 block font-sans text-xs font-semibold text-muted-foreground">
                        <Copy text={c.price} /> {c.per}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {view.rows.map((row, r) => (
                  <tr key={row} className="border-b last:border-0">
                    <th scope="row" className="sticky left-0 z-10 bg-surface px-5 py-3.5 font-medium shadow-[1px_0_0_var(--border)]">
                      {row}
                    </th>
                    {view.cards.map((c) => {
                      const v = c.values[r];
                      return (
                        <td key={c.id} className={cn("px-5 py-3.5", c.featured && "bg-lime-soft/50 dark:bg-lime/[0.06]", isNone(v) ? "text-muted-foreground/50" : "font-semibold")}>
                          {isNone(v) ? <span aria-label="Not included">—</span> : <Copy text={v} />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

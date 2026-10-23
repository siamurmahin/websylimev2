"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Expand, Palette, X } from "lucide-react";
import { site } from "@/content/site";
import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { designPortfolio } from "@/content/design-portfolio";
import { isPlaceholder } from "@/lib/copy";
import { cn } from "@/lib/utils";

const w = site.work;

// Category chips only once projects have real categories (not "[Category]")
const CATEGORIES = [...new Set(portfolio.map((p) => p.category).filter((c) => !isPlaceholder(c)))].sort();

type Tab = "websites" | "design";
const DESIGN_HASH = "graphic-design";

/**
 * Work gallery: Websites / Graphic design switch, optional category chips, a
 * grid that shows `perPage` at a time with "Show more", and a lightbox
 * (native <dialog>) to see a site large. /work#<slug> opens that project.
 */
export function WorkGallery() {
  const [tab, setTab] = useState<Tab>("websites");
  const [cat, setCat] = useState<string>(w.allLabel);
  const [shown, setShown] = useState(w.perPage);
  const [open, setOpen] = useState<PortfolioItem | null>(null);
  const reduce = useReducedMotion();

  const list = useMemo(() => (cat === w.allLabel ? portfolio : portfolio.filter((p) => p.category === cat)), [cat]);
  const visible = list.slice(0, shown);

  // /work#hallmark-contractors → make sure it's shown, then open it.
  // /work#graphic-design → Graphic design tab (header menu, Graphic Design page)
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (slug === DESIGN_HASH) return setTab("design");
      const i = portfolio.findIndex((p) => p.slug === slug);
      if (i < 0) return;
      setTab("websites");
      setCat(w.allLabel);
      setShown((n) => Math.max(n, i + 1));
      setOpen(portfolio[i]);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="gallery" aria-label={w.tabs.websites} className="container-site scroll-mt-20 pt-14 pb-16 sm:pt-20 sm:pb-20">
      {/* anchor for /work#graphic-design */}
      <span id={DESIGN_HASH} aria-hidden className="block scroll-mt-24" />
      {/* switch + chips */}
      <div className="flex flex-col items-center gap-4">
        <div role="tablist" aria-label="Portfolio" className="inline-flex rounded-full border bg-surface p-1.5 shadow-sm">
          {(["websites", "design"] as const).map((t) => {
            const active = t === tab;
            const count = t === "websites" ? portfolio.length : designPortfolio.length;
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t)}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-sm font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-6",
                  active ? "text-ink" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="work-tab"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-lime"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-2">
                  {w.tabs[t]}
                  <span className={cn("rounded-full px-1.5 text-[11px] tabular-nums", active ? "bg-ink/10" : "bg-muted")}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        {tab === "websites" && CATEGORIES.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {[w.allLabel, ...CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => {
                  setCat(c);
                  setShown(w.perPage);
                }}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                  cat === c ? "border-lime bg-lime text-ink" : "bg-surface text-muted-foreground hover:border-lime hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === "websites" ? (
        <>
          <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                id={p.slug}
                className="scroll-mt-28"
                initial={reduce || i < w.perPage ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <button type="button" onClick={() => setOpen(p)} className="group block w-full rounded-[1.5rem] text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                  <span className="relative block overflow-hidden rounded-[1.25rem] border bg-surface-2 transition-[border-color] duration-500 group-hover:border-lime/60">
                    <Image
                      src={p.image}
                      alt={`${p.name} website`}
                      width={1170}
                      height={630}
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[1170/630] h-auto w-full object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition-[opacity,translate] duration-300 group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0"
                    >
                      <Expand className="size-3.5" />
                      {w.viewLabel}
                    </span>
                  </span>
                  <span className="mt-3.5 flex items-center justify-between gap-3 px-1">
                    <span className="font-display text-lg font-bold tracking-[-0.02em]">{p.name}</span>
                    {!isPlaceholder(p.category) && (
                      <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">{p.category}</span>
                    )}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>

          {shown < list.length && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + w.perPage)}
                className="group inline-flex h-12 items-center gap-2 rounded-full border bg-surface px-6 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {w.showMore}
                <span className="text-muted-foreground tabular-nums">({list.length - shown})</span>
                <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </button>
            </div>
          )}
        </>
      ) : (
        <DesignEmpty />
      )}

      <Lightbox item={open} list={visible} onChange={setOpen} />
    </section>
  );
}

function DesignEmpty() {
  const d = w.designEmpty;
  return (
    <div className="mx-auto mt-10 max-w-lg rounded-[2rem] border bg-surface p-8 text-center sm:p-10">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-lime-soft text-lime-strong">
        <Palette className="size-6" aria-hidden />
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold tracking-[-0.02em]">{d.title}</h2>
      <p className="mt-2 text-muted-foreground">{d.body}</p>
      <Link
        href={d.cta.href}
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
      >
        <CalendarDays className="size-4" aria-hidden />
        {d.cta.label}
      </Link>
    </div>
  );
}

/** Large view of one site. Native <dialog>: Esc closes, focus is handled by the browser. */
function Lightbox({ item, list, onChange }: { item: PortfolioItem | null; list: PortfolioItem[]; onChange: (p: PortfolioItem | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();
  const l = w.lightbox;
  const index = item ? list.findIndex((p) => p.slug === item.slug) : -1;

  const close = useCallback(() => {
    onChange(null);
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
  }, [onChange]);

  const step = useCallback(
    (d: 1 | -1) => {
      if (index < 0 || list.length < 2) return;
      onChange(list[(index + d + list.length) % list.length]);
    },
    [index, list, onChange],
  );

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (item && !dlg.open) {
      dlg.showModal();
      lenis?.stop();
    } else if (!item && dlg.open) {
      dlg.close();
    }
    if (!item) lenis?.start();
  }, [item, lenis]);

  // ← / → move between projects while open
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, step]);

  const navBtn =
    "grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur outline-none transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-lime/60";

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // click on the backdrop
      }}
      aria-label={item?.name}
      className="m-auto max-h-none w-[min(64rem,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 text-white backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-xl font-bold tracking-[-0.02em]">{item.name}</p>
            <button type="button" onClick={close} aria-label={l.close} className={navBtn}>
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl">
            <Image
              key={item.slug}
              src={item.image}
              alt={`${item.name} website`}
              width={1170}
              height={630}
              quality={90}
              // opened on demand (or via /work#slug) — it's the main thing on screen, so load it now
              loading="eager"
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="aspect-[1170/630] h-auto w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="Previous project" className={navBtn}>
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next project" className={navBtn}>
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold outline-none transition-colors hover:border-lime hover:text-lime focus-visible:ring-3 focus-visible:ring-lime/50"
                >
                  {l.visit}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
              <Link
                href="/start-project?service=website-design"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
              >
                {l.startCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

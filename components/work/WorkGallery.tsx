"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown, Expand, Palette, X } from "lucide-react";
import { site } from "@/content/site";
import { FOCUS_CATEGORY, portfolio, type PortfolioItem } from "@/content/portfolio";
import { designPortfolio } from "@/content/design-portfolio";
import { Copy, isPlaceholder } from "@/lib/copy";
import { cn } from "@/lib/utils";

const w = site.work;

// Category chips only once projects have real categories (not "[Category]")
const CATEGORIES = [...new Set(portfolio.map((p) => p.category).filter((c) => !isPlaceholder(c)))].sort((a, b) =>
  a === FOCUS_CATEGORY ? -1 : b === FOCUS_CATEGORY ? 1 : a.localeCompare(b),
);

type Tab = "websites" | "design";
const DESIGN_HASH = "graphic-design";

/** Card data for projects with a case study. Newest first. Sent from the server, so no client details reach the browser. */
export type StudyCards = Record<string, { headline: string; stat: { value: string; label: string } }>;

/**
 * Work gallery: Websites / Graphic design switch, category chips, and a grid
 * that shows `perPage` at a time with "Show more". Hidden cards stay in the HTML
 * (display: none), so search engines still see every link. A card opens its case
 * study; projects without one open a lightbox (native <dialog>, /work#<slug>).
 */
export function WorkGallery({ studies }: { studies: StudyCards }) {
  const [tab, setTab] = useState<Tab>("websites");
  const [cat, setCat] = useState<string>(w.allLabel);
  const [shown, setShown] = useState(w.perPage);
  const [open, setOpen] = useState<PortfolioItem | null>(null);
  const reduce = useReducedMotion();

  // Home services first, then case studies newest first (the order of `studies`), then the rest
  const ordered = useMemo(() => {
    const keys = Object.keys(studies);
    const rank = (p: PortfolioItem) => (keys.includes(p.slug) ? keys.indexOf(p.slug) : keys.length) - (p.category === FOCUS_CATEGORY ? keys.length + 1 : 0);
    return [...portfolio].sort((a, b) => rank(a) - rank(b));
  }, [studies]);
  const list = useMemo(() => (cat === w.allLabel ? ordered : ordered.filter((p) => p.category === cat)), [cat, ordered]);

  // /work#<slug> → make sure a project without a case study is shown, then open it.
  // /work#graphic-design → Graphic design tab (header menu, Graphic Design page)
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (slug === DESIGN_HASH) return setTab("design");
      const i = ordered.findIndex((p) => p.slug === slug && !p.hasStudy);
      if (i < 0) return;
      setTab("websites");
      setCat(w.allLabel);
      setShown((n) => Math.max(n, i + 1));
      setOpen(ordered[i]);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [ordered]);

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
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((p) => {
              const i = list.indexOf(p);
              return (
                <li key={p.slug} id={p.slug} className={cn("scroll-mt-28", (i < 0 || i >= shown) && "hidden")}>
                  <ProjectCard project={p} study={studies[p.slug]} onOpen={() => setOpen(p)} />
                </li>
              );
            })}
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

      <Lightbox item={open} list={list.filter((p) => !p.hasStudy)} onChange={setOpen} />
    </section>
  );
}

function ProjectCard({ project: p, study, onOpen }: { project: PortfolioItem; study?: StudyCards[string]; onOpen: () => void }) {
  const cls =
    "group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border bg-surface text-left outline-none transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60 focus-visible:ring-3 focus-visible:ring-ring/50";
  const image = (
    <span className="block overflow-hidden bg-surface-2">
      <Image
        src={p.image}
        alt={`${p.label} website design`}
        width={1170}
        height={630}
        quality={90}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[1170/630] h-auto w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
      />
    </span>
  );
  const meta = (
    <span className="flex items-start justify-between gap-3 text-sm font-semibold text-muted-foreground">
      {p.label}
      <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs">{p.category}</span>
    </span>
  );

  if (!study) {
    return (
      <button type="button" onClick={onOpen} className={cls}>
        {image}
        <span className="flex flex-1 flex-col p-5 sm:p-6">
          {meta}
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-foreground">
            <Expand className="size-4" aria-hidden />
            {w.viewLabel}
          </span>
        </span>
      </button>
    );
  }
  return (
    <Link href={`/work/${p.slug}`} className={cls}>
      {image}
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        {meta}
        <h2 className="mt-2 font-display text-xl leading-snug font-bold tracking-[-0.02em] text-balance">{study.headline}</h2>
        <span className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold tracking-[-0.03em] text-foreground">
            <Copy text={study.stat.value} />
          </span>
          <span className="text-sm text-muted-foreground">{study.stat.label}</span>
        </span>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-foreground">
          {w.readMore}
          <span className="grid size-6 place-items-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </span>
      </span>
    </Link>
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

  // Leaving the page with the lightbox open: don't leave scrolling locked behind
  useEffect(() => () => void lenis?.start(), [lenis]);
  useEffect(() => {
    const dlg = ref.current;
    return () => {
      if (dlg?.open) dlg.close();
      onChange(null); // so it isn't open again when coming back to this page
    };
  }, [onChange]);

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
      aria-label={item?.label}
      className="m-auto max-h-none w-[min(64rem,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 text-white backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-xl font-bold tracking-[-0.02em]">{item.label}</p>
            <button type="button" onClick={close} aria-label={l.close} className={navBtn}>
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl">
            <Image
              key={item.slug}
              src={item.image}
              alt={`${item.label} website`}
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

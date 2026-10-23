"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Bell, Check, Lock, PartyPopper } from "lucide-react";
import { site } from "@/content/site";
import { portfolio } from "@/content/portfolio";
import { icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Copy, href } from "@/lib/copy";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const p = site.home.process;
const m = p.mockup;
const ease = [0.16, 1, 0.3, 1] as const;
const t = "transition-all duration-700 ease-out-expo";

/* ------------------------------------------------------------------ */
/* A website that builds itself as you scroll through the steps        */
/* ------------------------------------------------------------------ */

function Pop({ show, className, children }: { show: boolean; className?: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn("absolute z-20", className)}
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.5, ease }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BuildMock({ stage }: { stage: number }) {
  const designed = stage >= 1;
  const built = stage >= 2;
  const live = stage >= 3;
  const shot = portfolio[0];

  const wire = "border border-dashed border-foreground/25 bg-transparent";

  return (
    <div className="relative" aria-hidden>
      {/* stage chip */}
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="inline-flex items-center gap-2 rounded-full border bg-surface px-3 py-1 text-xs font-semibold">
          <span className="relative grid size-2 place-items-center">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime-strong dark:bg-lime" />
            <span className="relative size-2 rounded-full bg-lime-strong dark:bg-lime" />
          </span>
          {m.stageLabels[stage]}…
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {String(stage + 1).padStart(2, "0")} / {String(p.steps.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative overflow-visible rounded-3xl border bg-surface shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)] dark:shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]">
        {/* browser bar */}
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <div className={cn("ml-3 flex h-7 flex-1 items-center gap-1.5 rounded-full px-3 text-xs", t, live ? "bg-muted" : "bg-muted/60")}>
            {live ? (
              <>
                <Lock className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium">{m.url}</span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {m.live}
                </span>
              </>
            ) : (
              <span className="h-2 w-28 rounded-full bg-foreground/10" />
            )}
          </div>
        </div>

        {/* page */}
        <div className="relative space-y-3 p-3 sm:space-y-4 sm:p-6">
          {/* nav */}
          <div className="flex items-center justify-between">
            <span className={cn("h-4 w-16 rounded-md", t, designed ? "bg-lime" : wire)} />
            <span className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className={cn("h-2 w-8 rounded-full", t, built ? "bg-foreground/25" : "bg-foreground/10")} />
              ))}
              <span className={cn("h-4 w-12 rounded-full", t, designed ? "bg-ink dark:bg-foreground" : wire)} />
            </span>
          </div>

          {/* hero */}
          <div className="grid grid-cols-[1.1fr_1fr] gap-4">
            <div className="flex flex-col justify-center gap-2">
              <span className={cn("h-4 w-full rounded-md", t, built ? "bg-foreground/80" : designed ? "bg-foreground/30" : wire)} />
              <span className={cn("h-4 w-4/5 rounded-md", t, built ? "bg-foreground/80" : designed ? "bg-foreground/30" : wire)} />
              <span className={cn("mt-1 h-2 w-full rounded-full", t, built ? "bg-foreground/15" : "bg-foreground/5")} />
              <span className={cn("h-2 w-2/3 rounded-full", t, built ? "bg-foreground/15" : "bg-foreground/5")} />
              <span className="mt-2 flex gap-2">
                <span className={cn("h-6 w-20 rounded-full", t, designed ? "bg-lime" : wire)} />
                <span className={cn("h-6 w-14 rounded-full", t, designed ? "border border-foreground/20" : wire)} />
              </span>
            </div>
            <div
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl",
                t,
                designed ? "bg-[linear-gradient(135deg,var(--lime),color-mix(in_oklch,var(--lime)_30%,var(--surface-2)))]" : wire,
              )}
            >
              {!designed && (
                <svg className="absolute inset-0 size-full text-foreground/15" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0 0L100 100M100 0L0 100" stroke="currentColor" strokeWidth="0.6" />
                </svg>
              )}
              {shot && (
                <Image
                  src={shot.image}
                  alt=""
                  fill
                  sizes="260px"
                  className={cn("object-cover object-left", t, built ? "scale-100 opacity-100" : "scale-110 opacity-0")}
                />
              )}
            </div>
          </div>

          {/* feature row */}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("space-y-1.5 rounded-xl p-3", t, built ? "border bg-surface-2" : wire)} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className={cn("block size-5 rounded-md", t, designed ? (i === 1 ? "bg-lime" : "bg-lime/50") : "bg-foreground/10")} />
                <span className={cn("block h-1.5 w-full rounded-full", t, built ? "bg-foreground/25" : "bg-foreground/10")} />
                <span className={cn("block h-1.5 w-2/3 rounded-full", t, built ? "bg-foreground/15" : "bg-foreground/5")} />
              </div>
            ))}
          </div>

          {/* ---------- stage overlays ---------- */}
          <Pop show={stage === 0} className="inset-x-4 top-6 flex justify-center gap-3 sm:inset-x-8">
            {m.notes.map((note, i) => (
              <span
                key={note}
                className="rounded-md bg-[#fde68a] px-3 py-2 text-xs font-bold text-amber-950 shadow-md"
                style={{ rotate: `${[-6, 3, -2][i]}deg` }}
              >
                {note}
              </span>
            ))}
          </Pop>

          <Pop show={stage === 1} className="bottom-4 left-4 flex items-center gap-2 rounded-2xl border bg-background/90 p-2.5 shadow-lg backdrop-blur">
            {["var(--lime)", "var(--ink)", "#f6f7f1", "#5d6352"].map((c) => (
              <span key={c} className="size-6 rounded-full border" style={{ background: c }} />
            ))}
            <span className="ml-1 rounded-lg bg-muted px-2 py-1 font-display text-sm font-bold">Aa</span>
          </Pop>

          <Pop show={stage === 2} className="right-4 bottom-4 rounded-xl bg-ink px-3 py-2 font-mono text-xs text-lime shadow-lg">
            {"<Hero />  ✓ mobile  ✓ fast"}
          </Pop>

          <Pop show={stage === 3} className="inset-x-0 top-1/3 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white shadow-xl">
              <PartyPopper className="size-4 text-lime" />
              {m.launched}
            </span>
          </Pop>

          <Pop show={stage === 4} className="top-4 right-4 w-56 space-y-2">
            <div className="flex items-center gap-2.5 rounded-xl border bg-background/95 p-2.5 shadow-lg backdrop-blur">
              <span className="grid size-7 place-items-center rounded-lg bg-lime text-ink">
                <Bell className="size-3.5" />
              </span>
              <span className="text-xs font-semibold">{m.lead}</span>
            </div>
            <div className="flex h-14 items-end gap-1 rounded-xl border bg-background/95 p-2.5 shadow-lg backdrop-blur">
              {[30, 45, 40, 60, 72, 92].map((h, i) => (
                <motion.span
                  key={i}
                  className={cn("flex-1 rounded-sm", i === 5 ? "bg-lime" : "bg-foreground/15")}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease }}
                />
              ))}
            </div>
          </Pop>
        </div>

        {/* confetti on launch */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div className="pointer-events-none absolute inset-0 z-30 overflow-visible" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i / 14) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className="absolute top-1/2 left-1/2 size-2 rounded-[2px]"
                    style={{ background: ["var(--lime)", "#f59e0b", "#f43f5e", "#38bdf8"][i % 4] }}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                    animate={{ x: Math.cos(angle) * 170, y: Math.sin(angle) * 120, opacity: 0, rotate: 220 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Process: a browser mockup (sticky on desktop) builds a website step by step
 * — wireframe → design → build → launch → growth — as you scroll the five steps.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-step]", ref.current).forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          // phones: the sticky mockup covers the top half, so a step activates lower down
          start: () => (window.innerWidth < 1024 ? "top 78%" : "top 60%"),
          end: () => (window.innerWidth < 1024 ? "bottom 78%" : "bottom 60%"),
          invalidateOnRefresh: true,
          onToggle: (self) => self.isActive && setStage(i),
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="process" aria-labelledby="process-title" className="relative py-14 sm:py-20">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
              <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
              {p.eyebrow}
            </p>
            <h2
              id="process-title"
              className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
            >
              <Copy text={p.headline} />
            </h2>
          </div>
          <Button asChild size="pill-lg" className="group shrink-0 hover:bg-lime">
            <Link href={href(p.cta.href)}>
              {p.cta.label}
              <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* mockup: sticky beside the steps on desktop, pinned on top on phones */}
          <div className="sticky top-[4.5rem] z-20 -mx-2 self-start bg-background px-2 pb-3 lg:top-[calc(50vh-14rem)] lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0">
            <BuildMock stage={stage} />
          </div>

          {/* steps */}
          <ol className="relative">
            {/* progress rail */}
            <span aria-hidden className="absolute top-2 bottom-2 left-[1.375rem] w-0.5 bg-border">
              <span
                className="absolute inset-x-0 top-0 origin-top bg-lime-strong transition-transform duration-700 ease-out-expo dark:bg-lime"
                style={{ height: "100%", transform: `scaleY(${(stage + 1) / p.steps.length})` }}
              />
            </span>

            {p.steps.map((step, i) => {
              const Icon = icons[step.icon];
              const on = i === stage;
              const done = i < stage;
              return (
                <li
                  key={step.title}
                  data-step
                  className={cn(
                    "relative flex gap-5 pb-14 transition-opacity duration-500 last:pb-0 lg:min-h-[52vh] lg:items-center lg:pb-0",
                    on ? "opacity-100" : "opacity-40",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 grid size-11 shrink-0 place-items-center self-start rounded-xl border transition-all duration-500 ease-out-expo lg:self-center",
                      on || done ? "border-lime bg-lime text-ink" : "bg-surface text-muted-foreground",
                      on && "scale-110 shadow-[0_0_0_6px_var(--lime-soft)]",
                    )}
                  >
                    {done ? <Check className="size-5" strokeWidth={3} aria-hidden /> : <Icon className="size-5" aria-hidden />}
                  </span>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold tracking-[-0.03em]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-lg text-muted-foreground">{step.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {step.gets.map((g) => (
                        <li key={g} className="inline-flex items-center gap-1.5 rounded-full border bg-surface px-3 py-1.5 text-sm font-medium">
                          <Check className="size-3.5 text-lime-strong dark:text-lime" strokeWidth={3} aria-hidden />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

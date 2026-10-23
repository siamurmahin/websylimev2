"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { ProcessHeader } from "@/components/sections/process/ProcessHeader";
import { cn } from "@/lib/utils";

const p = site.home.process;

/**
 * Option A — Expanding cards. Five tall columns on a dark panel; the active one
 * widens to show its details. Auto-advances until the visitor hovers or clicks.
 * Phones: a vertical accordion.
 */
export function ProcessExpand() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((a) => (a + 1) % p.steps.length), 3800);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section id="process" aria-labelledby="process-title" className="relative py-14 sm:py-20">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:rounded-[2.5rem] sm:p-10 lg:p-14 dark:border dark:border-white/10">
          <div aria-hidden className="absolute -top-40 right-0 -z-10 h-96 w-[40rem] rounded-full bg-lime/15 blur-[120px]" />
          <ProcessHeader dark id="process-title" />

          <ol className="mt-10 flex flex-col gap-3 sm:mt-14 lg:h-[26rem] lg:flex-row">
            {p.steps.map((step, i) => {
              const Icon = icons[step.icon];
              const on = i === active;
              return (
                <li
                  key={step.title}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border transition-[flex-grow,background-color,border-color] duration-700 ease-out-expo",
                    on ? "border-lime/40 bg-white/[0.06] lg:flex-[4]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] lg:flex-[1]",
                  )}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    // Cards resize when one opens, so a neighbour can slide under a
                    // still cursor. Only switch if the mouse itself actually moved.
                    const last = lastPointer.current;
                    if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 4) return;
                    lastPointer.current = { x: e.clientX, y: e.clientY };
                    pick(i);
                  }}
                >
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-expanded={on}
                    className="relative flex h-full w-full flex-col p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-lime/60 sm:p-6"
                  >
                    {/* header: icon + number only, so its height never changes */}
                    <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                      <span
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-500",
                          on ? "bg-lime text-ink" : "bg-white/10 text-white/70",
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="font-mono text-sm text-white/50">{String(i + 1).padStart(2, "0")}</span>
                      {/* phones: title sits in the header row */}
                      <span className="font-display text-xl font-bold tracking-[-0.02em] lg:hidden">{step.title}</span>
                    </div>

                    {/* desktop collapsed title: pinned to the bottom, fades out when the card opens */}
                    <span
                      aria-hidden={on}
                      className={cn(
                        "absolute bottom-6 left-6 hidden rotate-180 font-display text-2xl font-bold tracking-[-0.02em] whitespace-nowrap transition-opacity [writing-mode:vertical-rl] lg:block",
                        on ? "opacity-0 duration-200" : "opacity-100 delay-300 duration-500",
                      )}
                    >
                      {step.title}
                    </span>

                    {/* expanded body.
                        Desktop: pinned to the bottom at a fixed width, so the text never
                        reflows or jumps while the column widens — it just fades in after.
                        Phones: smooth accordion height (grid rows 0fr → 1fr). */}
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity,translate] ease-out-expo",
                        "lg:absolute lg:inset-x-6 lg:bottom-6 lg:block lg:w-[26rem] lg:max-w-[calc(100%-3rem)]",
                        on
                          ? "grid-rows-[1fr] opacity-100 duration-500 lg:translate-y-0 lg:delay-300"
                          : "pointer-events-none grid-rows-[0fr] opacity-0 duration-200 lg:translate-y-3",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pt-5 lg:pt-0">
                          <h3 className="hidden font-display text-[clamp(2rem,3.4vw,3rem)] leading-none font-bold tracking-[-0.04em] text-lime lg:block">
                            {step.title}
                          </h3>
                          <p className="mt-3 text-lg text-white/75">{step.body}</p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {step.gets.map((g) => (
                              <li key={g} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium">
                                <Check className="size-3.5 text-lime" strokeWidth={3} aria-hidden />
                                {g}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* big faded number behind the open card */}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute -right-4 -bottom-10 hidden font-display text-[12rem] leading-none font-bold text-white/[0.04] transition-opacity duration-700 lg:block",
                        on ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>

                  {/* auto-advance timer bar */}
                  {on && auto && (
                    <motion.span
                      key={`bar-${active}`}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-lime"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3.8, ease: "linear" }}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

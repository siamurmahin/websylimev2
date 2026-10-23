"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Copy, href } from "@/lib/copy";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Seamless Collaboration: copy on the left (sticky on desktop), four steps on
 * the right joined by a line that draws as you scroll. Each step's icon lights
 * up lime when the line reaches it. Reduced motion: everything shown lit.
 */
export function Collaboration() {
  const { eyebrow, headline, body, cta, points } = site.home.collaboration;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-line-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 65%", end: "bottom 60%", scrub: 0.5 },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 62%",
            end: "max",
            // stays lit once reached; un-lights only when scrolling back above it
            onEnter: () => step.classList.add("is-active"),
            onLeaveBack: () => step.classList.remove("is-active"),
          });
          gsap.from(step, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            clearProps: "transform",
            scrollTrigger: { trigger: step, start: "top 85%", once: true },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-line-fill]", { scaleY: 1 });
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((s) => s.classList.add("is-active"));
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="collaboration" aria-labelledby="collaboration-title" className="relative py-20 sm:py-28">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
        {/* ---------- copy ---------- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {eyebrow}
          </p>
          <h2
            id="collaboration-title"
            className="mt-5 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.03] font-bold tracking-[-0.04em] text-balance"
          >
            {headline}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">{body}</p>
          <Button asChild size="pill-lg" variant="outline" className="group mt-8 rounded-full bg-surface/60">
            <Link href={href(cta.href)}>
              {cta.label}
              <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </Button>
        </div>

        {/* ---------- steps ---------- */}
        <div data-steps className="relative">
          {/* track + scroll-drawn fill, centered on the icons */}
          <div aria-hidden className="absolute top-7 bottom-7 left-7 w-px -translate-x-1/2 bg-border">
            <div data-line-fill className="absolute inset-0 origin-top bg-lime-strong dark:bg-lime" />
          </div>

          <ol className="space-y-5">
            {points.map((point, i) => {
              const Icon = icons[point.icon];
              return (
                <li key={point.title} data-step className="group relative flex gap-5 sm:gap-6">
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border bg-surface text-muted-foreground shadow-sm transition-all duration-500 ease-out-expo group-[.is-active]:scale-105 group-[.is-active]:border-lime group-[.is-active]:bg-lime group-[.is-active]:text-ink group-[.is-active]:shadow-[0_0_0_6px_var(--lime-soft)]">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="flex-1 rounded-3xl border bg-surface p-5 transition-colors duration-500 group-[.is-active]:border-lime/40 sm:p-6">
                    <p aria-hidden className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold tracking-[-0.02em] sm:text-xl">{point.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                      <Copy text={point.body} />
                    </p>
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

"use client";
// Previous Process design (horizontal timeline). Kept to switch back: use <ProcessTimeline /> in app/page.tsx.

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Copy, href } from "@/lib/copy";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Process: five steps on a timeline that draws itself as you scroll —
 * left→right on desktop, top→bottom on phones. Each step lights up lime as
 * the line reaches it. Reduced motion: everything shown lit.
 */
export function ProcessTimeline() {
  const { eyebrow, headline, cta, steps } = site.home.process;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const stepEls = gsap.utils.toArray<HTMLElement>("[data-step]", root);
      const fills = gsap.utils.toArray<HTMLElement>("[data-fill]", root);
      const last = stepEls.length - 1;

      const paint = (progress: number) => {
        fills.forEach((f) => {
          f.style.transform = f.dataset.fill === "x" ? `scaleX(${progress})` : `scaleY(${progress})`;
        });
        stepEls.forEach((el, i) => el.classList.toggle("is-active", progress >= i / last - 0.001));
      };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        paint(0);
        ScrollTrigger.create({
          trigger: "[data-timeline]",
          start: "top 70%",
          end: "bottom 55%",
          scrub: true,
          onUpdate: (self) => paint(self.progress),
        });
        gsap.from("[data-reveal]", { y: 30, autoAlpha: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: root, start: "top 78%", once: true } });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => paint(1));
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="process" aria-labelledby="process-title" className="relative py-14 sm:py-20">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
              {eyebrow}
            </p>
            <h2
              id="process-title"
              data-reveal
              className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
            >
              <Copy text={headline} />
            </h2>
          </div>
          {/* wrapper takes the reveal: the button's own CSS transitions fight GSAP */}
          <div data-reveal className="shrink-0">
            <Button asChild size="pill-lg" className="group hover:bg-lime">
              <Link href={href(cta.href)}>
                {cta.label}
                <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div data-timeline className="relative mt-12 sm:mt-16">
          {/* horizontal track (desktop), passing through the step nodes */}
          <div aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-border lg:block">
            <div data-fill="x" className="absolute inset-0 origin-left bg-lime-strong dark:bg-lime" />
          </div>
          {/* vertical track (phones / tablet) */}
          <div aria-hidden className="absolute top-7 bottom-7 left-7 w-0.5 -translate-x-1/2 bg-border lg:hidden">
            <div data-fill="y" className="absolute inset-0 origin-top bg-lime-strong dark:bg-lime" />
          </div>

          <ol className="relative grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = icons[step.icon];
              return (
                <li key={step.title} data-step className="group flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border bg-surface text-muted-foreground shadow-sm transition-all duration-500 ease-out-expo group-[.is-active]:scale-110 group-[.is-active]:border-lime group-[.is-active]:bg-lime group-[.is-active]:text-ink group-[.is-active]:shadow-[0_0_0_6px_var(--lime-soft)]">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="flex-1 rounded-3xl border bg-surface p-5 transition-[border-color,translate] duration-500 ease-out-expo group-[.is-active]:border-lime/40 lg:mt-6 lg:w-full lg:p-6 lg:group-[.is-active]:-translate-y-1">
                    <p aria-hidden className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-[-0.02em]">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
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

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-triggered reveal: every child marked `data-reveal` rises in, one
 * after another, when the block enters the viewport. Lighter on phones;
 * skipped entirely for prefers-reduced-motion (content just stays visible).
 */
export function StaggerReveal({
  children,
  className,
  start = "top 78%",
}: {
  children: React.ReactNode;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const desktop = Boolean(ctx.conditions?.desktop);
          gsap.from("[data-reveal]", {
            y: desktop ? 64 : 28,
            autoAlpha: 0,
            duration: desktop ? 1 : 0.6,
            ease: "expo.out",
            stagger: desktop ? 0.09 : 0.06,
            // Hand transform back to CSS afterwards so hover effects still work
            clearProps: "transform",
            scrollTrigger: { trigger: ref.current, start, once: true },
          });
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Counts from 0 to `to` the first time it scrolls into view. The server HTML
 * already holds the final number (SEO / no-JS); reduced motion keeps it as-is.
 */
export function CountUp({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const state = { n: 0 };
      el.textContent = format(0);
      gsap.to(state, {
        n: to,
        duration,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = format(state.n);
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      return () => {
        el.textContent = format(to);
      };
    });
  });

  return (
    <span ref={ref} className="tabular-nums">
      {format(to)}
    </span>
  );
}

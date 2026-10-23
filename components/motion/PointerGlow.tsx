"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Soft lime gradient that follows the cursor across its section.
 * Desktop (fine pointer) only; stays parked for touch and reduced motion.
 */
export function PointerGlow({ size = 640 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(28);
  const x = useSpring(mx, { stiffness: 60, damping: 20 });
  const y = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const layer = ref.current;
    // Listen on the whole section: the glow layer itself sits behind the content
    const target = layer?.closest("section") ?? layer?.parentElement;
    if (!layer || !target || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = layer.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    };
    target.addEventListener("pointermove", onMove);
    return () => target.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  const backgroundImage = useMotionTemplate`radial-gradient(${size}px circle at ${x}% ${y}%, var(--glow), transparent 70%)`;

  // backgroundImage, not the `background` shorthand: the browser expands the
  // shorthand on the server HTML, which caused a hydration mismatch
  return <motion.div ref={ref} aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage }} />;
}

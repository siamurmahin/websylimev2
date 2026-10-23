"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Shared default so every strip on the site moves at the same speed (px per second). */
export const MARQUEE_SPEED = 45;

/**
 * Endless horizontal scroller. Content is rendered twice so translateX(-50%)
 * loops seamlessly; the copy is hidden from screen readers. Duration is derived
 * from the measured width, so strips of different lengths share one `speed`.
 * Pauses on hover; stops for prefers-reduced-motion (see globals.css).
 */
export function Marquee({
  children,
  speed = MARQUEE_SPEED,
  direction = "left",
  className,
  gap = "3.5rem",
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  /** Space between items; also used after the last item so the loop seam matches */
  gap?: string;
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const measure = () => setDuration(el.offsetWidth / speed);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [speed]);

  const group = "flex shrink-0 items-center";
  const groupStyle = { gap, paddingRight: gap };

  return (
    <div
      className={cn(
        "group/marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee-x group-hover/marquee:[animation-play-state:paused]",
          direction === "right" && "[animation-direction:reverse]",
        )}
        style={{ "--marquee-duration": duration ? `${duration}s` : "60s" } as React.CSSProperties}
      >
        <div ref={groupRef} className={group} style={groupStyle}>
          {children}
        </div>
        <div aria-hidden className={group} style={groupStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

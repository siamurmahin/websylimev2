"use client";

import { useFooterEnd } from "@/components/layout/useFooterEnd";
import { cn } from "@/lib/utils";

/*
 * Fixed "progressive blur" along the bottom edge of the viewport. Content
 * scrolling up appears to rise out of the blur. Stacked backdrop-filter
 * layers, each masked to a band, get stronger toward the bottom edge.
 * Fades out at the end of the footer so the giant wordmark stays crisp.
 */
// Gentle ramp: barely-there at the top, soft (not frosted) at the bottom edge
const LAYERS = [
  { blur: 0.25, from: 0, to: 25 },
  { blur: 0.5, from: 12, to: 37 },
  { blur: 1, from: 25, to: 50 },
  { blur: 1.5, from: 37, to: 62 },
  { blur: 2.5, from: 50, to: 75 },
  { blur: 4, from: 62, to: 87 },
  { blur: 6, from: 75, to: 100 },
];

export function BottomBlur() {
  const atEnd = useFooterEnd();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 transition-opacity duration-500 sm:h-32 lg:h-40",
        atEnd && "opacity-0",
      )}
    >
      {LAYERS.map(({ blur, from, to }, i) => {
        const mid = (from + to) / 2;
        const mask = `linear-gradient(to bottom, transparent ${from}%, black ${mid}%, black ${to}%, ${
          to === 100 ? "black" : "transparent"
        } ${to === 100 ? 100 : Math.min(to + 12, 100)}%)`;
        return (
          <div
            key={blur}
            // Strongest layers only from sm up: fewer backdrop filters on phones
            className={i > 4 ? "absolute inset-0 hidden sm:block" : "absolute inset-0"}
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
      {/* Soft fade into the page color so the edge reads as depth, not a bar */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,color-mix(in_oklch,var(--background)_6%,transparent)_45%,color-mix(in_oklch,var(--background)_22%,transparent)_75%,color-mix(in_oklch,var(--background)_45%,transparent)_100%)]" />
    </div>
  );
}

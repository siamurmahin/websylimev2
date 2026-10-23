"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a soft lime glow that follows the cursor (border + surface).
 * Pure CSS variables — no re-renders. Touch devices just show the card.
 */
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-3xl border bg-surface transition-[border-color] duration-500 hover:border-lime/40",
        className,
      )}
    >
      {/* glow on the surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), var(--glow), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}

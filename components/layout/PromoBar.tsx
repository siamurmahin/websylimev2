"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { site } from "@/content/site";
import { PROMO_KEY } from "@/lib/promo";
import { cn } from "@/lib/utils";

const b = site.freeDesign.bar;

/**
 * Thin bar above the header, free design offer. Folds away on scroll. Its height is
 * reserved by --promo-h (app/globals.css), so the page doesn't jump. Dismissing sets
 * data-promo="off" on <html>, which CSS uses to hide it and release that space.
 */
export function PromoBar({ collapsed }: { collapsed: boolean }) {
  const dismiss = () => {
    document.documentElement.dataset.promo = "off";
    try {
      localStorage.setItem(PROMO_KEY, "off");
    } catch {}
  };

  return (
    <div
      className={cn(
        "promo-bar overflow-hidden bg-ink text-white transition-[height,visibility] duration-300 dark:bg-surface-2",
        collapsed ? "invisible h-0" : "h-(--promo-h)",
      )}
    >
      <div className="container-site relative flex h-full items-center justify-center gap-2 pr-9 text-[13px] sm:text-sm">
        <Link href={b.href} className="group inline-flex min-w-0 items-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-lime">
          <span className="truncate sm:hidden">{b.shortText}</span>
          <span className="hidden sm:inline">{b.text}</span>
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-lime">
            {b.label}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={b.close}
          className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-white/70 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-lime"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

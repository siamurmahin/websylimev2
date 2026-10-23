"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/copy";

const b = site.bookACall;

/** "websylime/intro-call" or "https://cal.com/websylime/intro-call" → embeddable URL. */
function embedUrl(link: string, theme: "light" | "dark") {
  const path = link.replace(/^https?:\/\/(app\.)?cal\.com\//, "").replace(/^\/+|\/+$/g, "");
  const url = new URL(`https://cal.com/${path}`);
  url.searchParams.set("embed", "true");
  url.searchParams.set("theme", theme);
  url.searchParams.set("layout", "month_view");
  return url.toString();
}

// Follow the site theme (the `dark` class on <html>); server render assumes light
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}
const getTheme = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const getServerTheme = () => "light" as const;

/**
 * Cal.com booking calendar, embedded so visitors book without leaving the
 * site. Until `bookACall.calLink` is filled in, a "coming soon" card points
 * to the Start Project form instead.
 */
export function CalEmbed() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  if (isPlaceholder(b.calLink)) return <ComingSoon />;

  return (
    <iframe
      key={theme}
      src={embedUrl(b.calLink, theme)}
      title={b.calendar.frameTitle}
      loading="lazy"
      className="block h-[46rem] w-full rounded-2xl border-0 bg-background sm:h-[42rem]"
    />
  );
}

function ComingSoon() {
  const p = b.calendar.placeholder;
  const days = Array.from({ length: 35 }, (_, i) => i);
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-background p-6 sm:p-8">
      {/* faint calendar grid so the space reads as "a calendar goes here" */}
      <div aria-hidden className="grid grid-cols-7 gap-2 opacity-60">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="text-center text-xs font-semibold text-muted-foreground">
            {d}
          </span>
        ))}
        {days.map((i) => (
          <span
            key={i}
            className={
              [8, 10, 15, 17, 22, 24].includes(i)
                ? "aspect-square rounded-lg bg-lime-soft ring-1 ring-lime/40"
                : "aspect-square rounded-lg bg-muted/60"
            }
          />
        ))}
      </div>

      <div className="absolute inset-0 grid place-items-center bg-background/70 p-6 backdrop-blur-[2px]">
        <div className="max-w-xs text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-lime text-ink">
            <CalendarDays className="size-5" aria-hidden />
          </span>
          <p className="mt-4 font-display text-xl font-bold tracking-[-0.02em]">{p.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          <Link
            href={b.writeInstead.href}
            className="group mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
          >
            {p.cta}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

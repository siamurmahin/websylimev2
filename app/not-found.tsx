import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { href } from "@/lib/copy";

const nf = site.notFound;

// The "0" comet. Inline styles: these values mix CSS variables with calc(),
// which Tailwind arbitrary classes don't reliably generate. --lime-strong is
// dark green in light mode and bright lime in dark mode, so one set covers both.
const RING = "0.11em";
const COMET = {
  track: { border: `${RING} solid color-mix(in oklch, var(--lime-strong) 14%, transparent)` },
  spin: { animationDuration: "2.8s", animationTimingFunction: "cubic-bezier(0.45, 0.05, 0.55, 0.95)" },
  tail: {
    background: "conic-gradient(from 0deg, transparent 0deg, transparent 110deg, var(--lime-strong) 360deg)",
    mask: `radial-gradient(farthest-side, transparent calc(100% - ${RING}), black calc(100% - ${RING} + 1px))`,
    WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${RING}), black calc(100% - ${RING} + 1px))`,
  },
  head: {
    width: RING,
    height: RING,
    background: "var(--lime)",
    boxShadow: "0 0 0 0.018em var(--lime-strong), 0 0 0.14em 0.02em var(--lime)",
  },
} satisfies Record<string, React.CSSProperties>;

// Next adds `noindex` to 404 responses automatically
export const metadata: Metadata = { title: nf.metaTitle };

/**
 * Branded 404 for any unmatched URL. Renders inside the root layout (header +
 * footer). Quick links only point at homepage sections that exist, so a
 * visitor is never sent to a second 404.
 */
export default function NotFound() {
  return (
    <main id="main" className="relative isolate overflow-hidden">
      {/* grid + glow, same language as the Hero */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(60%_55%_at_50%_35%,black,transparent_75%)] bg-[size:56px_56px] opacity-70"
      />
      <div aria-hidden className="absolute top-24 left-1/2 -z-10 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-lime/20 blur-[120px] dark:bg-lime/[0.07]" />

      <section className="container-site flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center pt-28 pb-20 text-center sm:pt-32">
        {/* 4 ◯ 4 — the zero is a faint ring with a lime "comet" sweeping round:
            a conic tail that fades out behind a glowing head */}
        <p
          aria-label="404"
          className="flex animate-enter-up items-center font-display text-[clamp(6.5rem,22vw,13rem)] leading-none font-bold tracking-[-0.06em]"
        >
          <span aria-hidden>4</span>
          <span aria-hidden className="relative mx-[0.04em] size-[0.78em]">
            {/* track */}
            <span className="absolute inset-0 rounded-full" style={COMET.track} />
            {/* comet: tail + head rotate together */}
            <span className="absolute inset-0 animate-spin motion-reduce:animate-none" style={COMET.spin}>
              <span className="absolute inset-0 rounded-full" style={COMET.tail} />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full" style={COMET.head} />
            </span>
          </span>
          <span aria-hidden>4</span>
        </p>

        <p
          className="mt-8 inline-flex animate-enter-up items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground backdrop-blur"
          style={{ animationDelay: "0.1s" }}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
          {nf.eyebrow}
        </p>
        <h1
          className="mt-5 max-w-2xl animate-enter-up font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.04em] text-balance"
          style={{ animationDelay: "0.18s" }}
        >
          {nf.headline}
        </h1>
        <p className="mt-4 max-w-md animate-enter-up text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "0.26s" }}>
          {nf.body}
        </p>

        <div
          className="mt-9 flex w-full animate-enter-up flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          style={{ animationDelay: "0.34s" }}
        >
          <Link
            href={nf.primaryCta.href}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink shadow-[0_14px_30px_-16px_var(--lime)] outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
          >
            {nf.primaryCta.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link
            href={href(nf.secondaryCta.href)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border bg-surface px-6 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <CalendarDays className="size-4" aria-hidden />
            {nf.secondaryCta.label}
          </Link>
        </div>

        {/* quick links */}
        <nav aria-label={nf.linksTitle} className="mt-16 w-full max-w-3xl animate-enter-up" style={{ animationDelay: "0.45s" }}>
          <h2 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{nf.linksTitle}</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {nf.links.map((l) => {
              const Icon = icons[l.icon];
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex h-full items-center gap-3 rounded-2xl border bg-surface p-4 outline-none transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50 lg:flex-col lg:items-start"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime-soft text-lime-strong transition-colors group-hover:bg-lime group-hover:text-ink">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1 text-sm font-semibold">
                        {l.label}
                        <ArrowRight
                          aria-hidden
                          className="size-3.5 -translate-x-1 opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{l.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </main>
  );
}

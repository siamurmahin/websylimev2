import { HeartHandshake, Heart, Sprout } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Copy } from "@/lib/copy";
import { pricing } from "@/components/sections/pricing/shared";

const c = pricing.charity;

/**
 * The 2% promise. Left: every plan feeds a little "2%" stream into one beating
 * heart. Right: the promise, how it works in three steps, and who it supports.
 */
export function CharityCard() {
  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border bg-surface lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* ---------- visual ---------- */}
      <div
        aria-hidden
        className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[radial-gradient(90%_90%_at_70%_50%,rgb(244_63_94/0.14),transparent_60%),radial-gradient(80%_80%_at_10%_20%,var(--lime-soft),transparent_70%),var(--surface-2)] p-5 sm:p-10"
      >
        <div className="flex w-full max-w-md items-center gap-3 sm:gap-4">
          {/* the three plans */}
          <ul className="flex shrink-0 flex-col gap-3">
            {pricing.plans.map((plan) => (
              <li key={plan.id} className="rounded-xl border bg-background/90 px-2.5 py-1.5 text-[11px] font-bold whitespace-nowrap shadow-sm backdrop-blur sm:px-3 sm:py-2 sm:text-xs">
                {plan.name}
              </li>
            ))}
          </ul>

          {/* streams of 2% into the heart */}
          <div className="relative flex h-36 flex-1 flex-col justify-between py-2">
            {[0, 1, 2].map((row) => (
              <div key={row} className="relative h-7">
                <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-rose-300 dark:border-rose-400/40" />
                {[0, 1].map((k) => (
                  <span
                    key={k}
                    className="absolute inset-y-0 left-0 w-[calc(100%-1.75rem)] animate-flow"
                    style={{ animationDelay: `${row * 0.4 + k * 1.2}s` }}
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow">2%</span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* heart */}
          <div className="relative grid size-16 shrink-0 place-items-center sm:size-24">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-rose-400/30" />
            <span className="relative grid size-16 animate-beat place-items-center rounded-full bg-rose-500 sm:size-24 text-white shadow-[0_20px_50px_-12px_rgb(244_63_94/0.6)]">
              <Heart className="size-7 fill-current sm:size-10" />
            </span>
          </div>
        </div>

        <Sprout className="absolute bottom-5 left-6 size-6 text-lime-strong/40 dark:text-lime/40" />
      </div>

      {/* ---------- promise ---------- */}
      <div className="p-7 sm:p-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
          <HeartHandshake className="size-3.5" aria-hidden />
          {c.eyebrow}
        </p>
        <div className="mt-4 flex items-end gap-4">
          <span className="font-display text-7xl leading-[0.85] font-bold tracking-[-0.05em] text-rose-500 sm:text-8xl">
            <CountUp to={2} duration={1.2} />%
          </span>
          <h3 className="pb-1 font-display text-2xl leading-tight font-bold tracking-[-0.02em] sm:text-3xl">{c.title}</h3>
        </div>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{c.body}</p>

        <ol className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {c.steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border bg-background/60 p-4">
              <span className="font-mono text-xs text-rose-500">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1 font-semibold">{step.title}</p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                <Copy text={step.body} />
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>
            {c.partnerLabel}: <Copy text={c.partner} />
          </span>
          <span aria-hidden>·</span>
          <span>
            <Copy text={c.report} />
          </span>
        </div>
      </div>
    </div>
  );
}

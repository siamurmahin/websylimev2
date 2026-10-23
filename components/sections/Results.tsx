"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Briefcase, Heart, Star, User } from "lucide-react";
import { site } from "@/content/site";
import { StatValue } from "@/components/StatValue";
import { Copy, href, plain } from "@/lib/copy";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Stat = (typeof site.home.results.stats)[number];
const g = site.home.results.graphics;

const RING_R = 30;
const RING_C = 2 * Math.PI * RING_R;

/* ---------------- tile graphics (each fills the top of its tile) ---------------- */

function Ring({ value }: { value: string }) {
  const pct = Number(value.match(/\d+/)?.[0] ?? 0) / 100;
  return (
    <div className="flex items-center gap-4" aria-hidden>
      <div className="relative size-20">
        <svg viewBox="0 0 72 72" className="size-full -rotate-90">
          <circle cx="36" cy="36" r={RING_R} fill="none" strokeWidth="7" className="stroke-ink/15" />
          <circle
            data-ring
            data-offset={RING_C * (1 - pct)}
            cx="36"
            cy="36"
            r={RING_R}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            className="stroke-ink"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C * (1 - pct)}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-xs font-bold">{g.ring}</span>
      </div>
      {/* ten little people, nine lit */}
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            data-person
            className={cn("grid size-6 place-items-center rounded-full", i < 9 ? "bg-ink text-lime" : "bg-ink/10 text-ink/40")}
          >
            <User className="size-3.5" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Grid() {
  return (
    <div className="grid w-full grid-cols-12 gap-1.5" aria-hidden>
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          data-cell
          className={cn("aspect-square rounded-[4px]", i % 9 === 4 ? "bg-foreground/10" : i % 5 === 0 ? "bg-lime-strong dark:bg-lime/70" : "bg-lime")}
        />
      ))}
    </div>
  );
}

function Timeline() {
  return (
    <div className="w-full" aria-hidden>
      <div className="relative flex items-center">
        <span className="z-10 size-3 rounded-full border-2 border-muted-foreground bg-surface" />
        <span data-line className="h-0.5 flex-1 origin-left bg-[linear-gradient(90deg,var(--muted-foreground),var(--lime))]" />
        {/* milestones along the way */}
        {[25, 50, 75].map((left) => (
          <span key={left} data-milestone className="absolute size-2 -translate-x-1/2 rounded-full bg-lime" style={{ left: `${left}%` }} />
        ))}
        <span className="relative grid size-3.5 place-items-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime" />
          <span className="relative size-3.5 rounded-full bg-lime" />
        </span>
      </div>
      <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground">
        <Copy text={g.timelineStart} />
        <span>{g.timelineEnd}</span>
      </div>
    </div>
  );
}

/** Coins travel from "Your project" to the cause; the heart beats as each arrives. */
function CharityFlow() {
  return (
    <div className="w-full" aria-hidden>
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl border bg-background text-muted-foreground">
          <Briefcase className="size-5" />
        </span>
        <div className="relative h-7 flex-1">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-rose-300 dark:border-rose-400/50" />
          {[0, 0.8, 1.6].map((delay) => (
            <span key={delay} className="absolute inset-y-0 left-0 w-[calc(100%-1.75rem)] animate-flow" style={{ animationDelay: `${delay}s` }}>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md">
                2%
              </span>
            </span>
          ))}
        </div>
        <span className="relative grid size-11 shrink-0 place-items-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-rose-400/30" />
          <span className="relative grid size-11 animate-beat place-items-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/30">
            <Heart className="size-5 fill-current" />
          </span>
        </span>
      </div>
      <div className="mt-2 flex justify-between gap-3 text-xs font-semibold text-muted-foreground">
        <span>{g.flowFrom}</span>
        <span className="text-right">
          <Copy text={g.flowTo} />
        </span>
      </div>
    </div>
  );
}

const GRAPHIC: Record<Stat["visual"], (s: Stat) => React.ReactNode> = {
  ring: (s) => <Ring value={s.value} />,
  grid: () => <Grid />,
  timeline: () => <Timeline />,
  heart: () => <CharityFlow />,
};

/* ---------------- section ---------------- */

export function Results() {
  const { eyebrow, headline, body, cta, stats } = site.home.results;
  const { socialProof } = site.home.hero;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: "[data-tiles]", start: "top 80%", once: true };

        gsap.from("[data-reveal]", { y: 30, autoAlpha: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ref.current, start: "top 78%", once: true } });
        gsap.from("[data-tile]", { y: 40, autoAlpha: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, clearProps: "transform", scrollTrigger: trigger });

        gsap.utils.toArray<SVGCircleElement>("[data-ring]").forEach((ring) => {
          gsap.fromTo(ring, { strokeDashoffset: RING_C }, { strokeDashoffset: Number(ring.dataset.offset), duration: 1.8, ease: "power3.out", scrollTrigger: trigger });
        });
        gsap.from("[data-person]", { scale: 0, duration: 0.4, ease: "back.out(2.5)", stagger: 0.06, delay: 0.3, scrollTrigger: trigger });
        gsap.from("[data-cell]", { scale: 0, duration: 0.5, ease: "back.out(2)", stagger: { each: 0.015, from: "random" }, scrollTrigger: trigger });
        gsap.from("[data-line]", { scaleX: 0, duration: 1.4, ease: "power3.out", scrollTrigger: trigger });
        gsap.from("[data-milestone]", { scale: 0, duration: 0.4, ease: "back.out(3)", stagger: 0.3, delay: 0.4, scrollTrigger: trigger });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="results" aria-labelledby="results-title" className="relative py-14 sm:py-20">
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        {/* ---------- copy + proof ---------- */}
        <div className="flex flex-col">
          <p
            data-reveal
            className="inline-flex w-fit items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {eyebrow}
          </p>
          <h2
            id="results-title"
            data-reveal
            className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          >
            {headline}
          </h2>
          <p data-reveal className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {body}
          </p>

          {/* social proof card (same numbers as the Hero) */}
          <div data-reveal className="mt-8 flex items-center gap-4 rounded-3xl border bg-surface p-5 lg:mt-auto">
            <ul className="flex -space-x-2.5">
              {socialProof.avatars.map((avatar, i) => (
                <li
                  key={i}
                  className="relative size-10 overflow-hidden rounded-full bg-surface-2 ring-[3px] ring-surface"
                  style={{ zIndex: socialProof.avatars.length - i }}
                >
                  {avatar.src ? (
                    <Image src={avatar.src} alt={plain(avatar.alt)} fill sizes="40px" className="object-cover" />
                  ) : (
                    <span
                      className="grid size-full place-items-center text-muted-foreground"
                      style={{ background: `linear-gradient(140deg, oklch(0.85 0.07 ${110 + i * 45} / 0.55), transparent)` }}
                    >
                      <User className="size-4" aria-hidden />
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div>
              <div className="flex gap-0.5" role="img" aria-label={socialProof.ratingLabel}>
                {Array.from({ length: socialProof.rating }).map((_, i) => (
                  <Star key={i} aria-hidden className="size-4 fill-star text-star" />
                ))}
              </div>
              <p className="mt-1 text-sm font-medium">
                <Copy text={socialProof.text} />
              </p>
            </div>
          </div>

          <Link
            data-reveal
            href={href(cta.href)}
            className="group mt-4 inline-flex w-fit items-center gap-2 rounded-full text-sm font-semibold outline-none hover:text-lime-strong focus-visible:ring-2 focus-visible:ring-ring/60 dark:hover:text-lime"
          >
            {cta.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ---------- stat tiles ---------- */}
        <dl data-tiles className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat, i) => {
            const featured = i === 0;
            return (
              <div
                key={stat.label}
                data-tile
                className={cn(
                  "group relative flex flex-col gap-8 overflow-hidden rounded-3xl border p-6 transition-[translate,border-color] duration-500 ease-out-expo hover:-translate-y-1 sm:p-7",
                  featured
                    ? "border-lime bg-lime text-ink [&_.placeholder-mark]:bg-white/45 [&_.placeholder-mark]:text-ink"
                    : "bg-surface hover:border-lime/50",
                )}
              >
                {featured && (
                  <span aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-white/40 blur-3xl" />
                )}
                <div className="relative flex min-h-20 items-center">{GRAPHIC[stat.visual](stat)}</div>
                <div className="relative mt-auto">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(2.5rem,4.2vw,3.5rem)] leading-none font-bold tracking-[-0.045em]">
                      <StatValue value={stat.value} count={stat.count} />
                    </span>
                    <span className={cn("mt-2.5 block text-[15px] font-medium", featured ? "text-ink/70" : "text-muted-foreground")}>
                      {stat.label}
                    </span>
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

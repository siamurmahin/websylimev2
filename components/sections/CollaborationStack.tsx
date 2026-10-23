"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, MessageCircle, MousePointer2, Zap } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Copy, href } from "@/lib/copy";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const c = site.home.collaboration;
const v = c.visuals;
const panel = "w-full max-w-sm rounded-2xl border bg-background/80 p-4 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.35)] backdrop-blur";

/* ---------------- mini visuals, one per step ---------------- */

function Contact() {
  return (
    <div className={panel}>
      <div className="flex items-center gap-3">
        <span className="relative grid size-11 place-items-center rounded-full bg-lime text-ink">
          <MessageCircle className="size-5" aria-hidden />
          <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-emerald-500" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold">{v.contact.name}</span>
          <span className="block text-xs text-emerald-600 dark:text-emerald-400">{v.contact.status}</span>
        </span>
      </div>
      <p className="mt-4 rounded-2xl rounded-tl-md bg-muted px-3.5 py-2.5 text-sm leading-snug">{v.contact.message}</p>
    </div>
  );
}

function Update() {
  return (
    <div className={panel}>
      <p className="text-xs font-semibold text-muted-foreground">{v.update.title}</p>
      <ul className="mt-3 space-y-2.5">
        {v.update.items.map((item, i) => {
          const next = i === v.update.items.length - 1;
          return (
            <li key={item} className="flex items-center gap-2.5 text-sm font-medium">
              <span className={cn("grid size-5 place-items-center rounded-full", next ? "border border-dashed text-muted-foreground" : "bg-lime text-ink")}>
                {!next && <Check className="size-3" strokeWidth={3} aria-hidden />}
              </span>
              <span className={cn(next && "text-muted-foreground")}>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Revision() {
  return (
    <div className={panel}>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-muted-foreground">{v.revision.from}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-lime px-2 py-0.5 text-ink">
          <Check className="size-3" strokeWidth={3} aria-hidden />
          {v.revision.to}
        </span>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
        <div data-revision-bar className="h-full w-full origin-left rounded-full bg-lime" />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
        <Zap className="size-4 text-lime-strong dark:text-lime" aria-hidden />
        {v.revision.label}: <Copy text="[2] days" />
      </p>
    </div>
  );
}

function Approve() {
  return (
    <div className={cn(panel, "relative")}>
      <p className="text-sm font-bold">{v.approve.title}</p>
      <div className="mt-3 h-16 rounded-xl bg-[linear-gradient(135deg,var(--surface-2),var(--muted))]" />
      <div className="mt-3 flex gap-2">
        <span className="flex-1 rounded-full bg-lime py-2 text-center text-sm font-bold text-ink">{v.approve.approve}</span>
        <span className="flex-1 rounded-full border py-2 text-center text-sm font-semibold text-muted-foreground">{v.approve.change}</span>
      </div>
      <MousePointer2 aria-hidden className="absolute bottom-2 left-[30%] size-6 fill-foreground text-background drop-shadow" />
    </div>
  );
}

const VISUALS = [Contact, Update, Revision, Approve];

/* ---------------- section ---------------- */

/**
 * Seamless Collaboration as stacking cards: each step sticks near the top and
 * the next one slides over it, while the one underneath shrinks back.
 */
export function CollaborationStack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        const stickyTop = (el: HTMLElement) => parseFloat(getComputedStyle(el).top) || 0;

        cards.forEach((card, i) => {
          const inner = card.querySelector<HTMLElement>("[data-card-inner]")!;

          // Mockup drifts up into place as its card arrives (subtle parallax)
          gsap.fromTo(
            card.querySelector("[data-card-visual]"),
            { y: 36, scale: 0.97 },
            {
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: () => `top ${stickyTop(card)}px`, scrub: true },
            },
          );

          const nextCard = cards[i + 1];
          if (!nextCard) return;
          // Only recede while the next card is actually sliding over this one:
          // from the moment it touches this card's bottom edge until it sticks.
          // The card stays opaque; a light shade fades in so cards never show through.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: nextCard,
              start: () => `top ${stickyTop(card) + inner.offsetHeight}px`,
              end: () => `top ${stickyTop(nextCard)}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          tl.to(inner, { scale: 0.95, ease: "power1.in" }, 0).to(
            card.querySelector("[data-card-shade]"),
            { opacity: 0.35, ease: "power2.in" },
            0,
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-revision-bar]").forEach((bar) =>
          gsap.from(bar, { scaleX: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: bar, start: "top 75%" } }),
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="collaboration" aria-labelledby="collaboration-title" className="relative py-14 sm:py-20">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {c.eyebrow}
          </p>
          <h2
            id="collaboration-title"
            className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          >
            {c.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{c.body}</p>
        </div>

        <ol className="mx-auto mt-10 max-w-5xl sm:mt-14">
          {c.points.map((point, i) => {
            const Icon = icons[point.icon];
            const Visual = VISUALS[i] ?? Contact;
            return (
              <li
                key={point.title}
                data-card
                className="sticky mb-6 last:mb-0"
                style={{ top: `calc(var(--spacing-header-compact) + 2rem + ${i * 1.25}rem)` }}
              >
                <div
                  data-card-inner
                  className="relative grid grid-cols-1 origin-top items-center gap-8 overflow-hidden rounded-[2rem] border bg-surface p-6 shadow-[0_-12px_40px_-24px_rgb(0_0_0/0.25)] will-change-transform sm:p-10 md:grid-cols-2 md:gap-12 dark:shadow-[0_-12px_40px_-24px_rgb(0_0_0/0.8)]"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid size-12 place-items-center rounded-2xl bg-lime text-ink">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <span aria-hidden className="font-mono text-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} / {String(c.points.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[clamp(1.6rem,3vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-balance">
                      {point.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
                      <Copy text={point.body} />
                    </p>
                  </div>
                  <div
                    aria-hidden
                    data-card-visual
                    className="flex min-h-56 items-center justify-center rounded-3xl bg-[radial-gradient(100%_100%_at_50%_0%,color-mix(in_oklch,var(--lime)_22%,transparent),var(--surface-2))] p-6"
                  >
                    <Visual />
                  </div>
                  <div aria-hidden data-card-shade className="pointer-events-none absolute inset-0 z-10 bg-background opacity-0" />
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex justify-center">
          <Button asChild size="pill-lg" variant="outline" className="group rounded-full bg-surface/60">
            <Link href={href(c.cta.href)}>
              {c.cta.label}
              <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

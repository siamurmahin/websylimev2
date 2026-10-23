"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { portfolio } from "@/content/portfolio";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");
const initials = (name: string) =>
  name
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/**
 * Testimonials: numbered carousel (Embla) with arrows, drag/swipe and a
 * progress bar. Big quote cards; the active card is full strength, the rest
 * recede slightly.
 */
export function Testimonials() {
  const { eyebrow, headline, subheadline, prev, next } = site.home.testimonials;
  const { socialProof } = site.home.hero;
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  const total = testimonials.length;
  const arrow =
    "grid size-12 place-items-center rounded-full border bg-surface outline-none transition-colors hover:border-lime hover:bg-lime hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50";

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative overflow-hidden py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
          {/* ---------- heading + controls ---------- */}
          <div className="flex flex-col">
            <p
              data-reveal
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
              {eyebrow}
            </p>
            <h2
              id="testimonials-title"
              data-reveal
              className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
            >
              {headline}
            </h2>
            <p data-reveal className="mt-5 max-w-sm text-lg leading-relaxed text-muted-foreground">
              {subheadline}
            </p>

            <div data-reveal className="mt-6 flex items-center gap-3">
              <div className="flex gap-0.5" role="img" aria-label={socialProof.ratingLabel}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} aria-hidden className="size-5 fill-star text-star" />
                ))}
              </div>
              <span className="text-sm font-medium">
                <Copy text={socialProof.text} />
              </span>
            </div>

            {/* counter + arrows */}
            <div data-reveal className="mt-10 flex items-center gap-4 lg:mt-auto">
              <p className="font-mono text-sm" aria-live="polite">
                <span className="text-2xl font-bold text-foreground">{pad(selected + 1)}</span>
                <span className="text-muted-foreground"> / {pad(total)}</span>
              </p>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                <span
                  className="block h-full rounded-full bg-lime-strong transition-[width] duration-500 ease-out-expo dark:bg-lime"
                  style={{ width: `${((selected + 1) / total) * 100}%` }}
                />
              </div>
              <button type="button" onClick={() => embla?.scrollPrev()} aria-label={prev} className={arrow}>
                <ArrowLeft className="size-5" />
              </button>
              <button type="button" onClick={() => embla?.scrollNext()} aria-label={next} className={arrow}>
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          {/* ---------- carousel ---------- */}
          <div data-reveal className="min-w-0">
            <div ref={emblaRef} className="cursor-grab overflow-visible active:cursor-grabbing lg:-mr-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:overflow-hidden">
              <ul className="-ml-4 flex touch-pan-y">
                {testimonials.map((t, i) => {
                  const on = i === selected;
                  const project = t.projectSlug ? portfolio.find((p) => p.slug === t.projectSlug) : undefined;
                  return (
                    <li key={i} className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 sm:basis-[70%] lg:basis-[62%]" aria-roledescription="slide">
                      <figure
                        className={cn(
                          "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-7 transition-[opacity,border-color,background-color] duration-500 sm:p-9",
                          on ? "border-lime/50 bg-surface opacity-100" : "bg-surface/60 opacity-55",
                        )}
                      >
                        <span aria-hidden className="absolute -top-6 -right-4 font-display text-[9rem] leading-none font-bold text-foreground/[0.04]">
                          {pad(i + 1)}
                        </span>
                        <div className="relative flex items-start justify-between gap-4">
                          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lime text-ink">
                            <Quote className="size-5 fill-current" aria-hidden />
                          </span>
                          {/* the client's actual site, from the portfolio */}
                          {project && (
                            <span className="relative block aspect-[1170/630] w-32 overflow-hidden rounded-xl border shadow-sm sm:w-40">
                              <Image src={project.image} alt={`${project.name} website`} fill sizes="160px" className="object-cover" />
                            </span>
                          )}
                        </div>

                        <blockquote className="mt-6 flex-1 font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-semibold tracking-[-0.02em]">
                          <Copy text={t.quote} />
                        </blockquote>

                        <figcaption className="mt-8 flex items-center gap-4 border-t pt-6">
                          <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-surface-2">
                            {t.photo ? (
                              <Image src={t.photo} alt={t.name} fill sizes="48px" className="object-cover" />
                            ) : (
                              <span aria-hidden className="grid size-full place-items-center bg-lime-soft text-sm font-bold text-lime-strong">
                                {initials(t.name)}
                              </span>
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold">{t.name}</span>
                            <span className="block text-sm text-muted-foreground">
                              {[t.role, t.business].filter(Boolean).join(", ")}
                            </span>
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </StaggerReveal>
    </section>
  );
}

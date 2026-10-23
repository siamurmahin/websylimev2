import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, CalendarDays, Check } from "lucide-react";
import { FadeUp, SplitReveal } from "@/components/motion/SplitReveal";
import { Copy, href } from "@/lib/copy";

export type PhotoHeroData = {
  eyebrow: string;
  headline: string;
  /** Word(s) from the headline that get the lime marker */
  headlineAccent?: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  points?: string[];
  image: { src: string; alt: string };
};

/**
 * Inner-page hero: a full-width rounded photo panel with the headline over a
 * dark-to-clear gradient (left on desktop, bottom on phones), two CTAs and
 * short proof points. Used by Start Project and Book a Call.
 * Photo: keep people on the right half; ≥2400px wide, high quality (see CONTENT.md).
 */
export function PhotoHero({ data: h }: { data: PhotoHeroData }) {
  // "#section" links scroll down the page → arrow points down
  const PrimaryIcon = h.primaryCta.href.startsWith("#") ? ArrowDown : ArrowRight;

  return (
    <section aria-label={h.headline} className="pt-header">
      <div className="container-site pt-4 sm:pt-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink sm:rounded-[2.5rem]">
          <Image
            src={h.image.src}
            alt={h.image.alt}
            fill
            preload
            quality={90}
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-20 object-cover object-[72%_top] sm:object-center"
          />
          {/* legibility: bottom-up on phones, left-to-right from sm */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(11_13_9/0.92)_0%,rgb(11_13_9/0.7)_45%,rgb(11_13_9/0.15)_100%)] sm:bg-[linear-gradient(to_right,rgb(11_13_9/0.88)_0%,rgb(11_13_9/0.6)_42%,rgb(11_13_9/0)_75%)]"
          />

          <div className="flex min-h-[42rem] flex-col justify-end px-6 pt-64 pb-8 text-white sm:min-h-[34rem] sm:justify-center sm:px-12 sm:py-16 lg:min-h-[38rem] lg:px-16">
            <FadeUp>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white/85 backdrop-blur">
                <span aria-hidden className="size-1.5 rounded-full bg-lime" />
                {h.eyebrow}
              </p>
            </FadeUp>
            <SplitReveal
              text={h.headline}
              accent={h.headlineAccent}
              delay={0.1}
              className="mt-5 max-w-[13ch] font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.045em]"
            />
            <FadeUp delay={0.4}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
                <Copy text={h.subheadline} />
              </p>
            </FadeUp>

            <FadeUp delay={0.5} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={href(h.primaryCta.href)}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink shadow-[0_14px_30px_-14px_var(--lime)] outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
              >
                {h.primaryCta.label}
                <PrimaryIcon
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Link>
              {h.secondaryCta && (
                <Link
                  href={href(h.secondaryCta.href)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur outline-none transition-colors hover:border-lime hover:text-lime focus-visible:ring-3 focus-visible:ring-lime/50"
                >
                  <CalendarDays className="size-4" aria-hidden />
                  {h.secondaryCta.label}
                </Link>
              )}
            </FadeUp>

            {h.points && (
              <FadeUp delay={0.6}>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
                  {h.points.map((pt) => (
                    <li key={pt} className="inline-flex items-center gap-2">
                      <span className="grid size-4 place-items-center rounded-full bg-lime text-ink">
                        <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
                      </span>
                      <Copy text={pt} />
                    </li>
                  ))}
                </ul>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

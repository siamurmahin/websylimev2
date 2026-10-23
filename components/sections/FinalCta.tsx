import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { portfolio } from "@/content/portfolio";
import { Magnetic } from "@/components/motion/Magnetic";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Copy, href } from "@/lib/copy";
import { cn } from "@/lib/utils";

const c = site.home.finalCta;

// Class names must be written out in full so Tailwind keeps their keyframes
const COLUMNS = [
  { anim: "animate-column-up", duration: "60s", offset: 0, className: "" },
  { anim: "animate-column-down", duration: "70s", offset: 6, className: "" },
  { anim: "animate-column-up", duration: "65s", offset: 12, className: "hidden sm:block" },
];

/**
 * Final CTA: one dark panel. Copy and both buttons on the left; on the right,
 * tilted columns of real client sites drift up and down behind a soft fade.
 */
export function FinalCta() {
  return (
    <section id="get-started" aria-labelledby="final-cta-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[2.25rem] bg-ink text-white lg:grid lg:min-h-[34rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] dark:border dark:border-white/10 dark:bg-surface"
        >
          {/* glow + grid */}
          <div aria-hidden className="absolute -top-40 -left-32 -z-10 size-[32rem] rounded-full bg-lime/20 blur-[120px] dark:bg-lime/10" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [mask-image:radial-gradient(70%_80%_at_20%_40%,black,transparent_75%)] bg-[size:56px_56px]"
          />

          {/* ---------- copy ---------- */}
          <div className="relative z-10 flex flex-col justify-center px-6 pt-12 pb-10 sm:px-12 sm:pt-16 lg:py-20 lg:pr-4 lg:pl-16">
            <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/15 bg-white/5 py-1.5 pr-3.5 pl-3 text-sm font-medium text-white/80 backdrop-blur">
              <span aria-hidden className="relative grid size-2 place-items-center">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime" />
                <span className="relative size-2 rounded-full bg-lime" />
              </span>
              <span>
                <Copy text={c.badge} />
              </span>
            </p>

            <h2
              id="final-cta-title"
              className="mt-6 max-w-[14ch] font-display text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance"
            >
              {c.headline}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">{c.subheadline}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href={href(c.primaryCta.href)}
                  className="group inline-flex h-14 items-center gap-2 rounded-full bg-lime px-7 text-base font-semibold text-ink shadow-[0_20px_50px_-20px_var(--lime)] outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
                >
                  {c.primaryCta.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Link
                href={href(c.secondaryCta.href)}
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 px-6 text-base font-semibold text-white outline-none transition-colors hover:border-lime hover:text-lime focus-visible:ring-3 focus-visible:ring-lime/50"
              >
                <CalendarDays className="size-4" aria-hidden />
                {c.secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* ---------- drifting work ---------- */}
          <div
            aria-hidden
            className="relative h-72 overflow-hidden sm:h-80 lg:h-auto [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] lg:[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent),linear-gradient(to_right,transparent,black_25%)] lg:[mask-composite:intersect]"
          >
            <div className="absolute inset-0 flex justify-center gap-4 px-6 lg:-top-24 lg:-right-10 lg:-bottom-24 lg:left-0 lg:rotate-[8deg] lg:px-0">
              {COLUMNS.map((col, i) => {
                const items = Array.from({ length: 6 }, (_, k) => portfolio[(col.offset + k) % portfolio.length]);
                return (
                  <div key={i} className={cn("w-1/2 min-w-0 sm:w-1/3", col.className)}>
                    <div className={cn("flex flex-col gap-4 motion-reduce:animate-none", col.anim)} style={{ ["--column-duration" as string]: col.duration }}>
                      {[...items, ...items].map((p, k) => (
                        <div key={`${p.slug}-${k}`} className="relative aspect-[1170/630] overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]">
                          <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw" className="object-cover object-top" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </StaggerReveal>
    </section>
  );
}

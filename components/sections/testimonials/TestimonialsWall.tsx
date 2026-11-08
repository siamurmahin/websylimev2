import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { portfolio, FOCUS_CATEGORY } from "@/content/portfolio";
import { Avatar, TestimonialsHeading, byline } from "@/components/sections/testimonials/shared";
import { cn } from "@/lib/utils";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="rounded-3xl border bg-surface p-6 shadow-[0_14px_40px_-30px_rgb(0_0_0/0.35)] transition-colors duration-300 hover:border-lime/50">
      <Quote aria-hidden className="size-5 fill-lime text-lime" />
      <blockquote className="mt-3 text-[15px] leading-relaxed">{t.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Avatar t={t} />
        <span className="min-w-0">
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{byline(t)}</span>
        </span>
      </figcaption>
    </figure>
  );
}

// Class names must be written out in full so Tailwind keeps their keyframes
const COLUMNS = [
  { anim: "animate-column-up", duration: "90s", className: "" },
  { anim: "animate-column-down", duration: "110s", className: "hidden md:block" },
  { anim: "animate-column-up", duration: "100s", className: "hidden lg:block" },
];

/** How many quotes the wall shows. Each is drawn twice for the endless loop, so this keeps the page light on phones. */
const SHOWN = 18;
const homeServices = new Set(portfolio.filter((p) => p.category === FOCUS_CATEGORY).map((p) => p.slug));
const picked = [...testimonials]
  .sort((a, b) => Number(homeServices.has(b.projectSlug ?? "")) - Number(homeServices.has(a.projectSlug ?? "")))
  .slice(0, SHOWN);

/**
 * Testimonials — wall of love. 18 quotes (home services first) in three endless
 * columns drifting up and down (two on tablet, one on phones), faded at the top
 * and bottom. Hover a column to pause it and read. Reduced motion: columns stand still.
 */
export function TestimonialsWall() {
  const columns = COLUMNS.map((_, c) => picked.filter((_, i) => i % COLUMNS.length === c));

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative py-14 sm:py-20">
      <div className="container-site">
        <TestimonialsHeading center id="testimonials-title" />

        <div
          aria-label="Client testimonials"
          className="relative mt-12 grid h-[38rem] grid-cols-1 gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] sm:mt-16 md:grid-cols-2 lg:h-[44rem] lg:grid-cols-3"
        >
          {columns.map((col, c) => (
            <div key={c} className={cn("group/col", COLUMNS[c].className)}>
              <div
                className={cn("flex flex-col gap-5 group-hover/col:[animation-play-state:paused]", COLUMNS[c].anim)}
                style={{ "--column-duration": COLUMNS[c].duration } as React.CSSProperties}
              >
                {[...col, ...col].map((t, i) => (
                  <div key={i} aria-hidden={i >= col.length || undefined}>
                    <Card t={t} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

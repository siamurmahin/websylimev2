import Image from "next/image";
import { Star } from "lucide-react";
import { site } from "@/content/site";
import type { Testimonial } from "@/content/testimonials";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export const initials = (name: string) =>
  name
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const byline = (t: Testimonial) => [t.role, t.business].filter(Boolean).join(", ");

export function Avatar({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <span className={cn("relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-lime-soft", className)}>
      {t.photo ? (
        <Image src={t.photo} alt={t.name} fill sizes="48px" className="object-cover" />
      ) : (
        <span aria-hidden className="text-sm font-bold text-lime-strong">
          {initials(t.name)}
        </span>
      )}
    </span>
  );
}

/** Shared heading for every Testimonials design option. */
export function TestimonialsHeading({ center = false, id }: { center?: boolean; id: string }) {
  const { eyebrow, headline, subheadline } = site.home.testimonials;
  const { socialProof } = site.home.hero;
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
        <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
        {headline}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{subheadline}</p>
      <div className={cn("mt-5 flex items-center gap-3", center && "justify-center")}>
        <div className="flex gap-0.5" role="img" aria-label={socialProof.ratingLabel}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} aria-hidden className="size-5 fill-star text-star" />
          ))}
        </div>
        <span className="text-sm font-medium">
          <Copy text={socialProof.text} />
        </span>
      </div>
    </div>
  );
}

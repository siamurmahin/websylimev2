import { Check } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

export function PainPoints() {
  const { eyebrow, headline, fixLabel, cards } = site.home.painPoints;

  return (
    <section id="pain-points" aria-labelledby="pain-points-title" className="relative pt-24 pb-12 sm:py-32">
      <StaggerReveal className="container-site">
        {/* ---------- heading ---------- */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {eyebrow}
          </p>
          <h2
            id="pain-points-title"
            data-reveal
            className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          >
            {headline}
          </h2>
        </div>

        {/* ---------- cards ---------- */}
        <ul className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <li
                key={card.title}
                data-reveal
                // Tailwind v4 moves cards with the `translate` property, so that's what
                // gets transitioned (listing `transform` here made the hover snap)
                className="group relative flex flex-col overflow-hidden rounded-3xl border bg-surface p-6 transition-[translate,border-color,box-shadow] duration-700 ease-out-expo will-change-[translate] hover:-translate-y-1.5 hover:border-lime/50 hover:shadow-[0_28px_60px_-32px_rgb(0_0_0/0.28)] sm:p-7 dark:hover:shadow-[0_28px_60px_-32px_rgb(0_0_0/0.85)]"
              >
                {/* soft lime wash on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-lime/25 opacity-0 blur-3xl transition-opacity duration-700 ease-out-expo group-hover:opacity-100"
                />

                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl border bg-surface-2 text-muted-foreground transition-colors duration-500 ease-out-expo group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                    <Icon className="size-5 transition-transform duration-500 ease-out-expo group-hover:scale-110" aria-hidden />
                  </span>
                  <span aria-hidden className="font-mono text-xs text-muted-foreground/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl leading-snug font-bold tracking-[-0.02em] text-balance sm:mt-8 sm:text-[1.35rem]">
                  {card.title}
                </h3>
                <p className="mt-2.5 mb-6 text-[15px] leading-relaxed text-muted-foreground">{card.body}</p>

                {/* problem → our answer */}
                <p className="mt-auto flex items-start gap-2.5 border-t border-dashed pt-4 text-sm font-medium text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                  <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-lime-soft text-lime-strong transition-colors duration-500 group-hover:bg-lime group-hover:text-ink">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span>
                    <span className="sr-only">{fixLabel}: </span>
                    {card.fix}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </StaggerReveal>
    </section>
  );
}

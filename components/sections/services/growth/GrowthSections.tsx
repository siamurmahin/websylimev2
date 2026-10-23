import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

const g = site.services.growth;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
      <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
      {children}
    </p>
  );
}

/** "Done for you, every month": the 8 things the plans cover, as an icon grid. */
export function GrowthHandled() {
  const h = g.handled;
  return (
    <section aria-labelledby="gr-handled-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h2 id="gr-handled-title" className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
            {h.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{h.subheadline}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {h.items.map((it) => {
            const Icon = icons[it.icon];
            return (
              <li
                key={it.title}
                data-reveal
                className="group relative rounded-[1.5rem] border bg-surface p-6 transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-lime-soft text-lime-strong transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                  <Icon className="size-5" aria-hidden />
                </span>
                {"plan" in it && it.plan && (
                  <span className="absolute top-6 right-6 rounded-full border px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                    {it.plan}
                  </span>
                )}
                <h3 className="mt-5 font-display text-lg font-bold tracking-[-0.02em]">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </li>
            );
          })}
        </ul>
      </StaggerReveal>
    </section>
  );
}

/** Slim banner: plans work on an existing site; no site → Website Design. */
export function GrowthNeedSite() {
  const n = g.needSite;
  return (
    <section aria-label={n.title} className="container-site">
      <div className="flex flex-col gap-5 rounded-[1.75rem] border bg-lime-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-lime/[0.06]">
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime text-ink">
            <Info className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{n.title}</h2>
            <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{n.body}</p>
          </div>
        </div>
        <Link
          href={n.cta.href}
          className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border bg-background px-5 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50 sm:self-auto"
        >
          {n.cta.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

/** "Your month, handled": three numbered steps on a dark panel. */
export function GrowthHowItWorks() {
  const h = g.howItWorks;
  return (
    <section aria-labelledby="gr-how-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-12 dark:border dark:border-white/10 dark:bg-surface">
          <div data-reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white/70">
              <span aria-hidden className="size-1.5 rounded-full bg-lime" />
              {h.eyebrow}
            </p>
            <h2 id="gr-how-title" className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">
              {h.headline}
            </h2>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {h.steps.map((s, i) => (
              <li key={s.title} data-reveal className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                <span className="grid size-10 place-items-center rounded-full bg-lime font-mono text-sm font-bold text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </StaggerReveal>
    </section>
  );
}

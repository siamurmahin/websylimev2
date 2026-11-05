import Image from "next/image";
import { Quote } from "lucide-react";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { icons } from "@/components/icons";
import { FadeUp } from "@/components/motion/SplitReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Avatar, byline } from "@/components/sections/testimonials/shared";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const a = site.about;

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold",
        dark ? "border-white/15 bg-white/5 text-white/70" : "bg-surface/70 text-muted-foreground",
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", dark ? "bg-lime" : "bg-lime-strong dark:bg-lime")} />
      {children}
    </p>
  );
}

const h2 = "mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance";

/** Band under the photo hero: four headline numbers. */
export function AboutStats() {
  const h = a.hero;
  return (
    <section aria-label={h.eyebrow} className="pt-10 sm:pt-14">
      <FadeUp className="container-site">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {h.stats.map((s) => (
            <li key={s.label} className="rounded-[1.5rem] border bg-surface p-5 sm:p-6">
              <span className="inline-block rounded-xl bg-lime px-2.5 py-0.5 font-display text-3xl font-bold tracking-[-0.04em] whitespace-nowrap text-ink sm:text-5xl">{s.value}</span>
              <span className="mt-3 block text-sm leading-snug text-muted-foreground">{s.label}</span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}

/** Why we started: heading left, a few short paragraphs right. */
export function AboutStory() {
  const s = a.story;
  return (
    <section aria-labelledby="ab-story-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div data-reveal>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 id="ab-story-title" className={h2}>
            {s.headline}
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:pt-14">
          {s.paragraphs.map((p, i) => (
            <p key={i} data-reveal className={i === 0 ? "text-xl text-foreground" : undefined}>
              <Copy text={p} />
            </p>
          ))}
          <p data-reveal className="pt-2 text-[15px]">
            <span className="font-semibold text-foreground">{s.signature.name}</span> · {s.signature.role}
          </p>
        </div>
      </StaggerReveal>
    </section>
  );
}

/** Timeline (anchor #story for the header's "Our Story" link). */
export function AboutTimeline() {
  const t = a.timeline;
  return (
    <section id="story" aria-labelledby="ab-time-title" className="scroll-mt-20 py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-12 dark:border dark:border-white/10 dark:bg-surface">
          <div data-reveal>
            <Eyebrow dark>{t.eyebrow}</Eyebrow>
            <h2 id="ab-time-title" className={h2}>
              {t.headline}
            </h2>
          </div>

          <ol className="relative mt-12 grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-5">
            {/* the line: vertical on phones/tablets, horizontal on desktop */}
            <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-white/15 lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
            {t.items.map((it, i) => {
              const last = i === t.items.length - 1;
              return (
                <li key={i} data-reveal className="relative pl-9 lg:pt-10 lg:pl-0">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1 left-0 size-[15px] rounded-full border-2 lg:top-0",
                      last ? "border-lime bg-lime shadow-[0_0_0_5px_rgb(198_242_78/0.2)]" : "border-white/40 bg-ink dark:bg-surface",
                    )}
                  />
                  <span className={cn("font-mono text-sm font-bold", last ? "text-lime" : "text-white/60")}>
                    <Copy text={it.year} />
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.02em]">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{it.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </StaggerReveal>
    </section>
  );
}

/** How we work: four short promises. */
export function AboutValues() {
  const v = a.values;
  return (
    <section aria-labelledby="ab-values-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{v.eyebrow}</Eyebrow>
          <h2 id="ab-values-title" className={h2}>
            {v.headline}
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {v.items.map((it) => {
            const Icon = icons[it.icon];
            return (
              <li key={it.title} data-reveal className="group rounded-[1.5rem] border bg-surface p-6 transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60">
                <span className="grid size-11 place-items-center rounded-xl bg-lime-soft text-lime-strong transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                  <Icon className="size-5" aria-hidden />
                </span>
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

/** A member's photo, or their initials until one is added. */
function TeamMark({ name, photo, className, textClass }: { name: string; photo: string | null; className: string; textClass: string }) {
  const words = name.split(/\s+/);
  const initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
  return (
    <span aria-hidden={!photo} className={cn("relative grid shrink-0 place-items-center overflow-hidden", className)}>
      {photo ? (
        <Image src={photo} alt={name} fill sizes="96px" quality={90} className="object-cover" />
      ) : (
        <span className={cn("font-display font-bold tracking-[-0.03em]", textClass)}>{initials}</span>
      )}
    </span>
  );
}

/** Team: founders on two large dark cards, everyone else on a grid. Works with or without photos. */
export function AboutTeam() {
  const t = a.team;
  const founders = t.members.filter((m) => m.founder);
  const others = t.members.filter((m) => !m.founder);
  return (
    <section aria-labelledby="ab-team-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="ab-team-title" className={h2}>
            {t.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.subheadline}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {founders.map((m) => (
            <li key={m.name} data-reveal className="flex items-center gap-5 rounded-[1.5rem] bg-ink p-6 text-white sm:gap-6 sm:p-8 dark:border dark:border-white/10 dark:bg-surface">
              <TeamMark name={m.name} photo={m.photo} className="size-20 rounded-2xl bg-lime sm:size-24" textClass="text-3xl text-ink sm:text-4xl" />
              <div className="min-w-0">
                <p className="font-display text-xl font-bold tracking-[-0.02em] sm:text-2xl">{m.name}</p>
                <p className="mt-1 text-[15px] text-white/65">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((m) => (
            <li
              key={m.name}
              data-reveal
              className="group flex items-center gap-4 rounded-[1.5rem] border bg-surface p-5 transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60"
            >
              <TeamMark
                name={m.name}
                photo={m.photo}
                className="size-14 rounded-xl bg-lime-soft transition-colors duration-300 group-hover:bg-lime"
                textClass="text-lg text-lime-strong transition-colors duration-300 group-hover:text-ink dark:text-lime"
              />
              <div className="min-w-0">
                <p className="font-display text-lg leading-snug font-bold tracking-[-0.02em]">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </StaggerReveal>
    </section>
  );
}

/** Three real client quotes. */
export function AboutQuotes() {
  const q = a.quotes;
  const picked = q.names.map((n) => testimonials.find((t) => t.name === n)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  return (
    <section aria-label={q.eyebrow} className="pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div data-reveal>
          <Eyebrow>{q.eyebrow}</Eyebrow>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {picked.map((t) => (
            <li key={t.name} data-reveal className="flex flex-col rounded-[1.5rem] border bg-surface p-6">
              <Quote className="size-5 text-lime-strong dark:text-lime" aria-hidden />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed">{t.quote}</blockquote>
              <div className="mt-5 flex items-center gap-3">
                <Avatar t={t} className="size-10" />
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{byline(t)}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </StaggerReveal>
    </section>
  );
}

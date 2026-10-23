import Link from "next/link";
import { ArrowRight, Check, Clapperboard } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { WaitlistForm } from "@/components/sections/services/video/WaitlistForm";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const v = site.services.videoEditing;

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
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

const h2Cls = "mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance";

/** "What we'll edit": four kinds of video. */
export function VideoWhat() {
  const w = v.what;
  return (
    <section aria-labelledby="ve-what-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{w.eyebrow}</Eyebrow>
          <h2 id="ve-what-title" className={h2Cls}>
            {w.headline}
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {w.items.map((it) => {
            const Icon = icons[it.icon];
            return (
              <li
                key={it.title}
                data-reveal
                className="group rounded-[1.5rem] border bg-surface p-6 transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60"
              >
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

/** Waitlist: dark panel with perks on the left, the email form on the right. */
export function VideoWaitlist() {
  const w = v.waitlist;
  return (
    <section id="waitlist" aria-labelledby="ve-waitlist-title" className="scroll-mt-16 pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div className="grid grid-cols-1 gap-10 rounded-[2rem] bg-ink p-7 text-white sm:p-12 lg:grid-cols-2 lg:gap-14 dark:border dark:border-white/10 dark:bg-surface">
          <div data-reveal>
            <Eyebrow dark>{w.eyebrow}</Eyebrow>
            <h2 id="ve-waitlist-title" className={cn(h2Cls, "text-[clamp(2.25rem,5vw,3.75rem)]")}>
              {w.headline}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">{w.subheadline}</p>
            <ul className="mt-8 space-y-3 text-[15px]">
              {w.perks.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                    <Check className="size-3" strokeWidth={3.5} aria-hidden />
                  </span>
                  <Copy text={p} />
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="self-center rounded-[1.5rem] bg-surface p-6 text-foreground sm:p-8 dark:bg-background">
            <WaitlistForm />
          </div>
        </div>
      </StaggerReveal>
    </section>
  );
}

/** Slim banner: video is already part of the Market Leader Growth plan. */
export function VideoNow() {
  const n = v.now;
  return (
    <section aria-label={n.title} className="container-site pb-14 sm:pb-20">
      <div className="flex flex-col gap-5 rounded-[1.75rem] border bg-lime-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-lime/[0.06]">
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime text-ink">
            <Clapperboard className="size-5" aria-hidden />
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

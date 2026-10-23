import Link from "next/link";
import { ArrowDown, ArrowRight, BriefcaseBusiness, Check, Clock, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { ApplyForm } from "@/components/careers/ApplyForm";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const c = site.careers;

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

/** "How we work": four value cards. */
export function CareersHow() {
  const h = c.how;
  return (
    <section aria-labelledby="cr-how-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h2 id="cr-how-title" className={h2Cls}>
            {h.headline}
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {h.items.map((it) => {
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

/** "What you get": perks on a dark panel. */
export function CareersPerks() {
  const p = c.perks;
  return (
    <section aria-labelledby="cr-perks-title" className="pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div className="grid grid-cols-1 gap-10 rounded-[2rem] bg-ink p-7 text-white sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center dark:border dark:border-white/10 dark:bg-surface">
          <div data-reveal>
            <Eyebrow dark>{p.eyebrow}</Eyebrow>
            <h2 id="cr-perks-title" className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">
              {p.headline}
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {p.items.map((it) => (
              <li key={it} data-reveal className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[15px]">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-3.5" strokeWidth={3.5} aria-hidden />
                </span>
                <Copy text={it} />
              </li>
            ))}
          </ul>
        </div>
      </StaggerReveal>
    </section>
  );
}

/** Open roles (#roles), or a friendly "no roles right now" card. */
export function CareersRoles() {
  const r = c.roles;
  return (
    <section id="roles" aria-labelledby="cr-roles-title" className="scroll-mt-16 pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{r.eyebrow}</Eyebrow>
          <h2 id="cr-roles-title" className={h2Cls}>
            {r.headline}
          </h2>
        </div>

        {r.items.length === 0 ? (
          <div data-reveal className="mt-10 flex flex-col items-start gap-5 rounded-[1.75rem] border bg-surface p-7 sm:flex-row sm:items-center sm:p-8">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lime-soft text-lime-strong">
              <BriefcaseBusiness className="size-6" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="font-display text-xl font-bold tracking-[-0.02em]">{r.empty.title}</p>
              <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{r.empty.body}</p>
            </div>
            <Link
              href={r.empty.cta.href}
              className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
            >
              {r.empty.cta.label}
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
            {r.items.map((role) => (
              <li key={role.id} id={role.id} data-reveal className="scroll-mt-28 rounded-[1.75rem] border bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-lime-strong uppercase dark:text-lime">{role.team}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-[-0.03em]">{role.title}</h3>
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" aria-hidden />
                        {role.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden />
                        {role.location}
                      </span>
                    </p>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{role.summary}</p>
                    <ul className="mt-4 space-y-2 text-[15px]">
                      {role.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5">
                          <Check className="size-4 shrink-0 text-lime-strong dark:text-lime" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="#apply"
                    className="group inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
                  >
                    {r.apply}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </StaggerReveal>
    </section>
  );
}

/** Application form (#apply): copy on the left, form on the right. */
export function CareersApply() {
  const f = c.form;
  return (
    <section id="apply" aria-labelledby="cr-apply-title" className="scroll-mt-16 pb-14 sm:pb-20">
      <StaggerReveal className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div data-reveal>
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <h2 id="cr-apply-title" className={h2Cls}>
            {f.headline}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">{f.subheadline}</p>
        </div>
        <div data-reveal>
          <ApplyForm />
        </div>
      </StaggerReveal>
    </section>
  );
}

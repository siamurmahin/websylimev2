import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, GraduationCap, HeartHandshake, Shirt, Sprout } from "lucide-react";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { record, upcoming } from "@/content/pages/gives";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { FadeUp } from "@/components/motion/SplitReveal";

const g = site.gives;
const icons = { school: GraduationCap, grow: Sprout, clothes: Shirt };

export const metadata: Metadata = {
  title: g.meta.title,
  description: g.meta.description,
  alternates: { canonical: "/gives" },
  openGraph: { url: "/gives", title: `${g.meta.title} · ${site.brand.name}`, description: g.meta.description },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
      <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
      {children}
    </p>
  );
}

const h2 = "mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance";
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const longDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Websy Lime Gives: where the 2% goes, how it works, and a dated record of every donation. */
export default function GivesPage() {
  const r = g.recordSection;
  const entries = [...record].sort((a, b) => b.date.localeCompare(a.date));
  const total = entries.reduce((sum, e) => sum + e.amountUsd, 0);

  return (
    <main id="main" className="relative isolate overflow-hidden">
      <JsonLd data={breadcrumbSchema([{ name: "Gives", path: "/gives" }])} />
      <PhotoHero data={g.hero} />

      <section aria-labelledby="gv-goals" className="container-site pt-16 sm:pt-24">
        <FadeUp>
          <Eyebrow>{g.goals.eyebrow}</Eyebrow>
          <h2 id="gv-goals" className={h2}>{g.goals.headline}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{g.goals.subheadline}</p>
        </FadeUp>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {g.goals.items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <li key={item.title}>
                <FadeUp delay={i * 0.06} className="h-full rounded-3xl border bg-surface p-6">
                  <span className="grid size-11 place-items-center rounded-2xl bg-lime text-ink">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="gv-funding" className="container-site pt-16 sm:pt-24">
        <FadeUp>
          <Eyebrow>{g.funding.eyebrow}</Eyebrow>
          <h2 id="gv-funding" className={h2}>{g.funding.headline}</h2>
        </FadeUp>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {g.funding.items.map((item, i) => (
            <li key={item.title}>
              <FadeUp delay={i * 0.06} className="h-full rounded-3xl border bg-surface p-6">
                <span aria-hidden className="block h-1 w-8 rounded-full bg-lime" />
                <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
              </FadeUp>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">{g.funding.note}</p>
      </section>

      <section id="record" aria-labelledby="gv-record" className="container-site scroll-mt-24 pt-16 sm:pt-24">
        <FadeUp>
          <Eyebrow>{r.eyebrow}</Eyebrow>
          <h2 id="gv-record" className={h2}>{r.headline}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{r.subheadline}</p>
        </FadeUp>

        {upcoming.length > 0 && (
          <FadeUp className="mt-10 rounded-[2rem] border bg-surface p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{r.upcomingTitle}</h3>
            <ul className="mt-4 divide-y">
              {upcoming.map((u) => (
                <li key={u.title} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-4">
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold sm:w-40">
                    <CalendarDays className="size-4 text-lime-strong dark:text-lime" aria-hidden />
                    {u.when}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">{u.title}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        )}

        {entries.length === 0 ? (
          <FadeUp className="mt-10 rounded-[2rem] border border-dashed bg-surface/60 p-8 text-center sm:p-12">
            <HeartHandshake className="mx-auto size-8 text-muted-foreground" aria-hidden />
            <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.03em]">{r.empty.title}</h3>
            <p className="mx-auto mt-2 max-w-md leading-relaxed text-muted-foreground">{r.empty.body}</p>
          </FadeUp>
        ) : (
          <>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-y py-8">
              <div>
                <dt className="text-[15px] text-muted-foreground">{r.totalLabel}</dt>
                <dd className="mt-1 font-display text-5xl font-bold tracking-[-0.045em]">{money(total)}</dd>
              </div>
              <div>
                <dt className="text-[15px] text-muted-foreground">{r.countLabel}</dt>
                <dd className="mt-1 font-display text-5xl font-bold tracking-[-0.045em]">{entries.length}</dd>
              </div>
            </dl>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((e) => (
                <li key={`${e.date}-${e.title}`} className="overflow-hidden rounded-3xl border bg-surface">
                  {e.proof && (
                    <div className="relative aspect-[4/3] bg-muted">
                      <Image src={e.proof.src} alt={e.proof.alt} fill quality={90} sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">
                      <time dateTime={e.date}>{longDate(e.date)}</time> · {e.where}
                    </p>
                    <div className="mt-2 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{e.title}</h3>
                      <span className="font-display text-xl font-bold">{money(e.amountUsd)}</span>
                    </div>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{e.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section aria-labelledby="gv-cta" className="container-site pt-16 pb-20 sm:pt-24">
        <FadeUp className="flex flex-col gap-6 rounded-[2rem] bg-ink p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="gv-cta" className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight font-bold tracking-[-0.03em] text-balance">{g.cta.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/70">{g.cta.body}</p>
          </div>
          <Link href={g.cta.href} className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50 lg:self-center">
            {g.cta.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}

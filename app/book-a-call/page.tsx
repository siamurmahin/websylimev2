import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { CalEmbed } from "@/components/book-a-call/CalEmbed";
import { FadeUp } from "@/components/motion/SplitReveal";
import { Copy } from "@/lib/copy";

const b = site.bookACall;

export const metadata: Metadata = {
  title: b.meta.title,
  description: b.meta.description,
  alternates: { canonical: "/book-a-call" },
  openGraph: { url: "/book-a-call", title: `${b.meta.title} · ${site.brand.name}`, description: b.meta.description },
};

/**
 * Book a Call. Section 1: photo hero. Section 2: what to expect + agenda on
 * the left, the Cal.com calendar on the right. Every "Book a call" button on
 * the site points here.
 */
export default function BookACallPage() {
  return (
    <main id="main" className="relative isolate overflow-hidden">
      <PhotoHero data={b.hero} />

      <section
        id="calendar"
        aria-labelledby="bc-title"
        className="container-site grid scroll-mt-24 grid-cols-1 gap-10 pt-14 pb-20 sm:pt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 lg:pt-24"
      >
        {/* ---------- what to expect ---------- */}
        <FadeUp>
          <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {b.eyebrow}
          </p>
          <h2 id="bc-title" className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
            {b.headline}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{b.subheadline}</p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {b.expect.map((e) => {
              const Icon = icons[e.icon];
              return (
                <li key={e.title} className="flex items-start gap-3.5 rounded-2xl border bg-surface p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime-soft text-lime-strong">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold">
                      <Copy text={e.title} />
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{e.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <h3 className="mt-8 text-sm font-semibold">{b.agendaTitle}</h3>
          <ul className="mt-3 space-y-2.5 text-[15px]">
            {b.agenda.map((a) => (
              <li key={a} className="flex items-center gap-2.5">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-3" strokeWidth={3.5} aria-hidden />
                </span>
                {a}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            {b.writeInstead.text}{" "}
            <Link
              href={b.writeInstead.href}
              className="group inline-flex items-center gap-1 rounded-sm font-semibold text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              {b.writeInstead.label}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </p>
        </FadeUp>

        {/* ---------- calendar ---------- */}
        <FadeUp delay={0.1}>
          <div className="rounded-[2rem] border bg-surface p-3 shadow-[0_30px_70px_-45px_rgb(0_0_0/0.35)] sm:p-4 dark:shadow-none">
            <CalEmbed />
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

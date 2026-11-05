import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { FreeDesignForm } from "@/components/free-design/FreeDesignForm";
import { FadeUp } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

const p = site.freeDesign;

export const metadata: Metadata = {
  title: p.meta.title,
  description: p.meta.description,
  alternates: { canonical: "/free-website-design" },
  openGraph: { url: "/free-website-design", title: `${p.meta.title} · ${site.brand.name}`, description: p.meta.description },
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

/** Free design offer: who it's for, how it works, what's free, questions, application form. */
export default function FreeWebsiteDesignPage() {
  return (
    <main id="main" className="relative isolate overflow-hidden">
      <PhotoHero data={p.hero} />

      <section aria-labelledby="fd-who" className="container-site pt-16 sm:pt-24">
        <FadeUp>
          <Eyebrow>{p.who.eyebrow}</Eyebrow>
          <h2 id="fd-who" className={h2}>{p.who.headline}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{p.who.subheadline}</p>
        </FadeUp>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {p.who.items.map((item, i) => (
            <li key={item.title}>
              <FadeUp delay={i * 0.06} className="h-full rounded-3xl border bg-surface p-6">
                <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
              </FadeUp>
            </li>
          ))}
        </ul>
      </section>

      <section id="how" aria-labelledby="fd-how" className="container-site scroll-mt-24 pt-16 sm:pt-24">
        <FadeUp>
          <Eyebrow>{p.how.eyebrow}</Eyebrow>
          <h2 id="fd-how" className={h2}>{p.how.headline}</h2>
        </FadeUp>
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {p.how.steps.map((step, i) => (
            <li key={step.title}>
              <FadeUp delay={i * 0.06} className="h-full rounded-3xl border bg-surface p-6">
                <span className="grid size-10 place-items-center rounded-full bg-lime font-display font-bold text-ink">{i + 1}</span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
              </FadeUp>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="fd-deal" className="container-site pt-16 sm:pt-24">
        <FadeUp>
          <Eyebrow>{p.deal.eyebrow}</Eyebrow>
          <h2 id="fd-deal" className={h2}>{p.deal.headline}</h2>
        </FadeUp>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[p.deal.free, p.deal.paid].map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.06} className={cn("flex flex-col rounded-[2rem] border p-6 sm:p-8", i === 0 ? "border-lime bg-lime-soft" : "bg-surface")}>
              <p className="text-sm font-semibold text-muted-foreground">{card.label}</p>
              <h3 className="mt-1 font-display text-3xl font-bold tracking-[-0.03em]">{card.title}</h3>
              <ul className="mt-6 space-y-3">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-1 size-4 shrink-0 text-lime-strong" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {i === 1 && (
                <Link href={p.deal.paid.link.href} className="group mt-6 inline-flex items-center gap-1.5 self-start rounded-sm font-semibold underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50">
                  {p.deal.paid.link.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="apply" aria-labelledby="fd-apply" className="container-site grid scroll-mt-24 grid-cols-1 gap-10 pt-16 pb-20 sm:pt-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
        <FadeUp>
          <Eyebrow>{p.form.eyebrow}</Eyebrow>
          <h2 id="fd-apply" className={h2}>{p.form.headline}</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{p.form.subheadline}</p>

          <h3 className="mt-10 font-display text-xl font-bold tracking-[-0.02em]">{p.faq.headline}</h3>
          <div className="mt-3 divide-y border-y">
            {p.faq.items.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden />
                </summary>
                <p className="pb-3 leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <FreeDesignForm />
        </FadeUp>
      </section>
    </main>
  );
}

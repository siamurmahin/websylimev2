import Link from "next/link";
import { ArrowRight, Bug, Check, ChevronDown, HardHat, Wrench, Zap, type LucideIcon } from "lucide-react";
import { icons } from "@/components/icons";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Shot, stories } from "@/components/case-studies/shared";
import { industries, industriesPage, type Industry } from "@/content/industries";
import { cn } from "@/lib/utils";

const p = industriesPage;

const TRADE_ICONS: Record<string, LucideIcon> = { plumbers: Wrench, electricians: Zap, "pest-control": Bug, contractors: HardHat };

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

/** "Sound familiar?": three problems in this trade. */
export function IndustryPains({ data }: { data: Industry }) {
  return (
    <section aria-labelledby="in-pains-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{p.page.painsEyebrow}</Eyebrow>
          <h2 id="in-pains-title" className={h2Cls}>
            {data.pains.headline}
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-3">
          {data.pains.items.map((it) => {
            const Icon = icons[it.icon];
            return (
              <li key={it.title} data-reveal className="flex gap-4 rounded-[1.5rem] border bg-surface p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg leading-snug font-bold tracking-[-0.02em]">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </StaggerReveal>
    </section>
  );
}

/** "What you get" (#included): four things the site does for this trade, on a dark panel. */
export function IndustryIncluded({ data }: { data: Industry }) {
  return (
    <section id="included" aria-labelledby="in-included-title" className="scroll-mt-16 pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-12 dark:border dark:border-white/10 dark:bg-surface">
          <div data-reveal className="max-w-2xl">
            <Eyebrow dark>{p.page.includedEyebrow}</Eyebrow>
            <h2 id="in-included-title" className={cn(h2Cls, "text-[clamp(2.25rem,5vw,3.75rem)]")}>
              {data.included.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{data.included.subheadline}</p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.included.items.map((it) => {
              const Icon = icons[it.icon];
              return (
                <li key={it.title} data-reveal className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-lime text-ink">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">{it.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">{it.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </StaggerReveal>
    </section>
  );
}

/** "Your pages": the page checklist beside an add-on card (WebsyChat or Growth). */
export function IndustryPages({ data }: { data: Industry }) {
  const ChatIcon = icons.chat;
  return (
    <section aria-labelledby="in-pages-title" className="pb-14 sm:pb-20">
      <StaggerReveal className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
        <div>
          <div data-reveal className="max-w-2xl">
            <Eyebrow>{p.page.pagesEyebrow}</Eyebrow>
            <h2 id="in-pages-title" className={h2Cls}>
              {data.pages.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{data.pages.subheadline}</p>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.pages.items.map((it) => (
              <li key={it} data-reveal className="flex items-center gap-3 rounded-2xl border bg-surface px-5 py-4 text-[15px]">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-3.5" strokeWidth={3.5} aria-hidden />
                </span>
                {it}
              </li>
            ))}
          </ul>
          <Link
            data-reveal
            href={p.page.packages.href}
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full border px-6 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {p.page.packages.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>

        <div data-reveal className="rounded-[1.5rem] border bg-surface p-6 sm:p-8 lg:mt-24">
          <span className="grid size-11 place-items-center rounded-xl bg-lime-soft text-lime-strong">
            <ChatIcon className="size-5" aria-hidden />
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.03em]">{data.extra.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{data.extra.body}</p>
          <Link
            href={data.extra.link.href}
            className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-lime-strong outline-none focus-visible:ring-2 focus-visible:ring-ring/60 dark:text-lime"
          >
            {data.extra.link.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </StaggerReveal>
    </section>
  );
}

/** Real case studies from similar businesses. */
export function IndustryRelated({ data }: { data: Industry }) {
  const related = data.related.flatMap((slug) => stories.filter((s) => s.slug === slug));
  return (
    <section aria-labelledby="in-related-title" className="pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Eyebrow>{p.page.relatedEyebrow}</Eyebrow>
            <h2 id="in-related-title" className={h2Cls}>
              {p.page.relatedHeadline}
            </h2>
          </div>
          <Link href={p.page.relatedCta.href} className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/60">
            {p.page.relatedCta.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <li key={s.slug} data-reveal>
              <Link href={`/work/${s.slug}`} className="group block rounded-[1.5rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                <Shot src={s.image} alt={`${s.label} website design`} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
                <p className="mt-4 text-sm font-semibold text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-lg leading-snug font-bold tracking-[-0.02em] text-balance group-hover:underline">{s.headline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </StaggerReveal>
    </section>
  );
}

/** Trade questions + links to the other trades. */
export function IndustryFaq({ data }: { data: Industry }) {
  const others = industries.filter((i) => i.slug !== data.slug);
  return (
    <section aria-labelledby="in-faq-title" className="pb-6">
      <StaggerReveal className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal>
          <Eyebrow>{p.page.faqEyebrow}</Eyebrow>
          <h2 id="in-faq-title" className={h2Cls}>
            {p.page.faqHeadline}
          </h2>
          <p className="mt-8 text-sm font-semibold text-muted-foreground">{p.page.otherTrades}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`} className="inline-flex rounded-full border bg-surface px-3.5 py-1.5 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          {data.faq.map((f) => (
            <details key={f.q} data-reveal className="group rounded-2xl border bg-surface px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </StaggerReveal>
    </section>
  );
}

/** /industries (#trades): one card per trade, plus "don't see yours?". */
export function IndustryGrid() {
  const g = p.grid;
  return (
    <section id="trades" aria-labelledby="in-grid-title" className="scroll-mt-16 py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{g.eyebrow}</Eyebrow>
          <h2 id="in-grid-title" className={h2Cls}>
            {g.headline}
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {industries.map((i) => {
            const Icon = TRADE_ICONS[i.slug] ?? Wrench;
            return (
              <li key={i.slug} data-reveal>
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] border bg-surface p-6 outline-none transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-8"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-lime-soft text-lime-strong transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.03em]">{i.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{i.card}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-lime-strong dark:text-lime">
                    {g.cta}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div data-reveal className="mt-4 flex flex-col gap-5 rounded-[1.75rem] border bg-lime-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-lime/[0.06]">
          <div>
            <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{g.otherTitle}</h3>
            <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{g.otherBody}</p>
          </div>
          <Link
            href={g.otherCta.href}
            className="inline-flex h-11 shrink-0 items-center justify-center self-start rounded-full border bg-background px-5 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50 sm:self-auto"
          >
            {g.otherCta.label}
          </Link>
        </div>
      </StaggerReveal>
    </section>
  );
}

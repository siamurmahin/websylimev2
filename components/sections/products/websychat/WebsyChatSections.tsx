import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  Check,
  Code2,
  Globe,
  Headphones,
  Link2,
  Mail,
  MessageCircle,
  MessageSquareText,
  SendHorizontal,
  Smartphone,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { PlanCards, type PlanCardData } from "@/components/sections/pricing/PlanCards";
import { Copy, isPlaceholder } from "@/lib/copy";
import { cn } from "@/lib/utils";

const c = site.products.websychat;

/** Every "Try free" button. Until the trial URL is filled in, it goes to Book a Call. */
export const trialHref = isPlaceholder(c.trialUrl) ? "/book-a-call" : c.trialUrl;

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

/** "See it in action": copy on the left, a chat widget mockup whose bubbles reveal one by one on the right. */
export function WebsyChatDemo() {
  const d = c.demo;
  return (
    // overflow-x-clip: the glow behind the widget bleeds past the edge on phones
    <section id="demo" aria-labelledby="wc-demo-title" className="scroll-mt-16 overflow-x-clip py-14 sm:py-20">
      <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <StaggerReveal>
          <div data-reveal>
            <Eyebrow>{d.eyebrow}</Eyebrow>
            <h2 id="wc-demo-title" className={h2Cls}>
              {d.headline}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{d.subheadline}</p>
          </div>
          <ul className="mt-8 space-y-3 text-[15px]">
            {d.points.map((p) => (
              <li key={p} data-reveal className="flex items-center gap-3">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-3" strokeWidth={3.5} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </StaggerReveal>

        <StaggerReveal className="relative mx-auto w-full max-w-md">
          {/* glow */}
          <div aria-hidden className="absolute -inset-8 -z-10 rounded-full bg-lime/20 blur-[80px] dark:bg-lime/10" />

          <div data-reveal className="overflow-hidden rounded-[1.75rem] border bg-surface shadow-[0_40px_90px_-50px_rgb(0_0_0/0.45)]">
            {/* widget header */}
            <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white dark:bg-surface-2">
              <span className="grid size-10 place-items-center rounded-full bg-lime text-ink">
                <MessageCircle className="size-5" aria-hidden />
              </span>
              <div className="leading-tight">
                <p className="font-display font-bold">{d.widget.name}</p>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <span aria-hidden className="size-1.5 rounded-full bg-lime" />
                  {d.widget.status}
                </p>
              </div>
            </div>

            {/* "example" caption, like a chat date divider */}
            <p aria-hidden className="pt-4 text-center text-[11px] font-semibold tracking-[0.08em] text-muted-foreground/70 uppercase">
              {d.widget.note}
            </p>

            {/* messages */}
            <ol aria-label={d.widget.note} className="space-y-2.5 px-4 pt-3 pb-5 sm:px-5">
              {d.messages.map((m, i) => (
                <li key={i} data-reveal className={cn("flex", m.from === "visitor" ? "justify-end" : "justify-start")}>
                  <p
                    className={cn(
                      "max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-snug",
                      m.from === "visitor" ? "rounded-br-md bg-lime text-ink" : "rounded-bl-md bg-surface-2 text-foreground dark:bg-white/[0.06]",
                    )}
                  >
                    <span className="sr-only">{m.from === "visitor" ? "Visitor: " : `${d.widget.name}: `}</span>
                    {m.text}
                  </p>
                </li>
              ))}
            </ol>

            {/* fake input */}
            <div aria-hidden className="flex items-center gap-2 border-t px-4 py-3">
              <span className="flex-1 text-sm text-muted-foreground/70">{d.widget.placeholder}</span>
              <span className="grid size-9 place-items-center rounded-full bg-lime text-ink">
                <SendHorizontal className="size-4" />
              </span>
            </div>
          </div>

          {/* lead notification */}
          <div
            data-reveal
            className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.45)] sm:-left-10"
          >
            <span className="grid size-9 place-items-center rounded-full bg-lime-soft text-lime-strong">
              <BellRing className="size-4" aria-hidden />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-bold text-lime-strong dark:text-lime">{d.lead.title}</p>
              <p className="text-sm font-semibold">{d.lead.body}</p>
            </div>
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}

/** "What it does": six feature cards. */
export function WebsyChatFeatures() {
  const f = c.features;
  return (
    <section aria-labelledby="wc-features-title" className="py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <h2 id="wc-features-title" className={h2Cls}>
            {f.headline}
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {f.items.map((it) => {
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

/** "Live in three steps" on a dark panel. */
export function WebsyChatHow() {
  const h = c.how;
  const stepIcons = [Globe, Code2, Mail];
  return (
    <section aria-labelledby="wc-how-title" className="pb-14 sm:pb-20">
      <StaggerReveal className="container-site">
        <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-12 dark:border dark:border-white/10 dark:bg-surface">
          <div data-reveal>
            <Eyebrow dark>{h.eyebrow}</Eyebrow>
            <h2 id="wc-how-title" className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">
              {h.headline}
            </h2>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {h.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={s.title} data-reveal className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-full bg-lime font-mono text-sm font-bold text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="size-5 text-white/40" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">
                    <Copy text={s.body} />
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </StaggerReveal>
    </section>
  );
}

const PLAN_ICONS: LucideIcon[] = [MessageSquareText, Link2, Mail, Smartphone, CalendarCheck, Tag, Headphones];

const planCards: PlanCardData[] = c.plans.items.map((p) => ({
  id: p.id,
  name: p.name,
  tagline: p.tagline,
  price: p.price,
  per: c.plans.per,
  badge: p.badge,
  featured: p.badge === "Recommended",
  href: trialHref,
  values: p.values,
}));

/** Three monthly plans (same card component as Pricing / Growth). */
export function WebsyChatPlans() {
  const p = c.plans;
  return (
    <section id="plans" aria-labelledby="wc-plans-title" className="scroll-mt-16 py-14 sm:py-20">
      <StaggerReveal className="container-site">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="wc-plans-title" className={h2Cls}>
            {p.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.subheadline}</p>
        </div>

        <PlanCards plans={planCards} rows={p.rows} rowIcons={PLAN_ICONS} ctaLabel={p.cta} />

        <p data-reveal className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          <Copy text={p.footnote} />
        </p>
      </StaggerReveal>
    </section>
  );
}

/** Slim banner: we'll set it up with you. */
export function WebsyChatHelp() {
  const n = c.help;
  return (
    <section aria-label={n.title} className="container-site pb-14 sm:pb-20">
      <div className="flex flex-col gap-5 rounded-[1.75rem] border bg-lime-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-lime/[0.06]">
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime text-ink">
            <Headphones className="size-5" aria-hidden />
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

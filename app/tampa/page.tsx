import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { ArrowDown, ChevronDown, Mail } from "lucide-react";
import { tampa as p } from "@/content/pages/tampa";
import { site } from "@/content/site";
import { AuditForm } from "@/components/tampa/AuditForm";
import { CopyCode } from "@/components/tampa/CopyCode";
import { FadeUp } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

// The serif italic accent (one phrase per heading), loaded on this page only
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-accent", display: "swap" });

export const metadata: Metadata = {
  title: { absolute: p.meta.title },
  description: p.meta.description,
  alternates: { canonical: "/tampa" },
  // Campaign page for PDF readers: kept out of search results
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { url: "/tampa", title: p.meta.title, description: p.meta.description },
  twitter: { title: p.meta.title, description: p.meta.description },
};

// Brand colours from the PDF (fixed, so the page looks the same in light and dark mode)
const FOREST = "bg-[#182D01] text-white";
const LIGHT = "bg-[#FBFBF7] text-[#0b0d09]";

/** "Plain words *accent words*" → the starred part in the serif italic. */
function Accent({ text, className }: { text: string; className?: string }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") ? (
      <em key={i} className={cn("font-[family-name:var(--font-accent)] font-normal tracking-[-0.01em]", className)}>
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold",
        dark ? "border-white/15 bg-white/5 text-white/80" : "border-[#182D01]/12 bg-white text-[#182D01]/75",
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-[#B8DD38]" />
      {children}
    </p>
  );
}

const h2 = "mt-5 font-display text-[clamp(2.1rem,6vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.04em] text-balance";
const focus = "outline-none focus-visible:ring-4 focus-visible:ring-[#B8DD38]/70";

/** /tampa: QR code landing for readers of "The Tampa Review Engine". One goal: request the free audit. */
export default function TampaPage() {
  const { hero, audit, offer, caseStudy: cs, form, faq, footer } = p;
  const showTerms = !offer.terms.startsWith("[");

  return (
    <div className={cn(serif.variable, "[color-scheme:light]")}>
      <main id="main">
        {/* ---------- logo bar (no menu) + 1. hero, on one background so the glow runs behind both ---------- */}
        <section aria-labelledby="t-hero" className={cn(FOREST, "relative isolate overflow-hidden")}>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-48 right-[-30%] -z-10 size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(184_221_56/0.2),transparent)] sm:right-[-8%]"
          />
          <div className="container-site flex h-20 items-center">
            <Link href="/" aria-label={`${site.brand.name} — home`} className={cn("inline-flex rounded-md", focus)}>
              <Image src={site.brand.logo.srcDark} alt={site.brand.logo.alt} width={134} height={44} quality={90} priority className="h-10 w-auto" />
            </Link>
          </div>
          <div className="container-site pt-10 pb-20 sm:pt-16 sm:pb-28 lg:pb-32">
            <div className="max-w-3xl animate-enter-up">
              <Eyebrow dark>{hero.label}</Eyebrow>
              <h1 id="t-hero" className="mt-6 font-display text-[clamp(2.6rem,8.5vw,5rem)] leading-[1.0] font-bold tracking-[-0.045em] text-balance">
                <Accent text={hero.headline} className="text-[#B8DD38]" />
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{hero.sub}</p>
              <a
                href="#audit"
                className={cn(
                  "group mt-9 inline-flex h-16 w-full items-center justify-center gap-2.5 rounded-full bg-[#B8DD38] px-8 text-lg font-semibold text-[#182D01] transition-[filter] hover:brightness-105 sm:w-auto",
                  "outline-none focus-visible:ring-4 focus-visible:ring-white/70",
                )}
              >
                {hero.cta}
                <ArrowDown className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </a>
              <p className="mt-4 text-sm text-white/60">{hero.note}</p>
            </div>
          </div>
        </section>

        {/* ---------- 2. what's in the audit ---------- */}
        <section aria-labelledby="t-audit" className={LIGHT}>
          <div className="container-site py-20 sm:py-28">
            <FadeUp>
              <Eyebrow>{audit.eyebrow}</Eyebrow>
              <h2 id="t-audit" className={cn(h2, "text-[#182D01]")}>
                <Accent text={audit.headline} />
              </h2>
            </FadeUp>
            <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {audit.items.map((item, i) => (
                <li key={item.title}>
                  <FadeUp delay={i * 0.06} className="h-full rounded-3xl border border-[#182D01]/10 bg-white p-6 sm:p-7">
                    <span className="grid size-11 place-items-center rounded-full bg-[#B8DD38] font-display text-lg font-bold text-[#182D01]">{i + 1}</span>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em] text-[#182D01]">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-[#0b0d09]/70">{item.body}</p>
                  </FadeUp>
                </li>
              ))}
            </ol>
            <p className="mt-8 flex items-center gap-2.5 text-base font-semibold text-[#182D01]">
              <Mail className="size-5 shrink-0" aria-hidden />
              {audit.line}
            </p>
          </div>
        </section>

        {/* ---------- 3. reader offer ---------- */}
        <section aria-labelledby="t-offer" className={LIGHT}>
          <div className="container-site pb-20 sm:pb-28">
            <FadeUp className="relative overflow-hidden rounded-[2rem] bg-[#B8DD38] p-6 text-[#182D01] sm:p-10 lg:p-12">
              {/* coupon notches */}
              <span aria-hidden className="absolute top-1/2 -left-5 size-10 -translate-y-1/2 rounded-full bg-[#FBFBF7]" />
              <span aria-hidden className="absolute top-1/2 -right-5 size-10 -translate-y-1/2 rounded-full bg-[#FBFBF7]" />
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
                <div>
                  <p className="text-sm font-bold tracking-[0.14em] uppercase">{offer.eyebrow}</p>
                  <h2 id="t-offer" className="mt-3 font-display text-[clamp(2rem,6vw,3.25rem)] leading-[1.04] font-bold tracking-[-0.04em] text-balance">
                    {offer.headline}
                  </h2>
                  <p className="mt-4 max-w-md leading-relaxed text-[#182D01]/80">{offer.body}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold">{offer.codeLabel}</p>
                  <CopyCode code={p.promoCode} copy={offer.copy} copied={offer.copied} />
                  {showTerms && <p className="mt-3 text-xs leading-relaxed text-[#182D01]/75">{offer.terms}</p>}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ---------- 4. proof (only with the client's permission) ---------- */}
        {p.showCaseStudy && (
          <section aria-labelledby="t-proof" className={FOREST}>
            <div className="container-site py-20 sm:py-28">
              <FadeUp>
                <Eyebrow dark>{cs.eyebrow}</Eyebrow>
                <div className="mt-6 grid grid-cols-1 gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-14">
                  <p className="flex items-baseline gap-3 font-display font-bold tracking-[-0.04em]" aria-label={`${cs.from} to ${cs.to} Google reviews`}>
                    <span className="text-5xl text-white/50 sm:text-6xl">{cs.from}</span>
                    <span className="text-3xl text-[#B8DD38]" aria-hidden>→</span>
                    <span className="text-7xl text-[#B8DD38] sm:text-8xl">{cs.to}</span>
                  </p>
                  <div>
                    <h2 id="t-proof" className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                      {cs.business}, {cs.trade}
                    </h2>
                    <p className="mt-3 text-lg leading-relaxed text-white/75">
                      {cs.from} → {cs.to} {cs.result} ({cs.period})
                    </p>
                    <p className="mt-4 text-sm text-white/55">{cs.note}</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </section>
        )}

        {/* ---------- 5. form ---------- */}
        <section id="audit" aria-labelledby="t-form" className={cn(LIGHT, "scroll-mt-4 border-t border-[#182D01]/8")}>
          <div className="container-site grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <FadeUp>
              <Eyebrow>{form.eyebrow}</Eyebrow>
              <h2 id="t-form" className={cn(h2, "text-[#182D01]")}>
                <Accent text={form.headline} />
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-[#0b0d09]/70">{form.sub}</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <AuditForm />
            </FadeUp>
          </div>
        </section>

        {/* ---------- 6. FAQ ---------- */}
        <section aria-labelledby="t-faq" className={LIGHT}>
          <div className="container-site pb-20 sm:pb-28">
            <div className="mx-auto max-w-3xl">
              <Eyebrow>{faq.eyebrow}</Eyebrow>
              <h2 id="t-faq" className={cn(h2, "text-[#182D01]")}>
                <Accent text={faq.headline} />
              </h2>
              <div className="mt-8 divide-y divide-[#182D01]/10 border-y border-[#182D01]/10">
                {faq.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary
                      className={cn(
                        "flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-4 text-lg font-semibold text-[#182D01] [&::-webkit-details-marker]:hidden",
                        focus,
                      )}
                    >
                      {item.q}
                      <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden />
                    </summary>
                    <p className="pb-5 text-base leading-relaxed text-[#0b0d09]/70">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- 7. minimal footer ---------- */}
      <footer className={FOREST}>
        <div className="container-site flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label={`${site.brand.name} — home`} className={cn("inline-flex self-start rounded-md", focus)}>
            <Image src={site.brand.logo.srcDark} alt={site.brand.logo.alt} width={134} height={44} quality={90} className="h-9 w-auto" />
          </Link>
          <div className="flex flex-col gap-3 text-sm text-white/70 sm:flex-row sm:items-center sm:gap-6">
            <a href={`mailto:${footer.email}`} className={cn("rounded-sm hover:text-white", focus)}>
              {footer.email}
            </a>
            <Link href={footer.privacy.href} className={cn("rounded-sm hover:text-white", focus)}>
              {footer.privacy.label}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

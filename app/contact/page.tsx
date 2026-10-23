import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { FadeUp } from "@/components/motion/SplitReveal";
import { Copy, href, isPlaceholder } from "@/lib/copy";

const c = site.contact;
const info = site.footer.contact;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `${c.meta.title} · ${site.brand.name}`, description: c.meta.description },
};

/**
 * Contact. Section 1: photo hero. Section 2 (#message): three ways to reach us
 * + hours/address on the left, a one-step message form on the right.
 * Email, WhatsApp and address come from the footer content (one source).
 */
export default function ContactPage() {
  const external = (v: string) => (isPlaceholder(v) ? {} : { target: "_blank", rel: "noopener noreferrer" });
  const ways = [
    { ...c.ways.email, Icon: Mail, value: info.email, href: isPlaceholder(info.email) ? "#" : `mailto:${info.email}`, ext: {} },
    { ...c.ways.whatsapp, Icon: MessageCircle, value: null, href: href(info.whatsapp.href), ext: external(info.whatsapp.href) },
    { ...c.ways.call, Icon: CalendarDays, value: null, href: c.ways.call.href, ext: {} },
  ];

  return (
    <main id="main" className="relative isolate overflow-hidden">
      <PhotoHero data={c.hero} />

      <section
        id="message"
        aria-labelledby="ct-title"
        className="container-site grid scroll-mt-24 grid-cols-1 gap-10 pt-14 pb-20 sm:pt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:pt-24"
      >
        {/* ---------- ways to reach us ---------- */}
        <FadeUp>
          <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {c.eyebrow}
          </p>
          <h2 id="ct-title" className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
            {c.headline}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{c.subheadline}</p>

          <ul className="mt-8 grid max-w-xl grid-cols-1 gap-3">
            {ways.map(({ Icon, ...w }) => (
              <li key={w.title}>
                <a
                  href={w.href}
                  {...w.ext}
                  className="group flex h-full items-start gap-3.5 rounded-2xl border bg-surface p-4 outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-lime-soft text-lime-strong transition-colors group-hover:bg-lime group-hover:text-ink">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{w.title}</span>
                    <span className="mt-0.5 block text-sm break-words text-muted-foreground">
                      {w.value ? <Copy text={w.value} /> : <Copy text={w.body} />}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-lime-strong" aria-hidden />
              <span>
                <span className="font-semibold text-foreground">{c.hours.label}:</span> <Copy text={c.hours.value} />
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-lime-strong" aria-hidden />
              <span>
                <span className="font-semibold text-foreground">{info.addressLabel}</span> · <Copy text={info.address} />
              </span>
            </li>
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            {c.projectNote.text}{" "}
            <Link
              href={c.projectNote.href}
              className="group inline-flex items-center gap-1 rounded-sm font-semibold text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              {c.projectNote.label}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </p>
        </FadeUp>

        {/* ---------- message form ---------- */}
        <FadeUp delay={0.1}>
          <ContactForm />
        </FadeUp>
      </section>
    </main>
  );
}

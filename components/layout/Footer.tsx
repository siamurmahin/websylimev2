"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowRight, ArrowUp, Check, HeartHandshake, Mail, MapPin, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { SOCIAL_ICONS } from "@/components/layout/social-icons";
import { Copy, href, isPlaceholder } from "@/lib/copy";
import { cn } from "@/lib/utils";

const f = site.footer;

// Year is read on the client only (no `new Date()` during prerender)
const noop = () => () => {};
const getYear = () => new Date().getFullYear();
const getServerYear = () => null;

const linkCls =
  "rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60";

/**
 * Site footer: one clean card that follows the site theme. Brand, contact and
 * socials on the left, four link columns on the right, a one-line newsletter,
 * then the legal bar.
 */
export function Footer() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const year = useSyncExternalStore(noop, getYear, getServerYear);
  const emailHref = isPlaceholder(f.contact.email) ? "#" : `mailto:${f.contact.email}`;

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="container-site pb-4 sm:pb-6">
      <div className="rounded-[2rem] border bg-surface px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        {/* ---------- brand + links ---------- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{f.blurb}</p>

            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href={emailHref} className={cn(linkCls, "inline-flex items-center gap-2.5")}>
                  <Mail className="size-4 text-lime-strong" aria-hidden />
                  <Copy text={f.contact.email} />
                </a>
              </li>
              <li>
                <a
                  href={href(f.contact.whatsapp.href)}
                  target={isPlaceholder(f.contact.whatsapp.href) ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={cn(linkCls, "inline-flex items-center gap-2.5")}
                >
                  <MessageCircle className="size-4 text-lime-strong" aria-hidden />
                  {f.contact.whatsapp.label}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-lime-strong" aria-hidden />
                <span>
                  {f.contact.addressLabel} · <Copy text={f.contact.address} />
                </span>
              </li>
            </ul>

            <ul className="mt-6 flex gap-2" aria-label={f.socialLabel}>
              {f.social.map((s) => (
                <li key={s.id}>
                  <a
                    href={href(s.href)}
                    target={isPlaceholder(s.href) ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full border bg-background text-muted-foreground outline-none transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                      <path d={SOCIAL_ICONS[s.id]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {f.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l.label} className="flex items-center gap-2">
                      {l.href ? (
                        <Link href={href(l.href)} className={cn(linkCls, "whitespace-nowrap")}>
                          {l.label}
                        </Link>
                      ) : (
                        <span className="whitespace-nowrap text-muted-foreground/60">{l.label}</span>
                      )}
                      {l.badge && (
                        <span className="rounded-full bg-lime-soft px-1.5 py-px text-[10px] font-semibold text-lime-strong">{l.badge}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ---------- newsletter ---------- */}
        <Newsletter />

        {/* ---------- legal bar ---------- */}
        <div
          data-footer-end
          className="mt-8 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>{f.copyright.replace(year ? "{year}" : "{year} ", year ? String(year) : "")}</span>
            {f.legal.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-1.5">
              <HeartHandshake className="size-4 text-rose-500" aria-hidden />
              {f.charityLine}
            </span>
            <button
              type="button"
              onClick={toTop}
              aria-label={f.backToTop}
              className="grid size-9 place-items-center rounded-full border bg-background text-foreground outline-none transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Newsletter() {
  const n = f.newsletter;
  const [sent, setSent] = useState(false);

  return (
    <div className="mt-12 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between md:gap-8">
      <div>
        <h3 className="text-sm font-semibold">{n.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
      </div>

      {sent ? (
        <p role="status" className="inline-flex items-center gap-2 text-sm font-semibold text-lime-strong">
          <Check className="size-4" aria-hidden />
          {n.success}
        </p>
      ) : (
        // TODO.md: connect a newsletter provider before launch
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="flex w-full shrink-0 items-center gap-1.5 rounded-full border bg-background p-1 transition-[border-color,box-shadow] focus-within:border-lime focus-within:ring-3 focus-within:ring-lime/25 md:w-[22rem]"
        >
          <label htmlFor="footer-email" className="sr-only">
            {n.label}
          </label>
          <input
            id="footer-email"
            type="email"
            required
            autoComplete="email"
            placeholder={n.placeholder}
            className="h-9 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/70"
          />
          <button
            type="submit"
            className="group inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-lime px-4 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
          >
            {n.cta}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </button>
        </form>
      )}
    </div>
  );
}

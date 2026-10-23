"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowRight, X } from "lucide-react";
import { site, type NavLink } from "@/content/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { icons } from "@/components/icons";
import { Logo } from "@/components/layout/Logo";
import { Copy, href } from "@/lib/copy";

const ease = [0.16, 1, 0.3, 1] as const;

function SubLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const Icon = link.icon ? icons[link.icon] : null;
  return (
    <Link
      href={href(link.href)}
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-xl px-2 py-2.5 outline-none active:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      {Icon && (
        <span className="grid size-8 shrink-0 place-items-center rounded-lg border bg-surface-2 text-muted-foreground">
          <Icon className="size-4" />
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[15px] font-medium">
          <Copy text={link.label} />
          {link.badge && (
            <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[10px] font-semibold text-lime-strong uppercase">
              {link.badge}
            </span>
          )}
        </span>
        {link.description && (
          <span className="block text-[13px] leading-snug text-muted-foreground">
            <Copy text={link.description} />
          </span>
        )}
      </span>
    </Link>
  );
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { nav, primaryCta, secondaryCta, closeMenu, mobileFooterNote } = site.header;
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll and wire up Escape while the menu is open
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  const triggerCls = "items-center py-4 font-display text-2xl font-semibold hover:no-underline";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col bg-background lg:hidden"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="container-site flex h-header shrink-0 items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={closeMenu}
              className="grid size-10 place-items-center rounded-full border bg-surface/60 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <X className="size-5" />
            </button>
          </div>

          <motion.nav
            aria-label="Mobile"
            data-lenis-prevent
            className="container-site flex-1 overflow-y-auto overscroll-contain pb-6"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
          >
            <Accordion type="single" collapsible>
              {nav.map((item) => {
                const key = item.kind === "link" ? item.href : item.id;
                const row = (children: React.ReactNode) => (
                  <motion.div
                    key={key}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.45, ease }}
                    className="border-b"
                  >
                    {children}
                  </motion.div>
                );

                if (item.kind === "link") {
                  return row(
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-4 font-display text-2xl font-semibold outline-none focus-visible:text-lime-strong"
                    >
                      {item.label}
                      <ArrowRight className="size-5 text-muted-foreground" />
                    </Link>,
                  );
                }

                return row(
                  <AccordionItem value={item.id} className="border-0">
                    <AccordionTrigger className={triggerCls}>{item.label}</AccordionTrigger>
                    <AccordionContent className="h-auto pb-4 [&_a]:no-underline">
                      {item.kind === "mega" &&
                        item.groups
                          .filter((g) => !g.hidden)
                          .map((group) => (
                            <div key={group.title} className="mb-3">
                              <p className="mb-1 flex items-center gap-2 px-2 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                                {group.href ? (
                                  <Link href={href(group.href)} onClick={onClose} className="hover:text-foreground">
                                    {group.title}
                                  </Link>
                                ) : (
                                  group.title
                                )}
                                {group.badge && (
                                  <span className="rounded-full bg-lime-soft px-2 py-0.5 text-[10px] text-lime-strong">
                                    {group.badge}
                                  </span>
                                )}
                              </p>
                              {group.links
                                .filter((l) => !l.hidden)
                                .map((link) => (
                                  <SubLink key={link.label} link={{ ...link, badge: undefined }} onNavigate={onClose} />
                                ))}
                            </div>
                          ))}

                      {item.kind === "products" && (
                        <div className="rounded-2xl border bg-surface-2 p-4">
                          <p className="font-display text-lg font-semibold">{item.product.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            <Copy text={item.product.tagline} />
                          </p>
                          <div className="mt-4 flex gap-2">
                            <Button asChild size="pill">
                              <Link href={href(item.product.cta.href, "/book-a-call")} onClick={onClose}>
                                {item.product.cta.label}
                              </Link>
                            </Button>
                            <Button asChild size="pill" variant="ghost">
                              <Link href={href(item.product.secondary.href)} onClick={onClose}>
                                {item.product.secondary.label}
                              </Link>
                            </Button>
                          </div>
                          <p className="mt-4 border-t border-dashed pt-3 text-[13px] text-muted-foreground">
                            {item.comingSoon.title} — {item.comingSoon.description}
                          </p>
                        </div>
                      )}

                      {item.kind === "dropdown" &&
                        item.links
                          .filter((l) => !l.hidden)
                          .map((link) => <SubLink key={link.label} link={link} onNavigate={onClose} />)}
                    </AccordionContent>
                  </AccordionItem>,
                );
              })}
            </Accordion>
          </motion.nav>

          <motion.div
            className="container-site shrink-0 border-t pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <div className="grid grid-cols-2 gap-2">
              <Button asChild size="pill-lg" variant="outline" className="rounded-full">
                <Link href={href(secondaryCta.href)} onClick={onClose}>
                  {secondaryCta.label}
                </Link>
              </Button>
              <Button asChild size="pill-lg">
                <Link href={primaryCta.href} onClick={onClose}>
                  {primaryCta.label}
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">{mobileFooterNote}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

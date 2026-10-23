"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, Plus } from "lucide-react";
import { site } from "@/content/site";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, href, plain } from "@/lib/copy";
import { cn } from "@/lib/utils";

const f = site.home.faq;
const book = site.header.bookCall;

/**
 * FAQ: heading + "still have questions" call card on the left (sticky on
 * desktop), category tabs + one-open-at-a-time accordion on the right.
 * `categories` limits it to some topics (e.g. a service page shows only its own).
 */
export function FAQ({ categories }: { categories?: string[] } = {}) {
  const [tab, setTab] = useState<string>(f.allLabel);
  const [open, setOpen] = useState<string>("");
  const reduce = useReducedMotion();
  const cats = categories ?? f.categories;
  const tabs = [f.allLabel, ...cats];
  const pool = f.items.filter((it) => cats.includes(it.category));
  const items = tab === f.allLabel ? pool : pool.filter((it) => it.category === tab);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-14 sm:py-20">
      <StaggerReveal className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* ---------- left: heading + call card ---------- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {f.eyebrow}
          </p>
          <h2
            id="faq-title"
            data-reveal
            className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          >
            {f.headline}
          </h2>
          <p data-reveal className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {f.subheadline}
          </p>

          <div data-reveal className="relative mt-10 hidden overflow-hidden rounded-[1.7rem] bg-ink p-7 text-white lg:block dark:border dark:border-white/10 dark:bg-surface">
            <CallCard />
          </div>
        </div>

        {/* ---------- right: tabs + accordion ---------- */}
        <div>
          {/* one topic only (e.g. WebsyChat page) → no tabs */}
          <div data-reveal role="tablist" aria-label="FAQ categories" className={cn("flex flex-wrap gap-2", cats.length < 2 && "hidden")}>
            {tabs.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setTab(t);
                    setOpen("");
                  }}
                  className={cn(
                    "relative shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold sm:px-4 sm:text-sm whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                    active ? "border-transparent text-ink" : "bg-surface text-muted-foreground hover:border-lime hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="faq-tab"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-lime"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              );
            })}
          </div>

          <div data-reveal className={cn(cats.length > 1 && "mt-6")}>
            <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="gap-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((item) => {
                  const value = item.q;
                  const isOpen = open === value;
                  return (
                    <motion.div
                      key={value}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <AccordionItem
                        value={value}
                        className={cn(
                          "rounded-2xl border bg-surface transition-[border-color,box-shadow] duration-300 not-last:border-b",
                          isOpen ? "border-lime/60 shadow-[0_20px_50px_-35px_var(--lime)] dark:shadow-none" : "hover:border-foreground/20",
                        )}
                      >
                        <AccordionTrigger className="items-center gap-4 px-5 py-5 text-base font-semibold hover:no-underline sm:px-6 sm:text-lg **:data-[slot=accordion-trigger-icon]:hidden">
                          <span className="flex-1">{item.q}</span>
                          <span
                            aria-hidden
                            className={cn(
                              "grid size-8 shrink-0 place-items-center rounded-full transition-[background-color,color,rotate] duration-300",
                              isOpen ? "rotate-45 bg-lime text-ink" : "bg-muted text-foreground",
                            )}
                          >
                            <Plus className="size-4" />
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="h-auto px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground sm:px-6 sm:pr-16 [&_a]:no-underline">
                          <p>
                            <Copy text={item.a} />
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </Accordion>
          </div>

          {/* call card moves under the questions on smaller screens */}
          <div data-reveal className="relative mt-8 overflow-hidden rounded-[1.7rem] bg-ink p-6 text-white sm:p-7 lg:hidden dark:border dark:border-white/10 dark:bg-surface">
            <CallCard />
          </div>
        </div>
      </StaggerReveal>
    </section>
  );
}

/** "Still have questions?" call card (dark panel content). Also used on /faq. */
export function CallCard() {
  return (
    <>
      <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-lime/25 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <span className="relative size-14 shrink-0">
          <span className="relative grid size-full place-items-center overflow-hidden rounded-full bg-lime text-ink">
            {book.avatar.src ? (
              <Image src={book.avatar.src} alt={plain(book.avatar.alt)} fill sizes="56px" className="object-cover" />
            ) : (
              <CalendarDays className="size-6" aria-hidden />
            )}
          </span>
          {/* "online" dot sits outside the clipped circle; its ring matches the card */}
          <span aria-hidden className="absolute -right-0.5 -bottom-0.5 size-4 rounded-full border-[3px] border-ink bg-emerald-400 dark:border-surface" />
        </span>
        <div>
          <p className="font-display text-xl font-bold tracking-[-0.02em]">{f.call.title}</p>
          <p className="text-sm text-white/65">{f.call.body}</p>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          href={href(book.href)}
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
        >
          {f.call.cta}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <span className="text-xs text-white/55">
          <Copy text={book.note} />
        </span>
      </div>

      <Link
        href={f.call.secondary.href}
        className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 outline-none hover:text-lime focus-visible:ring-2 focus-visible:ring-lime/60"
      >
        {f.call.secondary.label}
        <ArrowRight className="size-3.5" />
      </Link>
    </>
  );
}

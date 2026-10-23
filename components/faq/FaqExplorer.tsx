"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircleQuestion, Plus, Search, X } from "lucide-react";
import { site } from "@/content/site";
import { CallCard } from "@/components/sections/FAQ";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, plain } from "@/lib/copy";
import { cn } from "@/lib/utils";

const p = site.faqPage;
const items = site.home.faq.items;

/**
 * /faq: every question from content/home/faq.ts, grouped by topic (#general,
 * #websites …). Search filters all groups at once; the topic list (sticky on
 * desktop, chips on mobile) jumps to a group and highlights the one in view.
 */
export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>([]);
  const [active, setActive] = useState(p.groups[0].id);
  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      p.groups
        .map((g) => ({
          ...g,
          items: items.filter(
            (it) => it.category === g.category && (!q || `${it.q} ${plain(it.a)}`.toLowerCase().includes(q)),
          ),
        }))
        .filter((g) => g.items.length > 0),
    [q],
  );

  // highlight the topic whose group is in view
  useEffect(() => {
    const els = groups.map((g) => document.getElementById(g.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups]);

  const topics = (
    <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-1 lg:overflow-visible">
      {groups.map((g) => {
        const on = g.id === active;
        return (
          <li key={g.id} className="shrink-0">
            <a
              href={`#${g.id}`}
              aria-current={on ? "true" : undefined}
              className={cn(
                "flex items-center justify-between gap-3 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 lg:rounded-xl lg:border-transparent lg:py-2.5",
                on ? "border-lime bg-lime text-ink lg:border-transparent" : "bg-surface text-muted-foreground hover:text-foreground lg:bg-transparent lg:hover:bg-surface",
              )}
            >
              {g.category}
              <span className={cn("text-xs tabular-nums", on ? "text-ink/60" : "text-muted-foreground/70")}>{g.items.length}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section id="questions" aria-label="All questions" className="scroll-mt-16 py-14 sm:py-20">
      <div className="container-site grid grid-cols-1 gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[17rem_minmax(0,1fr)]">
        {/* ---------- left: topics + call card (sticky on desktop) ---------- */}
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          {groups.length > 0 && (
            <>
              <p className="mb-3 px-4 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">{p.topicsTitle}</p>
              <nav aria-label={p.topicsTitle} className="mb-8">
                {topics}
              </nav>
            </>
          )}
          <div className="relative overflow-hidden rounded-[1.7rem] bg-ink p-6 text-white dark:border dark:border-white/10 dark:bg-surface">
            <CallCard />
          </div>
        </aside>

        {/* ---------- right: search + groups ---------- */}
        <div>
          <div role="search" className="relative">
            <label htmlFor="faq-search" className="sr-only">
              {p.search.label}
            </label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={p.search.placeholder}
              autoComplete="off"
              className="h-14 w-full rounded-full border bg-surface pr-12 pl-13 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-lime focus-visible:ring-3 focus-visible:ring-lime/25 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-muted text-foreground outline-none hover:bg-lime hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </div>

          {/* topics as chips on smaller screens */}
          <nav aria-label={p.topicsTitle} className="mt-5 lg:hidden">
            {topics}
          </nav>

          {groups.length === 0 ? (
            <div role="status" className="mt-10 flex flex-col items-start gap-4 rounded-[1.5rem] border bg-surface p-7 sm:flex-row sm:items-center">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lime-soft text-lime-strong">
                <MessageCircleQuestion className="size-6" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="font-display text-xl font-bold tracking-[-0.02em]">{p.search.empty.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <Copy text={p.search.empty.body} />
                </p>
              </div>
              <Link
                href={p.search.empty.cta.href}
                className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
              >
                {p.search.empty.cta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          ) : (
            <Accordion type="multiple" value={open} onValueChange={setOpen} className="mt-10 gap-14">
              {groups.map((g) => (
                <div key={g.id} id={g.id} className="scroll-mt-28">
                  <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                    <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight font-bold tracking-[-0.035em]">{g.category}</h2>
                    {g.link && (
                      <Link
                        href={g.link.href}
                        className="group inline-flex items-center gap-1.5 pb-1 text-sm font-semibold text-lime-strong outline-none hover:underline focus-visible:ring-2 focus-visible:ring-lime/60 dark:text-lime"
                      >
                        {g.link.label}
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    {g.items.map((item) => {
                      const isOpen = open.includes(item.q);
                      return (
                        <AccordionItem
                          key={item.q}
                          value={item.q}
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
                      );
                    })}
                  </div>
                </div>
              ))}
            </Accordion>
          )}

          {/* call card moves under the questions on smaller screens */}
          <div className="relative mt-14 overflow-hidden rounded-[1.7rem] bg-ink p-6 text-white sm:p-7 lg:hidden dark:border dark:border-white/10 dark:bg-surface">
            <CallCard />
          </div>
        </div>
      </div>
    </section>
  );
}

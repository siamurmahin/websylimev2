"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export type StoryCard = {
  slug: string;
  label: string;
  category: string;
  image: string;
  headline: string;
  stat: { value: string; label: string };
};

const PAGE = 12;

/**
 * /case-studies grid with industry chips and "show more". Hidden cards stay in
 * the HTML (display: none), so search engines still see every link and their
 * lazy images don't load until shown.
 */
export function CaseStudyGrid({ stories, allLabel, moreLabel, readMore }: { stories: StoryCard[]; allLabel: string; moreLabel: string; readMore: string }) {
  const categories = [...new Set(stories.map((s) => s.category))].sort();
  const [cat, setCat] = useState(allLabel);
  const [shown, setShown] = useState(PAGE);
  const list = cat === allLabel ? stories : stories.filter((s) => s.category === cat);

  return (
    <div className="container-site">
      <div role="group" aria-label="Filter by industry" className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-wrap lg:justify-center">
        {[allLabel, ...categories].map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setCat(c);
                setShown(PAGE);
              }}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                on ? "border-lime bg-lime text-ink" : "bg-surface text-muted-foreground hover:border-lime hover:text-foreground",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => {
          const i = list.indexOf(s);
          return (
            <li key={s.slug} className={cn((i < 0 || i >= shown) && "hidden")}>
              <Link
                href={`/case-studies/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border bg-surface outline-none transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <div className="overflow-hidden bg-surface-2">
                  <Image
                    src={s.image}
                    alt={`${s.label} website design`}
                    width={1170}
                    height={630}
                    quality={90}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[1170/630] h-auto w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-sm font-semibold text-muted-foreground">{s.label}</p>
                  <h2 className="mt-1.5 font-display text-xl leading-snug font-bold tracking-[-0.02em] text-balance">{s.headline}</h2>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold tracking-[-0.03em] text-lime-strong dark:text-lime">
                      <Copy text={s.stat.value} />
                    </span>
                    <span className="text-sm text-muted-foreground">{s.stat.label}</span>
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-lime-strong dark:text-lime">
                    {readMore}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {shown < list.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="inline-flex h-12 items-center rounded-full border bg-surface px-6 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {moreLabel}
          </button>
        </div>
      )}
    </div>
  );
}

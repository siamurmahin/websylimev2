import Image from "next/image";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export type StoryWithProject = CaseStudy & { project: PortfolioItem; image: string };

/** Case studies joined with their portfolio entry (name, screenshot, URL). */
export const stories: StoryWithProject[] = caseStudies.flatMap((c) => {
  const project = portfolio.find((p) => p.slug === c.slug);
  return project ? [{ ...c, project, image: c.screenshot ?? project.image }] : [];
});

/**
 * Project screenshot in a rounded frame (portfolio shots already include
 * their own device mockups). They're 1170px wide — keep display ≤ ~780px.
 */
export function Shot({ src, alt, sizes, preload = false, className }: { src: string; alt: string; sizes: string; preload?: boolean; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[1.25rem] border bg-surface-2 sm:rounded-[1.5rem]", className)}>
      <Image src={src} alt={alt} width={1170} height={630} sizes={sizes} preload={preload} quality={90} className="aspect-[1170/630] h-auto w-full object-cover object-top" />
    </div>
  );
}

/** Three result numbers side by side. */
export function Stats({ stats, dark = false, className }: { stats: CaseStudy["stats"]; dark?: boolean; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-3 gap-3", className)}>
      {stats.map((s) => (
        <div key={s.label} className={cn("rounded-2xl p-3 sm:p-4", dark ? "bg-white/[0.06]" : "bg-surface-2")}>
          <dt className="sr-only">
            <Copy text={s.label} />
          </dt>
          <dd>
            <span className={cn("block font-display text-xl font-bold tracking-[-0.03em] sm:text-3xl", dark ? "text-lime" : "text-lime-strong dark:text-lime")}>
              <Copy text={s.value} />
            </span>
            <span className={cn("mt-1 block text-xs leading-snug sm:text-[13px]", dark ? "text-white/65" : "text-muted-foreground")}>
              <Copy text={s.label} />
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Small pills: industry + services. */
export function Tags({ story, dark = false }: { story: CaseStudy; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {[story.industry, ...story.services].map((t, i) => (
        <li
          key={t}
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-bold",
            i === 0 ? (dark ? "bg-lime text-ink" : "bg-lime-soft text-lime-strong") : dark ? "bg-white/10 text-white/75" : "border bg-surface text-muted-foreground",
          )}
        >
          <Copy text={t} />
        </li>
      ))}
    </ul>
  );
}

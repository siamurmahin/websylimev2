"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { portfolio } from "@/content/portfolio";
import { caseStudies } from "@/content/case-studies";
import { Copy, href } from "@/lib/copy";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const fw = site.home.featuredWork;

/**
 * Featured Work. Desktop (lg+): the section pins and the row of projects
 * slides sideways as you scroll, with a "View" bubble following the cursor.
 * Phones: one project per row; tablets: two. The "see all" card spans the
 * full width underneath so it is always visible.
 */
export function FeaturedWork() {
  const projects = fw.items
    .map((item) => ({ ...item, project: portfolio.find((p) => p.slug === item.slug) }))
    .filter((p): p is typeof p & { project: NonNullable<typeof p.project> } => Boolean(p.project));
  const more = Math.max(portfolio.length - projects.length, 0);
  // Tablets (2 columns) show 3 projects so the "see all" card completes the 2×2 grid
  const TABLET_SHOWN = 3;
  const moreTablet = more + Math.max(projects.length - TABLET_SHOWN, 0);
  // a few extra screenshots to preview the rest of the portfolio on the "see all" card
  const peek = portfolio.filter((p) => !projects.some((f) => f.project.slug === p.slug)).slice(0, 3);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* ---------- "View" cursor ---------- */
  const [hovering, setHovering] = useState(false);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const x = useSpring(cx, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(cy, { stiffness: 500, damping: 40, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cx.set(e.clientX);
    cy.set(e.clientY);
  };

  /* ---------- horizontal scroll (lg+) ---------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        // clientWidth excludes the scrollbar, so the last card keeps its full right padding
        const distance = () => track.scrollWidth - document.documentElement.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label={fw.headline}
      className="relative overflow-hidden py-14 sm:py-20 lg:flex lg:h-svh lg:items-center lg:py-0"
    >
      {/* ---------- heading (phones + tablets) ---------- */}
      <div className="container-site mb-10 lg:hidden">
        {/* no "View all" button here: the grid ends with its own "see all" card */}
        <Intro showLink={false} />
      </div>

      <div
        ref={trackRef}
        className="container-site grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:flex lg:w-max lg:max-w-none lg:gap-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:motion-reduce:w-auto lg:motion-reduce:overflow-x-auto lg:motion-reduce:pb-4"
      >
        {/* ---------- intro panel (desktop, scrolls away with the row) ---------- */}
        <div className="hidden w-[26rem] shrink-0 flex-col justify-center lg:flex">
          <Intro hint={fw.scrollHint} />
        </div>

        {/* ---------- projects ---------- */}
        {projects.map(({ project, tags, result }, i) => (
          <Link
            key={project.slug}
            // a case study if there is one, otherwise the project on the Work page
            href={caseStudies.some((c) => c.slug === project.slug) ? `/case-studies/${project.slug}` : `/work#${project.slug}`}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              // start the bubble right under the cursor instead of flying in from 0,0
              cx.jump(e.clientX);
              cy.jump(e.clientY);
              x.jump(e.clientX);
              y.jump(e.clientY);
              setHovering(true);
            }}
            onPointerLeave={() => setHovering(false)}
            onPointerMove={onMove}
            className={cn("group min-w-0 outline-none lg:w-[min(46vw,44rem)] lg:shrink-0 lg:cursor-none", i >= TABLET_SHOWN && "sm:max-lg:hidden")}
          >
            <div className="relative overflow-hidden rounded-[1.25rem] border bg-surface-2 transition-[border-color] duration-500 group-hover:border-lime/60 group-focus-visible:ring-3 group-focus-visible:ring-ring/50 sm:rounded-[1.5rem] lg:rounded-[1.75rem]">
              <Image
                src={project.image}
                alt={`${project.name} website`}
                width={1170}
                height={630}
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[1170/630] h-auto w-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute top-3 right-3 rounded-full bg-background/80 px-2.5 py-0.5 font-mono text-[11px] font-semibold backdrop-blur lg:top-4 lg:right-4 lg:px-3 lg:py-1 lg:text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-2.5 px-1 lg:mt-5 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold tracking-[-0.02em] sm:text-xl lg:text-2xl">{project.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground lg:text-[15px]">
                  <Copy text={result} />
                </p>
              </div>
              <ul className="flex shrink-0 flex-wrap gap-1.5 lg:justify-end">
                {tags.map((tag) => (
                  <li key={tag} className="rounded-full border bg-surface px-2.5 py-1 text-xs font-semibold">
                    <Copy text={tag} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}

        {/* ---------- see-all card: full-width banner on phones, 4th grid cell on tablets, tall card at the end of the row on lg ---------- */}
        <Link
          href={href(fw.cta.href)}
          className="group relative flex flex-col-reverse justify-between gap-8 overflow-hidden rounded-[1.25rem] bg-lime p-6 text-ink outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:rounded-[1.5rem] lg:aspect-[3/4] lg:w-[22rem] lg:shrink-0 lg:flex-col-reverse lg:items-stretch lg:gap-0 lg:rounded-[1.75rem]"
        >
          <span aria-hidden className="absolute -right-16 -bottom-16 size-56 rounded-full bg-white/40 blur-3xl" />

          <span className="relative block">
            <span className="block font-display text-2xl leading-tight font-bold tracking-[-0.03em] lg:text-3xl">
              <span className="sm:max-lg:hidden">{fw.ctaCard.title.replace("{n}", String(more))}</span>
              <span className="hidden sm:max-lg:inline">{fw.ctaCard.title.replace("{n}", String(moreTablet))}</span>
            </span>
            <span className="mt-2 block text-sm text-ink/70 lg:text-base">{fw.ctaCard.body}</span>
            <span className="mt-5 inline-flex items-center gap-1.5 font-semibold lg:mt-6">
              {fw.cta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </span>
          </span>

          <span className="relative flex items-start justify-between gap-6 sm:items-center">
            {/* stacked previews of the rest of the portfolio (phones + tablets) */}
            <span aria-hidden className="flex -space-x-6 lg:hidden">
              {peek.map((p, k) => (
                <span
                  key={p.slug}
                  className="relative block aspect-[1170/630] w-20 overflow-hidden rounded-lg border-2 border-lime bg-white shadow-md transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
                  style={{ rotate: `${(k - 1) * 6}deg`, transitionDelay: `${k * 60}ms` }}
                >
                  <Image src={p.image} alt="" fill sizes="80px" className="object-cover object-top" />
                </span>
              ))}
            </span>
            <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 ease-out-expo group-hover:rotate-45 lg:size-14">
              <ArrowUpRight className="size-5 lg:size-6" aria-hidden />
            </span>
          </span>
        </Link>
      </div>

      {/* ---------- floating "View" cursor (desktop) ---------- */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            aria-hidden
            className={cn(
              "pointer-events-none fixed top-0 left-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 lg:grid",
              "size-24 place-items-center rounded-full bg-lime text-sm font-bold text-ink shadow-xl",
            )}
            style={{ x, y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <span className="flex items-center gap-1">
              {fw.cursorLabel}
              <ArrowUpRight className="size-4" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** Eyebrow, heading, body and (desktop only) "View all" link. Rendered above the grid on
 *  small screens and as the first panel of the sliding row on desktop. */
function Intro({ hint, showLink = true }: { hint?: string; showLink?: boolean }) {
  return (
    <div className="max-w-md">
      <p className="inline-flex w-fit items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
        <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
        {fw.eyebrow}
      </p>
      <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
        {fw.headline}
      </h2>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
        {fw.body}
        {hint && ` ${hint}`}
      </p>
      {showLink && (
        <Link
          href={href(fw.cta.href)}
          className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border bg-surface px-5 py-3 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50 sm:mt-8"
        >
          {fw.cta.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

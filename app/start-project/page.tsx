import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarDays, Quote } from "lucide-react";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { Avatar, byline } from "@/components/sections/testimonials/shared";
import { ProjectForm, ProjectFormFallback } from "@/components/start-project/ProjectForm";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { FadeUp } from "@/components/motion/SplitReveal";
import { Copy, href } from "@/lib/copy";

const sp = site.startProject;
// One real client quote for reassurance next to the form
const quote = testimonials.find((t) => t.name === "Hannah Reid") ?? testimonials[0];

export const metadata: Metadata = {
  title: sp.meta.title,
  description: sp.meta.description,
  alternates: { canonical: "/start-project" },
  openGraph: { url: "/start-project", title: `${sp.meta.title} · ${site.brand.name}`, description: sp.meta.description },
};

/**
 * Start Project. Section 1: photo hero. Section 2: heading + "what happens
 * next" on the left (prerendered), the 3-step form on the right. The form reads ?package= / ?service= to pre-select,
 * so it sits in a Suspense boundary. On phones: heading → form → next steps.
 */
export default function StartProjectPage() {
  return (
    <main id="main" className="relative isolate overflow-hidden">
      <PhotoHero data={sp.hero} />

      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(60%_50%_at_25%_15%,black,transparent_75%)] bg-[size:56px_56px] opacity-60"
      />
      <div aria-hidden className="absolute top-0 left-[-10%] -z-10 h-[26rem] w-[36rem] rounded-full bg-lime/15 blur-[120px] dark:bg-lime/[0.06]" />

      <section
        id="project-form"
        aria-labelledby="sp-form-title"
        className="container-site grid scroll-mt-24 grid-cols-1 gap-10 pt-14 pb-20 sm:pt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10 lg:pt-24">
        {/* heading */}
        <FadeUp className="lg:col-start-1 lg:row-start-1">
          <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {sp.eyebrow}
          </p>
          <h2 id="sp-form-title" className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
            {sp.headline}
          </h2>
          <p className="mt-4 max-w-sm text-lg text-muted-foreground">{sp.subheadline}</p>
        </FadeUp>

        {/* form */}
        <FadeUp delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Suspense fallback={<ProjectFormFallback />}>
            <ProjectForm />
          </Suspense>
        </FadeUp>

        {/* what happens next + reassurance */}
        <FadeUp delay={0.2} className="lg:col-start-1 lg:row-start-2">
          <h2 className="text-sm font-semibold">{sp.next.title}</h2>
          <ol className="mt-4 space-y-4">
            {sp.next.steps.map((s, i) => (
              <li key={s.title} className="flex gap-3.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lime-soft font-mono text-xs font-bold text-lime-strong">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="block text-sm text-muted-foreground">
                    <Copy text={s.body} />
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <figure className="mt-8 rounded-2xl border bg-surface p-5">
            <Quote className="size-5 text-lime-strong" aria-hidden />
            <blockquote className="mt-2 text-[15px] leading-relaxed">{quote.quote}</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Avatar t={quote} className="size-9" />
              <span className="leading-tight">
                <span className="block text-sm font-semibold">{quote.name}</span>
                <span className="block text-xs text-muted-foreground">{byline(quote)}</span>
              </span>
            </figcaption>
          </figure>

          <p className="mt-6 text-sm text-muted-foreground">
            {sp.unsure.text}{" "}
            <Link
              href={href(sp.unsure.href)}
              className="inline-flex items-center gap-1 rounded-sm font-semibold text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <CalendarDays className="size-3.5" aria-hidden />
              {sp.unsure.label}
            </Link>
          </p>
        </FadeUp>
      </section>
    </main>
  );
}

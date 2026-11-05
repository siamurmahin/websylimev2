import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { WorkGallery, type StudyCards } from "@/components/work/WorkGallery";
import { stories } from "@/components/case-studies/shared";
import { CaseStudyCta } from "@/components/case-studies/CaseStudyCta";
import { FinalCta } from "@/components/sections/FinalCta";

const w = site.work;

export const metadata: Metadata = {
  title: w.meta.title,
  description: w.meta.description,
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: `${w.meta.title} · ${site.brand.name}`, description: w.meta.description },
};

/**
 * Work: photo hero → Websites / Graphic design gallery → "story like this?" band
 * → final CTA. Cards open a case study at /work/[slug].
 */
export default function WorkPage() {
  // Only the card fields reach the browser
  const studies: StudyCards = Object.fromEntries(stories.map((s) => [s.slug, { headline: s.headline, stat: s.stats[0] }]));
  return (
    <main id="main" className="relative">
      <PhotoHero data={w.hero} />
      <WorkGallery studies={studies} />
      <CaseStudyCta />
      <FinalCta />
    </main>
  );
}

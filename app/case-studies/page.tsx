import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { CaseStudyCta, CaseStudyList } from "@/components/case-studies/CaseStudyList";
import { FinalCta } from "@/components/sections/FinalCta";

const p = site.caseStudiesPage;

export const metadata: Metadata = {
  title: p.meta.title,
  description: p.meta.description,
  alternates: { canonical: "/case-studies" },
  openGraph: { url: "/case-studies", title: `${p.meta.title} · ${site.brand.name}`, description: p.meta.description },
};

/**
 * Case Studies: photo hero → one row per story (#stories) → "story like
 * this?" band → final CTA. Stories live in content/case-studies.ts.
 */
export default function CaseStudiesPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={p.hero} />
      <CaseStudyList />
      <CaseStudyCta />
      <FinalCta />
    </main>
  );
}

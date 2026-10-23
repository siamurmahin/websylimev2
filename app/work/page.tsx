import type { Metadata } from "next";
import { site } from "@/content/site";
import { portfolio } from "@/content/portfolio";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { WorkGallery } from "@/components/work/WorkGallery";
import { FinalCta } from "@/components/sections/FinalCta";

const w = site.work;

export const metadata: Metadata = {
  title: w.meta.title,
  description: w.meta.description,
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: `${w.meta.title} · ${site.brand.name}`, description: w.meta.description },
};

/** Work: photo hero → Websites / Graphic design gallery (grid + lightbox) → final CTA. */
export default function WorkPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={{ ...w.hero, points: w.hero.points.map((p) => p.replace("{n}", String(portfolio.length))) }} />
      <WorkGallery />
      <FinalCta />
    </main>
  );
}

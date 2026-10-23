import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import {
  WebsiteGrowthUpsell,
  WebsiteIncluded,
  WebsitePackages,
  WebsitePains,
  WebsitePillars,
} from "@/components/sections/services/website/WebsiteSections";
import { Process } from "@/components/sections/Process";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";

const s = site.services.websiteDesign;

export const metadata: Metadata = {
  title: s.meta.title,
  description: s.meta.description,
  alternates: { canonical: "/services/website-design" },
  openGraph: { url: "/services/website-design", title: `${s.meta.title} · ${site.brand.name}`, description: s.meta.description },
};

/**
 * Website Design service page — a short sales page (simplicity rule):
 * photo hero → problems → how we fix it → packages (#packages, same cards as
 * Pricing) + "which one fits you" → included with every site → process →
 * real work → Growth upsell → website FAQ → final CTA.
 */
export default function WebsiteDesignPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={s.hero} />
      <WebsitePains />
      <WebsitePillars />
      <WebsitePackages />
      <WebsiteIncluded />
      <Process />
      <FeaturedWork />
      <WebsiteGrowthUpsell />
      <FAQ categories={["Websites", "Billing"]} />
      <FinalCta />
    </main>
  );
}

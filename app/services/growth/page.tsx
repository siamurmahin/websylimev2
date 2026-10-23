import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { GrowthHandled, GrowthHowItWorks, GrowthNeedSite } from "@/components/sections/services/growth/GrowthSections";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";

const g = site.services.growth;

export const metadata: Metadata = {
  title: g.meta.title,
  description: g.meta.description,
  alternates: { canonical: "/services/growth" },
  openGraph: { url: "/services/growth", title: `${g.meta.title} · ${site.brand.name}`, description: g.meta.description },
};

/**
 * All-in-One Growth service page. Kept short (simplicity rule): hero → what we
 * handle → "needs an existing site" note → plans (the homepage pricing, one
 * source) → how a month works → plan & billing FAQ → final CTA.
 * Plan cards carry ids, so menu links like /services/growth#lead-growth land on them.
 */
export default function GrowthPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={g.hero} />
      <GrowthHandled />
      <GrowthNeedSite />
      <div id="plans" className="scroll-mt-16">
        <Pricing needSiteLink={false} />
      </div>
      <GrowthHowItWorks />
      <FAQ categories={["Monthly plans", "Billing"]} />
      <FinalCta />
    </main>
  );
}

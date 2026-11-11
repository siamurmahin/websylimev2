import type { Metadata } from "next";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { GraphicHow, GraphicPlans, GraphicWhat, GraphicWork } from "@/components/sections/services/graphic/GraphicSections";
import { WebsiteGrowthUpsell } from "@/components/sections/services/website/WebsiteSections";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";

const g = site.services.graphicDesign;

export const metadata: Metadata = {
  title: g.meta.title,
  description: g.meta.description,
  alternates: { canonical: "/services/graphic-design" },
  openGraph: { url: "/services/graphic-design", title: `${g.meta.title} · ${site.brand.name}`, description: g.meta.description },
};

/**
 * Graphic Design service page. Kept short (simplicity rule): photo hero →
 * what we design (#social, #ads …) → design work → monthly plans (#plans) →
 * how it works → "we post it too" Growth banner → design FAQ → final CTA.
 */
export default function GraphicDesignPage() {
  return (
    <main id="main" className="relative">
      <JsonLd
        data={serviceSchema({
          name: "Graphic Design",
          description: g.meta.description,
          path: "/services/graphic-design",
          serviceType: "Graphic design",
          plans: g.plans.items.map((p) => ({ name: p.name, price: p.price, monthly: true, url: `/get-started?plan=${p.id}` })),
        })}
      />
      <PhotoHero data={g.hero} />
      <GraphicWhat />
      <GraphicWork />
      <GraphicPlans />
      <GraphicHow />
      <WebsiteGrowthUpsell data={g.growthUpsell} />
      <FAQ categories={["Graphic design", "Billing"]} />
      <FinalCta />
    </main>
  );
}

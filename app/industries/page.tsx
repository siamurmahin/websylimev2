import type { Metadata } from "next";
import { site } from "@/content/site";
import { industriesPage as p } from "@/content/industries";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { IndustryGrid } from "@/components/industries/IndustrySections";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: p.meta.title,
  description: p.meta.description,
  alternates: { canonical: "/industries" },
  openGraph: { url: "/industries", title: `${p.meta.title} · ${site.brand.name}`, description: p.meta.description },
};

/** Home services: photo hero → one card per trade (#trades) → final CTA. Trades live in content/industries.ts. */
export default function IndustriesPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={p.hero} />
      <IndustryGrid />
      <FinalCta />
    </main>
  );
}

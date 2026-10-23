import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { CareersApply, CareersHow, CareersPerks, CareersRoles } from "@/components/careers/CareersSections";

const c = site.careers;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: "/careers" },
  openGraph: { url: "/careers", title: `${c.meta.title} · ${site.brand.name}`, description: c.meta.description },
};

/**
 * Careers: photo hero → how we work → perks → open roles (#roles, or a
 * "no roles right now" card) → application form (#apply). No customer
 * Final CTA here — this page is for applicants.
 */
export default function CareersPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={c.hero} />
      <CareersHow />
      <CareersPerks />
      <CareersRoles />
      <CareersApply />
    </main>
  );
}

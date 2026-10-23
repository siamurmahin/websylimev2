import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { FaqExplorer } from "@/components/faq/FaqExplorer";
import { FinalCta } from "@/components/sections/FinalCta";

const p = site.faqPage;

export const metadata: Metadata = {
  title: p.meta.title,
  description: p.meta.description,
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", title: `${p.meta.title} · ${site.brand.name}`, description: p.meta.description },
};

// FAQPage structured data, built from the same questions (placeholders stripped)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: site.home.faq.items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a.replace(/\[([^\]]+)\]/g, "$1") },
  })),
};

/**
 * FAQ page: photo hero → every question grouped by topic with search
 * (#questions, #general, #websites …) → final CTA.
 * Questions live in content/home/faq.ts.
 */
export default function FaqPage() {
  return (
    <main id="main" className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PhotoHero data={p.hero} />
      <FaqExplorer />
      <FinalCta />
    </main>
  );
}

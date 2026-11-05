import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { industries, industriesPage } from "@/content/industries";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { IndustryFaq, IndustryIncluded, IndustryPages, IndustryPains, IndustryRelated } from "@/components/industries/IndustrySections";

const page = industriesPage.page;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const data = industries.find((i) => i.slug === slug);
  if (!data) return {};
  const url = `/industries/${data.slug}`;
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: url },
    openGraph: { url, title: `${data.meta.title} · ${site.brand.name}`, description: data.meta.description },
  };
}

// Blocking route on purpose (same as blog posts): an unknown slug returns a real 404.
export const instant = false;

/**
 * One trade: photo hero → problems → what's included (#included) → pages + add-on
 * → real home service work → FAQ + other trades → final CTA.
 */
export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const data = industries.find((i) => i.slug === slug);
  if (!data) notFound();
  const url = new URL(`/industries/${data.slug}`, site.meta.url).toString();

  return (
    <main id="main" className="relative">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: data.meta.title,
              description: data.meta.description,
              url,
              serviceType: "Website design",
              provider: { "@type": "Organization", name: site.brand.name, url: site.meta.url },
              areaServed: site.meta.schema.areaServed.map((name) => ({ "@type": "Country", name })),
            },
            {
              "@type": "FAQPage",
              mainEntity: data.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.meta.url },
                { "@type": "ListItem", position: 2, name: "Home services", item: new URL("/industries", site.meta.url).toString() },
                { "@type": "ListItem", position: 3, name: data.name, item: url },
              ],
            },
          ],
        }}
      />
      <PhotoHero data={{ ...data.hero, primaryCta: page.primaryCta, secondaryCta: page.secondaryCta }} />
      <IndustryPains data={data} />
      <IndustryIncluded data={data} />
      <IndustryPages data={data} />
      <IndustryRelated data={data} />
      <IndustryFaq data={data} />
      <FinalCta />
    </main>
  );
}

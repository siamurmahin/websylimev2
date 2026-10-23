import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/copy";

/*
 * schema.org data built from content/site.ts. Honesty rule: anything still a
 * [placeholder] is left out, so search engines never show unconfirmed details.
 * Fill the value in site.ts and it appears here automatically.
 */

const url = site.meta.url;
const abs = (path: string) => new URL(path, url).toString();
const real = (v: string | null | undefined): v is string => !!v && !isPlaceholder(v);

const BUSINESS_ID = abs("/#business");
const WEBSITE_ID = abs("/#website");

/** Site-wide: the business (a LocalBusiness subtype) and the website. */
export function siteSchema() {
  const { contact, social } = site.footer;
  const sameAs = social.map((s) => s.href).filter(real);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: site.brand.name,
        legalName: site.brand.legalName,
        url,
        description: site.meta.description,
        image: abs("/opengraph-image"),
        ...(real(site.brand.logo.src) && { logo: abs(site.brand.logo.src) }),
        ...(real(contact.email) && { email: contact.email }),
        // Full street address is added once it's confirmed (footer.contact.address)
        address: real(contact.address)
          ? { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "US" }
          : { "@type": "PostalAddress", addressCountry: "US" },
        areaServed: site.meta.schema.areaServed.map((name) => ({ "@type": "Country", name })),
        knowsAbout: site.meta.schema.services,
        ...(sameAs.length && { sameAs }),
        makesOffer: site.home.pricing.plans.map((plan) => ({
          "@type": "Offer",
          name: `${plan.name} — ${site.home.pricing.eyebrow}`,
          description: plan.tagline,
          url: abs(`/start-project?package=${plan.id}`),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.price,
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: site.brand.name,
        url,
        inLanguage: "en",
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  };
}

/** Homepage FAQ — only questions whose answer is final (no placeholders). */
export function faqSchema() {
  const items = site.home.faq.items.filter((it) => !isPlaceholder(it.a));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

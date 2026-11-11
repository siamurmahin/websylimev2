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
        // LocalBusiness + its more specific subtype, so every reader recognises it
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": BUSINESS_ID,
        name: site.brand.name,
        legalName: site.brand.legalName,
        url,
        description: site.meta.description,
        image: abs("/opengraph-image"),
        logo: abs(site.brand.logo.src),
        ...(real(contact.email) && { email: contact.email }),
        telephone: contact.phone.href.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.postal.street,
          addressLocality: contact.postal.city,
          addressRegion: contact.postal.region,
          postalCode: contact.postal.postalCode,
          addressCountry: "US",
        },
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

type Crumb = { name: string; path: string };

/** Home › … › this page. Search engines can show the trail instead of the bare URL. */
function breadcrumbList(trail: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function breadcrumbSchema(trail: Crumb[]) {
  return { "@context": "https://schema.org", ...breadcrumbList(trail) };
}

type PlanOffer = { name: string; price: string | number; monthly?: boolean; url: string };
const toPrice = (p: string | number) => (typeof p === "number" ? p : Number(p.replace(/[^0-9.]/g, "")));

function offers(plans: PlanOffer[]) {
  return plans.map((p) => {
    const price = toPrice(p.price);
    return {
      "@type": "Offer",
      name: p.name,
      url: abs(p.url),
      price,
      priceCurrency: "USD",
      ...(p.monthly && { priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "USD", unitText: "MONTH" } }),
    };
  });
}

/** A service page: the service, its plans (prices from the same content as the page) and the breadcrumb. */
export function serviceSchema(s: { name: string; description: string; path: string; serviceType: string; plans?: PlanOffer[] }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": abs(`${s.path}#service`),
        name: s.name,
        description: s.description,
        url: abs(s.path),
        serviceType: s.serviceType,
        provider: { "@id": BUSINESS_ID },
        areaServed: site.meta.schema.areaServed.map((name) => ({ "@type": "Country", name })),
        ...(s.plans?.length && { offers: offers(s.plans) }),
      },
      breadcrumbList([{ name: s.name, path: s.path }]),
    ],
  };
}

/** WebsyChat is software, so it is described as a web app with its monthly plans. */
export function softwareSchema(s: { name: string; description: string; path: string; plans: PlanOffer[] }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": abs(`${s.path}#app`),
        name: s.name,
        description: s.description,
        url: abs(s.path),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        publisher: { "@id": BUSINESS_ID },
        offers: offers(s.plans),
      },
      breadcrumbList([{ name: s.name, path: s.path }]),
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

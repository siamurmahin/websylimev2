// Shared across the site → meta.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
export const meta = {
  url: "https://websylime.com", // [confirm production domain]
  title: "Websy Lime — Websites that turn visitors into buyers",
  description:
    "Your website, social presence and growth — handled by one dedicated team. You run the business. We handle everything online.",
  locale: "en_US",
  // Social preview image (app/opengraph-image.tsx)
  og: {
    alt: "Websy Lime — websites, social and growth for service businesses",
    eyebrow: "Web design · Social · Local growth",
    headline: "Websites that turn visitors into buyers.",
    footer: "One team. One invoice. 2% to charity.",
  },
  // Structured data (components/seo/JsonLd.tsx). Only real values are output —
  // anything still in [brackets] is skipped until it's filled in.
  schema: {
    areaServed: ["United States", "United Kingdom"],
    services: ["Website design", "SEO", "Social media management", "Google Business Profile management", "Google Ads management", "Graphic design"],
  },
};

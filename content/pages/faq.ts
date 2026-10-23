// Page → faq (/faq). Every question lives in content/home/faq.ts — add or edit
// questions there and they show up here automatically, grouped by category.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const faqPage = {
  meta: {
    title: "FAQ",
    description: "Straight answers about Websy Lime websites, monthly growth plans, graphic design, WebsyChat and billing.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "FAQ",
    headline: "Questions? We've got answers.",
    headlineAccent: "got answers.",
    subheadline: "Plain-English answers about websites, monthly plans, design, WebsyChat and billing. Can't find yours? Just ask.",
    primaryCta: { label: "Browse questions", href: "#questions" },
    secondaryCta: { label: "Ask us", href: "/contact" },
    points: ["Plain-English answers", "No sales pitch", "Real people if you need us"],
    // Illustrative photo (AI-generated, no faces) — swap for a real photo later.
    image: { src: "/images/faq-hero.webp", alt: "A bright desk with a laptop, headphones, a mug and sticky notes" },
  },

  // Section 2 — search + all questions
  search: {
    label: "Search questions",
    placeholder: "Search, e.g. hosting or cancel",
    all: "All",
    empty: { title: "No answers for that yet.", body: "Ask us and we'll reply within [1 business day].", cta: { label: "Ask a question", href: "/contact" } },
  },
  topicsTitle: "Topics",

  // Order of the groups on the page. `id` is the anchor (/faq#billing).
  // `link` points to the page that explains that topic in full.
  groups: [
    { category: "General", id: "general", link: null as { label: string; href: string } | null },
    { category: "Websites", id: "websites", link: { label: "See website packages", href: "/services/website-design#packages" } },
    { category: "Monthly plans", id: "monthly-plans", link: { label: "See Growth plans", href: "/services/growth" } },
    { category: "Graphic design", id: "graphic-design", link: { label: "See design plans", href: "/services/graphic-design#plans" } },
    { category: "WebsyChat", id: "websychat", link: { label: "See WebsyChat", href: "/products/websychat" } },
    { category: "Billing", id: "billing", link: { label: "See all pricing", href: "/pricing" } },
  ],
};

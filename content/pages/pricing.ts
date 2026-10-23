// Page → pricing (/pricing). Growth plan prices come from content/home/pricing.ts
// (one source); Website Design packages are defined here.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const pricingPage = {
  meta: {
    title: "Pricing",
    description:
      "Simple, honest pricing. A one-time price for your new website (hosting included), or a monthly plan to keep it growing. No hidden fees.",
  },

  hero: {
    eyebrow: "Pricing",
    headline: "Simple, honest pricing.",
    headlineAccent: "honest",
    subheadline: "One price for a new website, or one monthly plan to keep it growing. No hidden fees.",
    chips: ["No hidden fees", "Hosting included with Website Design", "2% goes to charity"],
  },

  // The one switch at the top. ids are also the URL hash: /pricing#growth opens the Growth tab.
  tabs: [
    { id: "website", label: "Website Design", note: "One-time" },
    { id: "growth", label: "All-in-One Growth", note: "Monthly" },
  ],

  website: {
    intro: "A new website, built for you. Hosting included.",
    perLabel: "one-time",
    cta: "Get started",
    footnote: "One-time price. Hosting and SSL are included; your domain name is separate. Prices in USD.",
    // Rows shown on every card, in this order. "—" = not included.
    rows: [
      "Pages",
      "Custom design",
      "Mobile-friendly & fast",
      "Hosting + SSL",
      "Forms",
      "Basic SEO setup",
      "Logo design",
      "Social media brand kit",
      "Revisions",
      "Ready in about",
    ],
    // ids match the Start Project form, so "Get started" pre-selects the package
    plans: [
      {
        id: "landing",
        name: "[Launch]",
        tagline: "One page, one offer — great for coaches and new businesses.",
        price: "$[X]",
        badge: null as string | null,
        values: ["1 landing page", "Included", "Included", "Included", "Contact form", "Included", "—", "—", "[1] round", "[1] week"],
      },
      {
        id: "business",
        name: "[Business]",
        tagline: "A full website for local service businesses.",
        price: "$[X]",
        badge: "Recommended" as string | null,
        values: ["4–5 pages", "Included", "Included", "Included", "Contact + quote form", "Included", "Included", "—", "[2] rounds", "[2] weeks"],
      },
      {
        id: "store",
        name: "[Store]",
        tagline: "An online store to sell your products (WooCommerce).",
        price: "$[X]",
        badge: null as string | null,
        values: ["Shop + product pages", "Included", "Included", "Included", "Checkout + contact", "Included", "Included", "Included", "[2] rounds", "[3–4] weeks"],
      },
    ],
  },

  growth: {
    intro: "Monthly plans that grow the website you already have.",
  },

  compare: { open: "Compare every feature", close: "Hide comparison", feature: "Feature" },

  included: {
    title: "Included with every plan",
    items: [
      "One dedicated point of contact",
      "Clear updates, in plain English",
      "Nothing goes live without your OK",
      "2% of what you pay goes to charity",
    ],
  },

  unsure: { text: "Not sure which one fits?", label: "Book a free call", href: "/book-a-call" },
};

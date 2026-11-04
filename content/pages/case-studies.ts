// Page → caseStudiesPage (/case-studies and each case study page).
// The stories themselves live in content/case-studies.ts.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const caseStudiesPage = {
  meta: {
    title: "Website Design Case Studies",
    description: "Website design case studies by industry: what was holding each business back, what we built, and how inquiries and sales changed.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "Case studies",
    headline: "Real businesses. Real results.",
    headlineAccent: "Real results.",
    subheadline: "What was holding each business back, what we built, and what changed after launch — in plain English.",
    primaryCta: { label: "Read the stories", href: "#stories" },
    secondaryCta: { label: "See all our work", href: "/work" },
    points: ["45 case studies", "Sorted by industry", "Plain-English stories"],
    // Illustrative photo (AI-generated, no faces) — swap for a real photo later.
    image: { src: "/images/case-studies-hero.webp", alt: "A laptop and tablet showing website designs on a bright studio table" },
  },

  // Section 2 — stories
  readMore: "Read the case study",
  allLabel: "All industries",
  moreLabel: "Show more",

  // Section 3 — CTA band
  cta: {
    title: "Want a story like this?",
    body: "Tell us about your business. We'll reply with a plan and a clear price.",
    primary: { label: "Start your project", href: "/start-project" },
    secondary: { label: "Book a free call", href: "/book-a-call" },
  },

  // Case study page
  study: {
    back: "All case studies",
    visit: "Visit the live site",
    facts: { industry: "Industry", location: "Location", services: "Services", launched: "Launched", plan: "Monthly plan" },
    challengeTitle: "The challenge",
    didTitle: "What we did",
    resultsTitle: "The results",
    growthTitle: "Growing after launch",
    growthCta: { label: "See the Growth plans", href: "/services/growth#plans" },
    // What each monthly plan includes (same numbers as content/home/pricing.ts)
    growthPlans: {
      Foundation: ["3 new pages a month", "2 SEO articles a month", "6 social posts a month", "4 Google Business posts a month"],
      "Lead Growth": ["5 new pages a month", "4 SEO articles a month", "10 social posts a month", "Google Ads setup", "Google review monitoring"],
      "Market Leader": ["8 new pages a month", "6 SEO articles a month", "14 social posts and up to 4 video edits a month", "Up to 3 Google Ads campaigns managed", "Up to 30 review replies a month"],
    },
    nextLabel: "Next case study",
    home: "Home",
    list: "Case studies",
  },
};

// Each case study page (/work/[slug]). The list of work is the Work page (content/pages/work.ts).
// The stories themselves live in content/case-studies.ts.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const caseStudiesPage = {
  // CTA band
  cta: {
    title: "Want a story like this?",
    body: "Tell us about your business. We'll reply with a plan and a clear price.",
    primary: { label: "Start your project", href: "/start-project" },
    secondary: { label: "Book a free call", href: "/book-a-call" },
  },

  // Case study page
  study: {
    back: "All work",
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
    list: "Work",
  },
};

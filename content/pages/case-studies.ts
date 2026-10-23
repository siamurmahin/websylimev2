// Page → caseStudiesPage (/case-studies and each case study page).
// The stories themselves live in content/case-studies.ts.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const caseStudiesPage = {
  meta: {
    title: "Case Studies",
    description: "Real stories from small businesses we've built websites for — what was wrong, what we did and what changed.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "Case studies",
    headline: "Real businesses. Real results.",
    headlineAccent: "Real results.",
    subheadline: "What was holding each business back, what we built, and what changed after launch — in plain English.",
    primaryCta: { label: "Read the stories", href: "#stories" },
    secondaryCta: { label: "See all our work", href: "/work" },
    points: ["Real clients", "Plain-English stories", "Only confirmed numbers"],
    // Illustrative photo (AI-generated, no faces) — swap for a real photo later.
    image: { src: "/images/case-studies-hero.webp", alt: "A laptop and tablet showing website designs on a bright studio table" },
  },

  // Section 2 — stories
  readMore: "Read the case study",

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
    facts: { industry: "Industry", location: "Location", services: "Services", timeline: "Timeline" },
    challengeTitle: "The challenge",
    didTitle: "What we did",
    resultsTitle: "The results",
    nextLabel: "Next case study",
  },
};

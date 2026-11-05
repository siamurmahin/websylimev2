// Page → work (/work). The projects themselves live in content/portfolio.ts
// (websites) and content/design-portfolio.ts (graphic design).
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const work = {
  meta: {
    title: "Website Design Portfolio & Case Studies",
    description: "Websites we've built for contractors, home trades, clinics, law firms and more, with case studies on what was holding each business back and what changed.",
  },

  hero: {
    eyebrow: "Our work",
    headline: "Real sites for real businesses.",
    headlineAccent: "real businesses.",
    subheadline: "Every project is a live client website. Read what was holding each business back, what we built and what changed.",
    primaryCta: { label: "See the work", href: "#gallery" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    points: ["A selection from 350+ projects", "Home services, health, law & more", "Built and looked after by us"],
    // Illustrative photo (AI-generated, no people) — swap for a real studio photo later.
    image: { src: "/images/work-hero.webp", alt: "A designer's desk with a monitor, laptop and phone showing website layouts" },
  },

  tabs: { websites: "Websites", design: "Graphic design" },
  // Category chips appear automatically once projects have real categories (not "[Category]")
  allLabel: "All",
  showMore: "Show more projects",
  perPage: 12,
  viewLabel: "View",
  readMore: "Read the case study",

  designEmpty: {
    title: "Graphic design portfolio coming soon",
    body: "We'll upload our social posts, ads and branding work here soon. Want to see examples now? Ask us on a call.",
    cta: { label: "Book a free call", href: "/book-a-call" },
  },

  lightbox: { close: "Close", start: "Want one like this?", startCta: "Let's Build Yours" },
};

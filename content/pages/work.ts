// Page → work (/work). The projects themselves live in content/portfolio.ts
// (websites) and content/design-portfolio.ts (graphic design).
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const work = {
  meta: {
    title: "Our Work",
    description: "Real websites we've built for real businesses — law firms, clinics, contractors, coaches and more.",
  },

  hero: {
    eyebrow: "Our work",
    headline: "Real sites for real businesses.",
    headlineAccent: "real businesses.",
    subheadline: "Every project here is a live client website. Have a look around — then let's build yours.",
    primaryCta: { label: "See the work", href: "#gallery" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    // {n} = number of websites in content/portfolio.ts (counted automatically)
    points: ["{n} client websites", "Law, health, trades, coaching & more", "Built and looked after by us"],
    // Illustrative photo (AI-generated, no people) — swap for a real studio photo later.
    image: { src: "/images/work-hero.webp", alt: "A designer's desk with a monitor, laptop and phone showing website layouts" },
  },

  tabs: { websites: "Websites", design: "Graphic design" },
  // Category chips appear automatically once projects have real categories (not "[Category]")
  allLabel: "All",
  showMore: "Show more projects",
  perPage: 12,
  viewLabel: "View",

  designEmpty: {
    title: "Graphic design portfolio coming soon",
    body: "Social posts, ads and branding work will live here. Want to see examples now? Ask us on a call.",
    cta: { label: "Book a free call", href: "/book-a-call" },
  },

  lightbox: { close: "Close", visit: "Visit live site", start: "Want one like this?", startCta: "Let's Build Yours" },
};

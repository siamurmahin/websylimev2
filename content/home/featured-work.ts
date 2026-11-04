// Homepage → featuredWork section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
export const featuredWork = {
  eyebrow: "Selected work",
  headline: "Work we're proud of.",
  body: "Real sites for real local businesses.",
  // Shown on desktop only, where the row scrolls sideways (phones/tablets get a grid)
  scrollHint: "Scroll to explore.",
  cta: { label: "View all projects", href: "/work" },
  // Floating label that follows the cursor over a project
  cursorLabel: "View",
  // {n} = projects in content/portfolio.ts not shown above (counted automatically)
  ctaCard: { title: "{n} more projects", body: "Law firms, clinics, contractors, coaches and more." },
  // Pick 3–4 projects by slug from content/portfolio.ts (TODO.md: choose the best + add real results)
  items: [
    { slug: "home-renovation-contractor-website-design", tags: ["Website Design", "Construction"], result: "[9] project inquiries a month" },
    { slug: "chiropractor-website-design", tags: ["Website Design", "Healthcare"], result: "[55] online bookings a month" },
    { slug: "kitesurf-school-website-design", tags: ["Website Design", "Sports"], result: "[40] lesson bookings a month" },
    { slug: "legal-tech-consultancy-website-design", tags: ["Website Design", "Legal tech"], result: "[7] qualified leads a month" },
  ],
};

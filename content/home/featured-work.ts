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
    { slug: "hallmark-contractors", tags: ["Website Design", "[Industry]"], result: "[Result — e.g. 2× more quote requests]" },
    { slug: "gh-chiropractic", tags: ["Website Design", "[Industry]"], result: "[Result — e.g. +40% booked visits]" },
    { slug: "the-kitesurf-academy", tags: ["Website Design", "[Industry]"], result: "[Result — e.g. bookings up 3×]" },
    { slug: "law-sparks", tags: ["Website Design", "[Industry]"], result: "[Result — e.g. 25 new leads / month]" },
  ],
};

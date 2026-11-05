// Homepage → featuredWork section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
export const featuredWork = {
  eyebrow: "Selected work",
  headline: "Work we're proud of.",
  body: "Real sites for home service and local businesses.",
  // Shown on desktop only, where the row scrolls sideways (phones/tablets get a grid)
  scrollHint: "Scroll to explore.",
  cta: { label: "View all projects", href: "/work" },
  // Floating label that follows the cursor over a project
  cursorLabel: "View",
  // {n} = projects in content/portfolio.ts not shown above (counted automatically)
  ctaCard: { title: "{n} more projects", body: "Contractors, home trades, clinics, law firms and more." },
  // Pick 3–4 projects by slug from content/portfolio.ts (results are estimates until confirmed, see TODO.md)
  items: [
    { slug: "home-renovation-contractor-website-design", tags: ["Website Design", "Home services"], result: "9 project inquiries a month" },
    { slug: "heat-pump-company-website-design", tags: ["Website Design", "Home services"], result: "30 service bookings a month" },
    { slug: "flooring-company-website-design", tags: ["Website Design", "Home services"], result: "20 quote requests a month" },
    { slug: "grab-hire-company-website-design", tags: ["Website Design", "Construction"], result: "70 quote requests a month" },
  ],
};

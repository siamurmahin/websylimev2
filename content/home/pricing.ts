// Homepage → pricing section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

// Homepage shows the All-in-One Growth plans only (Website Design and
// Graphic Design pricing will live on their own pages / the /pricing page)
export const pricing = {
  eyebrow: "All-in-One Growth",
  headline: "Simple pricing. Serious results.",
  subheadline: "Monthly plans that grow the website you already have. New pages, SEO, social and Google — one team, one invoice.",
  // Growth plans work on an existing site; new sites (with hosting) are the Website Design packages
  needSite: { text: "No website yet?", label: "Start with Website Design", note: "hosting included", href: "/services/website-design" },
  cardBadge: "2% goes to charity",
  perMonth: "/month",
  cta: "Get started",
  compare: { label: "Compare every feature", href: "/pricing#growth" },
  footnote:
    "Growth plans work on your existing website. Your domain, hosting and Google Ads spend stay separate (ad spend goes directly to Google). Rankings, leads and reviews can't be guaranteed — we'll always tell you exactly what we're doing and why.",
  // Rows shown on every card, in this order. "—" = not included.
  rows: [
    "New pages on your website / month",
    "SEO blog articles / month",
    "Social posts (Facebook & Instagram)",
    "Google Business Profile posts",
    "Video edits / month",
    "Google Ads",
    "Google reviews",
    "Revisions per deliverable",
  ],
  plans: [
    {
      id: "foundation",
      name: "Foundation",
      tagline: "Build a professional online presence and keep it active.",
      price: 1299,
      wasPrice: null as number | null,
      badge: null as string | null,
      values: ["3", "2 (800 words)", "6", "4", "—", "—", "—", "1 round"],
    },
    {
      id: "lead-growth",
      name: "Lead Growth",
      tagline: "Improve local visibility and win more of the jobs you want.",
      price: 1999,
      wasPrice: null as number | null,
      badge: "Recommended" as string | null,
      values: ["5", "4 (1,000 words)", "10", "4", "—", "Account setup", "Profile monitoring", "2 rounds"],
    },
    {
      id: "market-leader",
      name: "Market Leader",
      tagline: "Your complete online presence, reputation and marketing — handled.",
      price: 2699,
      wasPrice: 2999 as number | null,
      badge: "Save $300/mo" as string | null,
      values: ["8", "6 (1,000 words)", "14", "6", "Up to 4", "Up to 3 campaigns managed", "Up to 30 replies / month", "2 rounds"],
    },
  ],
  charity: {
    eyebrow: "Our promise",
    title: "Every project gives back.",
    body: "2% of everything we earn goes to charity. When you grow with us, you help someone else grow too.",
    partner: "[Charity / cause name]",
    partnerLabel: "Supporting",
    flowFrom: "Your plan",
    steps: [
      { title: "You grow", body: "You pick a plan and we get to work." },
      { title: "2% is set aside", body: "From every payment, automatically." },
      { title: "It goes to good", body: "Donated to [Charity / cause name]." },
    ],
    // Plan suggests a yearly public update for credibility — confirm before launch
    report: "[We share a yearly giving update]",
  },
};

/**
 * Case studies (/case-studies and /case-studies/[slug]). One entry per client
 * story. `slug` must match a website in content/portfolio.ts — the name,
 * screenshot and live URL come from there. Newest first.
 *
 * Honesty rule: only real numbers and real quotes. Everything in [brackets]
 * is a placeholder until the client confirms it (see TODO.md).
 */

export type CaseStudy = {
  slug: string;
  industry: string;
  location: string;
  services: string[];
  /** The one-line result, e.g. "2× more quote requests in 3 months" */
  headline: string;
  summary: string;
  /** Exactly 3 — shown on the card and the stats band */
  stats: { value: string; label: string }[];
  challenge: string;
  /** What we did, one short line each */
  did: string[];
  results: string;
  timeline: string;
  quote: { text: string; name: string; role: string } | null;
  /** Optional bigger screenshot (≥2400px wide) — otherwise the portfolio one is used */
  screenshot?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hallmark-contractors",
    industry: "[Construction]",
    location: "[City, UK]",
    services: ["Website Design", "[Local SEO]"],
    headline: "[Headline result — e.g. 2× more quote requests in 3 months]",
    summary: "[One or two sentences: who the client is and what changed after working with us.]",
    stats: [
      { value: "[2×]", label: "[more quote requests]" },
      { value: "[#1]", label: "[on Google for “contractor near me”]" },
      { value: "[3 wks]", label: "[from kickoff to launch]" },
    ],
    challenge: "[What wasn't working before — e.g. an old site that didn't work on phones and brought in almost no enquiries.]",
    did: ["[New mobile-first WordPress website]", "[Clear quote form on every page]", "[Google Business Profile set up and optimised]", "[Fast hosting and SSL]"],
    results: "[What happened after launch, in plain English — only numbers the client has confirmed.]",
    timeline: "[3 weeks]",
    quote: { text: "[Short quote from the client about working with us.]", name: "[Client name]", role: "[Role, Hallmark Contractors]" },
  },
  {
    slug: "gh-chiropractic",
    industry: "[Healthcare]",
    location: "[City, UK]",
    services: ["Website Design", "[Online booking]"],
    headline: "[Headline result — e.g. +40% booked visits]",
    summary: "[One or two sentences: who the client is and what changed after working with us.]",
    stats: [
      { value: "[+40%]", label: "[booked visits]" },
      { value: "[24/7]", label: "[online booking]" },
      { value: "[2 wks]", label: "[from kickoff to launch]" },
    ],
    challenge: "[What wasn't working before.]",
    did: ["[New website with clear treatments and prices]", "[Online booking built in]", "[Local SEO for the clinic area]"],
    results: "[What happened after launch — confirmed numbers only.]",
    timeline: "[2 weeks]",
    quote: null,
  },
  {
    slug: "the-kitesurf-academy",
    industry: "[Sport & leisure]",
    location: "[City, Country]",
    services: ["Website Design", "[Bookings]"],
    headline: "[Headline result — e.g. bookings up 3×]",
    summary: "[One or two sentences: who the client is and what changed after working with us.]",
    stats: [
      { value: "[3×]", label: "[more bookings]" },
      { value: "[X]", label: "[lessons booked online]" },
      { value: "[X wks]", label: "[from kickoff to launch]" },
    ],
    challenge: "[What wasn't working before.]",
    did: ["[New website with lesson packages]", "[Online booking and payments]", "[Photo-led design]"],
    results: "[What happened after launch — confirmed numbers only.]",
    timeline: "[X weeks]",
    quote: null,
  },
];

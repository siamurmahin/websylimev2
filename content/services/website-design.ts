// Service page → websiteDesign (/services/website-design).
// Package names, prices and features live in content/pages/pricing.ts (one source,
// shared with the Pricing page). FAQ answers live in content/home/faq.ts ("Websites").
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

export const websiteDesign = {
  meta: {
    title: "Website Design",
    description:
      "Fast, mobile-first WordPress websites for local service businesses — built to turn visitors into calls, bookings and quote requests. Hosting included.",
  },

  // Section 1 — hero with photo (offer first: what, for whom, price, how fast)
  hero: {
    eyebrow: "Website Design",
    headline: "A website that books jobs while you work.",
    headlineAccent: "books jobs",
    subheadline: "Fast, mobile-first websites that turn local visitors into calls, bookings and quote requests. Hosting included.",
    primaryCta: { label: "Let's Build Yours", href: "/start-project?service=website-design" },
    secondaryCta: { label: "See packages", href: "#packages" },
    points: ["Hosting included", "From $[X]", "Live in about [2] weeks"],
    // Illustrative photo (AI-generated, no people) — swap for a real client photo later.
    image: { src: "/images/website-design-hero.webp", alt: "A small business counter with a tablet and phone showing a modern website" },
  },

  // Section 2 — problems (client's words, not ours)
  pains: {
    eyebrow: "Sound familiar?",
    headline: "Your website should bring in work. Does it?",
    items: [
      { title: "It looks fine. It just doesn't sell.", body: "People visit, look around, and leave without calling.", icon: "trendingDown" as IconKey },
      { title: "Built years ago. Looks like it.", body: "An old site makes a great business look out of date.", icon: "hourglass" as IconKey },
      { title: "Broken on phones.", body: "Most visitors are on mobile. Slow or messy, and they're gone.", icon: "phoneMissed" as IconKey },
      { title: "Nobody finds you on Google.", body: "Your competitors show up. You don't.", icon: "mapPinOff" as IconKey },
      { title: "You can't change a thing.", body: "Every small update means waiting on someone.", icon: "calendarX" as IconKey },
      { title: "Surprise bills, every year.", body: "Hosting, plugins, renewals — the costs never stop.", icon: "receipt" as IconKey },
    ],
  },

  // Section 3 — how we fix it (4 pillars)
  pillars: {
    eyebrow: "How we fix it",
    headline: "Built to turn visitors into customers.",
    subheadline: "Every site we build does four things well. That's what makes the phone ring.",
    items: [
      { title: "Fast", body: "Pages load quickly, so people stay instead of leaving.", icon: "zap" as IconKey },
      { title: "Mobile-first", body: "Designed for phones first, then made beautiful on desktop.", icon: "layout" as IconKey },
      { title: "Built to get calls", body: "Clear buttons, forms and booking — on every page.", icon: "calendarCheck" as IconKey },
      { title: "Found on Google", body: "Set up for search and your Google Business Profile.", icon: "search" as IconKey },
    ],
  },

  // Section 4 — packages (cards come from content/pages/pricing.ts) + "which one fits you"
  packages: {
    eyebrow: "Packages",
    headline: "Pick your website.",
    subheadline: "One clear price. Hosting included. No hidden fees.",
    fitTitle: "Not sure which one?",
    // `plan` = package id in content/pages/pricing.ts
    fits: [
      { who: "I'm a coach or consultant", body: "One page for one offer or a booking call.", plan: "landing", icon: "userRound" as IconKey },
      { who: "I run a local service business", body: "Services, quote form and found on Google.", plan: "business", icon: "mapPin" as IconKey },
      { who: "I sell products", body: "An online store with secure checkout.", plan: "store", icon: "shoppingBag" as IconKey },
    ],
    fitCta: "See {name}",
    compare: { label: "Compare every feature", href: "/pricing" },
  },

  // Section 5 — included with every site (honest promises, no fake "worth $X" prices)
  included: {
    eyebrow: "Every website includes",
    headline: "No surprises. Just a site that works.",
    items: [
      { title: "Hosting + SSL included", body: "For [the first 12 months — confirm terms]. No separate hosting bill." },
      { title: "Speed & security updates", body: "We keep WordPress and plugins up to date while we host it." },
      { title: "You own your website", body: "Your site, your content, your domain." },
      { title: "Clear price, clear timeline", body: "You know the cost and the launch date before we start." },
      { title: "Revisions included", body: "[1–2] rounds of changes, depending on the package." },
      { title: "Nothing goes live without your OK", body: "You review everything before launch." },
    ],
  },

  // Section 8 — after launch (Growth upsell)
  growthUpsell: {
    title: "Want it to keep growing after launch?",
    body: "Add an All-in-One Growth plan — new pages, blog posts, social posts and Google updates, done for you every month.",
    cta: { label: "See Growth plans", href: "/services/growth" },
  },
};

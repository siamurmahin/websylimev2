// Service page → growth (/services/growth). Plans + prices live in content/home/pricing.ts
// (one source, shown on the homepage and here).
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

export const growth = {
  meta: {
    title: "All-in-One Growth",
    description:
      "Monthly plans that grow the website you already have: new pages, SEO articles, social posts, Google Business Profile, ads and reviews — one team, one invoice.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "All-in-One Growth",
    headline: "More customers, without the extra work.",
    headlineAccent: "More customers,",
    subheadline: "Every month we add pages, post on social, keep Google busy and look after your reviews. You run the business.",
    primaryCta: { label: "See the plans", href: "#plans" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    points: ["From $1,299 / month", "One team, one invoice", "Works on your current website"],
    // Illustrative photo (AI-generated) — swap for a real client photo later.
    image: { src: "/images/growth-hero.webp", alt: "A smiling local business owner checking new customer messages on her phone" },
  },

  // Section 2 — what's handled every month
  handled: {
    eyebrow: "Done for you, every month",
    headline: "Everything that brings customers in.",
    subheadline: "One team takes care of it all — you just approve.",
    items: [
      { title: "New website pages", body: "Service and area pages that help you show up for more searches.", icon: "layout" as IconKey },
      { title: "SEO blog articles", body: "Helpful articles that answer what your customers search for.", icon: "penTool" as IconKey },
      { title: "Social posts", body: "Regular Facebook & Instagram posts, designed for you.", icon: "image" as IconKey },
      { title: "Google Business Profile", body: "Fresh posts that keep you visible on Google Maps.", icon: "mapPin" as IconKey },
      { title: "Video edits", body: "Short clips for social and your website.", icon: "video" as IconKey, plan: "Market Leader" },
      { title: "Google Ads", body: "Campaigns set up and managed for you.", icon: "megaphone" as IconKey, plan: "Lead Growth +" },
      { title: "Google reviews", body: "Monitoring and replies, so every review gets an answer.", icon: "badgeCheck" as IconKey, plan: "Lead Growth +" },
      { title: "Clear monthly updates", body: "What we did, what's next — in plain English.", icon: "calendarCheck" as IconKey },
    ],
  },

  // Section 3 — requirement (Growth works on an existing site)
  needSite: {
    title: "Works on the website you already have.",
    body: "Monthly plans grow your current site. No website yet? Start with one of our Website Design packages — hosting included — then add a plan.",
    cta: { label: "See Website Design", href: "/services/website-design" },
  },

  // Section 5 — how a month works
  howItWorks: {
    eyebrow: "How it works",
    headline: "Your month, handled.",
    steps: [
      { title: "We plan", body: "At the start of each month we agree what to create and focus on." },
      { title: "We create", body: "Pages, posts, articles and ads — made by your dedicated team." },
      { title: "You approve, we report", body: "Nothing goes live without your OK, and you get a clear update." },
    ],
  },
};

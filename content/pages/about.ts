// Page → about (/about, with the timeline at /about#story).
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
// Honesty rule: every year, number and name here must be real before launch.
import type { IconKey } from "@/content/types";

export const about = {
  meta: {
    title: "About us",
    description:
      "Websy Lime is one team for your whole online presence — website, social and growth — so you can get back to running your business.",
  },

  hero: {
    eyebrow: "About Websy Lime",
    headline: "You run the business. We run everything online.",
    headlineAccent: "everything online.",
    subheadline: "We're a small, dedicated team that builds websites and keeps them growing for local businesses, coaches and service companies.",
    primaryCta: { label: "Read our story", href: "#story" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    // Illustrative photo (AI-generated, hands only — not our real team). Swap for a real team photo later.
    image: { src: "/images/about-hero.webp", alt: "Two people sketching website wireframes together at a laptop" },
    // Numbers come from the real data files; labels only here.
    stats: {
      websites: "client websites in our portfolio",
      reviews: "client reviews",
      countries: "where our clients are",
      charity: "of revenue to charity",
    },
  },

  story: {
    eyebrow: "Our story",
    headline: "Why we started.",
    paragraphs: [
      "Most small business owners we met were juggling a web designer, a social media freelancer and someone for ads — and still not getting calls.",
      "So we built the team we wished they had: one place for your website, your social presence and your growth, with one point of contact and plain-English updates.",
      "[Founder story — a few lines about who started Websy Lime and why.]",
    ],
  },

  timeline: {
    eyebrow: "Our story so far",
    headline: "From first site to Websy Lime v2.",
    items: [
      { year: "[2024]", title: "The first websites", body: "We start building websites for local businesses." },
      { year: "[Year]", title: "More clients, more services", body: "Social media, Google and growth plans join the websites." },
      { year: "[Year]", title: "WebsyChat launches", body: "Our AI assistant that answers visitors and captures leads 24/7." },
      { year: "[2026]", title: "Websy Lime LLC", body: "We register in the US to serve American clients better." },
      { year: "Today", title: "Websy Lime v2", body: "A new site, clearer plans and the same promise: one team, one invoice." },
    ],
  },

  values: {
    eyebrow: "How we work",
    headline: "What you can count on.",
    items: [
      { title: "Honest by default", body: "Real numbers, clear prices, no promises we can't keep.", icon: "badgeCheck" as IconKey },
      { title: "One team owns it", body: "One point of contact who knows your business.", icon: "users" as IconKey },
      { title: "Plain English", body: "Clear updates on what we did and what's next.", icon: "chat" as IconKey },
      { title: "We give back", body: "2% of everything we earn goes to charity.", icon: "sprout" as IconKey },
    ],
  },

  team: {
    eyebrow: "The team",
    headline: "The people behind your project.",
    // Add real names, roles and photos (public/team/…). Photo null → initials.
    members: [
      { name: "[Founder name]", role: "[Founder & CEO]", photo: null as string | null },
      { name: "[Team member]", role: "[Lead designer]", photo: null as string | null },
      { name: "[Team member]", role: "[Growth & marketing]", photo: null as string | null },
      { name: "[Team member]", role: "[Project manager]", photo: null as string | null },
    ],
  },

  quotes: {
    eyebrow: "In their words",
    // Names from content/testimonials.ts
    names: ["Hannah Reid", "Daniel Machado", "Gemma Holmes"],
  },
};

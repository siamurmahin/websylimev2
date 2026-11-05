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
      "It started in 2017 with one person: Siamur Rahman Mahin, building websites solo. In 2024, Websy Lime opened as a team.",
      "Most small business owners we met were juggling a web designer, a social media freelancer and someone for ads — and still not getting calls.",
      "So we built the team we wished they had: one place for your website, your social presence and your growth, with one point of contact and plain-English updates.",
    ],
  },

  timeline: {
    eyebrow: "Our story so far",
    headline: "From one person to Websy Lime v2.",
    items: [
      { year: "2017", title: "It starts with one person", body: "Founder Siamur Rahman Mahin starts building websites solo." },
      { year: "2024", title: "Websy Lime opens", body: "Websy Lime opens and starts working as a team." },
      { year: "2025", title: "More clients, more services", body: "Social media, Google and growth plans join the websites." },
      { year: "2026", title: "WebsyChat launches", body: "Our AI assistant that answers visitors and captures leads 24/7." },
      { year: "2026", title: "Websy Lime LLC", body: "We register in the US to serve American clients better." },
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
    subheadline: "One team that designs, builds and markets in-house, so nothing gets handed off to a stranger.",
    // Founders get the large cards. Add a photo later (public/team/…): null → initials.
    members: [
      { name: "Siamur Rahman Mahin", role: "Founder & Web Developer", founder: true, photo: null as string | null },
      { name: "Md Anisur Rahman", role: "Co-Founder & Audit Manager", founder: true, photo: null as string | null },
      { name: "Taizul Islam Taz", role: "Web Designer", founder: false, photo: null as string | null },
      { name: "Siamur Rahman Muhin", role: "Web Analyst", founder: false, photo: null as string | null },
      { name: "Tawhidul Islam Rifat", role: "Graphic Designer", founder: false, photo: null as string | null },
      { name: "Rafil Hossain", role: "Video Editor & Lead Expert", founder: false, photo: null as string | null },
      { name: "Nafiul Islam", role: "Web Designer", founder: false, photo: null as string | null },
      { name: "Fardin Islam", role: "Digital Marketer", founder: false, photo: null as string | null },
    ],
  },

  quotes: {
    eyebrow: "In their words",
    // Names from content/testimonials.ts
    names: ["Hannah Reid", "Daniel Machado", "Gemma Holmes"],
  },
};

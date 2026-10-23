// Service page → videoEditing (/services/video-editing). Coming soon: a short
// page with a waitlist. When the service launches, add plans like Graphic Design.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

export const videoEditing = {
  meta: {
    title: "Video Editing",
    description: "Short-form videos, ads and promo edits for local businesses — coming soon from Websy Lime. Join the waitlist to hear first.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "Video Editing · Coming soon",
    headline: "Videos that get you noticed.",
    headlineAccent: "get you noticed.",
    subheadline: "Short-form edits, ads and promo videos for your business. We're getting ready — join the waitlist to hear first.",
    primaryCta: { label: "Join the waitlist", href: "#waitlist" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    points: ["Launching [soon]", "Early access for the waitlist", "No spam — one email when we launch"],
    // Illustrative photo (AI-generated, no faces) — swap for a real photo later.
    image: { src: "/images/video-editing-hero.webp", alt: "Hands editing a video timeline on a monitor, with a phone showing a vertical video" },
  },

  // Section 2 — what we'll edit
  what: {
    eyebrow: "What we'll edit",
    headline: "Video for every place your customers scroll.",
    items: [
      { title: "Reels & Shorts", body: "Short vertical videos for Instagram, Facebook, TikTok and YouTube.", icon: "video" as IconKey },
      { title: "Video ads", body: "Quick, clear ads that show your offer in seconds.", icon: "megaphone" as IconKey },
      { title: "Promo & service videos", body: "Show your work, your team or a new service.", icon: "sparkles" as IconKey },
      { title: "Customer stories", body: "Turn happy-customer clips into proof that sells.", icon: "badgeCheck" as IconKey },
    ],
  },

  // Section 3 — waitlist form
  waitlist: {
    eyebrow: "Waitlist",
    headline: "Be first in line.",
    subheadline: "Leave your email and we'll tell you the moment Video Editing launches — with early-access pricing for the waitlist.",
    perks: ["Early-access pricing [— confirm]", "First pick of start dates", "One email when we launch, nothing else"],
    form: {
      email: { label: "Email", placeholder: "you@business.com", error: "Please enter a valid email." },
      typesTitle: "What would you like? (optional)",
      types: ["Reels & Shorts", "Video ads", "Promo videos", "Customer stories"],
      submit: "Join the waitlist",
      note: "We'll only email you about the launch.",
      success: { title: "You're on the list!", body: "We'll email you as soon as Video Editing launches." },
    },
  },

  // Section 4 — need video now?
  now: {
    title: "Need video now?",
    body: "Our Market Leader Growth plan already includes monthly video edits.",
    cta: { label: "See Market Leader", href: "/services/growth#market-leader" },
  },
};

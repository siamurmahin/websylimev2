// Page → careers (/careers).
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

export type Role = {
  /** Anchor on the page, e.g. /careers#web-designer */
  id: string;
  title: string;
  team: string;
  type: string; // "Full-time", "Part-time", "Freelance"
  location: string; // "Remote", "Remote (UK hours)"
  summary: string;
  bullets: string[];
};

export const careers = {
  meta: {
    title: "Careers",
    description: "Join Websy Lime — a small team building websites and growing local businesses online. See open roles or send us your work.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "Careers",
    headline: "Do great work for real businesses.",
    headlineAccent: "real businesses.",
    subheadline: "We're a small team that builds websites and helps local businesses grow online. If you care about doing good work and explaining it simply, we'd like to meet you.",
    primaryCta: { label: "See open roles", href: "#roles" },
    secondaryCta: { label: "Send us your work", href: "#apply" },
    points: ["[Remote-first]", "Small, friendly team", "Real clients from day one"],
    // Illustrative photo (AI-generated, no faces — not our real office). Swap for a real photo later.
    image: { src: "/images/careers-hero.webp", alt: "A bright studio desk with laptops, a monitor, headphones and coffee" },
  },

  // Section 2 — how we work
  how: {
    eyebrow: "How we work",
    headline: "Small team. Clear work. No drama.",
    items: [
      { title: "Own your work", body: "You see projects through from brief to launch — not just one small piece.", icon: "badgeCheck" as IconKey },
      { title: "Plain English", body: "We explain things simply, to clients and to each other.", icon: "chat" as IconKey },
      { title: "Real impact", body: "Your work helps a real business get more calls and customers.", icon: "trending" as IconKey },
      { title: "Keep learning", body: "New tools, new skills, honest feedback — we grow together.", icon: "sprout" as IconKey },
    ],
  },

  // Section 3 — what you get. TODO.md: confirm each perk.
  perks: {
    eyebrow: "What you get",
    headline: "The basics, done right.",
    items: ["[Work from anywhere]", "[Flexible hours]", "[Paid time off]", "[Learning budget]", "[Latest tools and software]", "[2% of revenue goes to charity]"],
  },

  // Section 4 — open roles. Add a role by copying the example below into `items`.
  roles: {
    eyebrow: "Open roles",
    headline: "Join the team.",
    apply: "Apply",
    // Example:
    // { id: "web-designer", title: "WordPress Web Designer", team: "Design", type: "Full-time", location: "Remote",
    //   summary: "Design and build fast, clear websites for local businesses.",
    //   bullets: ["2+ years designing websites", "Confident with WordPress", "A portfolio you're proud of"] },
    items: [] as Role[],
    empty: {
      title: "No open roles right now.",
      body: "We're not hiring for a specific role at the moment — but we're always happy to meet good people. Send us your work and we'll keep you in mind.",
      cta: { label: "Send us your work", href: "#apply" },
    },
  },

  // Section 5 — application form
  form: {
    eyebrow: "Apply",
    headline: "Send us your work.",
    subheadline: "Tell us a little about you. We read every message and reply to the ones that fit.",
    optional: "optional",
    fields: {
      name: { label: "Your name", placeholder: "Alex Smith", error: "Please add your name." },
      email: { label: "Email", placeholder: "you@email.com", error: "Please enter a valid email." },
      link: { label: "Portfolio or LinkedIn", placeholder: "https://…" },
      message: { label: "A few lines about you", placeholder: "What you do, what you're good at, and why Websy Lime.", error: "Please write a few lines about you." },
    },
    areaTitle: "What do you do?",
    areas: ["Web design", "Development", "Marketing & SEO", "Graphic design", "Video", "Something else"],
    submit: "Send application",
    note: "We'll only use your details to reply to you about working with us.",
    success: { title: "Thanks, {name}!", body: "We've got your application. If it's a fit, we'll be in touch within [2 weeks].", again: "Send another" },
  },
};

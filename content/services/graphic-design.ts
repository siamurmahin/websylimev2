// Service page → graphicDesign (/services/graphic-design).
// Portfolio items live in content/design-portfolio.ts. FAQ answers live in
// content/home/faq.ts (category "Graphic design").
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

export const graphicDesign = {
  meta: {
    title: "Graphic Design",
    description:
      "Social media posts, ad graphics and brand designs for local businesses — on-brand, on time, every month. Simple monthly plans.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "Graphic Design",
    headline: "Designs that make people stop scrolling.",
    headlineAccent: "stop scrolling.",
    subheadline: "Social posts, ads and brand graphics for your business — on-brand, on time, every month.",
    primaryCta: { label: "Let's Build Yours", href: "/start-project?service=graphic-design" },
    secondaryCta: { label: "See plans", href: "#plans" },
    points: ["From $[X]/month", "Ready in [2–3] business days", "Unlimited [revisions]"],
    // Illustrative photo (AI-generated, no faces) — swap for a real studio photo later.
    image: { src: "/images/graphic-design-hero.webp", alt: "A designer's hands sketching on a drawing tablet next to printed social media post designs" },
  },

  // Section 2 — what we design. ids are menu anchors (/services/graphic-design#social, #ads)
  what: {
    eyebrow: "What we design",
    headline: "Everything your brand needs to look sharp.",
    items: [
      { id: "social", title: "Social media posts", body: "Posts, carousels and story graphics for Facebook and Instagram.", icon: "image" as IconKey },
      { id: "ads", title: "Ads & promos", body: "Graphics for ads, offers, sales and announcements.", icon: "megaphone" as IconKey },
      { id: "branding", title: "Branding", body: "Logos, colors and a simple brand kit to keep it all consistent.", icon: "palette" as IconKey },
      { id: "print", title: "Print", body: "Flyers, business cards, banners and signs.", icon: "penTool" as IconKey },
    ],
  },

  // Section 3 — portfolio preview (from content/design-portfolio.ts; shows "coming soon" while empty)
  work: {
    eyebrow: "Our design work",
    headline: "See what we make.",
    max: 8,
    all: { label: "See all design work", href: "/work#graphic-design" },
    empty: {
      title: "Design portfolio coming soon",
      body: "We're adding our best social posts, ads and brand work here. Want to see examples now? Ask us on a free call.",
      cta: { label: "Book a free call", href: "/book-a-call" },
    },
  },

  // Section 4 — plans (3 monthly plans, middle one recommended)
  plans: {
    eyebrow: "Plans",
    headline: "One simple monthly plan.",
    subheadline: "Pick how many designs you need. Change or cancel anytime.",
    per: "/month",
    cta: "Get started",
    footnote: "Monthly price in USD. [Cancel anytime — confirm notice period.] Need a one-off design instead, like a logo or flyer? Tell us in the project form.",
    rows: ["Designs per month", "Social media posts", "Ads & promo graphics", "Story & cover graphics", "Your brand colors & fonts", "Revisions", "Ready in about"],
    // ids match the Start Project form (?package=)
    items: [
      {
        id: "design-starter",
        name: "[Starter]",
        tagline: "Stay active on social, without the hassle.",
        price: "$[X]",
        badge: null as string | null,
        values: ["[8] designs", "Included", "—", "—", "Included", "[1] round each", "[3] days"],
      },
      {
        id: "design-pro",
        name: "[Pro]",
        tagline: "Posts and ads for a busy, growing business.",
        price: "$[X]",
        badge: "Recommended" as string | null,
        values: ["[16] designs", "Included", "Included", "Included", "Included", "[2] rounds each", "[2–3] days"],
      },
      {
        id: "design-brand",
        name: "[Brand]",
        tagline: "Your full design team, plus a brand kit.",
        price: "$[X]",
        badge: null as string | null,
        values: ["[30] designs", "Included", "Included", "Included", "Included + brand kit", "Unlimited", "[2] days"],
      },
    ],
  },

  // Section 5 — how it works
  how: {
    eyebrow: "How it works",
    headline: "Ask. We design. You post.",
    steps: [
      { title: "Send a request", body: "Tell us what you need — a sale, a new service, a holiday post." },
      { title: "We design it", body: "On-brand designs, ready in about [2–3] business days." },
      { title: "Approve & download", body: "Ask for changes, approve, and download ready-to-post files." },
    ],
  },

  // Section 6 — upsell: we post it for you
  growthUpsell: {
    title: "Want us to post them for you too?",
    body: "All-in-One Growth plans include designed posts — and we publish them, write your blog and keep Google updated.",
    cta: { label: "See Growth plans", href: "/services/growth" },
  },
};

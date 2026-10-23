// Page → startProject.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

// Start Project (app/start-project). Kept deliberately simple: 3 short
// steps, big click-to-choose cards, no login. ?package= / ?service= pre-select.
export const startProject = {
  meta: {
    title: "Start a project",
    description: "Tell us what you need in three quick steps. A real person replies — no sales script.",
  },
  // Section 1 — hero with photo
  hero: {
    eyebrow: "Start a project",
    headline: "Let's build yours.",
    headlineAccent: "yours.",
    subheadline: "Tell us what you need in three quick steps. A real person replies — no sales script, no pressure.",
    primaryCta: { label: "Start now", href: "#project-form" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    points: ["About a minute", "No login needed", "Reply within [1] business day"],
    // Illustrative photo (AI-generated) — not our actual team. Swap for a real team photo later.
    image: { src: "/images/start-project-hero.webp", alt: "A small team working together around a laptop in a bright office" },
  },
  // Section 2 — the form
  eyebrow: "Your project",
  headline: "Tell us what you need.",
  subheadline: "Pick a few options — it takes about a minute.",
  next: {
    title: "What happens next",
    steps: [
      { title: "We reply", body: "Within [1] business day, from a real person." },
      { title: "A free call", body: "A quick chat about your business and goals." },
      { title: "A clear plan", body: "What we'll build, the price and the timeline." },
    ],
  },
  unsure: { text: "Not sure what you need?", label: "Book a free call", href: "/book-a-call" },
  form: {
    stepLabel: "Step {n} of {total}",
    back: "Back",
    next: "Continue",
    submit: "Send my project",
    sending: "Sending…",
    optional: "optional",
    steps: {
      service: {
        title: "What do you need?",
        hint: "Pick one — you can mention anything else later.",
        service: [
          { id: "website-design", label: "Website Design", body: "A new website, hosting included.", icon: "layout" as IconKey },
          { id: "growth", label: "All-in-One Growth", body: "Monthly pages, SEO, social and Google.", icon: "trending" as IconKey },
          { id: "graphic-design", label: "Graphic Design", body: "Social posts, ads and branding.", icon: "palette" as IconKey },
          { id: "not-sure", label: "Not sure yet", body: "We'll help you pick.", icon: "sparkles" as IconKey },
        ],
        // Follow-up shown under the chosen service
        detailTitle: "Which fits best?",
        details: {
          "website-design": [
            { id: "landing", label: "Landing page", body: "One page, one offer." },
            { id: "business", label: "Business website", body: "4–5 pages." },
            { id: "store", label: "Online store", body: "Sell products (WooCommerce)." },
            { id: "unsure", label: "Not sure", body: "Help me decide." },
          ],
          growth: [
            { id: "foundation", label: "Foundation", body: "$1,299 / month" },
            { id: "lead-growth", label: "Lead Growth", body: "$1,999 / month" },
            { id: "market-leader", label: "Market Leader", body: "$2,699 / month" },
            { id: "unsure", label: "Not sure", body: "Help me decide." },
          ],
          // ids match content/services/graphic-design.ts plans
          "graphic-design": [
            { id: "design-starter", label: "[Starter]", body: "[8] designs / month" },
            { id: "design-pro", label: "[Pro]", body: "[16] designs / month" },
            { id: "design-brand", label: "[Brand]", body: "[30] designs / month" },
            { id: "one-off", label: "One-off design", body: "A logo, flyer or single project." },
          ],
        },
        growthNote: "Monthly plans work on your existing website.",
      },
      business: {
        title: "About your business",
        hint: "So we can point you to the right fit.",
        businessTitle: "What best describes you?",
        business: [
          { id: "local", label: "Local service business", icon: "mapPin" as IconKey },
          { id: "coach", label: "Coach or consultant", icon: "userRound" as IconKey },
          { id: "products", label: "I sell products", icon: "shoppingBag" as IconKey },
          { id: "other", label: "Something else", icon: "sparkles" as IconKey },
        ],
        budgetTitle: "Rough budget",
        budget: ["Under $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+", "Not sure yet"],
      },
      contact: {
        title: "How can we reach you?",
        hint: "We'll only use this to reply about your project.",
        fields: {
          name: { label: "Your name", placeholder: "Jane Smith" },
          email: { label: "Email", placeholder: "you@business.com", error: "Please enter a valid email." },
          phone: { label: "Phone", placeholder: "(555) 123-4567" },
          website: { label: "Current website", placeholder: "yourbusiness.com" },
          message: { label: "Anything we should know?", placeholder: "Goals, deadlines, links you like…" },
        },
      },
    },
    success: {
      title: "Thanks, {name} — we've got it.",
      body: "We'll reply within [1] business day. Want to talk sooner?",
      cta: "Book a free call",
      home: "Back to home",
    },
  },
};

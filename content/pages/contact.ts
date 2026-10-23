// Page → contact (/contact). Email, WhatsApp and address come from
// content/shared/footer.ts (one place for the whole site).
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const contact = {
  meta: {
    title: "Contact us",
    description: "Questions, ideas or a quick hello — send us a message, WhatsApp us or book a free call. Real people reply within one business day.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "Contact",
    headline: "Say hello. We reply fast.",
    headlineAccent: "We reply fast.",
    subheadline: "A question, an idea or just a quick hello — a real person reads every message.",
    primaryCta: { label: "Send a message", href: "#message" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    points: ["Reply within [1] business day", "Real people, no bots", "No sales pressure"],
    // Illustrative photo (AI-generated, no faces) — swap for a real photo later.
    image: { src: "/images/contact-hero.webp", alt: "Hands holding a phone with a friendly chat open, next to a laptop and a lime-green mug" },
  },

  // Section 2 — ways to reach us (left) + message form (right)
  eyebrow: "Get in touch",
  headline: "Pick what's easiest for you.",
  subheadline: "Write, message or talk — whichever suits you. Same friendly team either way.",
  ways: {
    email: { title: "Email us", body: "Best for longer questions." },
    whatsapp: { title: "WhatsApp", body: "Quick questions, quick answers." },
    call: { title: "Book a free call", body: "[15] minutes with a real person.", href: "/book-a-call" },
  },
  hours: { label: "Hours", value: "[Mon–Fri, 9am–6pm ET]" },
  projectNote: { text: "Want a price for a new website or plan?", label: "Start your project", href: "/start-project" },

  form: {
    title: "Send us a message",
    hint: "We'll only use your details to reply.",
    optional: "optional",
    fields: {
      name: { label: "Your name", placeholder: "Jane Smith", error: "Please add your name." },
      email: { label: "Email", placeholder: "you@business.com", error: "Please enter a valid email." },
      message: { label: "Your message", placeholder: "How can we help?", error: "Please write a short message." },
    },
    topicTitle: "What's it about?",
    topics: ["General question", "New project", "I'm a client", "Something else"],
    // Shown when "New project" is picked
    projectHint: { text: "Tip: our project form gets you a price faster.", label: "Use it here", href: "/start-project" },
    submit: "Send message",
    success: {
      title: "Thanks, {name} — message sent.",
      body: "We'll reply within [1] business day. Want to talk sooner?",
      cta: "Book a free call",
      again: "Send another message",
    },
  },
};

// Product page → websychat (/products/websychat). Our AI chat assistant.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

export const websychat = {
  meta: {
    title: "WebsyChat — AI chat assistant",
    description: "WebsyChat answers your website visitors 24/7, captures their details and books appointments — so you never miss a lead. Try it free.",
  },

  // Where every "Try free" button goes. Until it's filled in, buttons go to Book a Call.
  trialUrl: "[WebsyChat free-trial URL]",

  // Section 1 — hero with photo
  hero: {
    eyebrow: "WebsyChat · AI assistant",
    headline: "Never miss a lead again.",
    headlineAccent: "miss a lead again.",
    subheadline: "WebsyChat answers your website visitors day and night, takes their details and books them in — while you're on the job.",
    primaryCta: { label: "Try it free", href: "[WebsyChat free-trial URL]" },
    secondaryCta: { label: "See how it works", href: "#demo" },
    points: ["Free [14]-day trial", "Works on any website", "Set up in about [10] minutes"],
    // Illustrative photo (AI-generated, no faces) — swap for a real photo later.
    image: { src: "/images/websychat-hero.webp", alt: "A phone on a shop counter showing a website chat conversation" },
  },

  // Section 2 — live-looking demo conversation
  demo: {
    eyebrow: "See it in action",
    headline: "Like a front desk that never sleeps.",
    subheadline: "A visitor lands on your site at 9pm. Instead of leaving, they get an answer in seconds — and you get a new lead.",
    points: ["Answers questions about your business", "Asks for name and phone number", "Sends the lead straight to you"],
    widget: { name: "WebsyChat", status: "Online · replies instantly", placeholder: "Type a message…", note: "Example conversation" },
    messages: [
      { from: "visitor", text: "Hi, do you do emergency repairs?" },
      { from: "bot", text: "Yes! We offer same-day emergency repairs. What's the problem?" },
      { from: "visitor", text: "Leaking pipe under the kitchen sink." },
      { from: "bot", text: "We can help. Can I take your name and number so the team can call you back?" },
      { from: "visitor", text: "Sam, 555-0142" },
      { from: "bot", text: "Thanks Sam! I've passed this on — expect a call within the hour." },
    ] as { from: "visitor" | "bot"; text: string }[],
    lead: { title: "New lead", body: "Sam · 555-0142 · Leaking pipe" },
  },

  // Section 3 — what it does. TODO.md: confirm each feature is live.
  features: {
    eyebrow: "What it does",
    headline: "Everything a busy owner needs. Nothing they don't.",
    items: [
      { title: "Answers 24/7", body: "Replies in seconds, nights and weekends included.", icon: "moon" as IconKey },
      { title: "Captures leads", body: "Collects name, phone and email from every interested visitor.", icon: "userRound" as IconKey },
      { title: "Books appointments", body: "Lets customers pick a time that works for you.", icon: "calendarCheck" as IconKey },
      { title: "Knows your business", body: "Learns from your website, so answers are about you.", icon: "sparkles" as IconKey },
      { title: "Instant lead alerts", body: "Every new lead lands in your inbox right away.", icon: "zap" as IconKey },
      { title: "Works on any website", body: "WordPress, Shopify, Wix or custom — one small code snippet.", icon: "code" as IconKey },
    ],
  },

  // Section 4 — how it works
  how: {
    eyebrow: "How it works",
    headline: "Live in three steps.",
    steps: [
      { title: "Add your website", body: "WebsyChat reads your site and learns your services, hours and prices." },
      { title: "Paste one line of code", body: "Add it to your site — or we'll do it for you." },
      { title: "Get leads", body: "Visitors get answers. You get their details." },
    ],
  },

  // Section 5 — plans. ids are anchors (#chat-pro).
  plans: {
    eyebrow: "Plans",
    headline: "Simple monthly pricing.",
    subheadline: "Start free. Pick a plan when you're happy. Cancel anytime.",
    cta: "Start free trial",
    per: "/month",
    rows: ["Conversations per month", "Websites", "Leads to your email", "Text (SMS) lead alerts", "Appointment booking", "Remove “Powered by WebsyChat”", "Support"],
    items: [
      {
        id: "chat-starter",
        name: "[Starter]",
        tagline: "For a small business getting started.",
        price: "$[X]",
        badge: null as string | null,
        values: ["[100]", "1", "Included", "—", "—", "—", "Email"],
      },
      {
        id: "chat-pro",
        name: "[Pro]",
        tagline: "Capture and book more leads, automatically.",
        price: "$[X]",
        badge: "Recommended" as string | null,
        values: ["[500]", "1", "Included", "Included", "Included", "—", "Email & chat"],
      },
      {
        id: "chat-business",
        name: "[Business]",
        tagline: "For busy teams and more than one site.",
        price: "$[X]",
        badge: null as string | null,
        values: ["[Unlimited]", "[3]", "Included", "Included", "Included", "Included", "Priority"],
      },
    ],
    footnote: "Every plan starts with a free [14]-day trial. [No card needed — confirm.] Prices in USD.",
  },

  // Section 6 — setup help banner
  help: {
    title: "Not a tech person?",
    body: "Book a free call and we'll set WebsyChat up on your website with you.",
    cta: { label: "Book a free call", href: "/book-a-call" },
  },
};

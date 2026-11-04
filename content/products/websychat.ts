// Product page → websychat (/products/websychat). Our AI chat assistant.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

export const websychat = {
  meta: {
    title: "WebsyChat — AI chat assistant",
    description: "WebsyChat answers your website visitors 24/7, captures their details and books calls — so you never miss a lead. Start a 7-day free trial.",
  },

  // Where every "Try free" button goes.
  trialUrl: "https://apps.websychat.com/start",

  // Section 1 — hero with photo
  hero: {
    eyebrow: "WebsyChat · AI assistant",
    headline: "Never miss a lead again.",
    headlineAccent: "miss a lead again.",
    subheadline: "WebsyChat answers your website visitors day and night, takes their details and books the call — while you're on the job.",
    primaryCta: { label: "Try it free", href: "https://apps.websychat.com/start" },
    secondaryCta: { label: "See how it works", href: "#demo" },
    points: ["7-day free trial", "One script to install", "Live the same day"],
    // Illustrative photo (AI-generated, no faces) — swap for a real photo later.
    image: { src: "/images/websychat-hero.webp", alt: "A phone on a shop counter showing a website chat conversation" },
  },

  // Section 2 — live-looking demo conversation
  demo: {
    eyebrow: "See it in action",
    headline: "Like a front desk that never sleeps.",
    subheadline: "A visitor lands on your site at 9pm. Instead of leaving, they get an answer in seconds — and you get a new lead.",
    points: ["Answers from your own pages", "Asks for name and email", "Sends the lead to your inbox, chat included"],
    widget: { name: "WebsyChat", status: "Online · replies instantly", placeholder: "Type a message…", note: "Example conversation" },
    messages: [
      { from: "visitor", text: "Hi, do you do emergency repairs?" },
      { from: "bot", text: "Yes! We offer same-day emergency repairs. What's the problem?" },
      { from: "visitor", text: "Leaking pipe under the kitchen sink." },
      { from: "bot", text: "We can help. Can I take your name and email so the team can get back to you?" },
      { from: "visitor", text: "Sam, sam@example.com" },
      { from: "bot", text: "Thanks Sam! I've passed this on to the team." },
    ] as { from: "visitor" | "bot"; text: string }[],
    lead: { title: "New lead", body: "Sam · sam@example.com · Leaking pipe" },
  },

  // Section 3 — what it does (from websychat.com)
  features: {
    eyebrow: "What it does",
    headline: "Everything a busy owner needs. Nothing they don't.",
    items: [
      { title: "Answers while you're away", body: "Replies in seconds, even at midnight when nobody's at the desk.", icon: "moon" as IconKey },
      { title: "Answers from your pages", body: "Learns your prices and hours. If it doesn't know, it says so and offers to take a message.", icon: "sparkles" as IconKey },
      { title: "Captures leads", body: "You get a name, an email and what they asked. Not a blank form.", icon: "userRound" as IconKey },
      { title: "Qualifies and books", body: "Finds out their needs, timeline and budget, then books them into your calendar.", icon: "calendarCheck" as IconKey },
      { title: "Replies in their language", body: "Visitors write in their own language and get the answer in it. Your site can stay in English.", icon: "chat" as IconKey },
      { title: "Lets you step in", body: "See chats in your inbox and take over any time. On Growth and Academy.", icon: "users" as IconKey },
    ],
  },

  // Section 4 — how it works
  how: {
    eyebrow: "How it works",
    headline: "Live in three steps.",
    steps: [
      { title: "Train it", body: "Crawl your site or add the pages that matter. It learns your prices, hours and services." },
      { title: "Paste one script", body: "Add it to your site's footer. The portal checks that the chat is loading." },
      { title: "Get leads", body: "Visitors get answers. You get their details and the conversation." },
    ],
  },

  // Section 5 — plans (from websychat.com). ids are anchors (#chat-growth).
  plans: {
    eyebrow: "Plans",
    headline: "Pricing that a single client pays for.",
    subheadline: "Every plan starts with a 7-day free trial. Pick the one that fits.",
    cta: "Start free trial",
    per: "/month",
    rows: ["Websites", "Messages per month", "AI assistant & lead capture", "Replies in visitor's language", "Human takeover", "Lead qualification", "Team members", "Chat routing", "Setup & launch"],
    items: [
      {
        id: "chat-starter",
        name: "Starter",
        tagline: "One website.",
        price: "$29",
        wasPrice: "$49",
        badge: null as string | null,
        href: "https://apps.websychat.com/start?plan=starter&interval=monthly",
        values: ["1", "500", "Included", "Included", "—", "—", "—", "—", "Self-serve"],
      },
      {
        id: "chat-growth",
        name: "Growth",
        tagline: "A few websites, and a small team in the inbox.",
        price: "$79",
        wasPrice: "$129",
        badge: "Most sites start here" as string | null,
        href: "https://apps.websychat.com/start?plan=growth&interval=monthly",
        values: ["3", "2,000", "Included", "Included", "Included", "Included", "Up to 3", "—", "Self-serve"],
      },
      {
        id: "chat-academy",
        name: "Academy",
        tagline: "More websites, with help getting the first one live.",
        price: "$199",
        wasPrice: "$329",
        badge: null as string | null,
        // websychat.com's sign-up calls this plan "pro"
        href: "https://apps.websychat.com/start?plan=pro&interval=monthly",
        values: ["10", "6,000", "Included", "Included", "Included", "Included", "Up to 10", "Included", "Done for you"],
      },
    ],
    footnote: "The trial takes a card so your assistant can go live the same day. Cancel inside the 7 days and you're not charged. After day 7 your plan starts automatically at the monthly rate, and subscription fees aren't refunded. Yearly billing is 15% off, charged once for the year. Prices in USD, taxes may apply.",
  },

  // Section 6 — setup help banner
  help: {
    title: "Rather see it on your own site first?",
    body: "Book a 30-minute demo. We look at your live site and the questions visitors already ask. No deck, no pressure.",
    cta: { label: "Book a demo", href: "https://cal.com/siamurmahin/30min" },
  },
};

// /tampa: campaign page for readers of the PDF guide "The Tampa Review Engine".
// They scan the QR code in the PDF and land here. One goal: request the free
// Map Pack Review Audit. Edit the words below; the page layout is app/tampa/page.tsx.
// In headings, *words between asterisks* show in the serif italic accent.

export const tampa = {
  meta: {
    title: "Free Map Pack Review Audit | Websy Lime",
    description:
      "For readers of The Tampa Review Engine: a free audit of your Google profile against the top 3 in your area, with the fastest wins to close the gap. No obligation.",
    ogHeadline: "Free Map Pack Review Audit",
    ogSub: "For Tampa Bay plumbing, HVAC and electrical businesses",
  },

  promoCode: "TAMPA20",

  // Show the Elite Trade Services result only once the client has said yes in writing.
  showCaseStudy: false,

  hero: {
    label: "For readers of The Tampa Review Engine",
    headline: "You read the guide. Now let us *look at your profile.*",
    sub: "Get a free Map Pack Review Audit: how your Google profile stacks up against the top 3 in your area, and the fastest wins to close the gap. No obligation.",
    cta: "Get my free audit",
    note: "Free · No obligation · Report in 2 business days",
  },

  audit: {
    eyebrow: "What's in the audit",
    headline: "Three things you'll *know* after.",
    items: [
      {
        title: "Your profile vs. the top 3",
        body: "We put your Google Business Profile side by side with the three businesses showing in the Map Pack for your main service.",
      },
      {
        title: "Your review gap",
        body: "How many reviews you're behind, and how many new reviews a month it takes to catch up at your competitors' current pace.",
      },
      {
        title: "Your 3 fastest wins",
        body: "The three changes most likely to move you up first, in order. Things you or your office can start this week.",
      },
    ],
    line: "Plain-English report within 2 business days.",
  },

  offer: {
    eyebrow: "Reader offer",
    headline: "20% off all Websy Lime services",
    body: "Your code is added to your audit request automatically. Use it on any website, local SEO or review work you decide to do with us.",
    codeLabel: "Reader code",
    copy: "Copy",
    copied: "Copied",
    // Fill this in (expiry, new clients only, etc.). Hidden on the page while it starts with "[".
    terms: "[OFFER TERMS — placeholder]",
  },

  caseStudy: {
    eyebrow: "A recent result",
    business: "Elite Trade Services",
    trade: "Tampa Bay plumbing",
    from: 20,
    to: 35,
    result: "Google reviews, with every review answered, in the first two weeks.",
    period: "Nov 1–15, 2026",
    note: "Results vary.",
  },

  form: {
    eyebrow: "Request your audit",
    headline: "Get your free audit in *2 business days.*",
    sub: "Takes about a minute. We look at your profile and send you the report. We won't sign you up for anything.",
    fields: {
      name: { label: "Full name", placeholder: "Jane Smith", error: "Please add your name." },
      business: { label: "Business name", placeholder: "Smith Plumbing", error: "Please add your business name." },
      trade: { label: "Trade", error: "Please pick your trade." },
      phone: { label: "Phone", placeholder: "(813) 555-0123", error: "Please add a phone number we can reach." },
      email: { label: "Email", placeholder: "you@business.com", error: "Please add a valid email." },
      gbp: { label: "Google Business Profile link", placeholder: "Paste your Google Maps link" },
      area: { label: "Service area", placeholder: "e.g. Brandon, Riverview, South Tampa" },
    },
    trades: ["Plumbing", "HVAC", "Electrical", "Other"],
    optional: "optional",
    sms: "OK to text me about my audit. Msg & data rates may apply. Reply STOP to opt out.",
    submit: "Send my free audit",
    sending: "Sending…",
    error: "Sorry, that didn't send. Please try again, or email us at",
    success: {
      title: "Thanks! We'll send your audit within 2 business days.",
      body: "Your 20% code TAMPA20 is saved to your request.",
    },
    call: { prompt: "Prefer a call?", label: "Book a free 30-minute call", href: "/book-a-call" },
  },

  faq: {
    eyebrow: "Questions",
    headline: "Before you *ask.*",
    items: [
      { q: "Is the audit really free?", a: "Yes. There's no cost and no obligation. You get the report either way." },
      { q: "How long does it take?", a: "About 2 business days from your request. It comes to your email as a plain-English report." },
      { q: "Do I have to buy anything?", a: "No. Use the report yourself, hand it to your office, or ask us to help. It's your call." },
      { q: "Do you only work in Tampa Bay?", a: "We focus on Tampa Bay: Hillsborough, Pinellas and Pasco counties." },
    ],
  },

  footer: {
    email: "hello@websylime.com",
    privacy: { label: "Privacy policy", href: "/privacy" },
  },
} as const;

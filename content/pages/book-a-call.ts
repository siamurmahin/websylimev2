// Page → bookACall (/book-a-call). Every "Book a call" button on the site points here.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const bookACall = {
  meta: {
    title: "Book a free call",
    description: "Pick a time for a free 15-minute call. Talk to a real person about your business — no sales script, no pressure.",
  },

  // Cal.com booking link, either the short form ("websylime/intro-call") or the full
  // URL ("https://cal.com/websylime/intro-call"). Until it's filled in, the page shows
  // a "calendar coming soon" card instead of the embed.
  calLink: "[Cal.com link — e.g. websylime/intro-call]",

  // Section 1 — hero with photo
  hero: {
    eyebrow: "Book a free call",
    headline: "Let's talk about your business.",
    headlineAccent: "your business.",
    subheadline: "A free [15]-minute video call with a real person. Ask anything — no sales script, no pressure.",
    primaryCta: { label: "Pick a time", href: "#calendar" },
    points: ["[15] minutes", "Free, no obligation", "Times in your time zone"],
    // Illustrative photo (AI-generated) — not our actual team. Swap for a real photo later.
    image: { src: "/images/book-a-call-hero.webp", alt: "A smiling consultant on a friendly video call at his laptop" },
  },

  // Section 2 — what to expect + calendar
  eyebrow: "Pick a time",
  headline: "Choose a time that suits you.",
  subheadline: "Times show in your own time zone. You'll get a calendar invite and a video link straight away.",
  expect: [
    { title: "[15] minutes", body: "Short and focused — we respect your time.", icon: "calendarCheck" as const },
    { title: "Video call", body: "Google Meet link sent to your email.", icon: "chat" as const },
    { title: "No pressure", body: "Honest advice, even if we're not the right fit.", icon: "badgeCheck" as const },
  ],
  agendaTitle: "We'll talk about",
  agenda: [
    "Your business and your goals",
    "What's working online — and what isn't",
    "Which service fits you best",
    "A rough price and timeline",
  ],
  writeInstead: { text: "Prefer to write?", label: "Send us your project", href: "/start-project" },
  calendar: {
    title: "Pick a time",
    frameTitle: "Book a call with Websy Lime",
    // Shown until calLink is filled in
    placeholder: {
      title: "Calendar coming soon",
      body: "Online booking is almost ready. In the meantime, tell us about your project and we'll reply to set up a call.",
      cta: "Send us your project",
    },
  },
};

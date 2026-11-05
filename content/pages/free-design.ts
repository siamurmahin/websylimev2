// Page → free website design (/free-website-design), plus the bar at the top of every
// page (`bar`). The design is free; building the site is a paid package.
// TODO.md: the form isn't sent anywhere yet, and the scope needs the owner's OK.

export const freeDesign = {
  bar: {
    text: "We design a free website for 10 business owners every month.",
    shortText: "Free website design: 10 spots a month.",
    label: "Apply",
    href: "/free-website-design#apply",
    close: "Dismiss this message",
  },

  meta: {
    title: "Free Website Design for Small Businesses",
    description:
      "Every month we design a free homepage for 10 small business owners with no website, or one that brings in no customers. No card, no obligation. Apply here.",
  },

  hero: {
    eyebrow: "Free website design",
    headline: "We'll design your new website for free.",
    headlineAccent: "for free.",
    subheadline:
      "Every month we pick 10 business owners who have no website, or one that isn't bringing in customers, and design their new homepage at no cost.",
    primaryCta: { label: "Apply for a free design", href: "#apply" },
    secondaryCta: { label: "How it works", href: "#how" },
    points: ["10 businesses a month", "No card needed", "No obligation"],
    // Same photo as the Website Design page. Swap for its own photo later.
    image: { src: "/images/website-design-hero.webp", alt: "A designer's desk with a website design on screen" },
  },

  who: {
    eyebrow: "Who it's for",
    headline: "Is your website costing you jobs?",
    subheadline: "Plumbers, electricians, pest control, contractors and other local businesses are a great fit.",
    items: [
      { title: "You don't have a website", body: "People search for you, can't find you and call someone else." },
      { title: "Your site looks cheap", body: "An old or random design makes a good business look like a risky choice." },
      { title: "It brings in no customers", body: "People visit, but they don't call, book or ask for a quote." },
    ],
  },

  how: {
    eyebrow: "How it works",
    headline: "Three steps. No cost to find out.",
    steps: [
      { title: "You apply", body: "Tell us about your business. It takes about two minutes." },
      { title: "We design it", body: "If you're picked, we design a new homepage made for your business and your customers." },
      { title: "You decide", body: "Love it? We can build it for you. Not for you? You don't owe us anything." },
    ],
  },

  deal: {
    eyebrow: "What's free",
    headline: "No small print. Here's the deal.",
    free: {
      label: "Free",
      title: "The design",
      items: ["A custom homepage design", "Made for your business and your customers", "No card and no obligation"],
    },
    paid: {
      label: "If you want it live",
      title: "The build",
      items: ["We build the full website from your design", "A one-time price, agreed before we start", "Hosting and SSL with us, included for the first 12 months"],
      link: { label: "See website prices", href: "/pricing" },
    },
  },

  faq: {
    eyebrow: "Questions",
    headline: "Good questions to ask.",
    items: [
      { q: "Is the design really free?", a: "Yes. The design costs you nothing and you don't need a card. You only pay if you want us to build it into a real website." },
      { q: "What's the catch?", a: "There isn't one. Some of the businesses we design for go on to build with us, and that's how this pays for itself. If you don't, you don't owe us anything." },
      { q: "How do you pick the 10?", a: "We look for businesses where a better design would make the biggest difference. We'll tell you either way." },
      { q: "Can I take the design to another developer?", a: "The design stays with us unless you build the site with us. That's what keeps it free." },
      { q: "When will I hear back?", a: "Within 1 business day. Usually much sooner." },
    ],
  },

  form: {
    eyebrow: "Apply",
    headline: "Apply for a free design.",
    subheadline: "We take 10 businesses a month. Tell us about yours.",
    optional: "optional",
    fields: {
      name: { label: "Your name", placeholder: "Jane Smith", error: "Please add your name." },
      business: { label: "Business name", placeholder: "Smith Plumbing", error: "Please add your business name." },
      email: { label: "Email", placeholder: "you@business.com", error: "Please enter a valid email." },
      phone: { label: "Phone", placeholder: "(555) 123-4567" },
      website: { label: "Current website", placeholder: "Leave blank if you don't have one" },
      about: { label: "What does your business do?", placeholder: "We're a family plumbing company in Kansas City.", error: "Please tell us a little about your business." },
    },
    submit: "Apply for free",
    note: "No card needed. No obligation.",
    success: {
      title: "Thanks, {name}. Application received.",
      body: "We'll reply within 1 business day.",
      again: "Send another application",
    },
  },
};

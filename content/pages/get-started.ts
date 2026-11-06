// Page → get started (/get-started?plan=…). Where every plan's "Get started" button lands.
// Prices and plan details come from the plan's own content file (see
// components/get-started/plans.ts), so they stay in one place.
// TODO.md: the form isn't sent anywhere yet. The calendar and WhatsApp already work.

export const getStarted = {
  meta: {
    title: "Get Started",
    description: "Send your details and book a free 30-minute call about your plan.",
  },
  eyebrow: "Your plan",
  headline: "Great choice. You picked {plan}.",
  change: "Change plan",
  nextTitle: "What happens next",

  // One set of steps per way of working
  next: {
    website: [
      { title: "Send your details", body: "It takes about a minute." },
      { title: "Book a free call", body: "30 minutes to talk through your business and what the site should do." },
      { title: "Pay the deposit and we start", body: "50% to start. Most websites go live in about 2 weeks." },
    ],
    growth: [
      { title: "Send your details", body: "It takes about a minute." },
      { title: "Book a free call", body: "30 minutes to look at your website and what you want more of." },
      { title: "Pay for the first month and we start", body: "All at once, or in two payments 15 days apart." },
    ],
    design: [
      { title: "Send your details", body: "It takes about a minute." },
      { title: "Say hello on WhatsApp", body: "Tell us about your brand and your first design." },
      { title: "Pay the first month and we start", body: "Cancel anytime, at least 7 days before your next billing date." },
    ],
  },

  form: {
    title: "Where should we reach you?",
    hint: "No payment today.",
    optional: "optional",
    fields: {
      name: { label: "Your name", placeholder: "Jane Smith", error: "Please add your name." },
      business: { label: "Business name", placeholder: "Smith Plumbing", error: "Please add your business name." },
      email: { label: "Email", placeholder: "you@business.com", error: "Please enter a valid email." },
      phone: { label: "Phone", placeholder: "(555) 123-4567", error: "Please add your phone number." },
      website: { label: "Current website", placeholder: "yourbusiness.com" },
    },
    submit: "Continue",
  },

  booked: {
    call: {
      title: "Thanks, {name}. Now pick a time.",
      body: "Choose a time for your free 30-minute call about {plan}.",
      whatsappText: "No time that works, or need to talk sooner?",
    },
    whatsapp: {
      title: "Thanks, {name}. Let's get started.",
      body: "Message us on WhatsApp and tell us about your first design.",
      callLabel: "Prefer a call? Book a time",
    },
    whatsappLabel: "Message us on WhatsApp",
    whatsappMessage: "Hi, I just sent my details for the {plan} plan on your website.",
    reply: "We'll also reply by email, usually within 12 hours.",
  },
};

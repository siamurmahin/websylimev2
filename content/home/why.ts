// Homepage → why section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
export const why = {
  eyebrow: "Why Websy Lime",
  headline: "A team that works like it's yours.",
  // `mockup` picks the mini UI on each bento card (components/sections/Why.tsx)
  items: [
    { title: "Your scalable, dedicated design team", body: "Grow your design needs without hiring.", mockup: "tasks" },
    { title: "AI that never misses a lead", body: "WebsyChat replies while you're on the job.", mockup: "chat" },
    { title: "Cost-efficient by design", body: "Agency-level work at a fraction of agency pricing.", mockup: "cost" },
    { title: "Your dedicated social presence team", body: "Consistent posts. Real engagement. No effort from you.", mockup: "calendar" },
    { title: "One place for everything", body: "Website, social, growth. One team, one invoice.", mockup: "invoice" },
    { title: "Built to convert", body: "Every page is designed to turn visitors into calls.", mockup: "notifications" },
  ] as {
    title: string;
    body: string;
    mockup: "tasks" | "chat" | "cost" | "calendar" | "invoice" | "notifications";
  }[],
  mockups: {
    tasks: [
      { label: "Homepage refresh", status: "Done" },
      { label: "New landing page", status: "In review" },
      { label: "Promo banner", status: "In progress" },
    ],
    chat: "Hi! Need a quote? I can help right now.",
    chatName: "WebsyChat",
    chatStatus: "Online · replies instantly",
    cost: { agency: "Typical agency", us: "Websy Lime" },
    calendar: { days: ["M", "T", "W", "T", "F", "S", "S"], postDays: [0, 2, 4, 5], label: "Posts scheduled" },
    invoice: { title: "One invoice", lines: ["Website", "Social media", "Local growth"] },
    notification: "New lead from your website, 11:08 AM",
    notifications: ["Call booked · Tomorrow, 9:00 AM", "New 5-star review"],
  },
};

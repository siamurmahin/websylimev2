// Homepage → services section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
export const services = {
  eyebrow: "What we do",
  headline: "Everything you need to grow online.",
  cta: "Explore",
  // `visual` picks the mini illustration on each card (see components/sections/Services.tsx)
  items: [
    {
      title: "Website Design",
      body: "Websites built to convert, not just to look good.",
      href: "/services/website-design",
      visual: "website",
    },
    {
      title: "WebsyChat",
      badge: "AI",
      body: "An AI assistant that answers visitors and captures leads 24/7.",
      href: "/products/websychat",
      visual: "chat",
    },
    {
      title: "All-in-One Growth",
      body: "Your website, social media and local visibility — managed every month.",
      href: "/services/growth",
      visual: "growth",
    },
    {
      title: "Graphic Design",
      body: "Social posts, ads and brand graphics that keep you looking sharp.",
      href: "/services/graphic-design",
      visual: "graphic",
    },
  ] as {
    title: string;
    body: string;
    href: string;
    badge?: string;
    visual: "website" | "chat" | "growth" | "graphic";
  }[],
  // Sample conversation on the WebsyChat card
  chat: [
    { from: "visitor", text: "Do you do emergency repairs?" },
    { from: "bot", text: "Yes! We can be there today. Want me to book you in?" },
    { from: "visitor", text: "Yes please, 3pm works." },
  ] as { from: "visitor" | "bot"; text: string }[],
  growthLabels: ["Calls", "Reviews", "Posts"],
};

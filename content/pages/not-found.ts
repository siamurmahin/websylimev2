// Page → notFound.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";

// 404 page (app/not-found.tsx). Quick links point at homepage sections that exist.
export const notFound = {
  metaTitle: "Page not found",
  eyebrow: "Error 404",
  headline: "This page took a wrong turn.",
  body: "The link may be old, or the page is still being built. Here's where to go instead.",
  primaryCta: { label: "Back to home", href: "/" },
  secondaryCta: { label: "Book a free call", href: "/book-a-call" },
  linksTitle: "Popular right now",
  links: [
    { label: "What we do", description: "Websites, social and growth.", href: "/#services", icon: "layout" },
    { label: "Our work", description: "Real sites for real businesses.", href: "/#work", icon: "sparkles" },
    { label: "Pricing", description: "Simple monthly plans.", href: "/#pricing", icon: "receipt" },
    { label: "FAQ", description: "Straight answers.", href: "/#faq", icon: "chat" },
  ] as { label: string; description: string; href: string; icon: IconKey }[],
};

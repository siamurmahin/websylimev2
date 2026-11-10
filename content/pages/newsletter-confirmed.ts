// Page → /newsletter-confirmed. People land here after clicking "Yes, subscribe me"
// in the newsletter confirmation email. Not in search results.
export const newsletterConfirmed = {
  meta: {
    title: "You're subscribed",
    description: "Thanks for confirming your subscription to Growth notes from Websy Lime.",
  },
  hero: {
    eyebrow: "Growth notes",
    headline: "You're in. Thanks for confirming.",
    headlineAccent: "You're in.",
    subheadline:
      "Your welcome email is on its way. After that, expect one short email a month with plain-English tips to win more customers online.",
    primaryCta: { label: "Read the blog", href: "/blog" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    points: ["One email a month", "No jargon, no spam", "Unsubscribe any time"],
    image: { src: "/images/blog-hero.webp", alt: "A notebook, tablet and coffee on a bright wooden table" },
  },
};

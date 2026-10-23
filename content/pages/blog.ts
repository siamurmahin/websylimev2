// Page → blog (/blog and each post page). Posts live in content/blog/posts.ts.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).

export const blog = {
  meta: {
    title: "Blog",
    description: "Plain-English tips for small businesses: websites, Google, reviews and getting more leads online.",
  },

  // Section 1 — hero with photo
  hero: {
    eyebrow: "Blog",
    headline: "Plain-English tips to grow online.",
    headlineAccent: "grow online.",
    subheadline: "Short, practical guides for busy business owners — websites, Google, reviews and getting more leads. No jargon.",
    primaryCta: { label: "Read the latest", href: "#articles" },
    secondaryCta: { label: "Get tips by email", href: "#newsletter" },
    points: ["Short reads", "No jargon", "One email a month"],
    // Illustrative photo (AI-generated, no faces) — swap for a real photo later.
    image: { src: "/images/blog-hero.webp", alt: "A notebook, tablet and coffee on a bright wooden table" },
  },

  // Section 2 — articles
  featuredLabel: "Latest",
  all: "All",
  readMore: "Read article",

  // Section 3 — newsletter (uses the footer newsletter copy for the form)
  newsletter: {
    eyebrow: "Newsletter",
    headline: "Get tips like these by email.",
  },

  // Post page
  post: {
    back: "All articles",
    by: "By",
    updated: "Updated",
    tocTitle: "In this article",
    faqTitle: "Frequently asked questions",
    relatedTitle: "Keep reading",
  },
};

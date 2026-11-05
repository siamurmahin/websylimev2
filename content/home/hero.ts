// Homepage → hero section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
export const hero = {
  badge: "Only 7 spots left for Q1 2027",
  // Open question in the plan: final headline not chosen yet. Alternatives:
  //   "Websites that turn visitors into buyers."
  //   "Your website should be your best salesperson."
  //   "More calls. More booked jobs. Zero hassle."
  //   "We run your online presence. You run your business."
  headline: "More calls for home service businesses.",
  // Word(s) from the headline that get the lime marker highlight
  headlineAccent: "More calls",
  subheadline:
    "Websites, social media and Google for plumbers, electricians, pest control and construction companies, handled by one team. You do the jobs. We handle everything online.",
  primaryCta: { label: "Get More Customers", href: "/start-project" },
  secondaryCta: { label: "See Our Work", href: "/work" },
  socialProof: {
    rating: 5,
    ratingLabel: "Rated 5 out of 5",
    text: "Trusted by 300+ business owners",
    // Owner confirmed these photos. To show initials instead, set src to null and
    // alt to the client's name.
    avatars: [
      { src: "/clients/client-1.webp" as string | null, alt: "Websy Lime client" },
      { src: "/clients/client-2.webp" as string | null, alt: "Websy Lime client" },
      { src: "/clients/client-3.webp" as string | null, alt: "Websy Lime client" },
      { src: "/clients/client-4.webp" as string | null, alt: "Websy Lime client" },
      { src: "/clients/client-5.webp" as string | null, alt: "Websy Lime client" },
    ],
  },
  trustLine: ["No long contracts", "Fast turnaround", "2% of every project goes to charity"],
};

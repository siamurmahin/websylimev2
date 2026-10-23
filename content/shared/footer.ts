// Shared across the site → footer.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
export const footer = {
  blurb: "Websites, social and local growth for service businesses. One team, one invoice.",
  contact: {
    email: "[hello@websylime.com]",
    whatsapp: { label: "WhatsApp", href: "[WhatsApp link — wa.me/…]" },
    addressLabel: "Websy Lime LLC",
    address: "[US LLC address]",
  },
  columns: [
    {
      title: "Services",
      links: [
        { label: "Website Design", href: "/services/website-design" },
        { label: "All-in-One Growth", href: "/services/growth" },
        { label: "Graphic Design", href: "/services/graphic-design" },
        { label: "Video Editing", href: "/services/video-editing", badge: "Soon" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "WebsyChat", href: "/products/websychat" },
        { label: "More coming soon", href: "", badge: null },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Story", href: "/about#story" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Our Work", href: "/work" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ] as { title: string; links: { label: string; href: string; badge?: string | null }[] }[],
  newsletter: {
    title: "Growth notes",
    body: "One short email a month with plain-English tips to win more customers online.",
    label: "Email address",
    placeholder: "you@business.com",
    cta: "Subscribe",
    success: "Thanks — you're on the list.",
    note: "No spam. Unsubscribe anytime.",
  },
  socialLabel: "Follow us",
  social: [
    { id: "linkedin", label: "LinkedIn", href: "[LinkedIn URL]" },
    { id: "facebook", label: "Facebook", href: "[Facebook URL]" },
    { id: "instagram", label: "Instagram", href: "[Instagram URL]" },
  ] as { id: "linkedin" | "facebook" | "instagram"; label: string; href: string }[],
  // {year} is filled in automatically
  copyright: "© {year} Websy Lime LLC. All rights reserved.",
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  charityLine: "Proudly giving 2% of revenue to charity.",
  backToTop: "Back to top",
};

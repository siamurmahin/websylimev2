// Shared across the site → header.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { NavItem } from "@/content/types";
export const header = {
  primaryCta: { label: "Let's Build Yours", href: "/start-project" },
  // Used in the mobile menu. On desktop, booking lives in the floating pill below.
  secondaryCta: { label: "Book a Call", href: "/book-a-call" },
  // Floating "book a call" pill, bottom-right, appears after the Hero
  bookCall: {
    label: "Book a free call",
    shortLabel: "Book a call",
    note: "[15]-min chat · no pressure",
    href: "/book-a-call",
    // Founder photo makes it personal; null shows a calendar icon
    avatar: { src: null as string | null, alt: "[Founder name]" },
  },
  skipLink: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  mobileFooterNote: "No long contracts · Fast turnaround · 2% to charity",
  theme: { toLight: "Switch to light mode", toDark: "Switch to dark mode" },
  nav: [
    {
      kind: "mega",
      id: "services",
      label: "Services",
      groups: [
        {
          title: "Website Design",
          href: "/services/website-design",
          links: [
            {
              label: "[Launch]",
              href: "/services/website-design#landing",
              description: "One page, one offer. Great for coaches.",
              icon: "layout",
            },
            {
              label: "[Business]",
              href: "/services/website-design#business",
              description: "A full website for local service businesses.",
              icon: "rocket",
            },
            {
              label: "[Store]",
              href: "/services/website-design#store",
              description: "An online store to sell your products.",
              icon: "shoppingBag",
            },
          ],
        },
        {
          title: "All-in-One Growth",
          href: "/services/growth",
          links: [
            {
              label: "Foundation",
              href: "/services/growth#foundation",
              description: "Get found, look credible, stay consistent.",
              icon: "sprout",
            },
            {
              label: "Lead Growth",
              href: "/services/growth#lead-growth",
              description: "More calls and form fills, every month.",
              icon: "trending",
            },
            {
              label: "Market Leader",
              href: "/services/growth#market-leader",
              description: "Own your local market. We run it all.",
              icon: "crown",
            },
          ],
        },
        {
          title: "Graphic Design",
          href: "/services/graphic-design",
          links: [
            {
              label: "Social media posts",
              href: "/services/graphic-design#social",
              description: "Scroll-stopping posts that keep your brand busy.",
              icon: "image",
            },
            {
              label: "Ads & promos",
              href: "/services/graphic-design#ads",
              description: "Graphics for ads, offers and announcements.",
              icon: "megaphone",
            },
            {
              label: "Graphic portfolio",
              href: "/work#graphic-design",
              description: "See our design work — separate from websites.",
              icon: "palette",
            },
          ],
        },
        {
          title: "Video Editing",
          badge: "Coming Soon",
          placement: "strip",
          // Set to true to hide Video Editing from the menu entirely
          hidden: false,
          links: [
            {
              label: "Short-form & ads",
              href: "/services/video-editing",
              description: "Scroll-stopping edits for social and ads.",
              icon: "video",
              badge: "Soon",
            },
          ],
        },
      ],
      feature: {
        eyebrow: "Latest case study",
        // Keep in sync with the first story in content/case-studies.ts
        title: "Hallmark Contractors — [headline result]",
        description: "[One line on what changed for this client.]",
        href: "/case-studies/hallmark-contractors",
        cta: "Read the case study",
        image: "/work/hallmark-contractors.webp",
        imageAlt: "Hallmark Contractors website",
      },
    },
    {
      kind: "products",
      id: "products",
      label: "Products",
      product: {
        name: "WebsyChat",
        tagline: "An AI assistant that answers visitors and captures leads 24/7.",
        href: "/products/websychat",
        cta: { label: "Try Free", href: "[WebsyChat free-trial URL]" },
        secondary: { label: "Learn more", href: "/products/websychat" },
      },
      comingSoon: {
        title: "More coming soon",
        description: "New tools for running your business online are on the way.",
      },
    },
    { kind: "link", label: "Work", href: "/work" },
    {
      kind: "dropdown",
      id: "company",
      label: "Company",
      links: [
        { label: "About Us", href: "/about", description: "Who we are and how we work." },
        { label: "Our Story", href: "/about#story", description: "From 2024 to Websy Lime v2." },
        { label: "Careers", href: "/careers", description: "Join the team." },
        { label: "Contact", href: "/contact", description: "Say hello. We reply fast." },
      ],
    },
    {
      kind: "dropdown",
      id: "resources",
      label: "Resources",
      links: [
        { label: "Blog", href: "/blog", description: "Plain-English tips to grow online." },
        { label: "Case Studies", href: "/case-studies", description: "Real results for real businesses." },
        { label: "FAQ", href: "/faq", description: "Quick answers to common questions." },
      ],
    },
    { kind: "link", label: "Pricing", href: "/pricing" },
  ] satisfies NavItem[] as NavItem[],
};

/**
 * Graphic design portfolio — kept separate from the website portfolio
 * (content/portfolio.ts). Social media posts, ads, branding, print, etc.
 * Feeds the Graphic Design service page and the "Graphic Design" tab on /work.
 * Images live in public/design/.
 *
 * Example:
 *   { title: "Spring promo carousel", client: "Acme Plumbing", type: "social",
 *     image: "/design/acme-spring-promo.webp", width: 1080, height: 1350 },
 */

export type DesignType = "social" | "ads" | "branding" | "print" | "other";

export type DesignItem = {
  title: string;
  client: string;
  type: DesignType;
  image: string;
  /** Real pixel size: social posts are often 1080×1080 or 1080×1350 */
  width: number;
  height: number;
};

export const designTypeLabels: Record<DesignType, string> = {
  social: "Social media posts",
  ads: "Ads",
  branding: "Branding",
  print: "Print",
  other: "Other",
};

export const designPortfolio: DesignItem[] = [];

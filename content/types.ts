// Shared content types. Used by the content files and components.

export type IconKey =
  | "layout"
  | "rocket"
  | "gem"
  | "sprout"
  | "trending"
  | "crown"
  | "video"
  | "chat"
  | "sparkles"
  | "image"
  | "megaphone"
  | "palette"
  | "trendingDown"
  | "users"
  | "calendarX"
  | "receipt"
  | "hourglass"
  | "moon"
  | "mapPinOff"
  | "mapPin"
  | "shoppingBag"
  | "phoneMissed"
  | "userRound"
  | "calendarCheck"
  | "zap"
  | "badgeCheck"
  | "search"
  | "penTool"
  | "code";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: IconKey;
  badge?: string;
  hidden?: boolean;
};

export type NavGroup = {
  title: string;
  href?: string;
  badge?: string;
  hidden?: boolean;
  /** "column" = full column in the mega menu (default); "strip" = slim row underneath */
  placement?: "column" | "strip";
  links: NavLink[];
};

export type MegaFeature = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string | null;
  imageAlt: string;
};

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "mega"; id: string; label: string; groups: NavGroup[]; feature?: MegaFeature }
  | {
      kind: "products";
      id: string;
      label: string;
      product: {
        name: string;
        tagline: string;
        href: string;
        cta: { label: string; href: string };
        secondary: { label: string; href: string };
      };
      comingSoon: { title: string; description: string };
    }
  | { kind: "dropdown"; id: string; label: string; links: NavLink[] };

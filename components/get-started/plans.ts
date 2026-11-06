import { site } from "@/content/site";

export type PlanKind = "website" | "growth" | "design";

export type ChosenPlan = {
  id: string;
  kind: PlanKind;
  name: string;
  tagline: string;
  price: string;
  per: string;
  points: string[];
  changeHref: string;
};

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Builds the summary from each plan's own content, so prices have one source. */
const plans: ChosenPlan[] = [
  ...site.pricingPage.website.plans.map((p) => ({
    id: p.id,
    kind: "website" as const,
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    per: site.pricingPage.website.perLabel,
    points: [p.values[0], `Ready in about ${p.values[9]}`, "Hosting and SSL for the first 12 months", `${p.values[8]} of changes`],
    changeHref: "/pricing",
  })),
  ...site.home.pricing.plans.map((p) => ({
    id: p.id,
    kind: "growth" as const,
    name: p.name,
    tagline: p.tagline,
    price: money(p.price),
    per: site.home.pricing.perMonth,
    points: [`${p.values[0]} new pages a month`, `${p.values[1].split(" ")[0]} SEO articles a month`, `${p.values[2]} social posts a month`, "Works on your existing website"],
    changeHref: "/pricing#growth",
  })),
  ...site.services.graphicDesign.plans.items.map((p) => ({
    id: p.id,
    kind: "design" as const,
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    per: site.services.graphicDesign.plans.per,
    points: [`${p.values[0]} a month`, `Ready in about ${p.values[6]}`, `${p.values[5].replace(" each", "")} of changes per design`, "Cancel anytime"],
    changeHref: "/services/graphic-design#plans",
  })),
];

export const findPlan = (id: string | null) => plans.find((p) => p.id === id) ?? null;

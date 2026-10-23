import { Clock, FileText, ImageIcon, LayoutTemplate, Palette, PenTool, RefreshCw, Search, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import type { PlanCardData } from "@/components/sections/pricing/PlanCards";

const web = site.pricingPage.website;

/** One icon per Website Design row, same order as pricingPage.website.rows */
export const WEBSITE_ICONS: LucideIcon[] = [LayoutTemplate, Palette, Smartphone, ShieldCheck, FileText, Search, PenTool, ImageIcon, RefreshCw, Clock];

/** Website Design packages as plan cards (Pricing page + Website Design page). ids = Start Project ?package= */
export const websiteCards: PlanCardData[] = web.plans.map((plan) => ({
  id: plan.id,
  name: plan.name,
  tagline: plan.tagline,
  price: plan.price,
  per: web.perLabel,
  badge: plan.badge,
  featured: plan.badge === "Recommended",
  href: `/start-project?package=${plan.id}`,
  values: plan.values,
}));

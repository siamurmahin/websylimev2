import {
  Clapperboard,
  FileText,
  ImageIcon,
  LayoutTemplate,
  MapPin,
  Megaphone,
  RefreshCw,
  Star,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export const pricing = site.home.pricing;
export type Plan = (typeof pricing.plans)[number];

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/** One icon per comparison row, same order as pricing.rows */
export const ROW_ICONS: LucideIcon[] = [
  LayoutTemplate,
  FileText,
  ImageIcon,
  MapPin,
  Clapperboard,
  Megaphone,
  Star,
  RefreshCw,
];

export const isNone = (v: string) => v === "—";


export function PricingHeading({ id, dark = false, center = false }: { id: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold",
          dark ? "border-white/15 bg-white/5 text-white/70" : "bg-surface/70 text-muted-foreground",
        )}
      >
        <span aria-hidden className={cn("size-1.5 rounded-full", dark ? "bg-lime" : "bg-lime-strong dark:bg-lime")} />
        {pricing.eyebrow}
      </p>
      <h2 id={id} className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
        {pricing.headline}
      </h2>
      <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted-foreground")}>{pricing.subheadline}</p>
    </div>
  );
}

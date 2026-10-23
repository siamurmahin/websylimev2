import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Copy, href } from "@/lib/copy";
import { cn } from "@/lib/utils";

/** Shared heading row for every Process design option. */
export function ProcessHeader({ dark = false, id }: { dark?: boolean; id: string }) {
  const p = site.home.process;
  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold",
            dark ? "border-white/15 bg-white/5 text-white/70" : "bg-surface/70 text-muted-foreground",
          )}
        >
          <span aria-hidden className={cn("size-1.5 rounded-full", dark ? "bg-lime" : "bg-lime-strong dark:bg-lime")} />
          {p.eyebrow}
        </p>
        <h2
          id={id}
          className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance [&_.placeholder-mark]:text-inherit"
        >
          <Copy text={p.headline} />
        </h2>
      </div>
      <Button asChild size="pill-lg" className="group shrink-0 hover:bg-lime">
        <Link href={href(p.cta.href)}>
          {p.cta.label}
          <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}

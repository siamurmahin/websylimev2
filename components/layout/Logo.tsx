import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Real logo: one file per theme, swapped with CSS so there's no flash on load. */
export function Logo({ className }: { className?: string }) {
  const { logo, name } = site.brand;
  const img = { width: 134, height: 44, quality: 90, loading: "eager" } as const;

  return (
    <Link
      href="/"
      aria-label={`${name} — home`}
      className={cn(
        "inline-flex items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <Image {...img} src={logo.src} alt={logo.alt} className="h-10 w-auto dark:hidden" />
      <Image {...img} src={logo.srcDark} alt={logo.alt} className="hidden h-10 w-auto dark:block" />
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const { logo, wordmark, name } = site.brand;

  return (
    <Link
      href="/"
      aria-label={`${name} — home`}
      className={cn(
        "group inline-flex items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      {logo.src ? (
        <Image src={logo.src} alt={logo.alt} width={140} height={32} loading="eager" className="h-7 w-auto" />
      ) : (
        <>
          <span
            aria-hidden
            className="relative grid size-7 place-items-center rounded-[9px] bg-lime text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path d="M12 2c5.5 0 10 4.5 10 10 0 5-3.7 9.2-8.6 9.9.4-4.4-1.2-8.2-4.6-11.1 3.6 1.4 6 4.2 7 8 .9-1.8 1.3-3.8 1.1-5.9C16.4 8 13 4.6 8 3.4 9.3 2.5 10.6 2 12 2Z" />
            </svg>
          </span>
          <span className="font-display text-[1.2rem] leading-none font-bold tracking-tight">
            {wordmark.first}
            <span className="text-lime-strong">{wordmark.second}</span>
          </span>
        </>
      )}
    </Link>
  );
}

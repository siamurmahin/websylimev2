import Image from "next/image";
import { site } from "@/content/site";
import { Marquee } from "@/components/motion/Marquee";
import { Copy, plain } from "@/lib/copy";

/* Simple glyphs so placeholder logos read as "logo-shaped" until real ones land */
const GLYPHS = [
  <circle key="c" cx="10" cy="10" r="8" />,
  <rect key="r" x="2" y="2" width="16" height="16" rx="4" />,
  <path key="t" d="M10 2 18 17H2Z" />,
  <path key="d" d="M10 1 19 10 10 19 1 10Z" />,
  <path key="h" d="M2 10a8 8 0 0 1 16 0Z M2 12h16v6H2Z" />,
  <path key="s" d="M2 2h7v7H2Z M11 11h7v7h-7Z" />,
];

function PlaceholderLogo({ name, index }: { name: string; index: number }) {
  return (
    <span className="inline-flex items-center gap-2 text-foreground/55" title="Placeholder — see TODO.md">
      <svg viewBox="0 0 20 20" className="size-5 fill-current" aria-hidden>
        {GLYPHS[index % GLYPHS.length]}
      </svg>
      <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap">
        <Copy text={name} />
      </span>
    </span>
  );
}

export function TrustBar() {
  const { label, logos } = site.home.trustBar;

  return (
    <section aria-label={label} className="relative border-y bg-surface/50">
      <div className="container-site flex flex-col items-center gap-6 py-10 lg:flex-row lg:gap-10 lg:py-8">
        <p className="shrink-0 text-center text-balance lg:max-w-[15rem] text-sm leading-snug font-medium text-muted-foreground lg:border-r lg:pr-10 lg:text-left">
          {label}
        </p>

        <Marquee direction="left" className="w-full min-w-0 flex-1">
          {logos.map((logo, i) =>
            logo.src ? (
              <Image
                key={i}
                src={logo.src}
                alt={plain(logo.name)}
                width={logo.width}
                height={32}
                className="h-7 w-auto opacity-55 brightness-0 transition-opacity duration-300 hover:opacity-100 dark:invert"
              />
            ) : (
              <PlaceholderLogo key={i} name={logo.name} index={i} />
            ),
          )}
        </Marquee>
      </div>
    </section>
  );
}

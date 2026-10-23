import Image from "next/image";
import { site } from "@/content/site";
import { portfolio } from "@/content/portfolio";
import { Marquee } from "@/components/motion/Marquee";

/** Endless strip of client website screenshots, moving right. Sits between Hero and Trust Bar. */
export function PortfolioStrip() {
  const { label, count, imageAlt } = site.home.portfolioStrip;
  const items = portfolio.slice(0, count);

  return (
    <section aria-label={label} className="relative pb-12 sm:pb-16">
      <Marquee direction="right" gap="1.25rem">
        {items.map((item) => (
          <figure
            key={item.slug}
            className="group/card relative w-[260px] shrink-0 overflow-hidden rounded-2xl border bg-surface shadow-[0_18px_40px_-24px_rgb(0_0_0/0.3)] sm:w-[360px] dark:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.8)]"
          >
            <Image
              src={item.image}
              alt={imageAlt.replace("{name}", item.name)}
              width={1170}
              height={630}
              sizes="(min-width: 640px) 360px, 260px"
              // Lazy by default: the strip sits below the Hero on first load, so it
              // shouldn't compete with the headline for bandwidth
              className="aspect-[1170/630] h-auto w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3 text-left text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
              {item.name}
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}

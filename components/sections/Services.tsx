import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { portfolio } from "@/content/portfolio";
import { designPortfolio } from "@/content/design-portfolio";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Tilt } from "@/components/motion/Tilt";
import { cn } from "@/lib/utils";

type Item = (typeof site.home.services.items)[number];

const ease = "duration-700 ease-out-expo";

/* ---------------- card visuals ---------------- */

function WebsiteVisual() {
  const [front, back] = portfolio;
  return (
    <div className="absolute inset-0 overflow-hidden">
      {back && (
        <Image
          src={back.image}
          alt=""
          width={1170}
          height={630}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className={cn(
            "absolute top-10 right-[-12%] w-[72%] rotate-[4deg] rounded-xl border opacity-70 shadow-xl transition-transform group-hover:translate-x-3 group-hover:rotate-[6deg]",
            ease,
          )}
        />
      )}
      {front && (
        <Image
          src={front.image}
          alt=""
          width={1170}
          height={630}
          sizes="(min-width: 1024px) 45vw, 95vw"
          className={cn(
            "absolute top-14 left-[6%] w-[74%] rounded-xl border shadow-2xl transition-transform group-hover:-translate-y-2 group-hover:scale-[1.04]",
            ease,
          )}
        />
      )}
    </div>
  );
}

function ChatVisual() {
  const { chat } = site.home.services;
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-6">
      {chat.map((msg, i) => (
        <div
          key={i}
          className={cn(
            "max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm transition-transform",
            ease,
            msg.from === "bot"
              ? "self-start rounded-bl-md bg-lime text-ink group-hover:translate-x-1"
              : "self-end rounded-br-md border bg-surface text-foreground group-hover:-translate-x-1",
          )}
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          {msg.text}
        </div>
      ))}
      <div aria-hidden className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-lime/30 px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-lime-strong dark:bg-lime"
            style={{ animationDelay: `${i * 140}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function GrowthVisual() {
  const { growthLabels } = site.home.services;
  const bars = [32, 46, 40, 58, 66, 82];
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6">
      <div className="flex flex-wrap gap-1.5">
        {growthLabels.map((label) => (
          <span key={label} className="inline-flex items-center gap-1 rounded-full border bg-surface px-2.5 py-1 text-xs font-semibold">
            <ArrowUpRight className="size-3 text-lime-strong dark:text-lime" aria-hidden />
            {label}
          </span>
        ))}
      </div>
      <div className="flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 origin-bottom rounded-t-md transition-transform group-hover:scale-y-[1.12]",
              ease,
              i === bars.length - 1 ? "bg-lime" : "bg-foreground/10",
            )}
            style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

const TILE_HUES = [145, 25, 260];

function GraphicVisual() {
  const shots = designPortfolio.slice(0, 3);
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {TILE_HUES.map((hue, i) => {
        const shot = shots[i];
        const pos = [
          "-translate-x-[95%] -rotate-[10deg] group-hover:-translate-x-[110%] group-hover:-rotate-[14deg]",
          "z-10 -translate-y-2 group-hover:-translate-y-4",
          "translate-x-[95%] rotate-[10deg] group-hover:translate-x-[110%] group-hover:rotate-[14deg]",
        ][i];
        return (
          <div
            key={i}
            className={cn(
              "absolute aspect-[4/5] w-[30%] max-w-44 overflow-hidden rounded-2xl border shadow-xl transition-transform",
              ease,
              pos,
            )}
          >
            {shot ? (
              <Image src={shot.image} alt="" fill sizes="180px" className="object-cover" />
            ) : (
              <div
                className="flex size-full flex-col justify-between p-3"
                style={{
                  background: `linear-gradient(150deg, oklch(0.9 0.1 ${hue}), oklch(0.72 0.14 ${hue}))`,
                }}
              >
                <span className="h-2 w-10 rounded-full bg-black/20" />
                <span className="grid size-10 place-items-center self-center rounded-full bg-white/50">
                  <Sparkles className="size-4 text-black/50" aria-hidden />
                </span>
                <span className="space-y-1">
                  <span className="block h-2 w-full rounded-full bg-black/20" />
                  <span className="block h-2 w-2/3 rounded-full bg-black/15" />
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const VISUALS: Record<Item["visual"], () => React.ReactNode> = {
  website: WebsiteVisual,
  chat: ChatVisual,
  growth: GrowthVisual,
  graphic: GraphicVisual,
};

const SPANS: Record<Item["visual"], string> = {
  website: "sm:col-span-2",
  chat: "",
  growth: "",
  graphic: "sm:col-span-2 lg:col-span-2",
};

/* ---------------- section ---------------- */

export function Services() {
  const { eyebrow, headline, cta, items } = site.home.services;

  return (
    <section id="services" aria-labelledby="services-title" className="relative pt-14 pb-10 sm:pt-28 sm:pb-14">
      <StaggerReveal className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
              {eyebrow}
            </p>
            <h2
              id="services-title"
              data-reveal
              className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
            >
              {headline}
            </h2>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Visual = VISUALS[item.visual];
            return (
              <li key={item.title} data-reveal className={SPANS[item.visual]}>
                <Tilt className="h-full">
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-surface outline-none transition-[border-color,box-shadow] duration-500 hover:border-lime/50 hover:shadow-[0_30px_70px_-35px_rgb(0_0_0/0.3)] focus-visible:ring-3 focus-visible:ring-ring/50 dark:hover:shadow-[0_30px_70px_-35px_rgb(0_0_0/0.9)]"
                  >
                    <div
                      aria-hidden
                      className="relative h-60 overflow-hidden border-b bg-[radial-gradient(120%_100%_at_50%_0%,var(--surface-2),var(--surface))] sm:h-72"
                    >
                      <Visual />
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="flex items-center gap-2 font-display text-2xl font-bold tracking-[-0.02em]">
                        {item.title}
                        {item.badge && (
                          <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold tracking-wide text-ink">
                            {item.badge}
                          </span>
                        )}
                      </h3>
                      <p className="mt-2 mb-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold">
                        {cta}
                        <span className="sr-only"> {item.title}</span>
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Tilt>
              </li>
            );
          })}
        </ul>
      </StaggerReveal>
    </section>
  );
}

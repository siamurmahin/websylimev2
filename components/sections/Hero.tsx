import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Star, User } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { FadeUp, SplitReveal } from "@/components/motion/SplitReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { PointerGlow } from "@/components/motion/PointerGlow";
import { Copy, href, plain } from "@/lib/copy";

export function Hero() {
  const hero = site.home.hero;
  const { socialProof } = hero;

  return (
    <section id="hero" aria-label="Introduction" className="relative isolate overflow-hidden pt-header">
      {/* ---------- background ---------- */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(60%_55%_at_50%_40%,black,transparent_75%)] bg-[size:56px_56px] opacity-70"
      />
      <div className="absolute inset-0 -z-10">
        <PointerGlow />
      </div>

      <div className="container-site flex flex-col items-center pt-14 pb-14 text-center sm:pt-20 sm:pb-16 lg:pt-24">
        <FadeUp>
          <p className="inline-flex items-center gap-2.5 rounded-full border bg-surface/70 py-1.5 pr-3.5 pl-3 text-sm font-medium shadow-sm backdrop-blur">
            <span aria-hidden className="relative grid size-2 place-items-center">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime-strong dark:bg-lime" />
              <span className="relative size-2 rounded-full bg-lime-strong dark:bg-lime" />
            </span>
            <span>
              <Copy text={hero.badge} />
            </span>
          </p>
        </FadeUp>

        <SplitReveal
          text={hero.headline}
          accent={hero.headlineAccent}
          delay={0.15}
          className="mt-7 max-w-[15ch] font-display text-[clamp(2.75rem,7.2vw,6.25rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance"
        />

        <FadeUp delay={0.55}>
          <p className="mx-auto mt-7 max-w-[38rem] text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {hero.subheadline}
          </p>
        </FadeUp>

        <FadeUp delay={0.7} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Magnetic>
            <Button asChild size="pill-lg" className="group w-full shadow-[0_10px_30px_-10px_var(--lime)] hover:bg-lime sm:w-auto">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </Magnetic>
          <Button asChild size="pill-lg" variant="outline" className="rounded-full bg-surface/60 backdrop-blur">
            <Link href={href(hero.secondaryCta.href)}>{hero.secondaryCta.label}</Link>
          </Button>
        </FadeUp>

        {/* ---------- social proof ---------- */}
        <FadeUp delay={0.85} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <ul className="flex -space-x-2.5">
            {socialProof.avatars.map((avatar, i) => (
              <li
                key={i}
                className="relative size-10 overflow-hidden rounded-full bg-surface-2 ring-[3px] ring-background"
                style={{ zIndex: socialProof.avatars.length - i }}
              >
                {avatar.src ? (
                  <Image src={avatar.src} alt={plain(avatar.alt)} fill sizes="40px" className="object-cover" />
                ) : (
                  <span
                    className="grid size-full place-items-center text-muted-foreground"
                    style={{
                      background: `linear-gradient(140deg, oklch(0.85 0.07 ${110 + i * 45} / 0.55), transparent)`,
                    }}
                    title="Placeholder — see TODO.md"
                  >
                    <User className="size-4" aria-hidden />
                    <span className="sr-only">{plain(avatar.alt)}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-0.5 sm:justify-start" role="img" aria-label={socialProof.ratingLabel}>
              {Array.from({ length: socialProof.rating }).map((_, i) => (
                <Star key={i} aria-hidden className="size-4 fill-star text-star" />
              ))}
            </div>
            <p className="mt-1 text-sm font-medium">
              <Copy text={socialProof.text} />
            </p>
          </div>
        </FadeUp>

        {/* ---------- trust line ---------- */}
        <FadeUp delay={0.95}>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {hero.trustLine.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}

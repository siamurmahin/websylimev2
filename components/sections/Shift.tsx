"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const clean = (w: string) => w.toLowerCase().replace(/[^a-z]/g, "");

/**
 * "The Shift": problem → solution. On desktop the panel pins while the big
 * statement lights up word by word as you scroll. Phones scrub without pinning;
 * reduced motion shows the text fully lit.
 */
export function Shift() {
  const { eyebrow, headline, headlineAccent, body, bodyAccents } = site.home.shift;
  const sectionRef = useRef<HTMLElement>(null);
  // Snap callbacks run later, so read Lenis through a ref
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);
  const accents = new Set(bodyAccents.map(clean));

  const [before, after] = headline.split(headlineAccent);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const words = "[data-word]";

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current!;
        /*
         * Auto-snap so the white gaps around the panel are never sat on:
         *  ↓ leaving Pain Points  → glide to where the panel pins
         *  ↓ text fully lit       → glide to the top of Services
         *  ↑ leaving Services     → glide back to the end of the pin
         *  ↑ leaving the pin      → glide back to the end of Pain Points
         */
        const SNAP_S = 0.75;
        let snapping = false;
        let release: ReturnType<typeof setTimeout> | undefined;
        const snapTo = (target: number | HTMLElement) => {
          const lenis = lenisRef.current;
          if (!lenis || snapping) return;
          // Only snap from normal nearby scrolling — a jump (anchor link, refresh
          // mid-page, scrollbar drag) that flies past this section is left alone
          const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
          if (Math.abs(y - window.scrollY) > window.innerHeight * 1.25) return;
          snapping = true;
          // Always re-arm: if the glide is interrupted or never reports completion,
          // a stuck flag would silently switch snapping off for the rest of the visit
          clearTimeout(release);
          release = setTimeout(() => (snapping = false), SNAP_S * 1000 + 150);
          lenis.scrollTo(target, {
            duration: SNAP_S,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            // locked so trackpad momentum can't cancel it halfway, but short
            // enough that input isn't swallowed for long
            lock: true,
            force: true,
          });
        };

        const prev = document.getElementById("pain-points");
        const next = document.getElementById("services");

        // Text finishes lighting at ~85% of the pin, so it never looks "done"
        // while there's still dead scroll left before the exit glide
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.6,
            // glide on to Services as soon as the text is done — no need to
            // scroll through the last stretch of the pin first
            onUpdate: (self) => {
              if (self.direction === 1 && self.progress > 0.9 && next) snapTo(next);
            },
          },
        });
        tl.fromTo(words, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.12 }).to({}, { duration: tl.duration() * 0.18 });
        const pin = tl.scrollTrigger!;


        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => snapTo(pin.start),
        });

        // Mirrors the pin's range (functions so it stays right after refreshes)
        ScrollTrigger.create({
          start: () => pin.start,
          end: () => pin.end,
          onLeave: () => next && snapTo(next),
          onLeaveBack: () => {
            if (prev) snapTo(prev.offsetTop + prev.offsetHeight - window.innerHeight * 0.92);
          },
        });

        if (next) {
          // Mirror of the downward snap: the moment you scroll up from the start
          // of Services, glide back so the panel sits centered at the end of the pin
          ScrollTrigger.create({
            trigger: next,
            start: "top 10px",
            onLeaveBack: () => snapTo(pin.end),
          });
        }

        return () => clearTimeout(release);
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: "[data-statement]", start: "top 85%", end: "bottom 50%", scrub: 0.4 },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="the-shift"
      aria-labelledby="the-shift-title"
      className="relative flex items-center py-3 sm:py-6 lg:h-svh lg:py-8"
    >
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-5 py-11 text-white sm:rounded-[2.5rem] sm:px-12 sm:py-20 lg:px-20 lg:py-24 dark:border dark:border-white/10">
          {/* ambient lime glow + grain-free grid */}
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -z-10 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-lime/20 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)] bg-[size:56px_56px]"
          />

          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white/70">
            <span aria-hidden className="size-1.5 rounded-full bg-lime" />
            {eyebrow}
          </p>

          <h2
            id="the-shift-title"
            className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          >
            {before}
            <span className="whitespace-nowrap text-lime">{headlineAccent}</span>
            {after}
          </h2>

          <p
            data-statement
            className="mt-8 max-w-5xl font-display text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.22] font-semibold tracking-[-0.025em] sm:mt-14"
          >
            {body.split(" ").map((word, i) => (
              <span key={i}>
                <span data-word className={cn(accents.has(clean(word)) && "text-lime")}>
                  {word}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

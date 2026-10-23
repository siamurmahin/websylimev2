"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

/**
 * Drives Lenis from GSAP's ticker so ScrollTrigger and Lenis stay in sync.
 * useLenis() re-renders once the instance exists — reading it from a ref on
 * mount was too early, which left Lenis eating wheel events without scrolling.
 */
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

/** A section's `scroll-margin-top` (e.g. `scroll-mt-24`), so jumps clear the header. */
const marginTop = (el: Element) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;

/**
 * Same-page links (`#project-form`, `/start-project#project-form` while on that
 * page). Clicking one when the URL already has that hash changes nothing, so
 * the browser doesn't scroll — the button looks broken. Handle every such
 * click: scroll smoothly (Lenis) or natively (reduced motion), every time.
 */
function SamePageAnchors() {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(a instanceof HTMLAnchorElement) || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      e.preventDefault();
      e.stopPropagation(); // keep Next's Link from doing its own (no-op) hash handling
      // Lenis applies the element's scroll-margin-top itself; native scroll needs it added
      if (lenis) lenis.scrollTo(el, { duration: 1.1 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - marginTop(el) });
      if (window.location.hash !== url.hash) history.pushState(null, "", url.hash);
    };
    // capture phase: runs before Next's Link click handler
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}

/**
 * Arriving on a page with a #hash (e.g. /#pricing from the 404 or another
 * page): the browser's own jump happens before pinned ScrollTrigger sections
 * add their spacing, so it lands in the wrong place. Wait for layout, refresh
 * the triggers, then jump; correct once more unless the visitor has scrolled.
 */
function HashScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let landed: number | null = null;

    const jump = () => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.refresh();
      const top = el.getBoundingClientRect().top + window.scrollY - marginTop(el);
      // Lenis still holds the previous page's height after a client-side
      // navigation; re-measure first or it clamps the jump to the old bottom
      lenis?.resize();
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo(0, top);
      landed = window.scrollY;
    };

    // The target may not exist yet (page still streaming in): wait for it (≤3s),
    // give layout a beat, jump, then correct once if nothing moved it since.
    const timers: ReturnType<typeof setTimeout>[] = [];
    let tries = 0;
    const waitForTarget = () => {
      if (!document.getElementById(id)) {
        if (tries++ < 30) timers.push(setTimeout(waitForTarget, 100));
        return;
      }
      timers.push(setTimeout(jump, 150));
      timers.push(
        setTimeout(() => {
          if (landed !== null && Math.abs(window.scrollY - landed) < 4) jump();
        }, 900),
      );
    };
    waitForTarget();
    return () => timers.forEach(clearTimeout);
  }, [pathname, lenis]);

  return null;
}

/** Lenis smooth scroll. Disabled entirely for prefers-reduced-motion. */
function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1 }}>
      <LenisGsapSync />
      <HashScroll />
      <SamePageAnchors />
      {children}
    </ReactLenis>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduced ? (
        <>
          <HashScroll />
          <SamePageAnchors />
          {children}
        </>
      ) : (
        <SmoothScroll>{children}</SmoothScroll>
      )}
    </MotionConfig>
  );
}

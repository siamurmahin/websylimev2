"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { Copy, href, plain } from "@/lib/copy";
import { useFooterEnd } from "@/components/layout/useFooterEnd";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Floating "Book a free call" pill, bottom-right. Shows once the visitor
 * scrolls past the Hero, so it never competes with the Hero CTAs, and steps
 * aside at the end of the footer (which has its own contact buttons).
 */
export function BookCallFloat() {
  const { label, shortLabel, note, avatar } = site.header.bookCall;
  const link = href(site.header.bookCall.href);
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const atEnd = useFooterEnd();
  // already on the booking page (pill would point to itself) or on Contact,
  // which lists "Book a free call" itself and where the pill covers the form,
  // or on Careers (for applicants, not customers)
  const pathname = usePathname();
  const onBookingPage = pathname === link || pathname === "/contact" || pathname === "/careers";

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.6));

  return (
    <AnimatePresence>
      {visible && !atEnd && !onBookingPage && (
        <motion.div
          className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.45, ease }}
        >
          <Link
            href={link}
            className="group flex items-center gap-3 rounded-full border bg-popover/90 py-1.5 pr-2 pl-1.5 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl outline-none transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-14px_rgb(0_0_0/0.35)] focus-visible:ring-3 focus-visible:ring-ring/50 dark:shadow-[0_16px_40px_-12px_rgb(0_0_0/0.7)]"
          >
            {/* avatar / icon with "online" dot */}
            <span className="relative shrink-0">
              <span className="relative grid size-10 place-items-center overflow-hidden rounded-full bg-lime text-ink">
                {avatar.src ? (
                  <Image src={avatar.src} alt={plain(avatar.alt)} fill sizes="40px" className="object-cover" />
                ) : (
                  <CalendarDays className="size-[18px]" aria-hidden />
                )}
              </span>
              <span aria-hidden className="absolute right-0 bottom-0 grid size-3 place-items-center rounded-full bg-popover">
                <span className="absolute size-2 animate-pulse-ring rounded-full bg-emerald-500" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
            </span>

            <span className="flex flex-col pr-1 leading-tight">
              <span className="text-sm font-semibold whitespace-nowrap">
                <span className="sm:hidden">{shortLabel}</span>
                <span className="hidden sm:inline">{label}</span>
              </span>
              <span className="hidden text-xs whitespace-nowrap text-muted-foreground sm:block">
                <Copy text={note} />
              </span>
            </span>

            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

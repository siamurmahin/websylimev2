"use client";

import { usePathname } from "next/navigation";

// Campaign pages (QR code landings) show only their own logo bar and footer:
// no main menu, site footer or floating "Book a call" pill.
const BARE = ["/tampa"];

export function isBarePage(pathname: string | null) {
  return !!pathname && BARE.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Renders the site chrome (header, footer, floating pills) except on campaign pages. */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return isBarePage(pathname) ? null : children;
}

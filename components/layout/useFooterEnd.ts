"use client";

import { useEffect, useState } from "react";

/**
 * True while the very end of the footer (the element marked
 * `data-footer-end`) is on screen. Fixed overlays (bottom blur, floating
 * "book a call" pill) step aside there so the giant wordmark is fully visible.
 */
export function useFooterEnd(threshold = 0.25) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.querySelector("[data-footer-end]");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return visible;
}

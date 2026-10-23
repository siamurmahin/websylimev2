"use client";

/**
 * Inline <script> that runs during HTML parsing (e.g. theme before first paint).
 * On the client it renders as text/plain so React doesn't warn about script
 * tags; suppressHydrationWarning accepts the type difference. Pattern from the
 * Next.js "Preventing flash before hydration" guide.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

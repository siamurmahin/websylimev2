import { Fragment } from "react";

const PLACEHOLDER_SPLIT = /(\[[^\]]+\])/g;
const PLACEHOLDER = /\[[^\]]+\]/;

export function isPlaceholder(value: string) {
  return PLACEHOLDER.test(value);
}

/** Links that still hold a [placeholder] resolve to `fallback` ("#" by default) so they never 404. */
export function href(value: string, fallback = "#") {
  return isPlaceholder(value) ? fallback : value;
}

/** Plain string with any [placeholder] stripped of its brackets (for alt/aria). */
export function plain(value: string) {
  return value.replace(/\[([^\]]+)\]/g, "$1");
}

/**
 * Renders copy from content/site.ts. Any [placeholder] stays visible and is
 * highlighted so unfinished copy is impossible to miss (see TODO.md).
 */
export function Copy({ text }: { text: string }) {
  if (!isPlaceholder(text)) return text;
  return text.split(PLACEHOLDER_SPLIT).map((part, i) =>
    isPlaceholder(part) ? (
      <span key={i} className="placeholder-mark" title="Placeholder — see TODO.md">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

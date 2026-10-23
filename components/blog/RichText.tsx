import { Fragment } from "react";
import Link from "next/link";
import { Copy } from "@/lib/copy";

// [label](href) or **bold**
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

const linkCls =
  "font-semibold text-foreground underline decoration-lime-strong/50 underline-offset-4 transition-colors hover:decoration-lime-strong dark:decoration-lime/50";

/**
 * Blog copy with light Markdown: inline links "see [our plans](/pricing)" and
 * "**bold**". Internal links use next/link; external ones open in a new tab.
 * Everything else still goes through <Copy> so [placeholders] stay highlighted.
 */
export function RichText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const [whole, label, href, bold] = m;
    const i = m.index ?? 0;
    if (i > last) out.push(<Copy key={`t${i}`} text={text.slice(last, i)} />);
    if (bold) {
      out.push(
        <strong key={`b${i}`} className="font-semibold text-foreground">
          {bold}
        </strong>,
      );
    } else if (href.startsWith("/") || href.startsWith("#")) {
      out.push(
        <Link key={`l${i}`} href={href} className={linkCls}>
          {label}
        </Link>,
      );
    } else {
      out.push(
        <a key={`l${i}`} href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {label}
        </a>,
      );
    }
    last = i + whole.length;
  }
  if (last < text.length) out.push(<Copy key="end" text={text.slice(last)} />);
  return <Fragment>{out}</Fragment>;
}

/** Plain text for meta/JSON-LD: "[label](href)" → "label", "**x**" → "x". */
export function stripMarkup(text: string) {
  return text.replace(TOKEN, (_, label, _href, bold) => bold ?? label);
}

/** "Ask at the right moment" → "ask-at-the-right-moment" (h2 anchors). */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/*
 * AI agents can ask for the homepage as Markdown (Accept: text/markdown) and get
 * /llms.txt instead of ~700 KB of HTML. Browsers are never affected: the Markdown
 * answer is marked no-store so a CDN can't hand it to a person, and the HTML says
 * "Vary: Accept" plus a Link header pointing agents to the Markdown version.
 */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/markdown") && !accept.includes("text/html")) {
    const res = NextResponse.rewrite(new URL("/llms.txt", request.url));
    res.headers.set("cache-control", "no-store");
    res.headers.set("vary", "Accept");
    return res;
  }
  const res = NextResponse.next();
  res.headers.set("vary", "Accept");
  res.headers.append("link", '</llms.txt>; rel="alternate"; type="text/markdown"');
  return res;
}

export const config = { matcher: "/" };

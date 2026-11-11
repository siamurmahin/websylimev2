import { site } from "@/content/site";

/*
 * robots.txt, written by hand so it can carry a Content-Signal line
 * (contentsignals.org): search engines and AI tools may index, quote and learn from
 * the site. The owner chose ai-train=yes (2026-11-11) so AI models know Websy Lime.
 */

export function GET() {
  const body = [
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "",
    `Sitemap: ${new URL("/sitemap.xml", site.meta.url).toString()}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

// Site audit against the dev server: per page → dead/placeholder links (with label),
// external links, internal link status, placeholder texts, forms, images.
const BASE = "http://localhost:3000";
const PAGES = [
  "/", "/services/website-design", "/services/growth", "/services/graphic-design", "/services/video-editing",
  "/products/websychat", "/pricing", "/work", "/case-studies", "/case-studies/hallmark-contractors",
  "/case-studies/gh-chiropractic", "/case-studies/the-kitesurf-academy", "/blog", "/blog/missed-call-text-back",
  "/blog/how-to-get-more-google-reviews", "/blog/website-not-getting-leads", "/about", "/careers", "/contact",
  "/faq", "/start-project", "/book-a-call", "/privacy", "/terms",
];
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
const text = (h) => h.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const label = (attrs, inner) => (attrs.match(/aria-label="([^"]+)"/)?.[1] || text(inner)).slice(0, 60);

const status = new Map();
async function code(path) {
  if (!status.has(path)) status.set(path, (await fetch(BASE + path, { redirect: "manual" })).status);
  return status.get(path);
}

const report = {};
const allPlaceholders = new Map(); // text -> Set(pages)
for (const page of PAGES) {
  const raw = await (await fetch(BASE + page)).text();
  const html = strip(raw);
  const r = { dead: new Set(), external: new Set(), broken: new Set(), placeholders: new Set(), forms: [], images: new Set(), buttons: 0 };
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const href = m[1].match(/\shref="([^"]*)"/)?.[1];
    if (href === undefined) continue;
    const l = label(m[1], m[2]);
    if (href === "#" || href === "") r.dead.add(l);
    else if (/^(https?:|mailto:|tel:)/.test(href)) r.external.add(`${l} → ${href}`);
    else if (href.startsWith("/")) {
      const p = href.split("#")[0].split("?")[0];
      if (p && (await code(p)) !== 200) r.broken.add(`${l} → ${href} (${status.get(p)})`);
    }
  }
  r.buttons = (html.match(/<button\b/g) || []).length;
  for (const m of html.matchAll(/class="placeholder-mark"[^>]*>([^<]+)</g)) {
    r.placeholders.add(m[1]);
    if (!allPlaceholders.has(m[1])) allPlaceholders.set(m[1], new Set());
    allPlaceholders.get(m[1]).add(page);
  }
  for (const m of html.matchAll(/<form\b([^>]*)>/g)) r.forms.push(m[1].match(/action="([^"]*)"/)?.[1] ?? "(no action — handled in JS)");
  for (const m of raw.matchAll(/(?:url=)(%2F[^&"]+)/g)) r.images.add(decodeURIComponent(m[1]));
  report[page] = r;
}

for (const [page, r] of Object.entries(report)) {
  console.log(`\n### ${page}`);
  console.log(`buttons: ${r.buttons} | forms: ${r.forms.length ? r.forms.join(", ") : "none"} | images: ${r.images.size}`);
  const own = [...r.dead].filter((d) => !/^(\[hello@websylime\.com\]|WhatsApp|LinkedIn|Facebook|Instagram)$/.test(d));
  if (own.length) console.log(`DEAD "#" (page-specific): ${own.join(" | ")}`);
  if (r.broken.size) console.log(`BROKEN: ${[...r.broken].join(" | ")}`);
  if (r.external.size) console.log(`EXTERNAL: ${[...r.external].join(" | ")}`);
}
console.log(`\n### dead "#" links on EVERY page (footer): ${[...report["/"].dead].join(" | ")}`);
console.log(`\n### placeholder texts (${allPlaceholders.size} unique)`);
for (const [t, pages] of [...allPlaceholders].sort((a, b) => b[1].size - a[1].size)) console.log(`${pages.size}× ${t}  — ${pages.size > 4 ? "many pages" : [...pages].join(", ")}`);

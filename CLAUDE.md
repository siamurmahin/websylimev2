@AGENTS.md

# Websy Lime v2 — project notes for Claude

**New session? Read `HANDOFF.md` first.** It has the current status, the open items and what to do next.

Marketing site for Websy Lime LLC (US LLC). Main market USA, UK second. Client sites are built on WordPress / WooCommerce, hosting included.

Stack: Next.js 16 (App Router, `cacheComponents`), TypeScript, Tailwind v4, Motion, GSAP.

## Where things live

- All copy: `content/` (assembled in `content/site.ts`). Components never hard-code copy.
- `lib/copy.tsx`: `Copy` highlights `[placeholder]` text, `href(value, fallback)` turns placeholder links into a safe fallback.
- `TODO.md`: every placeholder and open decision. `LAUNCH-CHECKLIST.md`: launch summary (forms, dead links, prices, images).
- `content/blog/KEYWORDS.md`: keyword plan and SEO rules for blog posts.

## Rules (from the owner — keep following them)

1. **Honesty.** Never invent stats, results, testimonials, client names or prices. Unknown facts stay as `[bracketed placeholders]` and get listed in `TODO.md`.
2. **Simple customer flows.** Pricing / service / Start Project: one clear CTA, about 3 options, visible price, forms of 3 steps or fewer, no jargon.
3. **Images never pixelated.** Full-res sources (≥2400px, webp q90+), `quality={90}` on hero photos, accurate `sizes`.
4. **Every inner page opens with `PhotoHero`.** No faces in hero photos (workspace shots on About/Team).
5. **Temporary logo.** The lime-leaf icon is a stand-in. Remind the owner to replace it (header/footer, OG image, favicon) before launch.
6. Dynamic routes (`/blog/[slug]`, `/case-studies/[slug]`) use `generateStaticParams` + `export const instant = false` so unknown slugs 404.

## Working style

- The owner writes in Bangla; reply in Bangla, short and plain.
- Build one page or task at a time, then stop for review.
- Before calling something done: `npx tsc --noEmit`, `npx eslint .`, and check it in the browser (desktop + 375px mobile).

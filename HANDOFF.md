# Handoff — read this first in a new session

Last updated: 23 Oct 2026. Written so a new Claude session (e.g. on the owner's MacBook) can pick up the work with no chat history.

## 1. If this folder was just cloned on a new computer

Do this for the owner, step by step, and explain in simple Bangla:

1. Check `node -v` (need Node 20+; LTS is fine) and `git --version`. If missing, tell the owner what to install (nodejs.org; on Mac, Git installs itself when `git` is first run).
2. `npm install`
3. Start the dev server (port 3000) and open the site in the browser pane to confirm it works.
4. Then ask the owner what to work on next (see section 4).

## 2. Where the project stands

- **Every page is built** (24 URLs): home, `/services/{website-design,growth,graphic-design,video-editing}`, `/products/websychat`, `/pricing`, `/work`, `/case-studies` (+3 stories), `/blog` (+3 posts), `/about`, `/careers`, `/contact`, `/faq`, `/start-project`, `/book-a-call`, `/privacy`, `/terms`, plus 404, sitemap, robots, OG image.
- Final check passed on 23 Oct 2026: `tsc`, `eslint .`, `next build` clean; all pages 200; all menu and in-page links work; no sideways scroll on mobile (375px).
- **The site is NOT launch-ready yet.** It is waiting on real information from the owner. The full list is in **`LAUNCH-CHECKLIST.md`** (summary) and **`TODO.md`** (item by item).

## 3. The biggest open items

1. **Forms: none of the 6 send anywhere.** All validate and show a success screen. The owner must choose:
   - where Contact / Start Project / Careers go (an email address or a CRM)
   - which newsletter tool (Mailchimp / Kit / Brevo) for the footer newsletter, blog newsletter and Video Editing waitlist
   Each form file has a `// TODO` where the send goes: `components/contact/ContactForm.tsx`, `components/start-project/ProjectForm.tsx`, `components/careers/ApplyForm.tsx`, `components/layout/Footer.tsx`, `components/blog/BlogNewsletter.tsx`, `components/sections/services/video/WaitlistForm.tsx`.
2. **Missing links:** Cal.com booking link (`content/pages/book-a-call.ts → calLink`), WebsyChat trial URL (`content/products/websychat.ts → trialUrl`), email, WhatsApp, social profiles (`content/shared/footer.ts`, `content/pages/contact.ts`).
3. **Real logo** (the lime leaf is temporary): `public/brand/logo.svg` + `content/shared/brand.ts`, `app/opengraph-image.tsx`, `app/favicon.ico`.
4. **Prices** for Website Design, Graphic Design and WebsyChat plans (still `$[X]`).
5. **137 `[placeholder]` texts** (shown highlighted orange on the site) and missing photos (founder, team, client avatars, client logos, design portfolio).
6. Privacy and Terms are plain-English drafts; a lawyer should review them.

## 4. What to do next (ask the owner which)

- Fill in information as the owner gives it (prices, links, team, case-study results…). Replace the `[placeholder]`, then tick it off in `TODO.md` / `LAUNCH-CHECKLIST.md`.
- Connect the forms once the owner picks the tools.
- Write new blog posts from `content/blog/KEYWORDS.md` (USA first, UK second; follow the SEO rules there).
- Before launch: rerun the audit (`node scripts/audit.mjs` with the dev server running) and `npm run build`.

## 5. How the code is organised

- **All text lives in `content/`** and is joined in `content/site.ts`. Change copy there, not in components.
- `lib/copy.tsx`: `<Copy text=…>` highlights `[placeholder]`; `href(value, fallback)` makes placeholder links safe.
- Page sections: `components/sections/*`; page-specific parts in `components/<page>/`.
- Inner pages open with `components/sections/PhotoHero.tsx`.
- Hero photos are in `public/images/` (AI-generated, 2688×1520 webp, q92). Portfolio screenshots in `public/work/`.
- Blog posts: `content/blog/posts.ts` (supports `[label](/link)` and `**bold**` inline). Case studies: `content/case-studies.ts`.
- `scripts/audit.mjs`: checks every page for dead `#` links, broken internal links, placeholders and forms.

## 6. Working with the owner

- The owner writes Bangla and is not a developer. Reply in short, simple Bangla. Avoid jargon; when a command is needed, run it yourself instead of asking them to.
- Work one page / task at a time, show it, wait for "ঠিক আছে".
- Follow the rules in `CLAUDE.md` (honesty, simple flows, sharp images, photo hero, logo reminder).
- **Sync between computers:** at the end of a work session, commit and push to GitHub (`origin` = `github.com/siamurmahin/websylimev2`, branch `main`). At the start of a session, `git pull` first.

# Websy Lime v2 — TODO

Every `[placeholder]` in the `content/` files renders **highlighted in amber** on the
site until it is replaced with a real value. Plan's honesty rule: spots left,
ratings, client counts, testimonials and stats must all be real.

## Open decisions (from the plan)

- [x] **Hero headline** — "More calls for home service businesses."
- [x] **Website Design packages** — Launchpad $799, Local Pro $1,999, Storefront $3,499 (`content/pages/pricing.ts`).
- [x] **Charity** — orphaned children (school, meals) and winter clothes for people without a home, given in the client's name.
- [x] **Company start year** — founder started solo in 2017; Websy Lime opened as a team in 2024.
- [ ] **Template-sounding lines** — "Your scalable, dedicated design team", "Seamless collaboration", "Don't take our word for it" match Designfast section titles. Rewrite in our own voice.
- [ ] **Video Editing** — show with "Coming Soon" badge (current) or hide (`hidden: true` in `header.nav → services → Video Editing`).

## Brand assets

- [x] Real logo: `public/brand/logo-light.png` + `logo-dark.png` (set in `content/shared/brand.ts`), social image and favicon done
- [ ] Heading font: currently **Inter Bold** (Google). Also tried Bricolage Grotesque. Creato Display needs its font file in `app/fonts/` (no official source found yet) → load via `next/font/local` in `app/layout.tsx`.

## Placeholders (by page)

Paths below like `home.hero.badge` mean: file `content/home/hero.ts`, field `badge`. `header.*` → `content/shared/header.ts`, `footer.*` → `content/shared/footer.ts`. Full map in **CONTENT.md**.

### Meta
- [ ] `meta.url` — confirm production domain (`https://websylime.com`?)

### Header / mega menu
- [x] Booking links → `/book-a-call` (see Book a Call page section). Still to do: `bookCall.note` `[15]`-min and founder photo `bookCall.avatar`
- [ ] Services → Website Design: `[Package 1 name]`, `[Package 2 name]`, `[Package 3 name]` + their anchor slugs `[package-1..3]`
- [x] Services → feature card now shows a real case study
- [x] Products → WebsyChat `cta.href` — from websychat.com
- [ ] WebsyChat logo (currently an icon)

### Hero
- [x] Badge: `Only 7 spots left for Q1 2027` confirmed by owner. Keep the number true, and update it when spots fill or the quarter changes (`content/home/hero.ts`, `final-cta.ts`)
- [x] Social proof: `Trusted by 300+ business owners`
- [x] 5 hero avatar photos confirmed by owner → `public/clients/`, set `home.hero.socialProof.avatars[].src`

### Portfolio strip (between Hero and Trust Bar)
- [x] 50 screenshots copied to `public/work/`, listed in `content/portfolio.ts`
- [ ] Pick the order / which ones show first (`home.portfolioStrip.count` = 20 shown)
- [x] Category for each project in `content/portfolio.ts` (Work page filter)
- [ ] Optional: live `url` for each project

### Trust Bar
- [ ] (Row hidden for now: `hidden: true` in `content/home/trust-bar.ts`) 6–10 real client logos (transparent SVG/PNG) → `public/clients/logos/`, then set `name`, `src`, `width` in `home.trustBar.logos` (8 `[Client N]` placeholders now). Logos are shown in one solid color, so any colored logo works.

### Results
- [x] Client retention: 90% (confirmed)
- [x] `350+` projects delivered
- [x] Start year `Since 2017`
- [ ] "Leads generated" stat removed until there is a tracked real number (e.g. from WebsyChat + form/call tracking). Add it back in `home.results.stats`.

### Collaboration
- [x] Changes turned around within 2 days
- [ ] "Book a free call" button uses the booking link placeholder

### Featured Work
- [ ] Pick the 3–4 best projects (`home.featuredWork.items`, by slug from content/portfolio.ts)
- [ ] For each: `[Industry]` tag and a real `[Result …]` line
- [ ] Case study pages `/work/[slug]` (cards link there)

### Process
- [ ] `From idea to impact in [2] weeks.`

### Testimonials
- [x] 45 real testimonials in `content/testimonials.ts` (from testimonial.txt), each linked to its site screenshot
- [ ] Client headshots (`photo`) — initials show until then; confirm permission to show name + photo
- [x] Quotes now spell the brand "Websy Lime"

### Pricing
- [x] Homepage shows the 3 All-in-One Growth plans (from Trevor sheet + your edits): $1,299 / $1,999 / $2,699 (was $2,999)
- [x] Rule: Website Design packages = new site **with hosting** (step 1). Growth plans = work on the client's **existing** site, no hosting (suggested after Website Design). Pricing shows a "No website yet? Start with Website Design" link; FAQ explains it.
- [ ] Website Design + Graphic Design pricing (for /pricing and service pages)
- [x] /pricing page with comparison table (see Pricing page section)
- [ ] Charity partner `[Charity / cause name]`

### FAQ
- [x] 10 answers written from the Service Packages PDF terms (`home.faq.items`), 4 tabs: General / Websites / Monthly plans / Billing
- [ ] Website timeline `about [2] weeks`
- [x] Ownership: yours once paid in full
- [ ] Cancellation terms (`Can I cancel anytime?`) — notice period / contract length
- [ ] Charity name (same as Pricing)
- [ ] Call card uses the booking link + `[15]`-min note + founder photo from `header.bookCall`

### Final CTA
- [x] Built (`components/sections/FinalCta.tsx`) — dark panel, columns of real site screenshots drifting on the right
- [x] Badge: same as Hero, confirmed by owner
- [ ] Booking link

### Footer
- [x] Built (`components/layout/Footer.tsx`, copy in `site.footer`) — simple card: brand + contact + socials, 4 link columns, one-line newsletter, legal bar + 2% line
- [x] Contact email
- [x] WhatsApp link and phone
- [x] US LLC address
- [x] Social URLs
- [ ] **Newsletter is not connected** — the form only shows a thank-you message. Pick a provider (Mailchimp, ConvertKit, Brevo…) before launch.
- [ ] Pages `/privacy` and `/terms`

## SEO
- [x] Metadata (title, description, Open Graph, Twitter card, theme colour), homepage canonical — `app/layout.tsx`, `app/page.tsx`
- [x] Social preview image — `app/opengraph-image.tsx` (copy in `site.meta.og`)
- [x] `/sitemap.xml` + `/robots.txt` — **add each new page to `app/sitemap.ts` as it's built**
- [x] Structured data — business (ProfessionalService), website, 3 Growth plans with prices, homepage FAQ (`lib/schema.ts`). Placeholders are skipped automatically.
- [ ] Confirm production domain `site.meta.url` (canonical, sitemap and share links all use it)
- [x] Email, street address and social URLs are in the structured data; logo appears automatically once it's added
- [ ] Favicon / app icons (still the default `app/favicon.ico`)
- [ ] After launch: submit the sitemap in Google Search Console; test with the Rich Results Test

## Graphic design portfolio (separate from websites)

- [ ] Drop social posts / ads / branding images into the root `design-portfolio/` folder → I copy them to `public/design/` and list them in `content/design-portfolio.ts` (title, client, type, size)
- [ ] Decide where it shows: `/work/graphic-design` page (linked from the Services menu) + Graphic Design service page. Homepage strip stays websites-only.
- [ ] Copy check for the menu lines under Services → Graphic Design

## Website Design page (`/services/website-design`, copy in `site.services.websiteDesign`)
- [x] Photo hero → 6 problems → 4 "how we fix it" pillars → packages `#packages` (same cards as Pricing) + "which one fits you" → included with every site → process → real work → Growth upsell → website FAQ → final CTA
- [x] Header menu links `#landing` `#business` `#store` land on each package card
- [ ] Hero photo is **AI-generated** (no people) — swap for a real client photo later: `public/images/website-design-hero.webp`
- [ ] `From $[X]` in the hero = the [Launch] price · `Live in about [2] weeks` (same as the FAQ timeline)
- [ ] Package names, prices and features — edit once in `content/pages/pricing.ts` (Pricing page + this page), names also in `content/shared/header.ts`
- [ ] **Hosting terms:** how long is it included, and the price after? (`content/services/website-design.ts` → included, and the FAQ "Is hosting really included?")
- [ ] Optional later: "What you'd pay elsewhere" value stack — only with real, dated competitor prices (US FTC rules on comparison prices)
- [ ] Optional later: Before/After slider — needs 1–2 clients' old-site screenshots

## Start Project page (`/start-project`, copy in `site.startProject`)
- [x] 3-step form (service → business → contact), click-to-choose cards, progress bar, Back, no login; `?package=` / `?service=` pre-select
- [x] Photo hero (section 1) — image is **AI-generated** (Higgsfield), illustrative only, not our real team. Swap for a real team photo later: `public/images/start-project-hero.webp` (keep people on the right, ~2400px wide).
- [ ] **⚠️ Form isn't connected** — Submit only shows the thank-you screen; nothing is sent or saved. Pick where leads go (email via Resend/Formspree, Google Sheet, or a CRM like HubSpot) before launch.
- [ ] Reply time `Within [1] business day` (side panel + thank-you screen)
- [ ] Booking link for "Not sure? Book a free call"
- [ ] Budget ranges — confirm they fit your real prices

## Book a Call page (`/book-a-call`, copy in `content/pages/book-a-call.ts`)
- [x] Photo hero + "what to expect" + Cal.com calendar embed; every "Book a call" button on the site now points here
- [x] **Cal.com link** set in `content/pages/book-a-call.ts` (`siamurmahin/30min`, 30 minutes)
- [ ] Optional in Cal.com: set brand colour to lime `#c6f24e`
- [ ] Call length `[15]` minutes (hero, points, expect cards, header pill note)
- [ ] Hero photo is **AI-generated** (illustrative) — swap for a real photo later: `public/images/book-a-call-hero.webp`

## All-in-One Growth page (`/services/growth`, copy in `content/services/growth.ts`)
- [x] Photo hero → what we handle (8 items) → "needs an existing site" banner → plans (same data as homepage pricing) → how a month works → plan & billing FAQ → final CTA
- [x] Menu links `/services/growth#foundation`, `#lead-growth`, `#market-leader` land on each plan card
- [ ] Hero photo is **AI-generated** (illustrative) — swap for a real client photo later: `public/images/growth-hero.webp`
- [ ] Optional later: "what this would cost to hire separately" value stack (needs real market prices first)

## Pricing page (`/pricing`, copy in `content/pages/pricing.ts`)
- [x] Hero → one switch (Website Design / Growth) → 3 cards → foldable comparison table → "included with every plan" → 2% card → FAQ → final CTA
- [x] `/pricing#growth` opens the Growth tab (homepage "Compare every feature" links there); website "Get started" pre-selects the package in Start Project
- [ ] **Website Design packages:** names `[Launch]` `[Business]` `[Store]`, prices `$[X]`, revision rounds and timelines — confirm all in `content/pages/pricing.ts` (also update the header menu names)
- [ ] Which packages include the logo / social brand kit (currently: Business = logo, Store = logo + brand kit)

## Work page (`/work`, copy in `content/pages/work.ts`, projects in `content/portfolio.ts`)
- [x] Photo hero (real project count) → Websites / Graphic design switch → grid (12 at a time + Show more) → lightbox (←/→, Esc) → final CTA
- [x] Homepage "Selected work" cards now open the project at `/work#<slug>` (no more 404 to unbuilt case studies)
- [ ] **Categories:** fill `category` for each project in `content/portfolio.ts` — filter chips appear automatically once real
- [ ] **Project names:** some are written inconsistently ("alshawa law", "DYLAN PARRY", "WATFORD ACTUALLY", "funeral celebranten") — confirm the correct spelling/casing for each
- [ ] Live site links: add `url` per project to show a "Visit live site" button in the lightbox
- [ ] Sharper lightbox: screenshots are 1170px wide; 2340px versions would look crisper on retina screens
- [ ] Hero photo is **AI-generated** (no people) — swap for a real studio photo later: `public/images/work-hero.webp`
- [ ] Graphic design tab shows "coming soon" until `content/design-portfolio.ts` has items
- [ ] Case study pages `/work/<slug>` (later) — then point "Selected work" cards back to them

## About page (`/about`, timeline at `/about#story`, copy in `content/pages/about.ts`)
- [x] Photo hero (hands + desk only, no faces) → real numbers band from the data: websites, reviews, US·UK, 2%
- [ ] Hero photo is **AI-generated** (no faces) — swap for a real team/workspace photo later: `public/images/about-hero.webp`
- [x] Story → timeline → values → team → 3 real client quotes → final CTA
- [ ] **Founder story** paragraph `[Founder story …]`
- [x] Timeline years confirmed by the owner: 2017, 2024, 2025, 2026
- [x] **Team:** 8 names and roles from the old site's team page
- [ ] **Team photos** later: `public/team/…`, set `photo` in `content/pages/about.ts` (initials show until then)

## Graphic Design page (`/services/graphic-design`, copy in `content/services/graphic-design.ts`)
- [x] Photo hero → what we design (`#social` `#ads` `#branding` `#print`) → design work → 3 monthly plans `#plans` → how it works → "we post it too" Growth banner → design FAQ → final CTA
- [x] "Get started" pre-selects the plan in Start Project (`?package=design-pro`); the form also offers "One-off design"
- [x] Header "Graphic portfolio" now opens `/work#graphic-design` (Graphic design tab) instead of an unbuilt page
- [x] **Plans:** Essentials $299 (8), Pro $549 (16), Studio $899 (30), 7 days' notice to cancel. Old note: prices `$[X]/month`, designs per month `[8]` `[16]` `[30]`, revisions and turnaround — confirm (also in `content/pages/start-project.ts` → details "graphic-design")
- [ ] Hero points: `From $[X]/month`, `Ready in [2–3] business days`, `Unlimited [revisions]` — confirm
- [ ] Cancel / notice terms (plans footnote) and FAQ: how requests are sent, do unused designs roll over
- [ ] **Design portfolio:** add real work to `content/design-portfolio.ts` (images in `public/design/`) — the page shows "coming soon" until then
- [ ] Hero photo is **AI-generated** (no faces) — swap for a real photo later: `public/images/graphic-design-hero.webp`

## Video Editing page (`/services/video-editing`, copy in `content/services/video-editing.ts`) — coming soon
- [x] Photo hero → what we'll edit → waitlist `#waitlist` (email + optional interests) → "Need video now?" Market Leader banner
- [ ] **Waitlist isn't saved anywhere yet** — connect it to the newsletter / email tool (same one as the footer newsletter)
- [ ] Launch date `Launching [soon]` and early-access perk `Early-access pricing [— confirm]`
- [ ] When it launches: add plans + FAQ (copy the Graphic Design page), remove the "Soon" badges in `content/shared/header.ts` and `footer.ts`
- [ ] Hero photo is **AI-generated** (no faces) — swap for a real photo later: `public/images/video-editing-hero.webp`

## Contact page (`/contact`, message form at `/contact#message`, copy in `content/pages/contact.ts`)
- [x] Photo hero → 3 ways to reach us (email, WhatsApp, book a call) + hours/address → one-step message form (name, email, topic, message)
- [x] Email, WhatsApp and address are read from `content/shared/footer.ts` — fill them there once, they update everywhere
- [x] Picking "New project" in the form points people to Start Project (gets a price faster)
- [ ] **Form backend:** messages aren't sent anywhere yet — connect email/CRM before launch (same as Start Project)
- [ ] **Hours** `[Mon–Fri, 9am–6pm ET]` and reply time `[1] business day` — confirm
- [ ] Hero photo is **AI-generated** (no faces) — swap for a real photo later: `public/images/contact-hero.webp`

## WebsyChat page (`/products/websychat`, demo at `#demo`, plans at `#plans`, copy in `content/products/websychat.ts`)
- [x] Trial URL, hero points, features, plans, prices, footnote and FAQ now come from websychat.com
- [ ] Demo conversation is a labelled example ("Example conversation") — swap for a real one if you like
- [ ] Hero photo is AI-generated (no faces) — swap for a real screenshot/photo later

## FAQ page (`/faq`, topics at `#general`, `#websites`, `#monthly-plans`, `#graphic-design`, `#websychat`, `#billing`, copy in `content/pages/faq.ts`)
- [ ] Questions come from `content/home/faq.ts` — every `[bracketed]` answer there shows here too (and in the FAQPage structured data with brackets removed, so fill them in before launch)
- [ ] Reply time `[1 business day]` (FAQ answer + empty-search message) — match the Contact page
- [ ] Hero photo is AI-generated (no faces) — swap for a real photo later

## Blog (`/blog`, posts at `/blog/[slug]`, copy in `content/pages/blog.ts`, posts in `content/blog/posts.ts`)
- [ ] 3 starter posts rewritten for SEO (one main keyword each, US first — see `content/blog/KEYWORDS.md`): `missed-call-text-back`, `how-to-get-more-google-reviews`, `website-not-getting-leads`. Read and edit before launch
- [ ] Keyword volumes/difficulty weren't checked (Ahrefs API not on this plan) — confirm in Ahrefs / Keyword Planner before writing more posts. 12 next-post ideas are in `KEYWORDS.md`
- [ ] After launch: add the site to Google Search Console and submit `/sitemap.xml`
- [ ] Set real publish `date`s (currently Oct 2026 placeholders) and `author` if you want a person's name
- [ ] Hero photo + 3 cover photos are AI-generated (no faces) — swap for real photos later
- [ ] Newsletter band (`#newsletter`) isn't saved anywhere yet — connect the same newsletter provider as the footer

## Case Studies (merged into Work: list at `/work`, stories at `/work/[slug]`, copy in `content/pages/case-studies.ts`, stories in `content/case-studies.ts`)
- [x] 45 case studies written from the "portfolio content" files. SEO targets the industry, never the client: no client names in text, titles, URLs, image file names or structured data; live-site links are nofollow; quotes show first name + initial. Private client list: `content/case-study-clients.md`
- [ ] ⚠ **Owner is confirming these with each client (2026-11-08) and says they agree to keep them. Get each OK in writing (email or WhatsApp is fine). The orange mark is off, but these numbers are still estimates (brackets kept in `content/case-studies.ts`). Replace every one with the client's real result before launch, and confirm the 14 "Growing after launch" stories (Growth plan, social, Google Ads) with each client.** They are realistic estimates, not client data (also on homepage Featured Work). The source files' numbers looked templated, and for at least 4 clients the file guessed the business type. Publishing unconfirmed numbers or testimonials is a legal risk (US FTC, UK CMA). If a client has no number, remove that stat
- [ ] Confirm each quote with the client. One says "Sales nearly tripled" (sports nutrition), which doesn't fit the estimates
- [ ] On hold, no case study yet (business type was wrong or unverifiable in the source file; shown on /work only): FourthWall Agency (actually employer branding), TFO Medical (actually healthcare recruitment), Tide and Tail (actually pet and farm supplies store), Virtuous Earth Solutions (actually regenerative farming for smallholders), Red Rose Care (site blocks automated visits)
- [ ] Their testimonials are still on the site and don't match the real business (e.g. Tide and Tail: "Bookings have jumped", but it's a shop). Check or remove them in `content/testimonials.ts`
- [x] Decision: testimonials keep client business names (homepage, About). Only case studies and the portfolio hide them
- [x] (Owner: keep as is, 2026-11-09) Screenshots still show the client's logo inside the image. Google can't rank us from that, but people can read it
- [ ] Locations are from the source text or inferred from a .co.uk domain; blank where unknown. "Timeline" was replaced with "Launched" (real date in the source)
- [ ] Get permission from each client before publishing their story and quote
- [ ] Hero photo is AI-generated (no faces) — swap for a real photo later

## Home service pages (`/industries`, copy in `content/industries.ts`)
- [x] Plumbers, electricians, HVAC, roofing, pest control and contractors, plus an index page. Copy is unique per trade
- [x] "We also work with cleaning, landscaping" confirmed by owner
- [ ] Add a real plumbing/electrical client as a case study, then link it from those pages (no plumber or pest control project in the portfolio yet)
- [ ] Hero photos are AI-generated (no people); swap for real ones later

## Free website design (`/free-website-design`, bar + page copy in `content/pages/free-design.ts`)
- [ ] **Form isn't connected**: applications aren't sent anywhere yet. Connect with the other forms when email moves to Hostinger
- [x] Owner confirmed: homepage only, within 2 days, the client can keep the design or have us build it
- [ ] Hero uses the Website Design photo (Higgsfield was out of credits). Give it its own photo later

## Get Started (`/get-started?plan=…`, copy in `content/pages/get-started.ts`)
- [ ] **Form isn't connected**: details aren't sent anywhere yet, only to the calendar if they book. Connect with the other forms
- [x] Requests for every service go to one dedicated contact on WhatsApp or email (owner confirmed)
- [ ] Owner to choose how deposits are paid (Stripe, PayPal or bank transfer)
- [ ] Follow-up for people who send details but don't book, and tracking of each step

## Websy Lime Gives (`/gives`, copy and record in `content/pages/gives.ts`)
- [ ] Planned: late Nov, Qurans for an orphan hifz madrasa; early Dec, blankets. Both show under "Coming up" until done
- [ ] ⚠ **Add the first real donation before launch**: date, amount, what it paid for, and a photo or receipt. Until then the page says the first report is on its way
- [ ] Owner to confirm that no children's faces or names are shown
- [ ] ⚠ **Client contributions:** the page says existing clients can contribute. Get Stripe's written answer before taking them on the service account, and ask the lawyer about state charity rules
- [ ] The site says "2% of revenue" now. Lawyer to check the wording

## Careers page (`/careers`, roles at `#roles`, form at `#apply`, copy in `content/pages/careers.ts`)
- [ ] Open roles: `roles.items` is empty, so the page shows "No open roles right now". Add a role by copying the example in the file
- [x] Careers perks confirmed by owner
- [ ] Application form isn't sent anywhere yet — connect a hiring inbox / email before launch. Reply time `[2 weeks]`
- [ ] Hero photo is AI-generated (no faces, not our real office) — swap for a real photo later
- [ ] "Book a free call" floating pill is hidden on this page (it's for customers)

## Privacy & Terms (`/privacy`, `/terms`, copy in `content/pages/legal.ts`)
- [ ] ⚠ Both are plain-English starter drafts, NOT legal advice — have a lawyer review them before launch (US LLC with UK/EU clients → GDPR/UK GDPR + US state privacy laws)
- [ ] Privacy: confirm hosting, email/newsletter, payment, analytics and WebsyChat AI providers; whether analytics cookies are used (and if a cookie banner is needed); retention periods; reply time `[30 days]`
- [ ] Terms: confirm deposit `[50%]`, invoice terms `[7 days]`, quote validity, cancellation notice `[30 days']` / any minimum term, hosting period + renewal price, WebsyChat trial terms, liability cap, notice period, governing-law state
- [ ] Privacy and Terms are filled in (owner approved). Change the "Last updated" date to the launch day. If analytics is added, update the Cookies section first
- [ ] Shared hero photo is AI-generated (no faces) — swap later if you like

## Pages

All pages in the header and footer are built.

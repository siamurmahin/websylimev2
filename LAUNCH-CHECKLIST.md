# Websy Lime — Launch Checklist

Audit date: 23 Oct 2026. Every page, button, link, form and image was checked on the dev server (desktop + mobile).
The detailed item-by-item list lives in `TODO.md`. This file is the summary to work from before launch.

---

## ✅ What's already working

| Check | Result |
|---|---|
| Pages | All **24 pages** open (200); unknown blog/case-study URLs return a real 404 |
| Header menu (Services / Products / Company / Resources) | **27 links**, all OK — every `#anchor` lands on the right section too |
| Links inside pages | No broken internal links or anchors |
| Mobile (375px) | No sideways scrolling on any page |
| Interactions | FAQ accordion + search, blog topic filter, Work gallery popup, form validation and success screens all tested |
| Production build | `next build` passes, all 32 routes prerendered |
| SEO basics | Title + description + canonical on every page, sitemap (24 URLs), robots.txt, structured data |

**Fixed during this audit:** the "Try Free" button in the header's Products menu (desktop and mobile) was a dead `#` link. It now goes to the WebsyChat sign-up page.

---

## 🔴 1. Must do before launch (the site won't work properly without these)

### 1a. Forms — none of the 6 forms send anywhere yet

Every form validates and shows a "Thank you" message, but the details **aren't saved or sent anywhere**. You choose the tool; I'll connect it.

| # | Form | Where it appears | Fields | Should send to |
|---|---|---|---|---|
| 1 | **Contact** | `/contact` | name, email, topic, message | your email / CRM |
| 2 | **Start Project** (3 steps) | `/start-project` (every "Start a project" button) | service, package, business type, budget, name, email, phone, current website, message | your email / CRM |
| 3 | **Careers application** | `/careers#apply` | name, email, skills, portfolio link, message | hiring inbox |
| 4 | **Footer newsletter** | bottom of **every page** | email | newsletter tool |
| 5 | **Blog newsletter** | `/blog`, all 3 posts | email | the same newsletter tool |
| 6 | **Video Editing waitlist** | `/services/video-editing#waitlist` | email, video types | newsletter tool (with a "video waitlist" tag) |

**What you need to decide:**
1. Which email address should receive forms 1–3? Or which CRM (HubSpot, etc.)?
2. Which newsletter tool will you use for forms 4–6? For example Mailchimp, Kit (ConvertKit) or Brevo.

### 1b. Dead links

None left. Cal.com, WebsyChat sign-up, email, phone, WhatsApp and social links are all real.

### 1c. Brand and domain

- [ ] **Domain:** confirm `https://websylime.com` in `content/shared/meta.ts`. The sitemap, canonical URLs and structured data are all built from it.

### 1d. Prices (shown to customers)

- [ ] **Website Design:** names `[Launch]` / `[Business]` / `[Store]` and prices `$[X]` (Website Design page + Pricing page + header menu)
- [ ] **Graphic Design:** `[Starter]` / `[Pro]` / `[Brand]`, prices `$[X]` and design counts
- [ ] Growth and WebsyChat plans already show real prices ✓

### 1e. Legal

- [ ] Get **Privacy** and **Terms** reviewed by a lawyer, then fill in:
  - your service providers
  - deposit `[50%]` and invoice terms
  - cancellation notice
  - hosting period and renewal price
  - which state's law applies
  - the "Last updated" dates

---

## 🟠 2. Content to fill in (bracketed `[placeholder]` text that shows on the site)

There are **137 different placeholder texts** across the site. All of them show highlighted in orange. Grouped by page:

| Page / area | What to fill in | File |
|---|---|---|
| **Homepage hero** | "Only `[7]` spots left for `[Q1 2027]`" (must be true or removed), 5 client avatar names | `content/home/hero.ts`, `final-cta.ts` |
| **Homepage numbers** | `[2017]` (the About page says 2024, so pick one), `[800]`, `[650]` | `content/home/results.ts`, `hero.ts` |
| **Trust bar** | 8 real client logos | `content/home/trust-bar.ts` |
| **Featured work** | 4 projects: `[Industry]` + a real `[Result]` | `content/home/featured-work.ts` |
| **Charity (2%)** | `[Charity / cause name]`, yearly update line | `content/home/pricing.ts`, `results.ts`, `faq.ts` |
| **Portfolio** | `[Category]` for all **51** websites | `content/portfolio.ts` |
| **Case studies (3)** | every result, number, challenge, what we did, quote, plus each client's permission | `content/case-studies.ts` |
| **About** | founder name + story, 4 team members (name, role, photo), timeline `[Year]`s | `content/pages/about.ts` |
| **Contact** | opening hours `[Mon–Fri, 9am–6pm ET]`, reply time `[1]` business day | `content/pages/contact.ts` |
| **FAQ answers** | 13 "confirm…" answers (hosting, ownership, cancellation, WebsyChat…) | `content/home/faq.ts` |
| **Website Design** | hosting `[the first 12 months]`, timeline | `content/services/website-design.ts` |
| **Graphic Design** | delivery `[2–3]` days, revisions, notice period | `content/services/graphic-design.ts` |
| **Video Editing** | launch date `[soon]`, early-access price | `content/services/video-editing.ts` |
| **Careers** | which perks are true, reply time `[2 weeks]` | `content/pages/careers.ts` |
| **Header menu card** | "Hallmark Contractors — `[headline result]`" | `content/shared/header.ts` |
| **Blog** | read and edit the 3 posts, real publish dates | `content/blog/posts.ts` |

**Open decisions** (also at the top of `TODO.md`):
- the hero headline
- the start year (2017 or 2024)
- rewriting the template-sounding lines
- showing or hiding Video Editing

---

## 🟡 3. Images to replace or add

### AI-generated photos (no real faces). They're fine for launch, but real photos build more trust.

| Image | Page |
|---|---|
| `about-hero.webp` | About |
| `book-a-call-hero.webp` | Book a Call |
| `start-project-hero.webp` | Start Project |
| `contact-hero.webp` | Contact |
| `work-hero.webp` | Work |
| `website-design-hero.webp` | Website Design |
| `growth-hero.webp` | Growth |
| `graphic-design-hero.webp` | Graphic Design |
| `video-editing-hero.webp` | Video Editing |
| `websychat-hero.webp` | WebsyChat |
| `faq-hero.webp` | FAQ |
| `blog-hero.webp` | Blog |
| `case-studies-hero.webp` | Case Studies |
| `careers-hero.webp` | Careers |
| `legal-hero.webp` | Privacy + Terms |
| `blog/missed-calls.webp`, `blog/google-reviews.webp`, `blog/website-signs.webp` | blog post covers |

All are in `public/images/`. Replacements should be **≥2400px wide**, and on inner pages the subject should be on the right.

### Missing (currently shows initials or an icon)

- [ ] **Founder photo.** It appears on the "Book a free call" card everywhere, and on the About team section.
- [ ] **3 team photos + names** (About page)
- [ ] **5 client avatars** (homepage hero, next to the star rating)
- [ ] **8 client logos** (homepage trust bar): transparent SVG/PNG
- [ ] **Graphic design portfolio:** 0 items right now, so `/work#graphic-design` and the Graphic Design page show an empty state. Add your designs in `content/design-portfolio.ts`.
- [ ] Optional: bigger (≥2400px) screenshots for the 3 case studies
- [ ] Optional: testimonial headshots (45 real testimonials currently show initials)

---

## 🔵 4. After launch

- [ ] Add the site to **Google Search Console** and submit `https://websylime.com/sitemap.xml`
- [ ] Set up analytics, then update the Privacy policy (and add a cookie banner if needed)
- [ ] Send one test from every form and check that it arrives
- [ ] Write the next blog posts from `content/blog/KEYWORDS.md` (12 ideas, US-first)
- [ ] Re-add the "Leads generated" stat once you have real tracked numbers

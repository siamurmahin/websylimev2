# Websy Lime v2 — Style guide

**Read this before building or changing any page, section, copy or image.** The site was built with one consistent pattern. New work must look and read like it was made by the same person. When unsure, copy an existing section and adapt it — don't invent a new style.

Best reference files to copy from:
- Section layout: `components/careers/CareersSections.tsx`, `components/case-studies/CaseStudyList.tsx`
- Page file: `app/careers/page.tsx`
- Content file: `content/products/websychat.ts`
- Hero: `components/sections/PhotoHero.tsx`

---

## 1. Colors (only use these tokens, from `app/globals.css`)

| Token (Tailwind class) | Use |
|---|---|
| `lime` (#c6f24e) | brand accent: primary buttons, dots, check icons, marker under headline words |
| `lime-strong` | lime-colored **text** on light backgrounds (`text-lime-strong dark:text-lime`) |
| `lime-soft` | icon tile background |
| `ink` (#0b0d09) | dark panels (`bg-ink` + `dark:bg-surface dark:border-white/10`), text on lime buttons |
| `background`, `surface`, `surface-2` | page / card / inset backgrounds |
| `foreground`, `muted-foreground` | main text / secondary text |
| `border` | all borders |

- Site is dark by default and must also work in light mode. Never hard-code hex colors in components.
- No new brand colors, no gradients except the existing photo-hero overlay and glows.

## 2. Type

- Headings: `font-display font-bold` with tight tracking.
  - Section H2: `font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance`
  - Card H3: `font-display text-lg font-bold tracking-[-0.02em]`
- Body: `text-[15px] leading-relaxed text-muted-foreground` (cards: `text-sm`).
- Headlines are short (≤ 8 words), sentence case, end with a period: "Never miss a lead again."
- One or two words of a hero headline get the lime marker (`headlineAccent`).

## 3. Layout and shapes

- Width: `container-site` (max 80rem, 1.25rem / 2rem side padding).
- Section spacing: `py-14 sm:py-20` (or `pb-14 sm:pb-20` when following another section).
- Radius: big panels `rounded-[2rem]`, cards `rounded-[1.5rem]`, small items `rounded-2xl`, icon tiles `rounded-xl`, buttons and pills `rounded-full`.
- Cards: `border bg-surface p-6`, hover `hover:-translate-y-1 hover:border-lime/60` with `duration-500 ease-out-expo`.
- Grids: 1 column on phone → 2 on `sm` → 3–4 on `lg`. Check 375px wide: no sideways scroll.

## 4. Building blocks (reuse, don't rebuild)

- **Eyebrow pill** above every section title: rounded-full border, small lime dot, short label (see `Eyebrow` in `CareersSections.tsx`).
- **Section header**: Eyebrow → H2 → optional one-line subheadline, in `max-w-2xl`.
- **Icon tile**: `size-11 rounded-xl bg-lime-soft text-lime-strong`, turns `bg-lime text-ink` on card hover. Icons come from `lucide-react` through `components/icons.tsx` (`IconKey` in content).
- **Buttons**:
  - Primary: `h-12 rounded-full bg-lime px-6 text-sm font-semibold text-ink` + `ArrowRight` that slides on hover.
  - Secondary: same size, `border` (on dark: `border-white/20 text-white hover:border-lime`).
  - `#anchor` links use `ArrowDown` instead of `ArrowRight`.
- **Dark CTA band** at the end of a page: `bg-ink rounded-[2rem]` with title, one line and the two usual CTAs (see `CaseStudyCta`).
- **Check list**: lime circle with a `Check` icon + short text.
- Shared sections already exist — use them: `PhotoHero`, `FAQ`, `FinalCta`, `Testimonials`, `PlanCards`, `CallCard`, `StatValue`.

## 5. Page pattern

Every inner page:
1. `PhotoHero` (eyebrow, headline + accent, subheadline, 2 CTAs, 3 short proof points, photo)
2. 3–5 content sections (alternating plain / card grid / dark panel)
3. FAQ or proof (testimonials, stats) when relevant
4. `FinalCta` (except pages that aren't for customers, e.g. Careers)

Each page file: `metadata` (title, description, canonical, openGraph) + a short comment describing the section order. Section ids for deep links (`#plans`, `#demo`, `#apply`) with `scroll-mt-16`.

## 6. Motion

- Reveal on scroll: wrap with `StaggerReveal` and put `data-reveal` on each child. Hero uses `SplitReveal` / `FadeUp`.
- Others available in `components/motion/`: `CountUp`, `Marquee`, `Magnetic`, `Tilt`, `Spotlight`, `PointerGlow`.
- Easing `ease-out-expo`, durations 300–700ms. Subtle only. Must respect `prefers-reduced-motion` (already handled globally).

## 7. Copy (voice and rules)

- **Who we write for:** US small-business owners (contractors, clinics, local shops). Not developers. UK second.
- **Voice:** plain, warm, confident, short. Talk about the customer's result ("you get a new lead"), not our tech. US English spelling.
- Sentences ≤ 20 words. No jargon (no "leverage", "synergy", "cutting-edge", "seamless", "scalable solution").
- CTAs: "Book a free call", "Start a project", "Try it free", "See how it works". One main action per section.
- Proof points: 3 short items, 2–5 words each.
- **Honesty:** never invent numbers, clients, quotes or features. Unknown → `[bracketed placeholder]` + add it to `TODO.md`.
- All text goes in `content/` files with a comment per section (`// Section 2 — …`), never inside components. Wrap text in `<Copy text=…>` so placeholders get highlighted.

## 8. Images

- Hero photos: **photorealistic editorial photo, 16:9, no people / faces / hands / logos / readable text**, calm and premium, shallow depth of field, **subject on the RIGHT half, empty soft background on the LEFT** for text, small lime-green accents (a plant, a mug…).
- Example prompt used for the site:
  > Photorealistic editorial photo, 16:9 wide. A calm, tidy light wooden desk in soft morning daylight. On the RIGHT side of the frame: [objects that fit the page]. The LEFT half is calm, softly blurred background with lots of negative space for text. No people, no faces, no hands, no logos, no readable text. Shallow depth of field, premium, high detail, subtle lime-green accents.
- Export: 2688×1520 (≥2400px wide) **webp quality 92**, saved in `public/images/`. In code: `next/image` with `quality={90}` and accurate `sizes`. Never pixelated.
- Alt text describes the photo plainly.

## 9. Before calling anything done

1. `npx tsc --noEmit` and `npx eslint .` are clean.
2. Check the page in the browser: desktop, 375px mobile, dark and light mode, no console errors.
3. Show the owner and wait for approval.

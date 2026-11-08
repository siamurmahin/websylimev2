# Websy Lime v2 — TODO

Updated 2026-11-09. The owner-facing list is `LAUNCH-CHECKLIST.md`; this file has the details.
Any `[square brackets]` in `content/` render highlighted in orange. None are left on the site.
The full history of earlier decisions is in git (`git log -p TODO.md`).

## Decisions already made (don't reopen)
- Home services first in all copy. Hero: "More calls for home service businesses."
- Prices: Website Launchpad $799 / Local Pro $1,999 / Storefront $3,499; Graphic Design Essentials $299 (8) / Pro $549 (16) / Studio $899 (30); Growth $1,299 / $1,999 / $2,699
- Hosting: our shared hosting is included 12 months (then $240 a year) for WordPress and standard custom sites only. Wix, Shopify and other subscription platforms: client pays the platform with their own card. Larger Laravel/Node.js apps: client pays for their own server. Websites live in about 2 weeks. Changes within 2 days. Weekly updates
- Requests for every service go to one dedicated contact on WhatsApp or email. Reply usually within 12 hours, max 1 business day. Hours Mon–Fri 9am–6pm ET
- Payment: 50% deposit for websites; Growth paid up front or in two payments 15 days apart. Monthly plans 30 days' notice, no minimum term; Graphic Design 7 days
- Charity: 2% of revenue, given in Websy Lime's name, for orphaned children and people in need in Bangladesh. Proof on `/gives`
- Free website design: 10 businesses a month, homepage only, within 2 days, client keeps the design
- Case studies: every client reviewed and agreed to their story, numbers and quote (2026-11-09). The owner keeps the replies
- Client names in screenshots stay. No client names in text, URLs, alt text or schema
- Calls: Cal.com "Websy Lime Free Call", Mon–Fri 9am–3pm ET ("US Calls" schedule), 12 hours' notice; sooner goes to WhatsApp
- Hosting: the owner's Hostinger (Node.js), only as the very last step
- Video Editing stays "Coming soon"

## Open: owner
- [ ] Test booking from `/get-started?plan=business`
- [ ] Stripe payment links (amounts in `LAUNCH-CHECKLIST.md`)
- [ ] Lawyer review: `content/pages/legal.ts`, the 2% wording, client contributions on `/gives`
- [ ] Stripe's written answer before taking client contributions
- [ ] Gives: first donation details and photos (add to `record` in `content/pages/gives.ts`, remove it from `upcoming`)
- [ ] Optional: client logos (then `hidden: false` in `content/home/trust-bar.ts`), graphic design samples (`content/design-portfolio.ts`, images in `public/design/`), founder photo (`header.bookCall.avatar`), team photos (`content/pages/about.ts`), bigger screenshots in `public/work/`

## Open: last step (together)
- [ ] Email Namecheap → Hostinger, then connect the 8 forms (each has a `// TODO: send to email` in its component) and a newsletter tool
- [ ] Hostinger Node.js app from GitHub, Node 22. Then point the domain without touching MX records
- [ ] Privacy and Terms "Last updated" = launch day (`content/pages/legal.ts`)

## Open: later
- [ ] Follow-up and tracking for Get Started (plan → form → booking)
- [ ] Analytics; update the Cookies section of the Privacy policy first
- [ ] Replace AI hero photos with real ones; give `/free-website-design` its own photo
- [ ] Blog: owner to read the 3 new posts; keyword volumes weren't checked (see `content/blog/KEYWORDS.md`)
- [ ] "Leads generated" stat once tracked (`content/home/results.ts`)
- [ ] Optional: heading font (Creato Display needs its font file), WebsyChat logo, Cal.com brand colour `#c6f24e`

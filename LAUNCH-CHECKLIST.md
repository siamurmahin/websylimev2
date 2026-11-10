# Websy Lime — Launch Checklist

Updated 2026-11-09. What still has to happen before the new site replaces websylime.com.
The site has no orange placeholders left. Details for each item are in `TODO.md`.

## 🔴 Must do before launch

### Owner
- [x] **Case studies:** every client agreed to their story, numbers and quote (2026-11-09). Keep the replies
- [ ] **Test booking:** book a call from the site (Get started → Local Pro), check the confirmation email, then cancel it
- [ ] **Stripe payment links:** website deposits $399.50 / $999.50 / $1,749.50; Growth $1,299 / $1,999 / $2,699 a month; Graphic Design $299 / $549 / $899 a month
- [ ] **Lawyer:** review Privacy, Terms, the "2% of revenue" wording and the client contributions line on the Gives page
- [ ] **Stripe and client contributions:** get Stripe's written answer before taking any client contribution on the service account
- [ ] **Gives:** send date, amount and photos for the late-November Quran donation and the early-December blankets (no children's faces)

### Together, as the very last step
- [ ] ⚠️ The Namecheap hosting (old website) expires **Nov 29, 2026**: launch the new site before then, or renew
- [x] Move email from Namecheap to Hostinger (2026-11-11): hello, admin, help, info, mahin, payment @websylime.com on Hostinger Free Business Email, all forwarding to Gmail; payment@ old emails imported. DNS notes: `../dns-backup-websylime-2026-11-10.md`
- [ ] At launch: remove the Namecheap parts from the SPF record (see the DNS notes)
- [x] Connect all 8 forms through Brevo (free): Contact, Start Project, Get Started, Free Design, Careers, footer newsletter, blog newsletter, Video waitlist. Leads also saved to the Brevo "Website leads" list
- [x] websylime.com authenticated and branded in Brevo (2026-11-11). All emails go from hello@websylime.com
- [x] Every form sends an instant auto-reply (words in `content/shared/emails.ts`, Cal link + WhatsApp)
- [x] Newsletter uses double opt-in (confirm email → `/newsletter-confirmed`), then the welcome email
- [x] Brevo automations built: "Welcome message" and "Get Started follow-up" (day 2, 5, 10; skips anyone in the "Booked or talking" list)
- [x] Both automations active (2026-11-11). Welcome: no re-entry. Follow-up: re-entry allowed after 30 days
- [ ] At launch, in Hostinger: set the env values from `.env.example` (incl. BREVO_FOLLOWUP_LIST=8, BREVO_BOOKED_LIST=9, BREVO_DOI_TEMPLATE=2, CAL_WEBHOOK_SECRET)
- [ ] At launch, in Cal.com: Settings → Developer → Webhooks → `https://www.websylime.com/api/cal`, event "Booking created", same secret as CAL_WEBHOOK_SECRET
- [ ] When you talk to a lead yourself (call, WhatsApp, email), add them to the Brevo list "Booked or talking" so the follow-up emails stop
- [ ] At launch: delete the test contacts (siamurmahin+websylimetest, +websylimelead, +autoreply, +doi, +formtest @gmail.com)
- [ ] Deploy to the owner's Hostinger Node.js hosting from GitHub (Node 22, `npm run build`, `npm start`)
- [ ] Point websylime.com at the new site, keeping the email records
- [ ] Change "Last updated" on Privacy and Terms to the launch day
- [ ] Send one test from every form on the live site

## 🟠 Nice to have (launch can happen without these)
- [ ] 6–10 client logos (the row is hidden until then)
- [ ] Graphic design samples (pages say "coming soon")
- [ ] Founder photo (Book a free call button, About) and team photos (About shows initials)
- [ ] Read and approve the 3 blog posts written for the new site
- [ ] Bigger project screenshots (≥2340px wide) so the Work lightbox looks sharp
- [ ] A real US or home service client case study
- [ ] Optional: heading font, WebsyChat logo, lime colour in Cal.com

## 🔵 After launch
- [ ] Google Search Console: add the site, submit `https://websylime.com/sitemap.xml`
- [ ] Analytics (then update the Privacy policy's Cookies section, maybe a cookie banner)
- [ ] Follow up people who fill in Get Started but don't book; track plan → form → booking
- [ ] Swap AI hero photos for real ones over time
- [ ] Write the next blog posts from `content/blog/KEYWORDS.md`
- [ ] Re-add a "Leads generated" stat once there are tracked numbers

// Posts carried over from the old site, on their ORIGINAL URLs so their search
// history isn't lost. Don't change a slug here without adding a redirect in
// next.config.ts. They're longer now, with FAQs and links to current services.
// See content/blog/KEYWORDS.md.
import type { BlogPost } from "@/content/blog/posts";

const SIAMUR = "Siamur Rahman Mahin";
const ANISUR = "Md Anisur Rahman";
const UPDATED = "2026-11-05";
const WEBSITE_CTA = {
  title: "Need a website that brings in work?",
  body: "We build fast, mobile-friendly WordPress websites with hosting included, designed to turn visitors into leads.",
  label: "See website packages",
  href: "/services/website-design",
};

export const postsFromOldSite: BlogPost[] = [
  {
    slug: "how-much-does-a-website-cost-2026",
    title: "How much does a website cost in 2026? A real pricing breakdown",
    seoTitle: "How Much Does a Website Cost in 2026? Real Prices",
    metaDescription: "What a small business website really costs in 2026, what drives the price, the running costs to budget for, and how to avoid overpaying.",
    keyword: "how much does a website cost",
    related: ["how much should a website cost", "small business website cost", "website cost per month for a small business", "website maintenance cost"],
    excerpt: "A straight answer with real numbers: what a small business website costs in 2026, what moves the price, and what you'll pay every month after launch.",
    category: "Websites",
    date: "2026-06-10",
    updated: UPDATED,
    readTime: "6 min read",
    author: SIAMUR,
    image: { src: "/images/blog/website-cost.webp", alt: "A stack of lime-green glass coins beside a small model house" },
    cta: WEBSITE_CTA,
    body: [
      { type: "p", text: "**How much does a website cost?** It's the first question every business owner asks, and the one most agencies dodge with \"it depends.\" It does depend, but that doesn't help you budget. Here's a straight answer, with real 2026 numbers and the things that actually move the price." },

      { type: "h2", text: "How much does a website cost for a small business?" },
      { type: "p", text: "For most small businesses in 2026, a professionally built website costs:" },
      {
        type: "ul",
        items: [
          "**Starter or brochure site (3–5 pages):** $1,200–$2,500",
          "**Business site (8–12 pages, blog, SEO setup):** $2,800–$5,000",
          "**Online store:** $2,000–$12,000+, depending on products and features",
          "**Custom or complex builds:** $6,000 and up",
        ],
      },
      { type: "p", text: "These are typical ranges for working with a small agency. Freelancers can cost less, and large agencies charge far more. A DIY builder looks cheapest of all, but you pay for it with your own time." },

      { type: "h2", text: "What drives the price of a website" },
      { type: "p", text: "The number isn't random. Five things move it up or down." },
      { type: "h3", text: "1. Number of pages and how much content you need" },
      { type: "p", text: "More pages mean more design, layout and writing. A 5-page site is a fraction of the work of a 30-page one. If you need someone to write the words too, budget for that." },
      { type: "h3", text: "2. Custom design or a template" },
      { type: "p", text: "A template adjusted to your brand is faster and cheaper. A fully custom design costs more but stands out, which matters most in competitive local markets." },
      { type: "h3", text: "3. Features" },
      { type: "p", text: "A contact form is simple. Online stores, booking systems, memberships and CRM connections each add real development time, so list what you truly need on day one." },
      { type: "h3", text: "4. Platform" },
      { type: "p", text: "The platform changes both the build cost and the running cost. Our [WordPress vs Wix comparison](/blog/wordpress-vs-wix-2025) breaks this down, and if you're selling online, see [WooCommerce vs Shopify](/blog/woocommerce-vs-shopify-2026)." },
      { type: "h3", text: "5. Who builds it" },
      { type: "p", text: "A DIY builder costs the least upfront. A freelancer sits in the middle. An agency costs more but brings design, development and support together, so you aren't managing several people." },

      { type: "h2", text: "Website cost per month: what you'll pay after launch" },
      { type: "p", text: "The build is only part of the budget. Plan for these running costs too:" },
      {
        type: "ul",
        items: [
          "**Hosting:** from around $15 a month for a small business site",
          "**Domain name:** usually a small yearly fee",
          "**Maintenance:** from around $99 a month for updates, backups and security checks",
          "**Marketing:** optional, but a site with no visitors brings in no work",
        ],
      },
      { type: "tip", text: "Ask every quote: \"What will I pay each month after launch, and who owns the site if I leave?\" A low build price with high monthly fees can cost more over three years." },

      { type: "h2", text: "Why cheap websites often cost more later" },
      { type: "p", text: "A $300 template site looks like a deal until it's slow, hard to edit and invisible on Google. Rebuilding it properly then costs more than doing it right the first time. Treat your website as something that should earn money, not just an expense." },
      { type: "p", text: "A good test is simple: how many new customers would it take to pay for the site? For many service businesses, the answer is only a handful. Our guide on [why websites don't get leads](/blog/why-your-website-isnt-getting-leads) covers what makes the difference." },

      { type: "h2", text: "How to get an accurate quote" },
      { type: "p", text: "You'll get faster, more honest quotes if you have these ready:" },
      {
        type: "ol",
        items: [
          "A rough list of the pages you need",
          "Any features you must have, such as booking or online payments",
          "Two or three websites you like, and why",
          "Whether your text and photos are ready",
          "Your budget range and your deadline",
        ],
      },
      { type: "p", text: "Compare what's included, not only the price. Check for hosting, SEO setup, revisions, and who owns the finished site. See how long a build takes in our [website timeline guide](/blog/how-long-to-build-a-website)." },
      { type: "p", text: "Want a clear number for your business? [See our pricing](/pricing) or [start a project](/start-project) and we'll send you a plan and a price." },
    ],
    faq: [
      { q: "How much should a small business website cost?", a: "Most small businesses pay $1,200–$2,500 for a starter site of 3–5 pages, or $2,800–$5,000 for a larger business site with a blog and SEO setup." },
      { q: "How much does a website cost per month?", a: "Expect from around $15 a month for hosting and from around $99 a month for maintenance, plus a small yearly domain fee. Some agencies bundle hosting into the price." },
      { q: "Is a cheap website worth it?", a: "Only if it loads fast, works well on phones and is easy to find on Google. Very cheap sites often need rebuilding, which costs more in the end." },
      { q: "How much does an online store cost?", a: "Usually $2,000–$12,000 or more. The price depends on the number of products, payment and shipping setup, and any custom features." },
    ],
  },
  {
    slug: "how-long-to-build-a-website",
    title: "How long does it take to build a website? Realistic 2026 timelines",
    seoTitle: "How Long Does It Take to Build a Website? (2026)",
    metaDescription: "Realistic website timelines for 2026, from a simple site to an online store, plus what slows projects down and how to launch sooner.",
    keyword: "how long does it take to build a website",
    related: ["website design timeline", "how long to build a small business website", "website project timeline", "how long does a website redesign take"],
    excerpt: "Most small business sites take a few weeks, and the build is rarely what holds them up. Here's a realistic timeline and how to launch sooner.",
    category: "Websites",
    date: "2026-05-05",
    updated: UPDATED,
    readTime: "5 min read",
    author: ANISUR,
    image: { src: "/images/blog/website-timeline.webp", alt: "A brass hourglass with lime-green sand on a tidy desk beside a laptop" },
    cta: WEBSITE_CTA,
    body: [
      { type: "p", text: "\"**How long does it take to build a website?**\" comes right after \"how much will it cost?\" The honest answer depends on the size of the project, but you can still plan around realistic numbers. Here's what to expect in 2026, and what really decides whether you launch on time." },

      { type: "h2", text: "Website timelines by project type" },
      {
        type: "ul",
        items: [
          "**Simple brochure site (3–5 pages):** 1–2 weeks",
          "**Business site (8–12 pages, blog, SEO setup):** 3–5 weeks",
          "**Online store:** 4–8 weeks, depending on products and features",
          "**Custom or complex build:** 8–12 weeks or more",
        ],
      },
      { type: "p", text: "These assume your content is ready and feedback comes quickly. The build itself is rarely the bottleneck." },

      { type: "h2", text: "What happens during a website project" },
      { type: "p", text: "Most projects move through the same five stages. Knowing them helps you see what's needed from you, and when." },
      {
        type: "ol",
        items: [
          "**Discovery:** we learn your business, your customers and your goals.",
          "**Design:** you see how the site will look and give feedback.",
          "**Development:** the approved design becomes a working website.",
          "**Testing:** we check speed, phones, forms and links.",
          "**Launch:** the site goes live, and we make sure Google can find it.",
        ],
      },

      { type: "h2", text: "What slows website projects down" },
      { type: "p", text: "Delays almost never come from development. These four cause most of them:" },
      {
        type: "ul",
        items: [
          "**Content isn't ready.** Missing text, photos and logos are the most common reason deadlines slip.",
          "**Slow feedback.** A design waiting a week for sign-off adds a week to the project.",
          "**Scope creep.** \"Can we also add...\" halfway through resets the timeline.",
          "**Too many decision-makers.** Each extra approver adds another round of changes.",
        ],
      },

      { type: "h2", text: "How to launch your website sooner" },
      {
        type: "ol",
        items: [
          "Gather your text, photos and logo before the build starts, or ask for help creating them.",
          "Choose one person to make decisions and sign things off.",
          "Agree on what's included early, and save new ideas for phase two.",
          "Reply to feedback requests within a day or two.",
        ],
      },
      { type: "tip", text: "The fastest projects aren't the simplest ones. They're the ones where the client answers within a day." },

      { type: "h2", text: "How long does a website redesign take?" },
      { type: "p", text: "A redesign usually takes about as long as a new site of the same size. It can move faster because you already have content, or slower if that content needs rewriting. Not sure you need one? Read [7 signs your website needs a redesign](/blog/signs-your-website-needs-a-redesign)." },
      { type: "p", text: "When you redesign, protect what already ranks on Google: keep your page addresses where you can, and redirect any that change." },

      { type: "h2", text: "When you launch isn't the finish line" },
      { type: "p", text: "A new website takes time to show up well on Google, often a few months for competitive searches. Plan for it. Work through our [small business SEO checklist](/blog/small-business-seo-checklist) from launch day, or let our [monthly growth plans](/services/growth) handle it for you." },
      { type: "p", text: "Have a deadline? [Start a project](/start-project) and tell us the date. We'll tell you honestly whether it's realistic." },
    ],
    faq: [
      { q: "How long does it take to build a small business website?", a: "Usually 1–2 weeks for a simple 3–5 page site and 3–5 weeks for a larger business site, as long as your content is ready and feedback comes quickly." },
      { q: "How long does an online store take to build?", a: "Most take 4–8 weeks. The number of products, payment and shipping setup, and any custom features make the biggest difference." },
      { q: "What delays a website project the most?", a: "Content that isn't ready. Missing text, photos and logos hold up more projects than any technical problem." },
      { q: "Can a website be built in a week?", a: "A small, simple site can be, if the content is ready and decisions are made quickly. Larger sites need more time for design, testing and changes." },
    ],
  },
  {
    slug: "signs-your-website-needs-a-redesign",
    title: "7 signs your business website needs a redesign in 2026",
    seoTitle: "7 Signs Your Website Needs a Redesign in 2026",
    metaDescription: "Is your website costing you customers? Here are 7 clear signs it's time for a redesign, what each one costs you, and how to decide.",
    keyword: "signs your website needs a redesign",
    related: ["when to redesign a website", "do I need a new website", "website redesign checklist", "outdated website"],
    excerpt: "An outdated website quietly sends customers to a competitor. Here are 7 clear signs it's time for a redesign, and how to tell when a fix is enough.",
    category: "Websites",
    date: "2026-05-20",
    updated: UPDATED,
    readTime: "6 min read",
    author: ANISUR,
    image: { src: "/images/blog/website-redesign.webp", alt: "An old dusty computer monitor beside a slim modern laptop with a lime-green screen" },
    cta: WEBSITE_CTA,
    body: [
      { type: "p", text: "Your website is often the first impression a customer gets, and an outdated one quietly sends them to a competitor. How do you know when it's time? Here are seven clear **signs your website needs a redesign**, and how to tell when a smaller fix will do." },

      { type: "h2", text: "1. It's slow to load" },
      { type: "p", text: "If a page takes more than a few seconds to appear, many visitors leave before they see anything. Speed also affects how Google ranks you. Run your site through Google's free PageSpeed Insights, then see our [10 ways to speed up your website](/blog/website-speed-and-seo)." },

      { type: "h2", text: "2. It looks broken on phones" },
      { type: "p", text: "More than half of web traffic comes from phones. If people have to pinch to zoom, tap tiny buttons or scroll sideways, you're frustrating most of your visitors. Open your site on your own phone right now and try to call yourself." },

      { type: "h2", text: "3. It's not bringing in leads" },
      { type: "p", text: "A website has a job: bring in calls, form fills or sales. If yours is a digital brochure nobody acts on, the cause is usually unclear messaging or no obvious next step. Our guide on [why websites don't get leads](/blog/why-your-website-isnt-getting-leads) walks through the fixes." },

      { type: "h2", text: "4. It feels dated" },
      { type: "p", text: "A site that looked sharp in 2019 can say \"this business is behind the times\" today. Fair or not, visitors judge your credibility by your design within moments, often before they read a word." },

      { type: "h2", text: "5. You can't update it yourself" },
      { type: "p", text: "If changing a phone number means emailing a developer and waiting a week, your website is working against you. A modern build lets you make simple edits yourself, or gives you someone who handles them quickly." },

      { type: "h2", text: "6. It's not secure" },
      { type: "p", text: "No padlock in the address bar? Browsers warn visitors that the site is \"Not secure,\" and that drives people away. Old software is also how many sites get hacked. See our [WordPress security guide](/blog/wordpress-security-protect-from-hackers) for what to check." },

      { type: "h2", text: "7. It doesn't show up on Google" },
      { type: "p", text: "If people can't find you when they search for what you do, you're missing customers who are ready to buy. A redesign is the right moment to fix your site's structure, page titles and content. Start with our [small business SEO checklist](/blog/small-business-seo-checklist)." },

      { type: "h2", text: "Redesign or repair? How to decide" },
      { type: "p", text: "Not every problem needs a new website. Small fixes make sense when the site is built on a modern platform, works on phones, and needs better wording or faster images." },
      { type: "p", text: "A redesign is usually the better choice when:" },
      {
        type: "ul",
        items: [
          "Three or more of the signs above apply",
          "It's built on an old platform or theme that's hard to update",
          "Your services, prices or brand have changed",
          "Patching it would cost nearly as much as replacing it",
        ],
      },

      { type: "h2", text: "What a good redesign actually fixes" },
      { type: "p", text: "A proper redesign isn't a fresh coat of paint. It improves speed, phone experience, SEO, security and, most of all, how many visitors get in touch." },
      { type: "tip", text: "Before you redesign, list every page that already gets traffic from Google. Keep those addresses, or redirect them, so you don't lose rankings you've already earned." },
      { type: "p", text: "Wondering what it would cost? Read [how much a website costs](/blog/how-much-does-a-website-cost-2026), or [book a free call](/book-a-call) for an honest opinion: redesign or not." },
    ],
    faq: [
      { q: "How often should a business website be redesigned?", a: "There's no fixed rule, but many businesses need a refresh every three to five years. Let results decide: if it's slow, hard to use or not bringing in leads, it's time to act." },
      { q: "Will a redesign hurt my Google rankings?", a: "It can if pages are removed or moved without redirects. Keeping your existing page addresses, or redirecting the ones that change, protects the rankings you've earned." },
      { q: "Is it better to fix my website or start over?", a: "Fix it if the platform is modern and the problems are small. Start over if it fails on phones, runs on outdated software, or would cost nearly as much to repair." },
    ],
  },
  {
    slug: "small-business-seo-checklist",
    title: "Small business SEO checklist: 12 steps to rank on Google in 2026",
    seoTitle: "Small Business SEO Checklist: 12 Steps for 2026",
    metaDescription: "A practical small business SEO checklist for 2026: 12 clear steps to rank higher on Google, get found by local customers and win more leads.",
    keyword: "small business seo checklist",
    related: ["seo for small business", "local seo checklist", "how to rank on google", "google business profile"],
    excerpt: "You don't need a big budget to rank on Google. You need the basics done right. Here's the 12-step SEO checklist, written for business owners.",
    category: "Getting found",
    date: "2026-04-15",
    updated: UPDATED,
    readTime: "7 min read",
    author: SIAMUR,
    image: { src: "/images/blog/seo-checklist.webp", alt: "A brass compass on a street map with one lime-green map pin" },
    cta: {
      title: "Want this done for you?",
      body: "Our monthly Growth plans cover new pages, articles, your Google Business Profile and more. You just approve.",
      label: "See Growth plans",
      href: "/services/growth",
    },
    body: [
      { type: "p", text: "You don't need a big budget to rank on Google. You need the fundamentals done right. This **small business SEO checklist** covers the 12 steps that matter most, written for business owners rather than engineers. Work through it in order and tick things off as you go." },

      { type: "h2", text: "On-page SEO basics" },
      { type: "h3", text: "1. Give every page a clear title and description" },
      { type: "p", text: "Each page needs its own title (under about 60 characters) and description (under about 155). These are your free ad in the search results. Say the service and the area: \"Emergency Plumber in Austin, Same-Day Service.\"" },
      { type: "h3", text: "2. Use one main heading that matches the search" },
      { type: "p", text: "Use a single, descriptive H1 on each page that reflects what someone would actually type. \"Roof repair in Denver\" beats \"Welcome to our company.\"" },
      { type: "h3", text: "3. Keep page addresses clean" },
      { type: "p", text: "/services/roof-repair is better than /?p=123. Use real words, keep them short, and don't change them without a redirect." },
      { type: "h3", text: "4. Describe your images" },
      { type: "p", text: "Add alt text that says what each meaningful image shows. It helps image search and visitors who use screen readers." },

      { type: "h2", text: "Technical SEO" },
      { type: "h3", text: "5. Make your site fast" },
      { type: "p", text: "Compress images, use caching and choose decent hosting. Speed affects both rankings and how many visitors stay. Here are [10 ways to speed up your website](/blog/website-speed-and-seo)." },
      { type: "h3", text: "6. Make it work well on phones" },
      { type: "p", text: "Google looks at the mobile version of your site first. If it isn't good on a phone, it will struggle to rank." },
      { type: "h3", text: "7. Use HTTPS everywhere" },
      { type: "p", text: "A valid SSL certificate shows the padlock in the browser. Without it, visitors see a \"Not secure\" warning." },
      { type: "h3", text: "8. Set up a sitemap and Google Search Console" },
      { type: "p", text: "Search Console is free. Submit your sitemap so Google can find every page, and use it to see what people search for before they reach you." },
      { type: "h3", text: "9. Add structured data" },
      { type: "p", text: "This code tells Google what your business does, where you are, and which questions you answer. It can make your listing stand out in the results." },

      { type: "h2", text: "Content and local SEO" },
      { type: "h3", text: "10. Write about what customers search for" },
      { type: "p", text: "Create a page for each main service and each area you cover, then answer common questions in plain language. Helpful content earns both rankings and trust." },
      { type: "h3", text: "11. Claim your Google Business Profile" },
      { type: "p", text: "For local businesses, this is often the highest-impact step. Fill in every section, add real photos, post updates and collect reviews. Our guide shows [how to get more Google reviews](/blog/how-to-get-more-google-reviews)." },
      { type: "h3", text: "12. Link your pages together" },
      { type: "p", text: "Link related pages to each other, and make sure every page leads toward your contact page. It helps Google understand your site and keeps visitors moving." },
      { type: "tip", text: "Short on time? Do steps 8, 11 and 1 first. Together they give most local businesses the quickest wins." },

      { type: "h2", text: "How long does SEO take?" },
      { type: "p", text: "SEO builds slowly. Basic fixes can help within weeks, while competitive searches often take several months. Small, steady work beats one big push. Your visibility compounds as you add pages and reviews." },

      { type: "h2", text: "Getting found is only half the job" },
      { type: "p", text: "Rankings don't help if visitors leave without calling. Once traffic starts to grow, read [why your website isn't getting leads](/blog/why-your-website-isnt-getting-leads) to turn more of those visitors into customers." },
      { type: "p", text: "Rather not do this yourself? [Our websites](/services/website-design) include technical SEO from day one, and our [Growth plans](/services/growth) handle the monthly work." },
    ],
    faq: [
      { q: "Can I do SEO for my small business myself?", a: "Yes. The basics, like page titles, your Google Business Profile, reviews and helpful service pages, don't require technical skills, just regular time." },
      { q: "How long does it take to rank on Google?", a: "Basic fixes can help within weeks. Ranking for competitive searches often takes several months of steady work." },
      { q: "What is the most important SEO step for a local business?", a: "For most local businesses, it's a complete Google Business Profile with real photos and regular reviews." },
      { q: "Do I need a blog for SEO?", a: "It isn't required, but helpful articles let you show up for the questions customers search for. Start with service pages, then add articles." },
    ],
  },
  {
    slug: "website-speed-and-seo",
    title: "10 ways to speed up your website (and why it matters for SEO)",
    seoTitle: "How to Speed Up Your Website: 10 Fixes That Help SEO",
    metaDescription: "Page speed affects rankings and leads. Here are 10 practical ways to speed up your website, from images to hosting, and how to measure the results.",
    keyword: "how to speed up your website",
    related: ["website speed and seo", "core web vitals", "page speed insights", "why is my website so slow"],
    excerpt: "A slow website costs you twice: visitors leave, and Google notices. Here are ten practical fixes, from images to hosting, in plain English.",
    category: "Getting found",
    date: "2025-03-22",
    updated: UPDATED,
    readTime: "6 min read",
    author: ANISUR,
    image: { src: "/images/blog/website-speed.webp", alt: "A chrome stopwatch with streaks of lime-green light behind it" },
    cta: WEBSITE_CTA,
    body: [
      { type: "p", text: "A slow website costs you twice: visitors leave before it loads, and Google takes page experience into account when ranking you. Here's **how to speed up your website** with ten practical fixes, starting with the ones that usually make the biggest difference." },

      { type: "h2", text: "Why website speed matters for SEO" },
      { type: "p", text: "Google measures real-world experience through Core Web Vitals, which look at how quickly a page loads, how soon it responds, and whether it jumps around. Speed alone won't beat better content, but a slow site loses visitors whatever it ranks for." },
      { type: "tip", text: "Before you change anything, run your homepage through Google's free PageSpeed Insights and save the result. That way you can see what each fix actually does." },

      { type: "h2", text: "1. Optimize your images" },
      { type: "p", text: "Images are usually the heaviest thing on a page. Use modern formats like WebP or AVIF, size them to how they're displayed, and load anything further down the page only when it's needed." },
      { type: "h2", text: "2. Choose fast hosting" },
      { type: "p", text: "Cheap shared hosting is a common hidden cause of slow sites. If your server is slow to respond, nothing else can fully make up for it." },
      { type: "h2", text: "3. Use caching" },
      { type: "p", text: "Caching saves ready-made copies of your pages, so they appear faster and returning visitors don't download everything again. On WordPress, a good caching plugin or managed host handles this." },
      { type: "h2", text: "4. Minify CSS and JavaScript" },
      { type: "p", text: "Minifying strips spaces and unused code from your site's files. Smaller files load and run faster. Most caching tools can do this for you." },
      { type: "h2", text: "5. Cut down on plugins" },
      { type: "p", text: "Every plugin adds weight and another thing to keep updated. Remove what you don't use, and replace heavy plugins that do more than you need." },
      { type: "h2", text: "6. Load fonts efficiently" },
      { type: "p", text: "Use fewer font styles, and set fonts to show text immediately while they load. Four weights of a font are rarely worth the wait." },
      { type: "h2", text: "7. Delay non-essential scripts" },
      { type: "p", text: "Analytics, chat widgets and trackers shouldn't stop your page from appearing. Load them after the main content." },
      { type: "h2", text: "8. Use a CDN" },
      { type: "p", text: "A content delivery network serves your files from a location near each visitor. It helps most if your customers are spread across regions." },
      { type: "h2", text: "9. Reduce redirects" },
      { type: "p", text: "Each redirect adds a small delay. Keep them where they protect old links, but update your own internal links to point straight to the final page." },
      { type: "h2", text: "10. Measure, then fix" },
      { type: "p", text: "Use PageSpeed Insights and the Core Web Vitals report in Google Search Console. Fix the biggest problem first, test again, and repeat. Don't guess." },

      { type: "h2", text: "Why is my website so slow? The usual suspects" },
      { type: "p", text: "On small business sites, the cause is usually one of three things: oversized images, too many plugins, or low-cost hosting. Sort those out and most sites feel noticeably quicker." },
      { type: "p", text: "If it's still slow, the theme or page builder may be the problem. Our [Elementor vs Gutenberg comparison](/blog/elementor-vs-gutenberg) explains how that choice affects speed. Sometimes a rebuild is the better option, as we cover in [7 signs your website needs a redesign](/blog/signs-your-website-needs-a-redesign)." },
      { type: "p", text: "Speed is one step on our [small business SEO checklist](/blog/small-business-seo-checklist). Want it handled for you? [Book a free call](/book-a-call) and we'll take a look." },
    ],
    faq: [
      { q: "Does website speed affect SEO?", a: "Yes. Google considers page experience, including Core Web Vitals, when ranking pages. Great content can still outrank a faster page, but speed also affects how many visitors stay." },
      { q: "What is a good website loading time?", a: "Aim for the main content to appear within about 2.5 seconds. That's the \"good\" threshold for Largest Contentful Paint in Google's Core Web Vitals." },
      { q: "How do I check my website speed?", a: "Use Google's free PageSpeed Insights. It scores your page on mobile and desktop and lists what to fix first." },
      { q: "What slows down a website the most?", a: "On most small business sites, it's oversized images, too many plugins and slow hosting." },
    ],
  },
  {
    slug: "elementor-vs-gutenberg",
    title: "Elementor vs Gutenberg in 2026: which WordPress builder is right?",
    seoTitle: "Elementor vs Gutenberg in 2026: Which Should You Use?",
    metaDescription: "Elementor vs Gutenberg compared for 2026: speed, flexibility, ease of use and cost, so you can choose the right WordPress builder for your site.",
    keyword: "elementor vs gutenberg",
    related: ["gutenberg vs elementor speed", "best wordpress page builder", "wordpress block editor", "is elementor bad for seo"],
    excerpt: "One early decision shapes every WordPress site: how you build the pages. Here's how Elementor and Gutenberg compare on speed, flexibility and cost.",
    category: "WordPress",
    date: "2026-04-02",
    updated: UPDATED,
    readTime: "5 min read",
    author: SIAMUR,
    image: { src: "/images/blog/elementor-gutenberg.webp", alt: "A few simple white blocks beside a rich arrangement of lime-green and white blocks" },
    cta: WEBSITE_CTA,
    body: [
      { type: "p", text: "If you're building on WordPress, one early decision shapes everything after it: how you'll actually build the pages. In the **Elementor vs Gutenberg** debate, there's no universal winner. Here's how the two compare in 2026, and how to choose." },

      { type: "h2", text: "Elementor vs Gutenberg: the short version" },
      {
        type: "ul",
        items: [
          "**Elementor** gives you maximum visual control and lots of features, at some cost to speed.",
          "**Gutenberg** is lighter, faster and free, but complex custom layouts can take more work.",
        ],
      },

      { type: "h2", text: "Ease of use" },
      { type: "p", text: "Elementor's drag-and-drop editor is easy to pick up because you see exactly what you're building. Gutenberg, WordPress's built-in block editor, has improved a lot and now handles full-site editing, though it can feel less fluid for detailed layouts." },
      { type: "p", text: "If you only plan to edit text and photos after launch, either one is fine. For most owners, that's what matters." },

      { type: "h2", text: "Speed and performance" },
      { type: "p", text: "This is Gutenberg's biggest advantage. It's part of WordPress, so it adds little extra code. Elementor loads more files, which can slow a page if you aren't careful." },
      { type: "p", text: "A well-optimized Elementor site can still perform well, especially with good hosting, but it takes more effort. See [10 ways to speed up your website](/blog/website-speed-and-seo) for what to do." },

      { type: "h2", text: "Design flexibility" },
      { type: "p", text: "Elementor wins for out-of-the-box design power: precise control, ready-made widgets, templates and popups. Gutenberg covers most needs and keeps improving with block themes, but highly custom layouts may need a developer." },

      { type: "h2", text: "Cost" },
      { type: "p", text: "Gutenberg is free and built into WordPress. Elementor has a capable free version, but the features most businesses want come with a paid Pro subscription, so factor that yearly fee into your budget." },

      { type: "h2", text: "Is Elementor bad for SEO?" },
      { type: "p", text: "No. Google doesn't penalize a site for using a page builder. Elementor can affect SEO indirectly if it makes pages slow, and that's fixable. Good titles, useful content and a fast site matter far more than which builder you pick. Our [small business SEO checklist](/blog/small-business-seo-checklist) covers those basics." },

      { type: "h2", text: "Which one should you choose?" },
      {
        type: "ul",
        items: [
          "**Choose Gutenberg** for content-led sites where speed comes first, and when you want to avoid another subscription.",
          "**Choose Elementor** for marketing sites that need rich, custom layouts quickly, and you're willing to optimize it.",
        ],
      },
      { type: "tip", text: "Switching builders later usually means rebuilding your pages. It's worth getting this decision right at the start." },
      { type: "p", text: "Still comparing platforms? Read [WordPress vs Wix](/blog/wordpress-vs-wix-2025). Or [start a project](/start-project), tell us your goals, and we'll recommend the right setup and build it for you." },
    ],
    faq: [
      { q: "Is Gutenberg better than Elementor?", a: "Gutenberg is lighter, faster and free. Elementor offers more design control out of the box. The better choice depends on whether speed or visual flexibility matters most for your site." },
      { q: "Is Elementor bad for SEO?", a: "No. It can slow pages down if it isn't optimized, which can affect rankings indirectly, but a well-built Elementor site can rank well." },
      { q: "Is Gutenberg free?", a: "Yes. Gutenberg is the block editor built into WordPress, so there's nothing extra to buy." },
      { q: "Can I switch from Elementor to Gutenberg later?", a: "Yes, but pages generally need rebuilding, so it's easier to choose the right one at the start." },
    ],
  },
  {
    slug: "woocommerce-vs-shopify-2026",
    title: "WooCommerce vs Shopify in 2026: which is right for your store?",
    seoTitle: "WooCommerce vs Shopify in 2026: Which Should You Pick?",
    metaDescription: "WooCommerce vs Shopify compared for 2026: costs, fees, flexibility, SEO and ownership, so you can choose the right platform for your online store.",
    keyword: "woocommerce vs shopify",
    related: ["shopify vs woocommerce cost", "woocommerce vs shopify seo", "best ecommerce platform for small business", "is woocommerce free"],
    excerpt: "Your e-commerce platform shapes your costs, your flexibility and how much of your store you really own. Here's an honest comparison.",
    category: "WordPress",
    date: "2026-03-12",
    updated: UPDATED,
    readTime: "6 min read",
    author: SIAMUR,
    image: { src: "/images/blog/woocommerce-shopify.webp", alt: "Two kraft paper parcels tied with lime-green ribbon on a shop counter" },
    cta: {
      title: "Ready to sell online?",
      body: "We build fast, easy-to-manage online stores on WooCommerce, with hosting included.",
      label: "See website packages",
      href: "/services/website-design",
    },
    body: [
      { type: "p", text: "Picking an e-commerce platform shapes your costs, your flexibility and how much of your store you actually own. In the **WooCommerce vs Shopify** decision, both are excellent, but they suit different businesses. Here's an honest comparison for 2026." },

      { type: "h2", text: "WooCommerce vs Shopify: the short version" },
      {
        type: "ul",
        items: [
          "**Choose Shopify** if you want the quickest path to selling and don't want to think about technical upkeep.",
          "**Choose WooCommerce** if you want full control, deep customization and to truly own your store and data.",
        ],
      },

      { type: "h2", text: "Cost and fees" },
      { type: "p", text: "Shopify charges a monthly subscription. If you don't use Shopify Payments, it also adds a transaction fee on each sale. Apps for extra features often carry their own monthly fees." },
      { type: "p", text: "WooCommerce is a free plugin for WordPress. You pay for hosting and any premium extensions, and WooCommerce itself takes no platform fee on sales. You'll still pay normal card processing fees with either platform." },
      { type: "tip", text: "Compare the total yearly cost at your expected sales volume, including apps, extensions and payment fees, not only the headline monthly price." },

      { type: "h2", text: "Flexibility and customization" },
      { type: "p", text: "This is WooCommerce's home turf. Because it runs on WordPress, you can customize almost anything: checkout, pricing rules, integrations and content. Shopify is powerful, but you work within its structure and app store." },
      { type: "p", text: "If your store needs something unusual, like complex pricing or bookings mixed with products, WooCommerce is usually the easier fit." },

      { type: "h2", text: "Ease of use" },
      { type: "p", text: "Shopify wins for hands-off simplicity. Hosting, security and updates are handled for you. WooCommerce needs regular updates, backups and security checks, so plan to do that yourself or have someone do it for you. Our [WordPress security guide](/blog/wordpress-security-protect-from-hackers) explains what's involved." },

      { type: "h2", text: "WooCommerce vs Shopify for SEO" },
      { type: "p", text: "Both can rank well. WooCommerce, through WordPress, gives you finer control over page structure, technical settings and content, which helps in competitive markets. Shopify covers the essentials cleanly for most stores." },
      { type: "p", text: "For either one, the fundamentals matter most. Start with our [small business SEO checklist](/blog/small-business-seo-checklist)." },

      { type: "h2", text: "Ownership" },
      { type: "p", text: "With WooCommerce, you own your files, database and customer data, and you can move to another host at any time. With Shopify, you're renting space in its system. That's convenient, but you can't take the platform with you, though you can export your data." },

      { type: "h2", text: "Which should you choose?" },
      {
        type: "ul",
        items: [
          "**Shopify suits you if** you sell a straightforward range of products, want to launch fast, and prefer zero upkeep.",
          "**WooCommerce suits you if** you want content and sales in one place, need custom features, or are sensitive to ongoing fees.",
        ],
      },
      { type: "p", text: "We build online stores on WooCommerce because it keeps you in full control, and we take care of the technical side. Want to know what yours would cost? Read [how much a website costs](/blog/how-much-does-a-website-cost-2026) or [start a project](/start-project)." },
    ],
    faq: [
      { q: "Is WooCommerce cheaper than Shopify?", a: "Often over time, especially for higher-volume stores, because WooCommerce charges no platform fee on sales. But hosting, extensions and upkeep are extra, so compare the total yearly cost." },
      { q: "Is WooCommerce really free?", a: "The plugin is free, but you still pay for hosting and a domain, plus any premium extensions and themes you choose." },
      { q: "Which is better for SEO, WooCommerce or Shopify?", a: "Both can rank well. WooCommerce gives finer control over technical SEO and content, while Shopify covers the essentials for most stores." },
      { q: "Can I move from Shopify to WooCommerce later?", a: "Yes. Products and customer data can be moved over, but design and apps usually need rebuilding, so it takes planning." },
    ],
  },
  {
    slug: "wordpress-security-protect-from-hackers",
    title: "WordPress security in 2026: how to protect your site from hackers",
    seoTitle: "WordPress Security in 2026: Protect Your Site from Hackers",
    metaDescription: "A practical WordPress security guide: how sites really get hacked and the steps that keep yours safe, including updates, backups, 2FA and firewalls.",
    keyword: "wordpress security",
    related: ["how to protect wordpress site from hackers", "wordpress security best practices", "wordpress hacked what to do", "wordpress backups"],
    excerpt: "Almost every WordPress hack exploits a handful of avoidable weaknesses. Here's how sites really get hacked, and the steps that keep yours safe.",
    category: "WordPress",
    date: "2026-02-10",
    updated: UPDATED,
    readTime: "6 min read",
    author: SIAMUR,
    image: { src: "/images/blog/wordpress-security.webp", alt: "A steel padlock with a lime-green glowing keyhole on a closed laptop" },
    cta: {
      title: "Worried your site isn't secure?",
      body: "Book a free call and we'll look at your site with you and tell you what needs fixing.",
      label: "Book a free call",
      href: "/book-a-call",
    },
    body: [
      { type: "p", text: "WordPress powers over 40% of the web, which also makes it a constant target. The good news about **WordPress security** is that almost every hack exploits a handful of avoidable weaknesses. Lock these down and you're ahead of most sites." },

      { type: "h2", text: "How WordPress sites actually get hacked" },
      { type: "p", text: "It's rarely a dramatic, targeted break-in. Most attacks are automated bots looking for easy openings. The usual causes are:" },
      {
        type: "ul",
        items: [
          "**Outdated software:** old WordPress core, themes or plugins with known holes",
          "**Weak or reused passwords:** guessed by bots",
          "**Pirated plugins and themes:** often shipped with malware",
          "**Poor hosting:** shared servers where one infected site can affect others",
        ],
      },

      { type: "h2", text: "How to protect your WordPress site from hackers" },
      { type: "h3", text: "1. Keep everything updated" },
      { type: "p", text: "This is the most important habit. Update WordPress, themes and plugins promptly. On larger sites, test updates on a staging copy first so nothing breaks." },
      { type: "h3", text: "2. Use strong passwords and two-factor authentication" },
      { type: "p", text: "A password manager plus two-factor authentication on every admin account stops most password attacks." },
      { type: "h3", text: "3. Run automatic backups, and test them" },
      { type: "p", text: "Keep daily backups stored away from your site. A backup you've never restored is only a hope, so test a restore from time to time." },
      { type: "h3", text: "4. Add a firewall and malware scanning" },
      { type: "p", text: "A web application firewall blocks many attacks before they reach your site, and regular scanning catches anything that gets through." },
      { type: "h3", text: "5. Use HTTPS everywhere" },
      { type: "p", text: "An SSL certificate encrypts traffic and removes the \"Not secure\" browser warning. Many hosts include one for free." },
      { type: "h3", text: "6. Remove what you don't use" },
      { type: "p", text: "Every unused plugin, theme or admin account is another door. Delete them instead of only deactivating them." },
      { type: "h3", text: "7. Choose good hosting" },
      { type: "p", text: "Quality hosting isolates your site and watches for trouble. It's a foundation that security plugins alone can't replace, and it helps with [website speed](/blog/website-speed-and-seo) too." },
      { type: "tip", text: "Today's quick wins: turn on two-factor authentication, delete unused plugins, and check when your last backup ran. It takes about 20 minutes." },

      { type: "h2", text: "What to do if your WordPress site is hacked" },
      {
        type: "ol",
        items: [
          "Stay calm, and contact your hosting company. Many can help or isolate the site.",
          "Change all passwords: WordPress, hosting, database and email.",
          "Restore a clean backup from before the hack, if you have one.",
          "Scan for malware, then update everything and remove what you don't need.",
          "Check Google Search Console for security warnings, and request a review if your site was flagged.",
        ],
      },

      { type: "h2", text: "Security isn't a one-time job" },
      { type: "p", text: "New threats appear every week, so your site needs ongoing updates and monitoring, not a single clean-up. If you'd rather not think about it, have someone handle it. All our [websites](/services/website-design) are built on WordPress with hosting included." },
      { type: "p", text: "An insecure site can also be a sign of bigger problems. See [7 signs your website needs a redesign](/blog/signs-your-website-needs-a-redesign). And if you're choosing a platform, our [WordPress vs Wix comparison](/blog/wordpress-vs-wix-2025) covers how security upkeep differs." },
    ],
    faq: [
      { q: "Is WordPress secure?", a: "Yes, when it's kept up to date. Most hacked WordPress sites are running outdated plugins or weak passwords rather than being victims of a flaw in WordPress itself." },
      { q: "How do I know if my WordPress site has been hacked?", a: "Warning signs include strange redirects, unknown admin users, spam pages in Google results, browser warnings, or a sudden slowdown. A malware scan can confirm it." },
      { q: "Do I need a security plugin for WordPress?", a: "It's a sensible extra layer, but it doesn't replace updates, strong passwords, backups and good hosting." },
      { q: "How often should I back up my WordPress site?", a: "Daily is a good standard for most business sites, and more often for busy online stores. Keep copies away from your main server." },
    ],
  },
  {
    slug: "wordpress-vs-wix-2025",
    title: "WordPress vs Wix: which is right for your business in 2026?",
    seoTitle: "WordPress vs Wix: Which Is Right for Your Business?",
    metaDescription: "A practical, no-hype comparison of WordPress and Wix on cost, flexibility, SEO and maintenance, so you can pick the platform that fits your goals.",
    keyword: "wordpress vs wix",
    related: ["wix vs wordpress for small business", "wordpress vs wix seo", "is wix or wordpress better", "wordpress vs wix cost"],
    excerpt: "Both can produce a good-looking, fast site. The right choice depends on where your business is headed. Here's a practical, no-hype comparison.",
    category: "WordPress",
    date: "2025-02-18",
    updated: UPDATED,
    readTime: "5 min read",
    author: SIAMUR,
    image: { src: "/images/blog/wordpress-wix.webp", alt: "A simple modern key beside an ornate brass key tied with lime-green thread" },
    cta: WEBSITE_CTA,
    body: [
      { type: "p", text: "Choosing a platform is the first real decision in any web project, and the one people most often get wrong. In the **WordPress vs Wix** choice, both can produce a good-looking, fast site. The right one depends on where your business is headed, not on which is \"better.\"" },

      { type: "h2", text: "WordPress vs Wix: the short version" },
      {
        type: "ul",
        items: [
          "**Choose Wix** if you want a site up quickly, plan to make your own edits, and don't need custom features.",
          "**Choose WordPress** if you need room to grow: custom features, serious online sales, integrations, or full control of your site and data.",
        ],
      },

      { type: "h2", text: "WordPress vs Wix cost" },
      { type: "p", text: "Wix bundles hosting, security and updates into one predictable monthly fee. WordPress software is free, but you pay for hosting, and for any premium themes or plugins." },
      { type: "p", text: "Over a few years, a simple Wix site is often cheaper to run, while a larger WordPress site is often cheaper to own and grow. For real numbers, see [how much a website costs](/blog/how-much-does-a-website-cost-2026)." },

      { type: "h2", text: "Flexibility" },
      { type: "p", text: "This is the real divide. WordPress can become almost anything: a membership site, a marketplace or a custom booking system. Wix is excellent within its limits and keeps improving, but you work inside its system, and you can't move your Wix site to another platform as it is." },

      { type: "h2", text: "WordPress vs Wix for SEO" },
      { type: "p", text: "Both can rank well. WordPress gives you finer control over structured data, redirects and technical settings, which matters in competitive markets. Wix covers the fundamentals well for most small businesses." },
      { type: "p", text: "Whichever you choose, content and the basics count for more than the platform. Our [small business SEO checklist](/blog/small-business-seo-checklist) applies to both." },

      { type: "h2", text: "Ease of use" },
      { type: "p", text: "Wix's drag-and-drop editor is easy to start with. WordPress has a steeper learning curve, though day-to-day edits are simple once the site is set up. If you do use WordPress, the way pages are built matters too: see [Elementor vs Gutenberg](/blog/elementor-vs-gutenberg)." },

      { type: "h2", text: "Maintenance and security" },
      { type: "p", text: "Wix updates itself. WordPress needs regular updates to its core, theme and plugins, along with backups and security checks, so either you or someone you hire has to do it. Our [WordPress security guide](/blog/wordpress-security-protect-from-hackers) lists what's involved." },

      { type: "h2", text: "Selling online" },
      { type: "p", text: "Wix can run a small store well. For larger ranges or custom needs, WordPress with WooCommerce goes further. Compare your options in [WooCommerce vs Shopify](/blog/woocommerce-vs-shopify-2026)." },

      { type: "h2", text: "Our take: which should you choose?" },
      { type: "p", text: "There's no universal winner. If you need a simple site and enjoy making your own changes, Wix is a sensible choice. If your website is a key part of how you win business and you expect to grow, WordPress gives you more room." },
      { type: "p", text: "We build on WordPress because it gives our clients full ownership and room to grow, and we include hosting so the technical side isn't your problem. Not sure yet? [Book a free call](/book-a-call) and we'll talk it through honestly." },
    ],
    faq: [
      { q: "Is WordPress or Wix better for a small business?", a: "Wix suits simple sites you want to manage yourself. WordPress suits businesses that expect to grow or need custom features, online sales or more control." },
      { q: "Is WordPress better than Wix for SEO?", a: "WordPress offers finer technical control, which helps in competitive markets. Wix covers the basics well, and both can rank." },
      { q: "Which is cheaper, Wix or WordPress?", a: "A simple Wix site is often cheaper to run for a few years. A larger WordPress site is often better value as it grows, since you aren't tied to one platform's plans." },
      { q: "Can I move my Wix site to WordPress?", a: "Yes, but it isn't a direct transfer. The design usually has to be rebuilt, though your content can be moved over." },
    ],
  },
];

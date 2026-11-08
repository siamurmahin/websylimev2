// Industry pages (/industries and /industries/[slug]). One entry per trade. To add
// a trade: copy an entry, write new copy for it (don't reuse wording, Google ignores
// near-duplicate pages), add a hero photo, and it appears in the sitemap and on /industries.
//
// Keywords are from Google autocomplete for the US (checked Nov 2026), with no volume data.
// Honesty rule: these pages say what we build. Don't claim past clients in a trade
// until they're real: `related` shows real projects from similar businesses.
import type { IconKey } from "@/content/types";

export type Industry = {
  slug: string;
  /** Short name for cards and menus */
  name: string;
  /** Main keyword, for us (not shown) */
  keyword: string;
  meta: { title: string; description: string };
  card: string;
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    points: string[];
    image: { src: string; alt: string };
  };
  pains: { headline: string; items: { icon: IconKey; title: string; body: string }[] };
  included: { headline: string; subheadline: string; items: { icon: IconKey; title: string; body: string }[] };
  pages: { headline: string; subheadline: string; items: string[] };
  extra: { title: string; body: string; link: { label: string; href: string } };
  /** Slugs from content/portfolio.ts: real projects from similar businesses */
  related: string[];
  faq: { q: string; a: string }[];
};

export const industries: Industry[] = [
  {
    slug: "plumbers",
    name: "Plumbers",
    keyword: "website design for plumbers",
    meta: {
      title: "Website Design for Plumbers",
      description: "Plumbing websites built to bring in calls: tap-to-call, emergency pages, service areas and reviews. Fast websites with hosting included.",
    },
    card: "For emergency call-outs and booked jobs, with your number one tap away.",
    hero: {
      eyebrow: "Website design for plumbers",
      headline: "Plumbing websites that make your phone ring.",
      headlineAccent: "phone ring.",
      subheadline: "When a pipe bursts, people search, tap the first number they trust and call. We build plumbing websites that make that number yours.",
      points: ["Tap-to-call on every page", "Pages for each town you cover", "Hosting included"],
      image: { src: "/images/industries/plumbers.webp", alt: "Copper pipe fittings and a pipe wrench on a tidy workbench" },
    },
    pains: {
      headline: "Good work, but the phone stays quiet.",
      items: [
        { icon: "phoneMissed", title: "The call goes to someone else", body: "Your site is hard to use on a phone, so people give up and call the next plumber on the list." },
        { icon: "mapPinOff", title: "You don't show up nearby", body: "Someone two streets away searches for a plumber and never sees your name." },
        { icon: "trendingDown", title: "Your site doesn't build trust", body: "No reviews, no license details, no real photos. Homeowners letting a stranger in want to see those first." },
      ],
    },
    included: {
      headline: "Built for how people hire a plumber.",
      subheadline: "Most plumbing jobs start with a problem and a phone. Everything on your site points at that call.",
      items: [
        { icon: "zap", title: "Emergency calls first", body: "A call button that stays on screen, plus a clear emergency page for burst pipes and no-hot-water calls." },
        { icon: "mapPin", title: "Your service areas", body: "A page for each town you cover, so you show up when locals search nearby." },
        { icon: "badgeCheck", title: "Proof you can be trusted", body: "Your reviews, license and insurance details, and photos of real jobs." },
        { icon: "calendarCheck", title: "Quotes for planned work", body: "A short form for bathroom refits and water heater installs that can wait until you're off the tools." },
      ],
    },
    pages: {
      headline: "The pages a plumbing site needs.",
      subheadline: "We set them up and write the first draft. You check it and say yes.",
      items: ["Home", "Emergency plumbing", "Drain cleaning", "Leak repair", "Water heaters", "Service areas", "Reviews", "Get a quote"],
    },
    extra: {
      title: "Stop losing after-hours calls",
      body: "You can't answer while you're under a sink. WebsyChat answers website visitors, takes their details and sends them to you.",
      link: { label: "See WebsyChat", href: "/products/websychat" },
    },
    related: ["heat-pump-company-website-design", "gate-fencing-company-website-design", "home-renovation-contractor-website-design"],
    faq: [
      { q: "How much does a plumbing website cost?", a: "It depends on how many services and towns you cover. Our guide on how much a website costs has real price ranges, and we give you a clear price before any work starts." },
      { q: "Can you help my plumbing business show up on Google Maps?", a: "Yes. We set up your site with pages for each service and town. Our monthly Growth plans also keep your Google Business Profile active." },
      { q: "Do I need a separate page for each town I serve?", a: "It helps. People search with their town name, and a page written for that area gives Google a clear reason to show you. Each one needs real local detail, not just a swapped town name." },
      { q: "What should a plumbing website have on the first screen?", a: "Your phone number, what you do, where you work, and whether you take emergency calls. Someone with water on the floor won't scroll to find them." },
    ],
  },
  {
    slug: "electricians",
    name: "Electricians",
    keyword: "electrician website design",
    meta: {
      title: "Electrician Website Design",
      description: "Electrician websites that show your license up front, explain your services clearly and turn local searches into calls. Hosting included.",
    },
    card: "For licensed electricians who want homeowners and builders to trust them fast.",
    hero: {
      eyebrow: "Electrician website design",
      headline: "Electrician websites people trust on sight.",
      headlineAccent: "trust on sight.",
      subheadline: "Nobody hires an electrician without checking first. We build websites that show your license, your work and your reviews before they have to ask.",
      points: ["License and insurance up front", "Clear pages for each service", "Hosting included"],
      image: { src: "/images/industries/electricians.webp", alt: "A neat electrical panel with tidy wiring and a tester on a bench" },
    },
    pains: {
      headline: "Skilled work, hidden behind a weak website.",
      items: [
        { icon: "badgeCheck", title: "People can't see you're licensed", body: "Electrical work is a safety decision. If your credentials are buried, careful homeowners keep looking." },
        { icon: "search", title: "Your services are lumped together", body: "A panel upgrade and an EV charger get one line on one page, so you don't show up when people search for either." },
        { icon: "phoneMissed", title: "Urgent calls go elsewhere", body: "A power cut is stressful. If your number takes more than a moment to find, they call someone else." },
      ],
    },
    included: {
      headline: "Built around trust and clear services.",
      subheadline: "Homeowners want someone safe. Builders want someone reliable. Your site answers both.",
      items: [
        { icon: "badgeCheck", title: "Credentials where people look", body: "License number, insurance and any certifications near the top of the page, not hidden in the footer." },
        { icon: "layout", title: "A page for each service", body: "Panel upgrades, rewiring, EV chargers and lighting each get their own page, so each can show up in search." },
        { icon: "zap", title: "Fast help for urgent jobs", body: "Tap-to-call on every page, with a plain emergency section for power and safety problems." },
        { icon: "users", title: "Paths for homes and builders", body: "Separate routes for residential customers and for contractors looking for a regular electrician." },
      ],
    },
    pages: {
      headline: "The pages an electrician's site needs.",
      subheadline: "Tell us what work you want more of, and we'll build the site around it.",
      items: ["Home", "Residential electrical", "Commercial electrical", "Panel upgrades", "EV charger installation", "Emergency electrician", "License and reviews", "Get a quote"],
    },
    extra: {
      title: "Get more of the jobs you want",
      body: "Want more EV charger installs and fewer small call-outs? Our monthly Growth plans add pages and run Google Ads for the work you'd rather be doing.",
      link: { label: "See Growth plans", href: "/services/growth" },
    },
    related: ["heat-pump-company-website-design", "electrical-supplies-online-store-design", "home-renovation-contractor-website-design"],
    faq: [
      { q: "What should an electrician's website include?", a: "Your license and insurance details, a page for each main service, the areas you cover, real reviews, photos of your work, and a phone number you can tap from anywhere on the site." },
      { q: "Should I list my license number on my website?", a: "In most cases, yes. Rules on advertising license details vary by state, so check yours. Showing it also tells careful customers you have nothing to hide." },
      { q: "Can you build pages for EV charger installation?", a: "Yes. A dedicated page for work like EV chargers or panel upgrades gives you a much better chance of showing up when people search for that job." },
      { q: "How long does an electrician website take to build?", a: "Most business sites take a few weeks once your content is ready. Our website timeline guide breaks down what to expect." },
    ],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    keyword: "pest control website design",
    meta: {
      title: "Pest Control Website Design",
      description: "Pest control websites that answer panicked searches fast, explain each pest clearly and bring in calls and recurring plans. Hosting included.",
    },
    card: "For urgent pest calls today and recurring protection plans for the year ahead.",
    hero: {
      eyebrow: "Pest control website design",
      headline: "Pest control websites that get the call.",
      headlineAccent: "get the call.",
      subheadline: "Nobody browses for an exterminator. They've just seen something in the kitchen. We build sites that calm them down and get you the call.",
      points: ["A clear page for each pest", "Recurring plans explained", "Hosting included"],
      image: { src: "/images/industries/pest-control.webp", alt: "A clean professional sprayer and inspection flashlight on a bright porch" },
    },
    pains: {
      headline: "They're ready to call. Your site slows them down.",
      items: [
        { icon: "hourglass", title: "People want help now", body: "Someone who just found termites won't read a long page about your company history. They want to know you can come." },
        { icon: "search", title: "One page for every pest", body: "\"We treat all pests\" doesn't rank for bed bugs, and it doesn't reassure someone who has them." },
        { icon: "receipt", title: "One-time jobs, no repeat work", body: "Your best customers are on a plan, but your site never explains why they should join one." },
      ],
    },
    included: {
      headline: "Built for worried homeowners and long-term plans.",
      subheadline: "Get the urgent call today, then turn that customer into yearly protection.",
      items: [
        { icon: "zap", title: "A fast route to help", body: "Tap-to-call and a short form at the top of every page, with no digging required." },
        { icon: "sprout", title: "A page for each pest", body: "Termites, bed bugs, rodents and more, each with what to look for and how you deal with it." },
        { icon: "badgeCheck", title: "Reassurance that matters", body: "Your license, your guarantee and how you keep pets and kids safe, in plain language." },
        { icon: "calendarCheck", title: "Recurring plans made clear", body: "A simple page on what a plan covers, how often you visit and how to sign up." },
      ],
    },
    pages: {
      headline: "The pages a pest control site needs.",
      subheadline: "Each pest page also gives you a real chance of showing up for that search.",
      items: ["Home", "Termite control", "Bed bug treatment", "Rodent control", "Ant and roach control", "Protection plans", "Service areas", "Book an inspection"],
    },
    extra: {
      title: "Be there when pests show up at night",
      body: "People often spot pests in the evening. WebsyChat answers their questions, takes their details and sends you the lead by morning.",
      link: { label: "See WebsyChat", href: "/products/websychat" },
    },
    related: ["property-inspection-company-website-design", "heat-pump-company-website-design", "gate-fencing-company-website-design"],
    faq: [
      { q: "What makes a good pest control website?", a: "A fast way to call, a separate page for each pest you treat, clear information on safety for pets and children, real reviews, and an easy explanation of any recurring plans." },
      { q: "Should each pest have its own page?", a: "Yes. People search for the exact problem they have, like bed bugs or termites. A page for each one helps you show up and reassures them you've dealt with it before." },
      { q: "Can a website help sell recurring pest plans?", a: "Yes. A clear plan page explains what's covered and how often you visit, and it can be linked from every pest page, so one-time customers see why a plan makes sense." },
      { q: "Do you write the content for my pest control site?", a: "We write the first draft from what you tell us about your services and how you work. You check it for accuracy before anything goes live." },
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    keyword: "hvac website design",
    meta: {
      title: "HVAC Website Design",
      description: "HVAC websites built for busy seasons: fast calls when the AC or heat quits, clear service pages and maintenance plans. Hosting included.",
    },
    card: "For no-heat and no-AC calls in peak season, and maintenance plans the rest of the year.",
    hero: {
      eyebrow: "HVAC website design",
      headline: "HVAC websites that stay busy all year.",
      headlineAccent: "busy all year.",
      subheadline: "When the AC dies in July, people call whoever they find first. We build HVAC websites that win those calls, then sell maintenance plans for the slow months.",
      points: ["Fast calls when systems fail", "Maintenance plans explained", "Hosting included"],
      image: { src: "/images/industries/hvac.webp", alt: "A modern outdoor air conditioning unit beside a bright home" },
    },
    pains: {
      headline: "Slammed in July, quiet in October.",
      items: [
        { icon: "calendarX", title: "Your work comes and goes with the weather", body: "Peak weeks are full, then the phone goes quiet. Your site does nothing to smooth out the slow months." },
        { icon: "phoneMissed", title: "Urgent calls slip away", body: "A family with no heat won't dig through your menu. If they can't call in a tap, they try the next company." },
        { icon: "receipt", title: "Replacements are a hard sell", body: "A new system is a big purchase. Without clear options and financing details, people stall or go with whoever explains it best." },
      ],
    },
    included: {
      headline: "Built for peak season and the slow months.",
      subheadline: "Win the urgent repair today, then keep that customer for the next ten years.",
      items: [
        { icon: "zap", title: "Repairs up front", body: "Tap-to-call on every page, with clear routes for no-heat and no-AC emergencies." },
        { icon: "calendarCheck", title: "Maintenance plans", body: "A simple page on what a tune-up plan covers and why it's worth it, to bring in steady work between seasons." },
        { icon: "layout", title: "Replacement pages", body: "System options, financing and what to expect, so homeowners feel ready to ask for a quote." },
        { icon: "mapPin", title: "The areas you cover", body: "Service and town pages, so you show up when people search for HVAC repair nearby." },
      ],
    },
    pages: {
      headline: "The pages an HVAC site needs.",
      subheadline: "Tell us what you want more of, whether that's installs or service plans, and we'll lead with it.",
      items: ["Home", "AC repair", "Heating repair", "System replacement", "Maintenance plans", "Financing", "Service areas", "Book a service"],
    },
    extra: {
      title: "Keep the phone busy in the off-season",
      body: "Our monthly Growth plans keep your Google profile active and can run Google Ads for tune-ups and installs before the rush starts.",
      link: { label: "See Growth plans", href: "/services/growth" },
    },
    related: ["heat-pump-company-website-design", "property-inspection-company-website-design", "home-renovation-contractor-website-design"],
    faq: [
      { q: "What should an HVAC website include?", a: "Tap-to-call on every page, separate pages for repair, replacement and maintenance, the areas you cover, financing details if you offer them, and real reviews." },
      { q: "How can a website help during the slow season?", a: "A clear maintenance plan page gives past customers a reason to book in spring and fall. Pages on system replacement also bring in planned work that doesn't depend on a breakdown." },
      { q: "Should I show prices on my HVAC website?", a: "Exact prices are hard before an inspection, but a starting price for a tune-up or a service call builds trust and cuts down on calls from people who aren't a fit." },
      { q: "Can you add online booking to an HVAC website?", a: "Yes. A simple booking or request form lets people ask for service any time, which helps when you can't get to the phone during a busy week." },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    keyword: "roofing website design",
    meta: {
      title: "Roofing Website Design",
      description: "Roofing websites that win big-ticket jobs: real project photos, storm damage pages, financing and free inspection forms. Hosting included.",
    },
    card: "For storm damage calls and full replacements, where trust decides who gets the job.",
    hero: {
      eyebrow: "Roofing website design",
      headline: "Roofing websites that win the inspection.",
      headlineAccent: "win the inspection.",
      subheadline: "A new roof is one of the biggest bills a homeowner gets. We build websites that show why you're the safe choice, and make booking an inspection easy.",
      points: ["Free inspection forms", "Real project photos", "Hosting included"],
      image: { src: "/images/industries/roofing.webp", alt: "A neat new shingle roof at golden hour with a hammer and tape measure" },
    },
    pains: {
      headline: "Homeowners don't trust what they can't check.",
      items: [
        { icon: "users", title: "Storm chasers made people wary", body: "After bad weather, door-knockers are everywhere. Homeowners look you up to see if you're local and legitimate." },
        { icon: "image", title: "Your best roofs aren't on your site", body: "Nobody can judge a roof from a paragraph. Without real project photos, you look the same as everyone else." },
        { icon: "hourglass", title: "They need time to decide", body: "A roof is rarely a same-day decision. If your site gives them no easy first step, they forget you before they're ready." },
      ],
    },
    included: {
      headline: "Built to earn trust on a big decision.",
      subheadline: "The goal isn't selling a roof online. It's getting invited to take a look.",
      items: [
        { icon: "calendarCheck", title: "Easy inspection requests", body: "A short form on every page, so booking a look at the roof feels like a small step." },
        { icon: "image", title: "Real project galleries", body: "Before-and-after photos by roof type and area, so neighbors can see work close to home." },
        { icon: "badgeCheck", title: "Local proof", body: "Your address, license, insurance, warranties and reviews from nearby homeowners." },
        { icon: "zap", title: "Storm damage pages", body: "Clear help for leaks and storm damage, including what to do first and how insurance claims work." },
      ],
    },
    pages: {
      headline: "The pages a roofing site needs.",
      subheadline: "We'll build around the work you want most, whether that's repairs, replacements or commercial jobs.",
      items: ["Home", "Roof replacement", "Roof repair", "Storm damage", "Commercial roofing", "Project gallery", "Financing", "Free inspection"],
    },
    extra: {
      title: "Stay visible when the next storm hits",
      body: "Our monthly Growth plans add local pages, reply to reviews and can run Google Ads, so you're easy to find when people need a roofer fast.",
      link: { label: "See Growth plans", href: "/services/growth" },
    },
    related: ["home-renovation-contractor-website-design", "luxury-construction-company-website-design", "gate-fencing-company-website-design"],
    faq: [
      { q: "What makes a good roofing website?", a: "Real project photos, a simple inspection form, your license and insurance details, local reviews and clear pages for repair, replacement and storm damage." },
      { q: "How do I get more roofing leads from my website?", a: "Offer an easy first step like a free inspection, show roofs near the visitor, and put reviews beside your forms. Page speed and a good phone experience matter too." },
      { q: "Should my roofing website have a storm damage page?", a: "Yes. People search for help right after bad weather. A clear page on what to do first and how you help with insurance claims can bring in urgent work." },
      { q: "Do I need photos of my own jobs?", a: "They help a lot. Homeowners want to see your real work, and clear phone photos usually beat stock images. Start taking before-and-after shots on your next job." },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors & Construction",
    keyword: "website design for contractors",
    meta: {
      title: "Website Design for Contractors",
      description: "Websites for contractors and construction companies that show finished projects, build trust on big jobs and bring in better quote requests.",
    },
    card: "For builders and remodelers whose best sales tool is the work they've finished.",
    hero: {
      eyebrow: "Website design for contractors",
      headline: "Contractor websites that win bigger jobs.",
      headlineAccent: "bigger jobs.",
      subheadline: "Big jobs go to the company that looks most trustworthy, not the cheapest quote. We build sites where your finished work does the selling.",
      points: ["Project galleries that sell", "Better quote requests", "Hosting included"],
      image: { src: "/images/industries/contractors.webp", alt: "Rolled building plans, a tape measure and a hard hat on a timber table" },
    },
    pains: {
      headline: "Great builds that nobody gets to see.",
      items: [
        { icon: "image", title: "Your best work is hidden", body: "Finished projects sit on your phone or a Facebook page, where a homeowner comparing three contractors never sees them." },
        { icon: "users", title: "You get the wrong inquiries", body: "Your site doesn't say what you do or who you do it for, so you spend evenings pricing jobs you don't want." },
        { icon: "trendingDown", title: "Competitors look bigger", body: "A smaller company with a sharper website looks safer to hire, even when your work is better." },
      ],
    },
    included: {
      headline: "Built to win bigger, better jobs.",
      subheadline: "A big project is a big decision. Your site gives people the confidence to pick up the phone.",
      items: [
        { icon: "image", title: "Project galleries", body: "Real photos by project type, with before-and-after shots and a short story behind each job." },
        { icon: "badgeCheck", title: "Trust on big jobs", body: "Licenses, insurance, warranties and client reviews, right where people start to hesitate." },
        { icon: "search", title: "Quote forms that qualify", body: "A few smart questions on project type, budget and timing, so you know which calls to return first." },
        { icon: "mapPin", title: "The areas you work in", body: "Service pages and location pages, so you show up for jobs where you actually want to build." },
      ],
    },
    pages: {
      headline: "The pages a contractor site needs.",
      subheadline: "Built around the kind of work you want more of.",
      items: ["Home", "Remodeling", "New builds and additions", "Commercial projects", "Project gallery", "About your company", "Reviews", "Request a quote"],
    },
    extra: {
      title: "Keep the work coming in",
      body: "Big jobs take months to win. Our monthly Growth plans keep your projects on social media and your name in front of people between jobs.",
      link: { label: "See Growth plans", href: "/services/growth" },
    },
    related: ["home-renovation-contractor-website-design", "luxury-construction-company-website-design", "flooring-company-website-design"],
    faq: [
      { q: "What should a contractor website include?", a: "A gallery of real projects, clear pages for each service, your licenses and insurance, client reviews, the areas you work in, and a quote form that asks about project type and budget." },
      { q: "How do I get better leads from my contractor website?", a: "Say clearly what you do and who you do it for, show projects like the ones you want, and ask a few questions on your quote form. It filters out jobs that aren't a fit." },
      { q: "I don't have professional photos. Is that a problem?", a: "No. Clear, well-lit phone photos of real jobs usually beat stock photos. We can show you what to capture on your next project." },
      { q: "Can you build a website for a construction company?", a: "Yes, for both residential and commercial work. We'll build the site around your services, your projects and the type of client you want." },
    ],
  },
];

// /industries page copy
export const industriesPage = {
  meta: {
    title: "Website Design for Home Service Businesses",
    description: "Websites for plumbers, electricians, HVAC, roofers, pest control companies and contractors, built to bring in calls. See what we build for your trade.",
  },
  hero: {
    eyebrow: "Home service websites",
    headline: "Websites built for the trades.",
    headlineAccent: "for the trades.",
    subheadline: "Plumbers, HVAC companies, roofers and contractors all win work differently. Your website should reflect how people hire you.",
    primaryCta: { label: "Find your trade", href: "#trades" },
    secondaryCta: { label: "Book a free call", href: "/book-a-call" },
    points: ["Built around how you get hired", "Tap-to-call and quote forms", "Hosting included"],
    // Illustrative photo (AI-generated, no people) — swap for a real photo later.
    image: { src: "/images/industries/home-services.webp", alt: "A tidy workshop bench with hand tools, a phone and a green plant" },
  },
  grid: {
    eyebrow: "Your trade",
    headline: "Pick your trade.",
    cta: "See what we build",
    otherTitle: "Don't see your trade?",
    otherBody: "We also work with cleaning, landscaping and other home service companies. Tell us about your business and we'll show you what we'd build.",
    otherCta: { label: "Book a free call", href: "/book-a-call" },
  },
  // Shared wording on each trade page
  page: {
    primaryCta: { label: "Book a free call", href: "/book-a-call" },
    secondaryCta: { label: "See what's included", href: "#included" },
    painsEyebrow: "Sound familiar?",
    includedEyebrow: "What you get",
    pagesEyebrow: "Your pages",
    packages: { label: "See website packages", href: "/services/website-design#packages" },
    relatedEyebrow: "Our work",
    relatedHeadline: "Websites we've built for home service businesses.",
    relatedCta: { label: "See all our work", href: "/work" },
    faqEyebrow: "Questions",
    faqHeadline: "Common questions.",
    otherTrades: "Other trades we work with",
  },
};

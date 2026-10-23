// Blog posts (/blog and /blog/[slug]). Newest first — the first post is the
// featured one on /blog. To add a post: copy one object, change the slug
// (becomes the URL) and write the body as blocks.
//
// Body blocks: { type: "p" | "h2" | "h3", text } · { type: "ul" | "ol", items } · { type: "tip", text }
// Inline links anywhere in text, Markdown-style: "see [our plans](/pricing)".
//
// SEO: each post targets ONE main keyword (US first, UK second). Put it in the
// slug, the title, the first paragraph and at least one H2. Keyword research
// notes + ideas for next posts: content/blog/KEYWORDS.md.
// Starter drafts — review and edit before launch (see TODO.md).

export type BlogBlock =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "tip"; text: string };

export type BlogPost = {
  slug: string;
  /** On-page H1 */
  title: string;
  /** <title> tag — keep under ~60 characters, main keyword first */
  seoTitle: string;
  /** Meta description — keep under ~155 characters */
  metaDescription: string;
  /** Main keyword this post targets (for us, not shown) */
  keyword: string;
  /** Supporting keywords worked into H2s and copy */
  related: string[];
  excerpt: string;
  category: string;
  /** ISO dates, e.g. "2026-10-23" */
  date: string;
  updated: string;
  readTime: string;
  author: string;
  image: { src: string; alt: string };
  /** "Want this done for you?" box at the end of the post */
  cta: { title: string; body: string; label: string; href: string };
  body: BlogBlock[];
  /** Shown as an FAQ section + FAQPage structured data */
  faq: { q: string; a: string }[];
};

export const posts: BlogPost[] = [
  {
    slug: "missed-call-text-back",
    title: "Missed call text back: how small businesses stop losing leads",
    seoTitle: "Missed Call Text Back for Small Business: A Simple Guide",
    metaDescription: "What missed call text back is, how it works, and 5 simple ways small businesses can stop losing leads when they can't answer the phone.",
    keyword: "missed call text back",
    related: ["missed call text back for small business", "answering service for small business", "ai receptionist for small business", "how to get more calls for my business"],
    excerpt: "You can't answer every call while you're on a job. Here's how missed call text back and a few simple habits stop those leads going to a competitor.",
    category: "Getting leads",
    date: "2026-10-23",
    updated: "2026-10-23",
    readTime: "5 min read",
    author: "Websy Lime team",
    image: { src: "/images/blog/missed-calls.webp", alt: "A phone ringing on a workbench among tools, with nobody there to answer" },
    cta: {
      title: "Let your website answer for you",
      body: "WebsyChat replies to website visitors 24/7, takes their details and sends the lead straight to you.",
      label: "See WebsyChat",
      href: "/products/websychat",
    },
    body: [
      { type: "p", text: "You're under a sink, up a ladder or with a customer. The phone rings. By the time you call back, they've already booked someone else. For a busy small business, missed calls are one of the easiest ways to lose work — and one of the easiest problems to fix." },
      { type: "p", text: "This guide explains what **missed call text back** is, how it works, and the other simple options you have — from a better voicemail to an AI receptionist — so you can pick what fits your business and budget." },

      { type: "h2", text: "Why missed calls cost you jobs" },
      { type: "p", text: "When someone needs a plumber, electrician or cleaner today, they don't wait for a call back. They try the next business on Google. If nobody answers there either, they keep going until someone does. The first business to respond usually gets the job." },
      { type: "p", text: "That doesn't mean you need to answer every call live. It means every caller should hear back from you quickly — even when you're busy." },

      { type: "h2", text: "What is missed call text back?" },
      { type: "p", text: "Missed call text back is a simple automation: when you miss a call on your business number, the caller automatically gets a text message from you a few seconds later. Something like:" },
      { type: "tip", text: "\"Hi, this is Sam from Lakeside Plumbing — sorry we missed your call! We're on a job right now. What can we help you with? We'll get back to you shortly.\"" },
      { type: "p", text: "Most people reply to a text faster than they'd leave a voicemail. So instead of a dead end, the missed call turns into a conversation you can pick up between jobs." },

      { type: "h3", text: "How it works" },
      {
        type: "ol",
        items: [
          "A customer calls your business number and you can't pick up.",
          "Your phone system or app notices the missed call.",
          "It sends your pre-written text to the caller's mobile number.",
          "The customer replies by text, and you answer when you're free.",
        ],
      },
      { type: "p", text: "Many business phone apps and VoIP providers offer this as a feature, and there are standalone missed call text back services too. Check what your current phone provider includes before paying for something new." },

      { type: "h3", text: "Tips for a good missed call text" },
      {
        type: "ul",
        items: [
          "Use your business name so they know who's texting",
          "Say when you'll get back to them — and stick to it",
          "Ask one simple question, like \"What do you need help with?\"",
          "Add your website link so they can book or see your prices",
          "Keep it short and friendly — no sales pitch",
        ],
      },

      { type: "h2", text: "Other ways to stop missing leads" },
      { type: "p", text: "Text back is a great start, but it works best alongside a few other options. You don't need all of them — pick the ones that suit how your business runs." },

      { type: "h3", text: "1. A voicemail that actually helps" },
      { type: "p", text: "A short voicemail that says when you'll call back and points people to your website stops many callers hanging up and moving on. It's free and takes five minutes to record." },

      { type: "h3", text: "2. An answering service for small business" },
      { type: "p", text: "An answering service puts a real person on your line when you can't answer. They take messages, answer basic questions and sometimes book appointments. It costs more than automation, but some customers prefer a human voice — especially for urgent or high-value jobs." },

      { type: "h3", text: "3. An AI receptionist" },
      { type: "p", text: "An AI receptionist answers calls with a natural-sounding voice, asks what the caller needs and takes their details. It can work around the clock at a lower cost than a human service. Test it yourself first, and make sure callers can always reach a real person when they need to." },

      { type: "h3", text: "4. A website that answers questions" },
      { type: "p", text: "Not everyone wants to call. Plenty of people — especially in the evening — would rather send a quick message. Make that easy with a short contact form on every page, a \"Text us\" button on mobile, and online booking. A chat assistant like [WebsyChat](/products/websychat) can answer common questions (\"Do you cover my area?\", \"Are you open Saturday?\") and take the visitor's details for you, day or night." },

      { type: "h3", text: "5. Call back fast" },
      { type: "p", text: "Whatever tools you use, speed wins. Block a few minutes between jobs to return calls and messages. A quick \"Got your message, I can come by at 3pm\" often wins the job before a competitor even calls back." },

      { type: "h2", text: "Which option should you choose?" },
      {
        type: "ul",
        items: [
          "**Just starting out?** Record a better voicemail and turn on missed call text back.",
          "**Lots of calls you can't answer?** Add an answering service or AI receptionist.",
          "**Customers find you online?** Make sure your website captures leads 24/7 with forms, booking and chat.",
        ],
      },
      { type: "p", text: "If your website isn't bringing in calls or messages at all, start there — our guide to [why a website doesn't get leads](/blog/website-not-getting-leads) walks through the most common fixes." },

      { type: "h2", text: "Start with one change this week" },
      { type: "p", text: "You don't need a big new system. Turn on missed call text back, update your voicemail, and check that your website makes it easy to get in touch. Each small step means fewer lost jobs. If you'd like help setting any of this up, [book a free call](/book-a-call) and we'll talk it through." },
    ],
    faq: [
      { q: "What is missed call text back?", a: "It's an automation that sends a text message to anyone who calls your business and doesn't get an answer, so you can continue the conversation by text instead of losing the lead." },
      { q: "Is missed call text back worth it for a small business?", a: "For most service businesses, yes. It's usually low cost, it works around the clock, and it gives callers a quick reply when you can't pick up — which is when most leads are lost." },
      { q: "Do I need a special phone number for missed call text back?", a: "Usually you need a business line that supports it, such as a VoIP number or a business phone app. Many providers include it as a feature, so check your current plan first." },
      { q: "What's the difference between an answering service and an AI receptionist?", a: "An answering service uses real people to answer your calls. An AI receptionist uses software with a natural-sounding voice. AI is usually cheaper and always available; a human service can handle trickier calls." },
    ],
  },
  {
    slug: "how-to-get-more-google-reviews",
    title: "How to get more Google reviews for your business (without being pushy)",
    seoTitle: "How to Get More Google Reviews for Your Business",
    metaDescription: "How to get more Google reviews from happy customers: when to ask, what to say, a free review link and QR code, and what to avoid.",
    keyword: "how to get more google reviews",
    related: ["how to ask for google reviews", "google review link", "google review qr code", "what to say when asking for a google review", "ask for google review email template"],
    excerpt: "More Google reviews help you show up and win trust. Here's when to ask, exactly what to say, and how to make leaving a review take seconds.",
    category: "Local SEO",
    date: "2026-10-16",
    updated: "2026-10-23",
    readTime: "5 min read",
    author: "Websy Lime team",
    image: { src: "/images/blog/google-reviews.webp", alt: "A phone on a café counter showing a five-star review" },
    cta: {
      title: "Want us to handle your Google profile?",
      body: "Our All-in-One Growth plans keep your Google Business Profile updated and help you collect reviews every month.",
      label: "See Growth plans",
      href: "/services/growth",
    },
    body: [
      { type: "p", text: "When someone searches for a business like yours, one of the first things they see is your Google Business Profile — and your star rating. Recent, honest reviews help people trust you, and they're one of the things Google looks at when deciding which local businesses to show." },
      { type: "p", text: "The good news: most happy customers are glad to leave a review. They just forget, or don't know how. This guide shows you **how to get more Google reviews** with a simple routine — when to ask, what to say, and how to make it take seconds." },

      { type: "h2", text: "Why Google reviews matter" },
      {
        type: "ul",
        items: [
          "**Trust:** people read reviews before they call, book or visit.",
          "**Visibility:** reviews are part of how Google ranks businesses in local search and on Google Maps.",
          "**Feedback:** reviews tell you what customers love — and what to fix.",
        ],
      },

      { type: "h2", text: "How to ask for Google reviews" },
      { type: "p", text: "The biggest reason businesses don't get reviews is simple: they don't ask. Make asking part of how you finish every job." },

      { type: "h3", text: "Ask at the right moment" },
      { type: "p", text: "The best time to ask is right after a job goes well — when the customer says thank you, when you hand over the keys, or when you send the final invoice. They're happy, and the experience is fresh." },

      { type: "h3", text: "Ask in person, then follow up" },
      { type: "p", text: "A quick, friendly ask face to face works well. Then send a short text or email with your review link the same day, so they can do it in a few taps." },

      { type: "h2", text: "What to say when asking for a Google review" },
      { type: "p", text: "Keep it short, personal and easy. Here are three templates you can copy and change:" },
      { type: "h3", text: "In person" },
      { type: "tip", text: "\"Really glad we could help today! If you have a minute, a quick Google review would mean a lot to a small business like ours. I'll text you the link.\"" },
      { type: "h3", text: "Text message" },
      { type: "tip", text: "\"Hi Alex, thanks again for choosing us! If you were happy with the work, would you leave us a quick Google review? It only takes a minute: (your review link)\"" },
      { type: "h3", text: "Email template" },
      { type: "tip", text: "Subject: \"Thanks — how did we do?\" Body: \"Hi Alex, thank you for choosing us for your new boiler. If you have a moment, we'd love to hear how we did. Leaving a Google review helps other people find a business they can trust: (your review link). Thanks, Sam\"" },

      { type: "h2", text: "Get your Google review link" },
      { type: "p", text: "Don't make customers search for you. Google gives every business a short link that opens the review box directly." },
      {
        type: "ol",
        items: [
          "Sign in to your Google Business Profile.",
          "Find the option to ask for reviews (it may say \"Ask for reviews\" or \"Get more reviews\").",
          "Copy the short link Google gives you.",
          "Save it somewhere handy — your phone's notes, your email signature and your invoice template.",
        ],
      },

      { type: "h2", text: "Use a Google review QR code" },
      { type: "p", text: "A QR code lets customers leave a review by pointing their phone camera at it. Turn your review link into a QR code (many free generators can do this) and put it where customers see it:" },
      {
        type: "ul",
        items: [
          "On your counter or at the checkout",
          "On business cards, receipts and leave-behind flyers",
          "On the back of your invoices",
          "On a small sticker in your van or on your equipment",
        ],
      },

      { type: "h2", text: "Reply to every review" },
      { type: "p", text: "Thank people for good reviews, and reply calmly and helpfully to bad ones. Future customers read your replies too. A polite, solution-focused answer to a complaint can build more trust than a perfect score." },

      { type: "h2", text: "Make it a routine" },
      { type: "p", text: "A steady flow of reviews looks better than a burst once a year. Add \"ask for a review\" to your end-of-job checklist so it happens every time, and check in once a month to see how many new reviews you've had." },

      { type: "h2", text: "What not to do" },
      {
        type: "ul",
        items: [
          "Don't offer discounts, gifts or money in exchange for reviews — it's against Google's rules.",
          "Don't write reviews for yourself or ask friends and family to post fake ones.",
          "Don't only ask the customers you're sure will give five stars (this is called \"review gating\" and Google doesn't allow it).",
          "Don't send people through a confusing set of links — one tap to the review box is best.",
        ],
      },

      { type: "h2", text: "Next steps" },
      { type: "p", text: "Get your review link today, write one template you're comfortable with, and ask your next three happy customers. Reviews work even better when your website turns those visitors into calls — see our guide on [getting more leads from your website](/blog/website-not-getting-leads). And if you'd rather have it done for you, our [Growth plans](/services/growth) include Google profile updates every month." },
    ],
    faq: [
      { q: "How do I get more Google reviews for my business?", a: "Ask every happy customer right after the job, send them your direct Google review link by text or email, add a review QR code where customers can see it, and make asking part of your routine." },
      { q: "Can I pay or give discounts for Google reviews?", a: "No. Google doesn't allow offering money, discounts or gifts in exchange for reviews. Just ask honestly and make it easy." },
      { q: "Where do I find my Google review link?", a: "Sign in to your Google Business Profile and look for the option to ask for or get more reviews. Google gives you a short link you can copy and share." },
      { q: "Should I reply to negative Google reviews?", a: "Yes. Reply calmly, thank them for the feedback and offer to put things right. Other customers read your replies and judge how you handle problems." },
    ],
  },
  {
    slug: "website-not-getting-leads",
    title: "Website not getting leads? 7 fixes to get more leads from your website",
    seoTitle: "Website Not Getting Leads? 7 Fixes That Work",
    metaDescription: "Website not getting leads? Learn why visitors leave without calling, and 7 simple fixes to get more leads from your small business website.",
    keyword: "website not getting leads",
    related: ["how to get more leads from your website", "why is my website not converting", "why is my website not getting traffic", "when to redesign a website", "website conversion rate"],
    excerpt: "Visitors land on your site, look around and leave without calling. Here's why it happens — and 7 fixes to get more leads from your website.",
    category: "Websites",
    date: "2026-10-09",
    updated: "2026-10-23",
    readTime: "5 min read",
    author: "Websy Lime team",
    image: { src: "/images/blog/website-signs.webp", alt: "A laptop and phone on a desk showing a slow, cluttered website" },
    cta: {
      title: "Need a website that brings in calls?",
      body: "We build fast, mobile-friendly WordPress websites with hosting included — designed to turn visitors into leads.",
      label: "See website packages",
      href: "/services/website-design",
    },
    body: [
      { type: "p", text: "You have a website. People visit it. But the phone isn't ringing and the contact form is quiet. If your **website is not getting leads**, you're not alone — and the fix is often simpler than you think." },
      { type: "p", text: "This guide covers the two main reasons small business websites don't bring in work, and seven practical fixes to get more leads from your website." },

      { type: "h2", text: "First: is it a traffic problem or a conversion problem?" },
      { type: "p", text: "There are only two reasons a website doesn't produce leads:" },
      {
        type: "ul",
        items: [
          "**Not enough of the right people visit it** (a traffic problem).",
          "**People visit, but don't get in touch** (a conversion problem).",
        ],
      },
      { type: "p", text: "Free tools like Google Analytics and Google Search Console show how many people visit and what they searched for. If visits are very low, focus on getting found (fix 7). If people visit but leave, start with fixes 1–6." },

      { type: "h2", text: "Why is my website not converting?" },
      { type: "p", text: "Your conversion rate is the share of visitors who take an action — call, book, or send a message. When it's low, the cause is almost always one of the issues below." },

      { type: "h3", text: "1. It's hard to use on a phone" },
      { type: "p", text: "Most local customers find you on their phone. Open your site on yours: is the text easy to read without zooming? Can you tap buttons easily? Does your phone number start a call when tapped? If not, mobile visitors will give up quickly." },

      { type: "h3", text: "2. It loads too slowly" },
      { type: "p", text: "If a page is still loading after a few seconds, many people hit back and choose another result. Oversized images, too many plugins and cheap hosting are the usual causes." },
      { type: "tip", text: "Quick check: run your homepage through Google's free PageSpeed Insights tool. It shows what's slowing your site down and what to fix first." },

      { type: "h3", text: "3. Visitors can't tell what you do in five seconds" },
      { type: "p", text: "The top of your homepage should answer three questions straight away: what you do, where you do it, and how to get in touch. \"Welcome to our website\" doesn't help anyone decide. Try something like \"Emergency plumbing in Austin — same-day call-outs.\"" },

      { type: "h3", text: "4. There's no clear next step" },
      { type: "p", text: "Every page should have one obvious action — \"Call now\", \"Get a free quote\" or \"Book online\". Put it at the top of the page and repeat it further down. If visitors have to hunt for your phone number, many won't bother." },

      { type: "h3", text: "5. Your contact form asks too much" },
      { type: "p", text: "Long forms put people off. Ask only for what you need to reply: name, phone or email, and a short message. You can get the rest of the details on the call." },

      { type: "h3", text: "6. There's no proof you're good" },
      { type: "p", text: "People want to see that others trust you. Show real photos of your work, a few genuine reviews, and any licences or guarantees you offer. Our guide on [how to get more Google reviews](/blog/how-to-get-more-google-reviews) shows how to build that proof quickly." },

      { type: "h3", text: "7. People can't find you on Google" },
      { type: "p", text: "If hardly anyone visits, your site may not be showing up when people search. Make sure each service has its own page, each page has a clear title that says the service and area, and your Google Business Profile links to your website. Regular, helpful content and up-to-date business details help too." },

      { type: "h2", text: "Catch leads after hours" },
      { type: "p", text: "Lots of people browse in the evening, when you're not answering the phone. Give them a way to reach you anyway: a simple form, online booking, or a chat assistant like [WebsyChat](/products/websychat) that answers questions and takes their details. And when you do miss calls, [missed call text back](/blog/missed-call-text-back) keeps those leads warm." },

      { type: "h2", text: "When to redesign a website instead of fixing it" },
      { type: "p", text: "Small fixes go a long way. But a redesign is often quicker and cheaper than patching if your site:" },
      {
        type: "ul",
        items: [
          "Doesn't work properly on phones",
          "Is built on an old theme or platform you can't easily update",
          "Is slow even after removing big images and plugins",
          "No longer matches your services, prices or brand",
        ],
      },

      { type: "h2", text: "Your quick website checklist" },
      {
        type: "ol",
        items: [
          "Phone number and a \"Get a quote\" button at the top of every page",
          "A headline that says what you do and where",
          "Fast loading on mobile",
          "A short contact form (3–4 fields)",
          "Real photos and genuine reviews",
          "A page for each main service",
          "A way to reach you after hours",
        ],
      },
      { type: "p", text: "Tick these off and your website will do far more of the selling for you. If you'd like a second pair of eyes, [book a free call](/book-a-call) and we'll take a look at your site with you — or [start a project](/start-project) if you're ready for a new one." },
    ],
    faq: [
      { q: "Why is my website not getting leads?", a: "Usually it's either a traffic problem (not enough of the right people visit) or a conversion problem (people visit but don't get in touch). Slow loading, poor mobile design, unclear messaging and no clear call to action are the most common causes." },
      { q: "How can I get more leads from my website?", a: "Make it fast and easy to use on a phone, say clearly what you do and where, put a call or quote button on every page, keep your contact form short, show real reviews and photos, and give visitors a way to reach you after hours." },
      { q: "How do I know if my website needs a redesign?", a: "If it doesn't work well on phones, is slow even after basic fixes, runs on an outdated platform or no longer matches your services, a redesign is often quicker and cheaper than patching it." },
      { q: "What is a good website conversion rate?", a: "It varies a lot by industry and by what counts as a lead. Rather than chase a number, track your own rate over time and test changes like a clearer headline or a shorter form." },
    ],
  },
];

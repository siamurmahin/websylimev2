// Pages → privacy (/privacy) and terms (/terms).
// ⚠ Starter drafts in plain English — NOT legal advice. Have a lawyer review
// both before launch (see TODO.md). [Square brackets] = still to confirm.
//
// Body blocks: { type: "p", text } · { type: "ul", items }

export type LegalBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };
export type LegalSection = { id: string; title: string; body: LegalBlock[] };

// Shared bits
const company = "Websy Lime LLC";
const email = "hello@websylime.com";
const address = "117 S Lexington St, Ste 100, Harrisonville, MO 64701-2444";

export const legal = {
  // Shared hero photo for both pages (AI-generated, no faces)
  image: { src: "/images/legal-hero.webp", alt: "A tidy desk with printed documents, a pen, glasses and a plant" },
  updatedLabel: "Last updated",
  tocTitle: "On this page",
  summaryTitle: "The short version",
  questions: {
    title: "Questions about this page?",
    body: `Email us at ${email} and a real person will reply.`,
    cta: { label: "Contact us", href: "/contact" },
  },

  privacy: {
    meta: {
      title: "Privacy Policy",
      description: "How Websy Lime collects, uses and protects your personal information — in plain English.",
    },
    hero: {
      eyebrow: "Legal",
      headline: "Privacy Policy",
      headlineAccent: "Policy",
      subheadline: "What we collect, why we collect it, and how you stay in control. Written in plain English.",
      primaryCta: { label: "Read the policy", href: "#policy" },
      secondaryCta: { label: "Contact us", href: "/contact" },
      points: ["We never sell your data", "Only what we need", "Delete it anytime"],
    },
    updated: "November 8, 2026",
    summary: [
      "We only collect what you give us (like your name and email) and basic, anonymous site usage.",
      "We use it to reply to you, do the work you hire us for, and improve our website.",
      "We never sell your personal information.",
      "You can ask us to see, fix or delete your data at any time.",
    ],
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        body: [
          { type: "p", text: `This website is run by ${company} (“Websy Lime”, “we”, “us”). We're responsible for the personal information you share with us here. You can reach us at ${email} or ${address}.` },
        ],
      },
      {
        id: "what-we-collect",
        title: "What we collect",
        body: [
          { type: "p", text: "We collect information in two ways:" },
          {
            type: "ul",
            items: [
              "What you give us — your name, email, phone number, business details and message when you fill in a form (contact, start a project, careers, newsletter or waitlist), book a call, or chat with WebsyChat.",
              "What your browser tells us — basic technical data like your device, browser, pages visited and rough location (country or city), which our hosting provider records to keep the site running and secure.",
            ],
          },
          { type: "p", text: "We don't ask for sensitive information (like health or financial details) and we ask you not to send it to us." },
        ],
      },
      {
        id: "how-we-use",
        title: "How we use it",
        body: [
          {
            type: "ul",
            items: [
              "To reply to your questions and send you quotes",
              "To do the work you've hired us for and manage your account and invoices",
              "To send our newsletter or launch emails — only if you signed up, and you can unsubscribe anytime",
              "To understand how people use our website so we can improve it",
              "To keep our website and services secure, and to meet legal requirements",
            ],
          },
          { type: "p", text: "If you're in the UK or EU, our legal bases are: your consent (newsletter, cookies), performing a contract with you (client work), and our legitimate interest in running and improving our business." },
        ],
      },
      {
        id: "sharing",
        title: "Who we share it with",
        body: [
          { type: "p", text: "We never sell your personal information. We only share it with trusted services that help us run our business, and only what they need:" },
          {
            type: "ul",
            items: [
              "Website hosting — Hostinger",
              "Email — Hostinger",
              "Booking calls — Cal.com",
              "Messages — WhatsApp",
              "Payments and invoices — Stripe",
              "Client records — Google Sheets (Google)",
              "WebsyChat — our AI chat provider",
            ],
          },
          { type: "p", text: "We may also share information if the law requires it." },
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        body: [
          { type: "p", text: "We don't use advertising or tracking cookies. Your browser saves a few small settings on your device, like light or dark mode. If we add analytics later, we'll update this page first." },
          { type: "p", text: "You can block or delete cookies in your browser settings. The site will still work." },
        ],
      },
      {
        id: "how-long",
        title: "How long we keep it",
        body: [
          { type: "p", text: "We keep your information only as long as we need it: enquiries for up to 2 years, client records for as long as the law requires for tax and accounting (usually 7 years), and newsletter details until you unsubscribe." },
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        body: [
          { type: "p", text: "Wherever you live, you can ask us to:" },
          {
            type: "ul",
            items: [
              "Show you the personal information we hold about you",
              "Correct anything that's wrong",
              "Delete your information",
              "Stop using it for marketing",
              "Send you a copy in a common format",
            ],
          },
          { type: "p", text: `Just email ${email}. We'll reply within 30 days. If you're in the UK or EU, you can also complain to your local data protection authority (in the UK, the ICO). If you're in California or another US state with privacy laws, you have similar rights — and we don't sell or “share” personal information for targeted advertising.` },
        ],
      },
      {
        id: "security",
        title: "Keeping it safe",
        body: [
          { type: "p", text: "We use secure (HTTPS) connections, trusted providers and limited access to keep your information safe. Client records are kept in our own CRM, which only our team can access. No system is 100% secure, but we take reasonable steps to protect it." },
        ],
      },
      {
        id: "international",
        title: "International transfers",
        body: [
          { type: "p", text: "We're a US company and some of our providers are based in the US or elsewhere. When we move personal information from the UK or EU, we use providers that offer proper safeguards, such as standard contractual clauses." },
        ],
      },
      {
        id: "children",
        title: "Children",
        body: [{ type: "p", text: "Our services are for businesses. We don't knowingly collect information from anyone under 16." }],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [{ type: "p", text: "We may update this policy from time to time. We'll change the date at the top, and for big changes we'll let clients know by email." }],
      },
    ] as LegalSection[],
  },

  terms: {
    meta: {
      title: "Terms of Service",
      description: "The terms for working with Websy Lime — websites, monthly plans, design, WebsyChat, payments and ownership — in plain English.",
    },
    hero: {
      eyebrow: "Legal",
      headline: "Terms of Service",
      headlineAccent: "Service",
      subheadline: "The rules for working together — what we do, what you do, payments and ownership. Written in plain English.",
      primaryCta: { label: "Read the terms", href: "#policy" },
      secondaryCta: { label: "Contact us", href: "/contact" },
      points: ["Clear prices", "You own your website", "Cancel monthly plans anytime"],
    },
    updated: "November 8, 2026",
    summary: [
      "We agree the price and scope with you before we start.",
      "Once your website is paid for in full, it's yours.",
      "Monthly plans renew each month and you can cancel with 30 days' notice.",
      "If something goes wrong, talk to us first — we'll work to put it right.",
    ],
    sections: [
      {
        id: "about",
        title: "About these terms",
        body: [
          { type: "p", text: `These terms apply when you use our website or work with ${company} (“Websy Lime”, “we”, “us”). By hiring us or using our services, you agree to them. A signed proposal or order for your project can add to these terms — if they conflict, the proposal wins.` },
        ],
      },
      {
        id: "services",
        title: "Our services",
        body: [
          { type: "p", text: "We offer website design (on WordPress, Wix, Shopify or custom code such as Laravel and Node.js, with online stores on WooCommerce or Shopify), All-in-One Growth plans, graphic design plans, WebsyChat and, soon, video editing. Exactly what's included in your project or plan is listed in your proposal or on our pricing page." },
        ],
      },
      {
        id: "quotes-payments",
        title: "Quotes and payments",
        body: [
          {
            type: "ul",
            items: [
              "Quotes are valid for 30 days.",
              "Website projects: 50% deposit to start, the rest before launch. The deposit is non-refundable once paid.",
              "All-in-One Growth plans: pay the full month up front, or in two payments, the first on day one and the rest 15 days later.",
              "Monthly plans are billed in advance each month and renew automatically.",
              "Invoices are due within 7 days. We may pause work on overdue accounts.",
              "Prices are in USD and don't include any taxes that apply.",
            ],
          },
        ],
      },
      {
        id: "cancellation",
        title: "Monthly plans and cancelling",
        body: [
          { type: "p", text: "You can cancel a monthly plan anytime with 30 days' notice by emailing us. There's no long-term contract and no minimum term. We don't refund months that have already started. Graphic Design plans can be cancelled anytime, at least 7 days before the next billing date. Unused work (like designs or posts) doesn't roll over to the next month unless your plan says it does." },
        ],
      },
      {
        id: "your-part",
        title: "Your part",
        body: [
          {
            type: "ul",
            items: [
              "Send us the content, photos and access we need, on time",
              "Make sure you have the right to use anything you send us (logos, photos, text)",
              "Review and approve work within a reasonable time",
              "Keep your logins safe",
            ],
          },
          { type: "p", text: "If content or approvals are delayed, the timeline moves too." },
        ],
      },
      {
        id: "revisions",
        title: "Changes and revisions",
        body: [
          { type: "p", text: "Each project and plan includes the rounds of changes listed in your proposal or plan. Extra changes or new features outside the agreed scope are quoted separately before we start them." },
        ],
      },
      {
        id: "ownership",
        title: "Who owns what",
        body: [
          {
            type: "ul",
            items: [
              "Your website, content and designs become yours once paid in full.",
              "Your domain name is always yours.",
              "We keep ownership of our own tools, templates and know-how, and give you the right to use them as part of your site.",
              "Third-party items (like plugins, apps, themes, fonts or stock photos) stay under their own licences.",
              "We may show your project in our portfolio unless you ask us not to.",
            ],
          },
        ],
      },
      {
        id: "hosting",
        title: "Hosting",
        body: [
          { type: "p", text: "WordPress and standard custom-built websites include our shared hosting and SSL for the first 12 months. We don't sell hosting on its own. After that, hosting renews at $240 a year unless you move your site elsewhere — we'll help you move it if you want to. Sites on subscription platforms like Wix or Shopify run on the platform's own plan, which you pay directly with your own card. Larger custom apps (for example on Laravel or Node.js) with many features may need their own server, which you pay for separately; we'll tell you the cost before we start. We aim for reliable uptime but can't guarantee the site will never go down." },
        ],
      },
      {
        id: "websychat",
        title: "WebsyChat",
        body: [
          { type: "p", text: "WebsyChat uses AI to answer your visitors. It answers from your website and the information you give it, but it can make mistakes — you're responsible for checking what it tells your customers. Free trials last 7 days and take a card. Cancel before the trial ends and you're not charged. After that your plan starts automatically, renews until you cancel, and subscription fees aren't refunded. The full terms are in the WebsyChat billing policy at websychat.com/legal/billing." },
        ],
      },
      {
        id: "results",
        title: "Results",
        body: [
          { type: "p", text: "We work hard to get you more visitors, calls and customers, but we can't guarantee specific results — like a Google ranking, number of leads or reviews — because they depend on things outside our control." },
        ],
      },
      {
        id: "liability",
        title: "Limits of liability",
        body: [
          { type: "p", text: "To the extent the law allows, we're not liable for indirect losses (like lost profits or data), and our total liability for any claim is limited to the amount you paid us in the 3 months before the claim. Nothing in these terms limits liability that can't be limited by law." },
        ],
      },
      {
        id: "ending",
        title: "Ending our work together",
        body: [
          { type: "p", text: "Either of us can end the work if the other seriously breaks these terms and doesn't fix it within 14 days of being told. You pay for work done up to that point, and we hand over everything you've paid for." },
        ],
      },
      {
        id: "law",
        title: "Governing law",
        body: [
          { type: "p", text: "These terms are governed by the laws of the State of Missouri, USA. If there's a disagreement, we'll first try to sort it out together in good faith." },
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        body: [{ type: "p", text: "We may update these terms from time to time. We'll change the date at the top, and changes won't affect work already agreed." }],
      },
    ] as LegalSection[],
  },
};

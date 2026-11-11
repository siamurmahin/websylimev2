import { site } from "@/content/site";
import { industries } from "@/content/industries";
import { posts } from "@/content/blog/posts";
import { isPlaceholder } from "@/lib/copy";

/*
 * One plain, factual description of Websy Lime for AI agents, built from the same
 * content as the website (so prices and pages never drift):
 *   /llms.txt, the homepage as Markdown (Accept: text/markdown), and the MCP server.
 * Placeholders are skipped, so agents never repeat unconfirmed details.
 */

const abs = (path: string) => new URL(path, site.meta.url).toString();
const clean = (s: string) => s.replace(/\[([^\]]+)\]/g, "$1");
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export type AgentPlan = { name: string; price: string; billing: string; summary: string; url: string };
export type AgentService = { id: string; name: string; summary: string; url: string; plans: AgentPlan[]; status?: string };

export function agentServices(): AgentService[] {
  const s = site.services;
  return [
    {
      id: "website-design",
      name: "Website Design",
      summary: clean(s.websiteDesign.meta.description),
      url: abs("/services/website-design"),
      plans: site.pricingPage.website.plans.map((p) => ({
        name: p.name,
        price: p.price,
        billing: site.pricingPage.website.perLabel,
        summary: clean(p.tagline),
        url: abs(`/get-started?plan=${p.id}`),
      })),
    },
    {
      id: "growth",
      name: "All-in-One Growth (local SEO, content and social media)",
      summary: clean(s.growth.meta.description),
      url: abs("/services/growth"),
      plans: site.home.pricing.plans.map((p) => ({
        name: p.name,
        price: money(p.price),
        billing: "per month",
        summary: clean(p.tagline),
        url: abs(`/get-started?plan=${p.id}`),
      })),
    },
    {
      id: "graphic-design",
      name: "Graphic Design",
      summary: clean(s.graphicDesign.meta.description),
      url: abs("/services/graphic-design"),
      plans: s.graphicDesign.plans.items.map((p) => ({
        name: p.name,
        price: p.price,
        billing: "per month",
        summary: clean(p.tagline),
        url: abs(`/get-started?plan=${p.id}`),
      })),
    },
    {
      id: "websychat",
      name: "WebsyChat (AI website chat)",
      summary: clean(site.products.websychat.meta.description),
      url: abs("/products/websychat"),
      plans: site.products.websychat.plans.items.map((p) => ({
        name: p.name,
        price: p.price,
        billing: "per month",
        summary: clean(p.tagline),
        url: abs(`/products/websychat#${p.id}`),
      })),
    },
    {
      id: "video-editing",
      name: "Video Editing",
      summary: clean(s.videoEditing.meta.description),
      url: abs("/services/video-editing"),
      plans: [],
      status: "Coming soon (waitlist open)",
    },
  ];
}

export function agentContact() {
  const c = site.footer.contact;
  return {
    business: site.brand.name,
    legalName: site.brand.legalName,
    email: c.email,
    phone: c.phone.label,
    whatsapp: c.whatsapp.href,
    address: `${c.addressLabel}, ${c.address}`,
    hours: site.contact.hours.value,
    bookACall: abs("/book-a-call"),
    startAProject: abs("/start-project"),
    contactPage: abs("/contact"),
  };
}

const KEY_PAGES: [string, string, string][] = [
  ["Pricing", "/pricing", "All plans and prices on one page"],
  ["Our work", "/work", "Website case studies with results"],
  ["Home services", "/industries", "Websites for plumbers, electricians, pest control, HVAC, roofing and contractors"],
  ["Free website design", "/free-website-design", "We design a new homepage for 10 businesses a month, free"],
  ["Book a free call", "/book-a-call", "Pick a time for a free 30-minute call"],
  ["Start a project", "/start-project", "Tell us about your project"],
  ["FAQ", "/faq", "Answers about prices, timelines, hosting and payment"],
  ["About", "/about", "Who we are"],
  ["Contact", "/contact", "Email, phone and WhatsApp"],
  ["Blog", "/blog", "Plain-English guides for local businesses"],
];

/** The whole site summary as Markdown (llms.txt format: H1, quote, sections of links). */
export function agentMarkdown() {
  const c = agentContact();
  const lines: string[] = [];
  lines.push(`# ${site.brand.name}`, "");
  lines.push(`> ${clean(site.meta.description)}`, "");
  lines.push(
    `${site.brand.name} is a US web design and marketing agency for home service and local businesses (plumbers, electricians, pest control, HVAC, roofing, contractors). Websites usually go live in about 2 weeks. We reply within 12 hours on business days.`,
    "",
  );

  lines.push("## Services and prices", "");
  for (const s of agentServices()) {
    lines.push(`### [${s.name}](${s.url})`, "", s.summary, "");
    if (s.status) lines.push(`Status: ${s.status}`, "");
    for (const p of s.plans) lines.push(`- [${p.name}](${p.url}): ${p.price} ${p.billing}. ${p.summary}`);
    if (s.plans.length) lines.push("");
  }

  lines.push("## Key pages", "");
  for (const [name, path, note] of KEY_PAGES) lines.push(`- [${name}](${abs(path)}): ${note}`);
  lines.push("");

  lines.push("## Home service industries", "");
  for (const i of industries) lines.push(`- [${i.name}](${abs(`/industries/${i.slug}`)})`);
  lines.push("");

  lines.push("## Contact", "");
  lines.push(`- Email: ${c.email}`, `- Phone: ${c.phone}`, `- WhatsApp: ${c.whatsapp}`, `- Hours: ${c.hours}`, `- Address: ${c.address}`, `- Book a free call: ${c.bookACall}`, "");

  const faq = site.home.faq.items.filter((it) => !isPlaceholder(it.a));
  if (faq.length) {
    lines.push("## Frequently asked questions", "");
    for (const it of faq) lines.push(`- **${clean(it.q)}** ${clean(it.a)}`);
    lines.push("");
  }

  lines.push("## Optional", "");
  for (const p of posts.slice(0, 12)) lines.push(`- [${clean(p.title)}](${abs(`/blog/${p.slug}`)}): ${clean(p.excerpt)}`);
  lines.push("");
  return lines.join("\n");
}

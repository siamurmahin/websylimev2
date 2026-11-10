"use server";

import { headers } from "next/headers";
import { emails } from "@/content/shared/emails";
import { footer } from "@/content/shared/footer";

/*
 * Every form on the site sends through here, using Brevo (free plan):
 * - lead forms email the team at FORMS_TO_EMAIL, with the visitor as reply-to,
 *   and save a copy as a contact in the Brevo "Website leads" list (backup)
 * - newsletter and waitlist forms add the visitor to a Brevo contact list
 *
 * Settings (server only, never in git; see .env.example):
 *   BREVO_API_KEY           Brevo → SMTP & API → API keys
 *   FORMS_TO_EMAIL          where lead emails go (default hello@websylime.com)
 *   FORMS_FROM_EMAIL        a sender verified in Brevo (default hello@websylime.com)
 *   BREVO_NEWSLETTER_LIST   Brevo list id for the newsletter
 *   BREVO_DOI_TEMPLATE      Brevo template id of the newsletter confirm email (double opt-in)
 *   BREVO_WAITLIST_LIST     Brevo list id for the video editing waitlist
 *   BREVO_LEADS_LIST        Brevo list id for website leads (uses the LEAD_* contact attributes)
 *   BREVO_FOLLOWUP_LIST     Brevo list id that starts the Get Started follow-up emails
 *
 * Every visitor also gets an instant auto-reply (words in content/shared/emails.ts).
 *
 * Without BREVO_API_KEY: in development the submission is logged and treated as
 * sent, so the forms can be tested; in production the form shows its error.
 */

export type FormKind = "contact" | "start-project" | "get-started" | "free-design" | "careers" | "newsletter" | "waitlist";
export type FormResult = { ok: boolean };

const LEADS: Record<string, string> = {
  contact: "Contact message",
  "start-project": "Project request",
  "get-started": "Get Started (plan chosen)",
  "free-design": "Free design application",
  careers: "Job application",
};
const LISTS = new Set(["newsletter", "waitlist"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API = "https://api.brevo.com/v3";

// A few submissions per minute per visitor is plenty; more is a bot.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 6;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function brevo(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "api-key": process.env.BREVO_API_KEY!, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) console.error(`Brevo ${path} failed: ${res.status} ${await res.text().catch(() => "")}`);
  return res.ok;
}

type ReplyKind = keyof typeof emails.replies;

// Someone may pick a website plan today and a marketing plan two days later. Keep every
// plan they chose ("Local Pro ($1,999 …) + Lead Growth (…)") instead of overwriting the
// first one, so the team and the follow-up emails see the full picture.
async function mergePlans(email: string, plan: string) {
  if (!plan) return "";
  const res = await fetch(`${API}/contacts/${encodeURIComponent(email)}`, {
    headers: { "api-key": process.env.BREVO_API_KEY!, accept: "application/json" },
    cache: "no-store",
  }).catch(() => null);
  const before: string = res?.ok ? ((await res.json())?.attributes?.LEAD_PLAN ?? "") : "";
  const plans = before ? before.split(" + ") : [];
  const key = (p: string) => p.split(" (")[0].trim().toLowerCase();
  if (!plans.some((p) => key(p) === key(plan))) plans.push(plan);
  return plans.join(" + ").slice(0, 500);
}

// The instant "we got it" email to the visitor. Plain, personal, with the call link
// and WhatsApp for anything urgent. Replies go to our inbox.
function autoReply(kind: ReplyKind, to: string, name: string, plan: string, from: string, replyTo: string) {
  const r = emails.replies[kind];
  const { links } = emails;
  const fill = (s: string) => s.replaceAll("{name}", name || "there").replaceAll("{plan}", plan || "your");
  const paras = r.body.map(fill);
  const p = (s: string) =>
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1a1a1a">${escape(s).replace(/\n/g, "<br>")}</p>`;
  const button = r.book
    ? `<p style="margin:8px 0 24px"><a href="${links.bookCall}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:8px">${escape(emails.bookLabel)}</a></p>`
    : "";
  const html = `<!doctype html><html><body style="margin:0;background:#f6f6f4;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:32px 28px">
${paras.map(p).join("\n")}${button}
${p(`${emails.urgent}`).replace("</p>", ` <a href="${links.whatsapp}" style="color:#1a1a1a;font-weight:600">${escape(links.whatsappLabel)}</a></p>`)}
${p(`— ${emails.signOff}`)}
</div>
<p style="max-width:560px;margin:16px auto 0;font-size:12px;line-height:1.5;color:#777;text-align:center">${escape(footer.contact.addressLabel)} · ${escape(footer.contact.address)}<br><a href="${links.site}" style="color:#777">websylime.com</a></p>
</body></html>`;
  const text = [
    ...paras,
    ...(r.book ? [`${emails.bookLabel}: ${links.bookCall}`] : []),
    `${emails.urgent} ${links.whatsapp}`,
    `— ${emails.signOff}`,
    `${footer.contact.addressLabel}, ${footer.contact.address}`,
  ].join("\n\n");
  return brevo("/smtp/email", {
    sender: { email: from, name: "Websy Lime" },
    to: [{ email: to, ...(name ? { name } : {}) }],
    replyTo: { email: replyTo, name: "Websy Lime" },
    subject: fill(r.subject),
    htmlContent: html,
    textContent: text,
    tags: ["auto-reply", kind],
  });
}

export async function submitForm(input: { form: FormKind; fields: Record<string, string>; trap?: string }): Promise<FormResult> {
  const { form, trap } = input ?? {};
  // Bots fill in the hidden field; pretend it worked and drop it.
  if (trap) return { ok: true };
  if (!(form in LEADS) && !LISTS.has(form)) return { ok: false };

  // Untrusted input: strings only, a sane number and size
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(input.fields ?? {}).slice(0, 20)) {
    if (typeof v === "string" && v.trim()) fields[k.slice(0, 40)] = v.trim().slice(0, 5000);
  }
  const email = fields.email ?? "";
  if (!EMAIL.test(email)) return { ok: false };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "local";
  if (tooMany(ip)) return { ok: false };

  if (!process.env.BREVO_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[forms] ${form} (not sent: no BREVO_API_KEY)`, fields);
      return { ok: true };
    }
    console.error("[forms] BREVO_API_KEY is not set");
    return { ok: false };
  }

  const from = process.env.FORMS_FROM_EMAIL || "hello@websylime.com";
  const to = process.env.FORMS_TO_EMAIL || "hello@websylime.com";

  // Newsletter: double opt-in. Brevo emails a confirm link; the contact joins the list
  // (and gets the welcome email) only after clicking it. Keeps bots and typos off the list.
  const doiTemplate = Number(process.env.BREVO_DOI_TEMPLATE);
  if (form === "newsletter" && doiTemplate) {
    const list = Number(process.env.BREVO_NEWSLETTER_LIST);
    const ok = await brevo("/contacts/doubleOptinConfirmation", {
      email,
      includeListIds: [list],
      templateId: doiTemplate,
      redirectionUrl: `${emails.links.site}/newsletter-confirmed`,
    });
    return { ok };
  }

  if (LISTS.has(form)) {
    const list = Number(form === "newsletter" ? process.env.BREVO_NEWSLETTER_LIST : process.env.BREVO_WAITLIST_LIST);
    const ok = await brevo("/contacts", { email, updateEnabled: true, ...(list ? { listIds: [list] } : {}) });
    // The waitlist also tells the team which videos they want
    if (ok && form === "waitlist" && fields.types) {
      await brevo("/smtp/email", {
        sender: { email: from, name: "Websy Lime website" },
        to: [{ email: to }],
        subject: `New video waitlist sign-up: ${email}`,
        textContent: `${email} joined the video editing waitlist.\nInterested in: ${fields.types}`,
      });
    }
    if (ok && form === "waitlist") await autoReply("waitlist", email, "", "", from, to);
    return { ok };
  }

  const label = LEADS[form];
  const name = fields.name || email;
  const [firstName, ...rest] = name === email ? [""] : name.split(" ");
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${escape(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`)
    .join("");
  const leadsList = Number(process.env.BREVO_LEADS_LIST);
  // Get Started leads also join the follow-up list, which starts the Brevo follow-up emails
  const followUpList = form === "get-started" ? Number(process.env.BREVO_FOLLOWUP_LIST) : 0;
  const details = [
    fields.website && `Website: ${fields.website}`,
    fields.budget && `Budget: ${fields.budget}`,
    fields.areas && `Skills: ${fields.areas}`,
    fields.link && `Portfolio: ${fields.link}`,
    fields.message || fields.about,
  ]
    .filter(Boolean)
    .join(" | ");
  const plan = leadsList ? await mergePlans(email, fields.plan || [fields.service, fields.package].filter(Boolean).join(" / ")) : "";
  // Only send attributes this form filled in, so a later form doesn't wipe earlier details
  const attributes = Object.fromEntries(
    Object.entries({
      FIRSTNAME: firstName,
      LASTNAME: firstName ? rest.join(" ") : "",
      LEAD_FORM: label,
      LEAD_PLAN: plan,
      LEAD_PHONE: fields.phone ?? "",
      LEAD_BUSINESS: fields.business ?? "",
      LEAD_MESSAGE: details.slice(0, 1000),
    }).filter(([, v]) => v),
  );
  // The email and the backup run together; the lead is safe if either works.
  const [sent, saved] = await Promise.all([
    brevo("/smtp/email", {
      sender: { email: from, name: "Websy Lime website" },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `[Websy Lime] ${label} from ${name}`,
      htmlContent: `<p><strong>${escape(label)}</strong> from the website. Reply to this email to answer ${escape(name)}.</p><table>${rows}</table>`,
      textContent: `${label}\n\n${Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
    }),
    leadsList
      ? brevo("/contacts", {
          email,
          updateEnabled: true,
          listIds: followUpList ? [leadsList, followUpList] : [leadsList],
          attributes,
        })
      : Promise.resolve(false),
  ]);
  const ok = sent || saved;
  if (ok) await autoReply(form as ReplyKind, email, firstName, (fields.plan ?? "").split(" (")[0], from, to);
  return { ok };
}

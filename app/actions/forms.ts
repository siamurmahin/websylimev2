"use server";

import { headers } from "next/headers";

/*
 * Every form on the site sends through here, using Brevo (free plan):
 * - lead forms email the team at FORMS_TO_EMAIL, with the visitor as reply-to
 * - newsletter and waitlist forms add the visitor to a Brevo contact list
 *
 * Settings (server only, never in git; see .env.example):
 *   BREVO_API_KEY           Brevo → SMTP & API → API keys
 *   FORMS_TO_EMAIL          where lead emails go (default hello@websylime.com)
 *   FORMS_FROM_EMAIL        a sender verified in Brevo (default hello@websylime.com)
 *   BREVO_NEWSLETTER_LIST   Brevo list id for the newsletter
 *   BREVO_WAITLIST_LIST     Brevo list id for the video editing waitlist
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
    return { ok };
  }

  const label = LEADS[form];
  const name = fields.name || email;
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${escape(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`)
    .join("");
  const ok = await brevo("/smtp/email", {
    sender: { email: from, name: "Websy Lime website" },
    to: [{ email: to }],
    replyTo: { email, name },
    subject: `[Websy Lime] ${label} from ${name}`,
    htmlContent: `<p><strong>${escape(label)}</strong> from the website. Reply to this email to answer ${escape(name)}.</p><table>${rows}</table>`,
    textContent: `${label}\n\n${Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
  });
  return { ok };
}

import { createHmac, timingSafeEqual } from "node:crypto";

/*
 * Cal.com calls this when someone books a call (Cal.com → Settings → Developer →
 * Webhooks → https://www.websylime.com/api/cal, event "Booking created", with a secret).
 *
 * We move the person into the Brevo "Booked or talking" list and out of the
 * Get Started follow-up list, so the follow-up emails stop once they've booked.
 *
 * Settings (server only, see .env.example):
 *   CAL_WEBHOOK_SECRET    the secret typed into the Cal.com webhook
 *   BREVO_BOOKED_LIST     Brevo list id for people who booked or are talking to us
 *   BREVO_FOLLOWUP_LIST   Brevo list id that runs the Get Started follow-up emails
 */

const API = "https://api.brevo.com/v3";

function validSignature(body: string, signature: string | null) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function brevo(method: string, path: string, body: unknown) {
  return fetch(`${API}${path}`, {
    method,
    headers: { "api-key": process.env.BREVO_API_KEY!, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  if (!validSignature(body, request.headers.get("x-cal-signature-256"))) {
    return Response.json({ ok: false }, { status: 401 });
  }

  let event: { triggerEvent?: string; payload?: { attendees?: { email?: string; name?: string }[] } };
  try {
    event = JSON.parse(body);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (event.triggerEvent !== "BOOKING_CREATED" || !process.env.BREVO_API_KEY) return Response.json({ ok: true });

  const booked = Number(process.env.BREVO_BOOKED_LIST);
  const followUp = Number(process.env.BREVO_FOLLOWUP_LIST);
  for (const a of event.payload?.attendees ?? []) {
    const email = a.email?.trim().toLowerCase();
    if (!email) continue;
    // Existing contact: add to "booked", remove from follow-up. New contact: create it.
    const res = await brevo("PUT", `/contacts/${encodeURIComponent(email)}`, {
      ...(booked ? { listIds: [booked] } : {}),
      ...(followUp ? { unlinkListIds: [followUp] } : {}),
    });
    if (res.status === 404) {
      await brevo("POST", "/contacts", { email, updateEnabled: true, ...(booked ? { listIds: [booked] } : {}) });
    } else if (!res.ok) {
      console.error(`[cal] Brevo update failed for a booking: ${res.status} ${await res.text().catch(() => "")}`);
    }
  }
  return Response.json({ ok: true });
}

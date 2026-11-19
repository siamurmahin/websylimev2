"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { tampa } from "@/content/pages/tampa";
import { submitForm } from "@/app/actions/forms";
import { Trap } from "@/components/forms/Trap";
import { cn } from "@/lib/utils";

const f = tampa.form;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const empty = { name: "", business: "", trade: "", phone: "", email: "", gbp: "", area: "" };
type Key = keyof typeof empty;

// Light card on the off-white section, always (the page doesn't follow the site's dark mode)
const inputCls =
  "h-14 w-full rounded-xl border border-[#182D01]/15 bg-white px-4 text-base text-[#0b0d09] outline-none transition-[border-color,box-shadow] placeholder:text-[#0b0d09]/40 focus-visible:border-[#182D01] focus-visible:ring-4 focus-visible:ring-[#B8DD38]/60";
const errorCls = "border-rose-600 focus-visible:ring-rose-600/25";

type Tracking = Record<"source" | "utm_source" | "utm_medium" | "utm_campaign", string>;

/** Free Map Pack Review Audit request: one short step, inline thank-you. */
export function AuditForm() {
  const [v, setV] = useState(empty);
  const [sms, setSms] = useState(false);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [track, setTrack] = useState<Tracking>({ source: "pdf", utm_source: "", utm_medium: "", utm_campaign: "" });
  const trap = useRef<HTMLInputElement>(null);
  const done = useRef<HTMLDivElement>(null);

  // ?source= (default "pdf") and UTM tags from the QR code link
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const get = (k: string) => (q.get(k) ?? "").slice(0, 100);
    setTrack({ source: get("source") || "pdf", utm_source: get("utm_source"), utm_medium: get("utm_medium"), utm_campaign: get("utm_campaign") });
  }, []);

  useEffect(() => {
    if (sent) done.current?.focus();
  }, [sent]);

  const bad = {
    name: v.name.trim() === "",
    business: v.business.trim() === "",
    trade: v.trade === "",
    phone: v.phone.replace(/\D/g, "").length < 10,
    email: !EMAIL.test(v.email.trim()),
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(bad).some(Boolean)) {
      setTried(true);
      const first = (Object.keys(bad) as (keyof typeof bad)[]).find((k) => bad[k]);
      document.getElementById(`ta-${first}`)?.focus();
      return;
    }
    if (sending) return;
    setSending(true);
    setFailed(false);
    const res = await submitForm({
      form: "tampa-audit",
      fields: { ...v, sms_ok: sms ? "yes" : "no", ...track, promo_code: tampa.promoCode, plan: "Map Pack Review Audit" },
      trap: trap.current?.value,
    });
    setSending(false);
    if (!res.ok) return setFailed(true);
    setSent(true);
    // Conversion event, picked up by whichever analytics tag is installed (none yet)
    const w = window as typeof window & { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
    w.gtag?.("event", "audit_request", { trade: v.trade, source: track.source });
    w.dataLayer?.push({ event: "audit_request", trade: v.trade, source: track.source });
  };

  if (sent) {
    return (
      <div ref={done} tabIndex={-1} role="status" className="rounded-[2rem] border border-[#182D01]/10 bg-white p-8 text-center outline-none sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#B8DD38] text-[#182D01]">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.03em] text-balance text-[#182D01] sm:text-3xl">{f.success.title}</h3>
        <p className="mx-auto mt-3 max-w-sm text-[#0b0d09]/70">{f.success.body}</p>
      </div>
    );
  }

  const label = (key: Key, id: string) => {
    const meta = f.fields[key];
    return (
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[#182D01]">
        {meta.label}
        {"error" in meta ? (
          <span aria-hidden className="text-rose-700"> *</span>
        ) : (
          <span className="ml-1 font-normal text-[#0b0d09]/55">({f.optional})</span>
        )}
      </label>
    );
  };

  const errorFor = (key: Key) => {
    const meta = f.fields[key];
    return key in bad && tried && bad[key as keyof typeof bad] && "error" in meta ? meta.error : undefined;
  };

  const errorText = (id: string, error?: string) =>
    error ? (
      <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-rose-700">
        {error}
      </p>
    ) : null;

  const field = (key: Exclude<Key, "trade">, type = "text", autoComplete?: string, inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]) => {
    const meta = f.fields[key];
    const error = errorFor(key);
    const id = `ta-${key}`;
    return (
      <div>
        {label(key, id)}
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          required={"error" in meta}
          value={v[key]}
          onChange={(e) => setV({ ...v, [key]: e.target.value })}
          placeholder={meta.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(inputCls, error && errorCls)}
        />
        {errorText(id, error)}
      </div>
    );
  };

  const tradeError = errorFor("trade");

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative grid grid-cols-1 gap-5 rounded-[2rem] border border-[#182D01]/10 bg-white p-5 shadow-[0_30px_70px_-45px_rgb(24_45_1/0.45)] sm:grid-cols-2 sm:p-8"
    >
      {field("name", "text", "name")}
      {field("business", "text", "organization")}

      <fieldset className="sm:col-span-2" aria-describedby={tradeError ? "ta-trade-error" : undefined}>
        <legend className="mb-1.5 block text-sm font-semibold text-[#182D01]">
          {f.fields.trade.label}
          <span aria-hidden className="text-rose-700"> *</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {f.trades.map((t, i) => (
            <label
              key={t}
              className={cn(
                "flex h-14 cursor-pointer items-center justify-center rounded-xl border bg-white px-3 text-base font-semibold text-[#182D01] transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#B8DD38]/60",
                v.trade === t ? "border-[#182D01] bg-[#B8DD38]" : "border-[#182D01]/15 hover:border-[#182D01]/40",
                tradeError && v.trade !== t && "border-rose-600",
              )}
            >
              <input
                id={i === 0 ? "ta-trade" : undefined}
                type="radio"
                name="trade"
                value={t}
                checked={v.trade === t}
                onChange={() => setV({ ...v, trade: t })}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
        {errorText("ta-trade", tradeError)}
      </fieldset>

      {field("phone", "tel", "tel", "tel")}
      {field("email", "email", "email", "email")}
      <div className="sm:col-span-2">{field("gbp", "url", "url", "url")}</div>
      <div className="sm:col-span-2">{field("area", "text", "address-level2")}</div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl p-1 text-sm leading-relaxed text-[#0b0d09]/75 sm:col-span-2">
        <input
          type="checkbox"
          checked={sms}
          onChange={(e) => setSms(e.target.checked)}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#182D01] outline-none focus-visible:ring-4 focus-visible:ring-[#B8DD38]/60"
        />
        <span>{f.sms}</span>
      </label>

      <Trap ref={trap} />

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#182D01] px-6 text-base font-semibold text-white outline-none transition-[background-color] hover:bg-[#223f02] focus-visible:ring-4 focus-visible:ring-[#B8DD38] disabled:opacity-60"
        >
          {sending ? f.sending : f.submit}
          <ArrowRight className="size-5 text-[#B8DD38] transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </button>
        {failed && (
          <p role="alert" className="mt-3 text-sm font-medium text-rose-700">
            {f.error}{" "}
            <a href={`mailto:${tampa.footer.email}`} className="underline underline-offset-4">
              {tampa.footer.email}
            </a>
            .
          </p>
        )}
        <p className="mt-4 text-center text-sm text-[#0b0d09]/65">
          {f.call.prompt}{" "}
          <Link href={f.call.href} className="rounded-sm font-semibold text-[#182D01] underline underline-offset-4 outline-none focus-visible:ring-4 focus-visible:ring-[#B8DD38]/60">
            {f.call.label}
          </Link>
        </p>
      </div>
    </form>
  );
}

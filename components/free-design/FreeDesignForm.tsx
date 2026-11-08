"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { submitForm } from "@/app/actions/forms";
import { SendError, Trap } from "@/components/forms/Trap";

const f = site.freeDesign.form;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const empty = { name: "", business: "", email: "", phone: "", website: "", about: "" };
type Key = keyof typeof empty;

const inputCls =
  "h-12 w-full rounded-xl border bg-background px-4 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-lime focus-visible:ring-3 focus-visible:ring-lime/25";
const errorCls = "border-rose-500 focus-visible:ring-rose-500/25";

/**
 * Free design application: one short step.
 * TODO.md: submissions aren't sent anywhere yet. Connect email before launch.
 */
export function FreeDesignForm() {
  const [v, setV] = useState(empty);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const trap = useRef<HTMLInputElement>(null);

  const bad = {
    name: v.name.trim() === "",
    business: v.business.trim() === "",
    email: !EMAIL.test(v.email.trim()),
    about: v.about.trim() === "",
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(bad).some(Boolean)) return setTried(true);
    if (sending) return;
    setSending(true);
    setFailed(false);
    const res = await submitForm({ form: "free-design", fields: v, trap: trap.current?.value });
    setSending(false);
    if (res.ok) setSent(true);
    else setFailed(true);
  };

  if (sent) {
    const first = v.name.trim().split(" ")[0];
    return (
      <div role="status" className="rounded-[2rem] border bg-surface p-8 text-center sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime text-ink">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em] text-balance">{f.success.title.replace("{name}", first)}</h3>
        <p className="mx-auto mt-3 max-w-sm text-muted-foreground">{f.success.body}</p>
        <button
          type="button"
          onClick={() => {
            setV(empty);
            setTried(false);
            setSent(false);
          }}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full border bg-background px-6 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {f.success.again}
        </button>
      </div>
    );
  }

  const field = (key: Key, type = "text", autoComplete?: string) => {
    const meta = f.fields[key];
    const error = key in bad && tried && bad[key as keyof typeof bad] && "error" in meta ? meta.error : undefined;
    const id = `fd-${key}`;
    const required = "error" in meta;
    return (
      <div className={key === "about" ? "sm:col-span-2" : undefined}>
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
          {meta.label}
          {!required && <span className="ml-1 font-normal text-muted-foreground">({f.optional})</span>}
        </label>
        {key === "about" ? (
          <textarea
            id={id}
            rows={4}
            required
            value={v[key]}
            onChange={(e) => setV({ ...v, [key]: e.target.value })}
            placeholder={meta.placeholder}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(inputCls, "h-auto resize-none py-3", error && errorCls)}
          />
        ) : (
          <input
            id={id}
            type={type}
            autoComplete={autoComplete}
            required={required}
            value={v[key]}
            onChange={(e) => setV({ ...v, [key]: e.target.value })}
            placeholder={meta.placeholder}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(inputCls, error && errorCls)}
          />
        )}
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid grid-cols-1 gap-4 rounded-[2rem] border bg-surface p-5 shadow-[0_30px_70px_-45px_rgb(0_0_0/0.35)] sm:grid-cols-2 sm:p-8 dark:shadow-none">
      {field("name", "text", "name")}
      {field("business", "text", "organization")}
      {field("email", "email", "email")}
      {field("phone", "tel", "tel")}
      <div className="sm:col-span-2">{field("website", "text", "url")}</div>
      {field("about")}
      <Trap ref={trap} />
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-6 disabled:opacity-60 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {sending ? "Sending…" : f.submit}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </button>
        <SendError show={failed} />
        <p className="mt-3 text-center text-sm text-muted-foreground">{f.note}</p>
      </div>
    </form>
  );
}

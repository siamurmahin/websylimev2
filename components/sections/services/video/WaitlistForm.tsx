"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const f = site.services.videoEditing.waitlist.form;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Video Editing waitlist: one email field + optional interest chips.
 * TODO.md: sign-ups aren't saved anywhere yet — connect the newsletter/email tool before launch.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const ok = EMAIL.test(email.trim());

  const toggle = (t: string) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ok) return setTried(true);
    setSent(true); // TODO: send to newsletter / email tool
  };

  if (sent)
    return (
      <div role="status" className="flex items-start gap-4 rounded-[1.5rem] border bg-background p-6">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-ink">
          <CheckCircle2 className="size-5" aria-hidden />
        </span>
        <div>
          <p className="font-display text-xl font-bold tracking-[-0.02em]">{f.success.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{f.success.body}</p>
        </div>
      </div>
    );

  const err = tried && !ok;
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="wl-email" className="mb-1.5 block text-sm font-semibold">
        {f.email.label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="wl-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={f.email.placeholder}
          aria-invalid={err || undefined}
          aria-describedby={err ? "wl-email-error" : undefined}
          className={cn(
            "h-12 w-full flex-1 rounded-full border bg-background px-5 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-lime focus-visible:ring-3 focus-visible:ring-lime/25",
            err && "border-rose-500 focus-visible:ring-rose-500/25",
          )}
        />
        <button
          type="submit"
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
        >
          {f.submit}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </button>
      </div>
      {err && (
        <p id="wl-email-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
          {f.email.error}
        </p>
      )}

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-semibold">{f.typesTitle}</legend>
        <div className="flex flex-wrap gap-2">
          {f.types.map((t) => {
            const on = types.includes(t);
            return (
              <label
                key={t}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                  on ? "border-lime bg-lime text-ink" : "bg-background hover:border-lime",
                )}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(t)} />
                {t}
              </label>
            );
          })}
        </div>
      </fieldset>
      <p className="mt-5 text-xs text-muted-foreground">{f.note}</p>
    </form>
  );
}

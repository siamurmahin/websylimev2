"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const f = site.careers.form;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "h-12 w-full rounded-xl border bg-background px-4 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-lime focus-visible:ring-3 focus-visible:ring-lime/25";
const errCls = "border-rose-500 focus-visible:ring-rose-500/25";

/**
 * Careers application: one short step — name, email, what you do, portfolio
 * link and a few lines. TODO.md: applications aren't sent anywhere yet.
 */
export function ApplyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const nameOk = name.trim() !== "";
  const emailOk = EMAIL.test(email.trim());
  const messageOk = message.trim() !== "";
  const fl = f.fields;

  const toggle = (a: string) => setAreas((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(nameOk && emailOk && messageOk)) return setTried(true);
    setSent(true); // TODO: send to email / hiring inbox
  };

  if (sent) {
    const first = name.trim().split(" ")[0];
    return (
      <div role="status" className="rounded-[2rem] border bg-surface p-8 text-center sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime text-ink">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em]">{f.success.title.replace("{name}", first)}</h3>
        <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
          <Copy text={f.success.body} />
        </p>
        <button
          type="button"
          onClick={() => {
            setName("");
            setEmail("");
            setAreas([]);
            setLink("");
            setMessage("");
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

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 rounded-[2rem] border bg-surface p-5 shadow-[0_30px_70px_-45px_rgb(0_0_0/0.35)] sm:grid-cols-2 sm:p-8 dark:shadow-none">
      <Field id="ap-name" label={fl.name.label} error={tried && !nameOk ? fl.name.error : undefined}>
        <input
          id="ap-name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={fl.name.placeholder}
          aria-invalid={(tried && !nameOk) || undefined}
          aria-describedby={tried && !nameOk ? "ap-name-error" : undefined}
          className={cn(inputCls, tried && !nameOk && errCls)}
        />
      </Field>
      <Field id="ap-email" label={fl.email.label} error={tried && !emailOk ? fl.email.error : undefined}>
        <input
          id="ap-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={fl.email.placeholder}
          aria-invalid={(tried && !emailOk) || undefined}
          aria-describedby={tried && !emailOk ? "ap-email-error" : undefined}
          className={cn(inputCls, tried && !emailOk && errCls)}
        />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-semibold">
          {f.areaTitle} <span className="font-normal text-muted-foreground">({f.optional})</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {f.areas.map((a) => {
            const on = areas.includes(a);
            return (
              <label
                key={a}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                  on ? "border-lime bg-lime text-ink" : "bg-background hover:border-lime",
                )}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(a)} />
                {a}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field id="ap-link" label={fl.link.label} optional className="sm:col-span-2">
        <input id="ap-link" type="url" inputMode="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder={fl.link.placeholder} className={inputCls} />
      </Field>

      <Field id="ap-message" label={fl.message.label} error={tried && !messageOk ? fl.message.error : undefined} className="sm:col-span-2">
        <textarea
          id="ap-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={fl.message.placeholder}
          aria-invalid={(tried && !messageOk) || undefined}
          aria-describedby={tried && !messageOk ? "ap-message-error" : undefined}
          className={cn(inputCls, "h-auto resize-none py-3", tried && !messageOk && errCls)}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground sm:order-2 sm:max-w-xs sm:text-right">{f.note}</p>
        <button
          type="submit"
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50 sm:w-auto"
        >
          {f.submit}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-foreground">({f.optional})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

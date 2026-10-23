"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarDays, CheckCircle2, Info } from "lucide-react";
import { site } from "@/content/site";
import { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const f = site.contact.form;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form: one short step — name, email, optional topic, message.
 * Picking "New project" points to the Start Project form (gets a price faster).
 * TODO.md: submissions aren't sent anywhere yet — connect email/CRM before launch.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const emailOk = EMAIL.test(email.trim());
  const nameOk = name.trim() !== "";
  const messageOk = message.trim() !== "";
  const ok = nameOk && emailOk && messageOk;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ok) return setTried(true);
    setSent(true); // TODO: send to email / CRM
  };

  const reset = () => {
    setName("");
    setEmail("");
    setTopic(null);
    setMessage("");
    setTried(false);
    setSent(false);
  };

  if (sent) return <Success name={name.trim().split(" ")[0]} onAgain={reset} />;

  const fl = f.fields;
  return (
    <div className="rounded-[2rem] border bg-surface p-5 shadow-[0_30px_70px_-45px_rgb(0_0_0/0.35)] sm:p-8 dark:shadow-none">
      <h2 className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{f.title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{f.hint}</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="ct-name" label={fl.name.label} required error={tried && !nameOk ? fl.name.error : undefined}>
          <input
            id="ct-name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={fl.name.placeholder}
            aria-invalid={(tried && !nameOk) || undefined}
            aria-describedby={tried && !nameOk ? "ct-name-error" : undefined}
            className={cn(inputCls, tried && !nameOk && "border-rose-500 focus-visible:ring-rose-500/25")}
          />
        </Field>
        <Field id="ct-email" label={fl.email.label} required error={tried && !emailOk ? fl.email.error : undefined}>
          <input
            id="ct-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={fl.email.placeholder}
            aria-invalid={(tried && !emailOk) || undefined}
            aria-describedby={tried && !emailOk ? "ct-email-error" : undefined}
            className={cn(inputCls, tried && !emailOk && "border-rose-500 focus-visible:ring-rose-500/25")}
          />
        </Field>

        <fieldset className="sm:col-span-2">
          <legend className="mb-2 text-sm font-semibold">
            {f.topicTitle} <span className="font-normal text-muted-foreground">({f.optional})</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {f.topics.map((t) => {
              const on = topic === t;
              return (
                <label
                  key={t}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                    on ? "border-lime bg-lime text-ink" : "bg-background hover:border-lime",
                  )}
                >
                  <input type="radio" name="topic" className="sr-only" checked={on} onChange={() => setTopic(t)} />
                  {t}
                </label>
              );
            })}
          </div>
          <AnimatePresence initial={false}>
            {topic === f.topics[1] && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <span className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
                  <Info className="mt-0.5 size-4 shrink-0 text-lime-strong" aria-hidden />
                  <span>
                    {f.projectHint.text}{" "}
                    <Link href={f.projectHint.href} className="rounded-sm font-semibold whitespace-nowrap text-foreground underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
                      {f.projectHint.label}
                    </Link>
                  </span>
                </span>
              </motion.p>
            )}
          </AnimatePresence>
        </fieldset>

        <Field id="ct-message" label={fl.message.label} required error={tried && !messageOk ? fl.message.error : undefined} className="sm:col-span-2">
          <textarea
            id="ct-message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={fl.message.placeholder}
            aria-invalid={(tried && !messageOk) || undefined}
            aria-describedby={tried && !messageOk ? "ct-message-error" : undefined}
            className={cn(inputCls, "h-auto resize-none py-3", tried && !messageOk && "border-rose-500 focus-visible:ring-rose-500/25")}
          />
        </Field>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50 sm:w-auto"
          >
            {f.submit}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border bg-background px-4 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-lime focus-visible:ring-3 focus-visible:ring-lime/25";

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {!required && <span className="ml-1 font-normal text-muted-foreground">({f.optional})</span>}
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

function Success({ name, onAgain }: { name: string; onAgain: () => void }) {
  const s = f.success;
  return (
    <div role="status" className="rounded-[2rem] border bg-surface p-8 text-center sm:p-12">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime text-ink">
        <CheckCircle2 className="size-8" aria-hidden />
      </span>
      <h2 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em] text-balance">
        {name ? s.title.replace("{name}", name) : s.title.replace(", {name}", "")}
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
        <Copy text={s.body} />
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/book-a-call"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
        >
          <CalendarDays className="size-4" aria-hidden />
          {s.cta}
        </Link>
        <button
          type="button"
          onClick={onAgain}
          className="inline-flex h-12 items-center justify-center rounded-full border bg-background px-6 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {s.again}
        </button>
      </div>
    </div>
  );
}

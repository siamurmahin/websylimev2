"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { ArrowRight, CalendarDays, Check, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { CalEmbed } from "@/components/book-a-call/CalEmbed";
import { findPlan, type ChosenPlan } from "@/components/get-started/plans";
import { cn } from "@/lib/utils";

const g = site.getStarted;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const empty = { name: "", business: "", email: "", phone: "", website: "" };
type Details = typeof empty;
type Key = keyof Details;

const inputCls =
  "h-12 w-full rounded-xl border bg-background px-4 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-lime focus-visible:ring-3 focus-visible:ring-lime/25";

/**
 * A plan's "Get started" lands here: the plan, a short form, then the calendar
 * (or WhatsApp for Graphic Design). No plan in the URL → the full Start Project form.
 */
export function GetStarted() {
  const params = useSearchParams();
  const router = useRouter();
  const plan = findPlan(params.get("plan"));
  const [details, setDetails] = useState<Details | null>(null);
  const lenis = useLenis();
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!plan) router.replace("/start-project");
  }, [plan, router]);

  // The next step starts at the top of the page, not where the form ended
  useEffect(() => {
    if (details && top.current) lenis?.scrollTo(top.current, { immediate: true, offset: -120 });
  }, [details, lenis]);

  if (!plan) return <GetStartedFallback />;

  return (
    <div ref={top}>
      {details ? (
        <NextStep plan={plan} details={details} />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-14">
          <Summary plan={plan} />
          <DetailsForm onDone={setDetails} />
          <NextSteps plan={plan} className="lg:col-start-1 lg:row-start-2" />
        </div>
      )}
    </div>
  );
}

function Summary({ plan }: { plan: ChosenPlan }) {
  return (
    <div>
      <p className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground">
        <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
        {g.eyebrow}
      </p>
      <h1 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
        {g.headline.replace("{plan}", plan.name)}
      </h1>
      <div className="mt-6 rounded-3xl border bg-surface p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="font-display text-xl font-bold tracking-[-0.02em]">{plan.name}</p>
          <Link href={plan.changeHref} className="shrink-0 rounded-sm text-sm font-semibold text-muted-foreground underline underline-offset-4 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50">
            {g.change}
          </Link>
        </div>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold tracking-[-0.04em]">{plan.price}</span>
          <span className="text-sm text-muted-foreground">{plan.per}</span>
        </p>
        <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">{plan.tagline}</p>
        <ul className="mt-5 space-y-2.5 border-t pt-5">
          {plan.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-[15px]">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                <Check className="size-3" aria-hidden />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function NextSteps({ plan, className }: { plan: ChosenPlan; className?: string }) {
  return (
    <div className={className}>
      <h2 className="font-display text-xl font-bold tracking-[-0.02em]">{g.nextTitle}</h2>
      <ol className="mt-4 space-y-4">
        {g.next[plan.kind].map((step, i) => (
          <li key={step.title} className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-lime font-mono text-xs font-bold text-ink">{i + 1}</span>
            <span>
              <span className="block font-semibold">{step.title}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DetailsForm({ onDone }: { onDone: (d: Details) => void }) {
  const f = g.form;
  const [v, setV] = useState(empty);
  const [tried, setTried] = useState(false);

  const bad: Record<Key, boolean> = {
    name: v.name.trim() === "",
    business: v.business.trim() === "",
    email: !EMAIL.test(v.email.trim()),
    phone: v.phone.trim() === "",
    website: false,
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(bad).some(Boolean)) return setTried(true);
    onDone(v); // TODO: also send to email / CRM
  };

  const field = (key: Key, type: string, autoComplete: string) => {
    const meta = f.fields[key];
    const id = `gs-${key}`;
    const required = "error" in meta;
    const error = tried && bad[key] && "error" in meta ? meta.error : undefined;
    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
          {meta.label}
          {!required && <span className="ml-1 font-normal text-muted-foreground">({f.optional})</span>}
        </label>
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
          className={cn(inputCls, error && "border-rose-500 focus-visible:ring-rose-500/25")}
        />
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="self-start rounded-[2rem] border bg-surface p-5 shadow-[0_30px_70px_-45px_rgb(0_0_0/0.35)] sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 dark:shadow-none">
      <h2 className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{f.title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{f.hint}</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {field("name", "text", "name")}
        {field("business", "text", "organization")}
        {field("email", "email", "email")}
        {field("phone", "tel", "tel")}
        <div className="sm:col-span-2">{field("website", "text", "url")}</div>
      </div>
      <button
        type="submit"
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {f.submit}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </button>
    </form>
  );
}

function NextStep({ plan, details }: { plan: ChosenPlan; details: Details }) {
  const b = g.booked;
  const callFirst = plan.kind !== "design";
  const [showCal, setShowCal] = useState(callFirst);
  const copy = callFirst ? b.call : b.whatsapp;
  const first = details.name.trim().split(" ")[0];
  const whatsapp = `${site.footer.contact.whatsapp.href}?text=${encodeURIComponent(b.whatsappMessage.replace("{plan}", plan.name))}`;

  const whatsappButton = (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold outline-none transition-[filter,border-color] focus-visible:ring-3 focus-visible:ring-ring/50",
        callFirst ? "border bg-background hover:border-lime" : "bg-lime text-ink hover:brightness-105",
      )}
    >
      <MessageCircle className="size-4" aria-hidden />
      {b.whatsappLabel}
    </a>
  );

  return (
    <div role="status">
      <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">{copy.title.replace("{name}", first)}</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{copy.body.replace("{plan}", plan.name)}</p>

      {callFirst ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">{b.call.whatsappText}</span>
          {whatsappButton}
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {whatsappButton}
          {!showCal && (
            <button
              type="button"
              onClick={() => setShowCal(true)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border bg-background px-6 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <CalendarDays className="size-4" aria-hidden />
              {b.whatsapp.callLabel}
            </button>
          )}
        </div>
      )}

      <p className="mt-4 text-sm text-muted-foreground">{b.reply}</p>

      {showCal && (
        <div className="mt-8 rounded-[2rem] border bg-surface p-2 sm:p-4">
          <CalEmbed
            prefill={{
              name: details.name.trim(),
              email: details.email.trim(),
              notes: `${plan.name} plan. ${details.business.trim()}. ${details.phone.trim()}${details.website.trim() ? `. ${details.website.trim()}` : ""}`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export function GetStartedFallback() {
  return <div aria-hidden className="h-[40rem] animate-pulse rounded-[2rem] bg-surface/60" />;
}

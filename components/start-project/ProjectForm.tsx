"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, Info } from "lucide-react";
import { site } from "@/content/site";
import { icons } from "@/components/icons";
import { Copy, href } from "@/lib/copy";
import { cn } from "@/lib/utils";

const f = site.startProject.form;
const { service: s1, business: s2, contact: s3 } = f.steps;
const TOTAL = 3;

type ServiceId = (typeof s1.service)[number]["id"];
type Answers = {
  service: ServiceId | null;
  detail: string | null;
  business: string | null;
  budget: string | null;
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
};

const GROWTH_PLANS = s1.details.growth.map((d) => d.id) as string[];
const WEBSITE_PACKAGES = s1.details["website-design"].map((d) => d.id).filter((id) => id !== "unsure") as string[];
const DESIGN_PLANS = s1.details["graphic-design"].map((d) => d.id).filter((id) => id !== "one-off") as string[];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ?package=lead-growth → Growth + that plan; ?package=business → Website Design +
 * that package (Pricing page); ?package=design-pro → Graphic Design + that plan;
 * ?service=website-design → that service.
 */
function initialAnswers(params: URLSearchParams): Answers {
  const pkg = params.get("package");
  const svc = params.get("service");
  const isGrowth = !!pkg && GROWTH_PLANS.includes(pkg);
  const isWebsite = !!pkg && WEBSITE_PACKAGES.includes(pkg);
  const isDesign = !!pkg && DESIGN_PLANS.includes(pkg);
  const service = isGrowth
    ? "growth"
    : isWebsite
      ? "website-design"
      : isDesign
        ? "graphic-design"
        : (s1.service.find((s) => s.id === svc)?.id ?? null);
  return {
    service,
    detail: isGrowth || isWebsite || isDesign ? pkg : null,
    business: null,
    budget: null,
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  };
}

/**
 * Start Project form: three short steps with big click-to-choose cards, a
 * progress bar and Back, no login. Answers persist when stepping back.
 * TODO.md: submissions aren't sent anywhere yet — connect email/CRM before launch.
 */
export function ProjectForm() {
  const params = useSearchParams();
  const [a, setA] = useState<Answers>(() => initialAnswers(params));
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [sent, setSent] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((prev) => ({ ...prev, [k]: v }));

  const emailOk = EMAIL.test(a.email.trim());
  const canContinue = [a.service !== null, a.business !== null, a.name.trim() !== "" && emailOk][step];

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    // keep the card in view on phones, where the step may start off-screen
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) {
      if (step === 2) setEmailTouched(true);
      return;
    }
    if (step < TOTAL - 1) go(step + 1);
    else setSent(true); // TODO: send to email / CRM
  };

  if (sent) return <Success name={a.name.trim().split(" ")[0]} />;

  return (
    <div ref={cardRef} className="scroll-mt-28 rounded-[2rem] border bg-surface p-5 shadow-[0_30px_70px_-45px_rgb(0_0_0/0.35)] sm:p-8 dark:shadow-none">
      {/* progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-muted-foreground">
          {f.stepLabel.replace("{n}", String(step + 1)).replace("{total}", String(TOTAL))}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: TOTAL }, (_, i) => (
            <span key={i} className={cn("h-1.5 w-10 rounded-full transition-colors duration-500 sm:w-14", i <= step ? "bg-lime" : "bg-muted")} />
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-6">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && <StepService a={a} set={set} />}
            {step === 1 && <StepBusiness a={a} set={set} />}
            {step === 2 && <StepContact a={a} set={set} emailError={emailTouched && !emailOk} onEmailBlur={() => setEmailTouched(true)} />}
          </motion.div>
        </AnimatePresence>

        {/* nav */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {f.back}
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            aria-disabled={!canContinue}
            className={cn(
              "group inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold outline-none transition-[background-color,color,filter] focus-visible:ring-3 focus-visible:ring-lime/50",
              canContinue ? "bg-lime text-ink hover:brightness-105" : "cursor-not-allowed bg-muted text-muted-foreground",
            )}
          >
            {step < TOTAL - 1 ? f.next : f.submit}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- steps ---------------- */

type StepProps = { a: Answers; set: <K extends keyof Answers>(k: K, v: Answers[K]) => void };

function StepHeader({ title, hint }: { title: string; hint: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

function StepService({ a, set }: StepProps) {
  const details = a.service === "website-design" || a.service === "growth" || a.service === "graphic-design" ? s1.details[a.service] : null;
  return (
    <>
      <StepHeader title={s1.title} hint={s1.hint} />
      <fieldset className="mt-6">
        <legend className="sr-only">{s1.title}</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {s1.service.map((o) => {
            const Icon = icons[o.icon];
            return (
              <Choice
                key={o.id}
                name="service"
                checked={a.service === o.id}
                onChange={() => {
                  set("service", o.id);
                  if (a.service !== o.id) set("detail", null);
                }}
              >
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl transition-colors", a.service === o.id ? "bg-lime text-ink" : "bg-lime-soft text-lime-strong")}>
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{o.label}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{o.body}</span>
                </span>
              </Choice>
            );
          })}
        </div>
      </fieldset>

      {details && (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold">
            {s1.detailTitle} <span className="font-normal text-muted-foreground">({f.optional})</span>
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {details.map((d) => (
              <Choice key={d.id} name="detail" small checked={a.detail === d.id} onChange={() => set("detail", d.id)}>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold"><Copy text={d.label} /></span>
                  <span className="mt-0.5 block text-xs text-muted-foreground"><Copy text={d.body} /></span>
                </span>
              </Choice>
            ))}
          </div>
          {a.service === "growth" && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="size-3.5 shrink-0 text-lime-strong" aria-hidden />
              {s1.growthNote}
            </p>
          )}
        </fieldset>
      )}
    </>
  );
}

function StepBusiness({ a, set }: StepProps) {
  return (
    <>
      <StepHeader title={s2.title} hint={s2.hint} />
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">{s2.businessTitle}</legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {s2.business.map((o) => {
            const Icon = icons[o.icon];
            return (
              <Choice key={o.id} name="business" checked={a.business === o.id} onChange={() => set("business", o.id)}>
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl transition-colors", a.business === o.id ? "bg-lime text-ink" : "bg-lime-soft text-lime-strong")}>
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="font-semibold">{o.label}</span>
              </Choice>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-sm font-semibold">
          {s2.budgetTitle} <span className="font-normal text-muted-foreground">({f.optional})</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {s2.budget.map((b) => {
            const on = a.budget === b;
            return (
              <label
                key={b}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                  on ? "border-lime bg-lime text-ink" : "bg-background hover:border-lime",
                )}
              >
                <input type="radio" name="budget" className="sr-only" checked={on} onChange={() => set("budget", b)} />
                {b}
              </label>
            );
          })}
        </div>
      </fieldset>
    </>
  );
}

function StepContact({ a, set, emailError, onEmailBlur }: StepProps & { emailError: boolean; onEmailBlur: () => void }) {
  const fl = s3.fields;
  return (
    <>
      <StepHeader title={s3.title} hint={s3.hint} />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="sp-name" label={fl.name.label} required>
          <input id="sp-name" autoComplete="name" required value={a.name} onChange={(e) => set("name", e.target.value)} placeholder={fl.name.placeholder} className={inputCls} />
        </Field>
        <Field id="sp-email" label={fl.email.label} required error={emailError ? fl.email.error : undefined}>
          <input
            id="sp-email"
            type="email"
            autoComplete="email"
            required
            value={a.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={onEmailBlur}
            placeholder={fl.email.placeholder}
            aria-invalid={emailError || undefined}
            aria-describedby={emailError ? "sp-email-error" : undefined}
            className={cn(inputCls, emailError && "border-rose-500 focus-visible:ring-rose-500/25")}
          />
        </Field>
        <Field id="sp-phone" label={fl.phone.label}>
          <input id="sp-phone" type="tel" autoComplete="tel" value={a.phone} onChange={(e) => set("phone", e.target.value)} placeholder={fl.phone.placeholder} className={inputCls} />
        </Field>
        <Field id="sp-website" label={fl.website.label}>
          <input id="sp-website" autoComplete="url" value={a.website} onChange={(e) => set("website", e.target.value)} placeholder={fl.website.placeholder} className={inputCls} />
        </Field>
        <Field id="sp-message" label={fl.message.label} className="sm:col-span-2">
          <textarea
            id="sp-message"
            rows={3}
            value={a.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder={fl.message.placeholder}
            className={cn(inputCls, "h-auto resize-none py-3")}
          />
        </Field>
      </div>
    </>
  );
}

/* ---------------- pieces ---------------- */

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

/** Big click-to-choose card backed by a real radio input (keyboard + screen readers). */
function Choice({
  name,
  checked,
  onChange,
  small,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-center gap-3 rounded-2xl border bg-background transition-[border-color,box-shadow,background-color] duration-200 has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
        small ? "p-3" : "p-4",
        checked ? "border-lime bg-lime-soft/40 shadow-[0_0_0_1px_var(--lime)] dark:bg-lime/[0.06]" : "hover:border-foreground/25",
      )}
    >
      <input type="radio" name={name} className="sr-only" checked={checked} onChange={onChange} />
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute top-3 right-3 grid size-5 place-items-center rounded-full border transition-colors",
          checked ? "border-lime bg-lime text-ink" : "bg-background",
          small && "top-2 right-2 size-4",
        )}
      >
        {checked && <Check className={small ? "size-2.5" : "size-3"} strokeWidth={3.5} />}
      </span>
    </label>
  );
}

function Success({ name }: { name: string }) {
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
          href={href(site.startProject.unsure.href)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
        >
          <CalendarDays className="size-4" aria-hidden />
          {s.cta}
        </Link>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full border bg-background px-6 text-sm font-semibold outline-none transition-colors hover:border-lime focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {s.home}
        </Link>
      </div>
    </div>
  );
}

/** Same frame as the form, shown for a split second while the URL is read. */
export function ProjectFormFallback() {
  return (
    <div className="rounded-[2rem] border bg-surface p-5 sm:p-8" aria-busy>
      <div className="h-5 w-24 rounded-full bg-muted" />
      <div className="mt-6 h-8 w-2/3 rounded-lg bg-muted" />
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-muted/60" />
        ))}
      </div>
    </div>
  );
}

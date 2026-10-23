import { Bell, Check, CircleDashed, Clock, MessageCircle, Phone, Star } from "lucide-react";
import { site } from "@/content/site";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { cn } from "@/lib/utils";

type Item = (typeof site.home.why.items)[number];
const m = site.home.why.mockups;

const ease = "duration-700 ease-out-expo";
const chip = "rounded-xl border bg-background/70 shadow-sm backdrop-blur";

/* ---------------- mini UI mockups ---------------- */

function Tasks() {
  const icon = { Done: Check, "In review": Clock, "In progress": CircleDashed } as const;
  return (
    <ul className="w-full max-w-sm space-y-2">
      {m.tasks.map((t, i) => {
        const Icon = icon[t.status as keyof typeof icon] ?? CircleDashed;
        const done = t.status === "Done";
        return (
          <li
            key={t.label}
            className={cn(chip, "flex items-center gap-3 px-3 py-2.5 transition-transform group-hover/spot:translate-x-1", ease)}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <span className={cn("grid size-6 place-items-center rounded-full", done ? "bg-lime text-ink" : "bg-muted text-muted-foreground")}>
              <Icon className="size-3.5" aria-hidden />
            </span>
            <span className="flex-1 text-sm font-medium">{t.label}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", done ? "bg-lime-soft text-lime-strong" : "bg-muted text-muted-foreground")}>
              {t.status}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Chat() {
  return (
    <div className={cn(chip, "w-full max-w-[15rem] p-3 transition-transform group-hover/spot:-translate-y-1", ease)}>
      <div className="flex items-center gap-2">
        <span className="relative grid size-8 place-items-center rounded-full bg-lime text-ink">
          <MessageCircle className="size-4" aria-hidden />
          <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
        </span>
        <span className="leading-tight">
          <span className="block text-xs font-bold">{m.chatName}</span>
          <span className="block text-[11px] text-muted-foreground">{m.chatStatus}</span>
        </span>
      </div>
      <p className="mt-3 rounded-2xl rounded-tl-md bg-lime px-3 py-2 text-[13px] leading-snug text-ink">{m.chat}</p>
    </div>
  );
}

function Cost() {
  return (
    <div className="w-full max-w-[15rem] space-y-3">
      {[
        { label: m.cost.agency, w: "w-full", bar: "bg-foreground/15" },
        { label: m.cost.us, w: "w-[42%] group-hover/spot:w-[38%]", bar: "bg-lime" },
      ].map((row) => (
        <div key={row.label}>
          <p className="mb-1.5 text-xs font-semibold text-muted-foreground">{row.label}</p>
          <div className="h-3 rounded-full bg-muted">
            <div className={cn("h-full rounded-full transition-[width]", ease, row.w, row.bar)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  const { days, postDays, label } = m.calendar;
  return (
    <div className={cn(chip, "w-full max-w-[15rem] p-3")}>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="mt-2.5 grid grid-cols-7 gap-1.5">
        {days.map((d, i) => {
          const on = postDays.includes(i);
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-medium text-muted-foreground">{d}</span>
              <span
                className={cn(
                  "aspect-square w-full rounded-md transition-transform",
                  ease,
                  on ? "bg-lime group-hover/spot:scale-110" : "bg-muted",
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Invoice() {
  return (
    <div className={cn(chip, "w-full max-w-[15rem] p-3 transition-transform group-hover/spot:-rotate-1", ease)}>
      <p className="text-xs font-bold">{m.invoice.title}</p>
      <ul className="mt-2 space-y-1.5">
        {m.invoice.lines.map((line) => (
          <li key={line} className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check className="size-3 text-lime-strong dark:text-lime" aria-hidden />
              {line}
            </span>
            <span className="h-1.5 w-8 rounded-full bg-muted" />
          </li>
        ))}
      </ul>
      <div className="mt-2.5 flex items-center justify-between border-t border-dashed pt-2">
        <span className="h-1.5 w-10 rounded-full bg-foreground/20" />
        <span className="h-2 w-12 rounded-full bg-lime" />
      </div>
    </div>
  );
}

function Notifications() {
  const rows = [
    { icon: Bell, text: m.notification, accent: true },
    { icon: Phone, text: m.notifications[0] },
    { icon: Star, text: m.notifications[1] },
  ];
  return (
    <ul className="w-full max-w-md space-y-2">
      {rows.map((row, i) => (
        <li
          key={row.text}
          className={cn(
            chip,
            "flex items-center gap-3 px-3 py-2.5 transition-[transform,opacity]",
            ease,
            i > 0 && "opacity-80 group-hover/spot:opacity-100",
          )}
          style={{ transform: `scale(${1 - i * 0.03})`, transitionDelay: `${i * 70}ms` }}
        >
          <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", row.accent ? "bg-lime text-ink" : "bg-muted text-muted-foreground")}>
            <row.icon className="size-4" aria-hidden />
          </span>
          <span className="text-sm font-medium">{row.text}</span>
        </li>
      ))}
    </ul>
  );
}

const MOCKUPS: Record<Item["mockup"], () => React.ReactNode> = {
  tasks: Tasks,
  chat: Chat,
  cost: Cost,
  calendar: Calendar,
  invoice: Invoice,
  notifications: Notifications,
};

const SPANS: Record<Item["mockup"], string> = {
  tasks: "md:col-span-2",
  chat: "",
  cost: "",
  calendar: "",
  invoice: "",
  notifications: "md:col-span-2",
};

/* ---------------- section ---------------- */

export function Why() {
  const { eyebrow, headline, items } = site.home.why;

  return (
    <section id="why" aria-labelledby="why-title" className="relative py-10 sm:py-14">
      <StaggerReveal className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-lime-strong dark:bg-lime" />
            {eyebrow}
          </p>
          <h2
            id="why-title"
            data-reveal
            className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          >
            {headline}
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Mockup = MOCKUPS[item.mockup];
            return (
              <li key={item.title} data-reveal className={SPANS[item.mockup]}>
                <Spotlight className="flex h-full flex-col">
                  <div
                    aria-hidden
                    className="flex h-40 items-center sm:h-48 justify-center border-b bg-[radial-gradient(120%_100%_at_50%_0%,var(--surface-2),transparent)] px-6"
                  >
                    <Mockup />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg leading-snug font-bold tracking-[-0.02em] text-balance sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </Spotlight>
              </li>
            );
          })}
        </ul>
      </StaggerReveal>
    </section>
  );
}

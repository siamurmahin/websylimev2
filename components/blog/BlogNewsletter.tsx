"use client";

import { useState } from "react";
import { submitForm } from "@/app/actions/forms";
import { SendError, Trap } from "@/components/forms/Trap";
import { ArrowRight, Check, Mail } from "lucide-react";
import { site } from "@/content/site";

const n = site.footer.newsletter;
const b = site.blog.newsletter;

/**
 * Newsletter band (#newsletter) on /blog and post pages — same list as the
 * footer form. TODO.md: connect a newsletter provider before launch.
 */
export function BlogNewsletter() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <section id="newsletter" aria-labelledby="blog-nl-title" className="scroll-mt-16 pb-14 sm:pb-20">
      <div className="container-site">
        <div className="flex flex-col gap-7 rounded-[2rem] border bg-lime-soft/60 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between dark:bg-lime/[0.06]">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lime text-ink">
              <Mail className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-foreground uppercase">{b.eyebrow}</p>
              <h2 id="blog-nl-title" className="mt-1 font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                {b.headline}
              </h2>
              <p className="mt-1.5 max-w-md text-[15px] text-muted-foreground">{n.body}</p>
            </div>
          </div>

          {sent ? (
            <p role="status" className="inline-flex items-center gap-2 font-semibold text-foreground">
              <Check className="size-5" aria-hidden />
              {n.success}
            </p>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (sending) return;
                const data = new FormData(e.currentTarget);
                setSending(true);
                setFailed(false);
                const res = await submitForm({ form: "newsletter", fields: { email: String(data.get("email") ?? ""), from: "blog" }, trap: String(data.get("website_url") ?? "") });
                setSending(false);
                if (res.ok) setSent(true);
                else setFailed(true);
              }}
              className="relative flex w-full shrink-0 items-center gap-1.5 rounded-full border bg-background p-1.5 transition-[border-color,box-shadow] focus-within:border-lime focus-within:ring-3 focus-within:ring-lime/25 lg:w-[26rem]"
            >
              <label htmlFor="blog-email" className="sr-only">
                {n.label}
              </label>
              <Trap ref={null} />
              <input
                id="blog-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={n.placeholder}
                className="h-10 min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none placeholder:text-muted-foreground/70"
              />
              <button
                type="submit"
                className="group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
              >
                {sending ? "…" : n.cta}
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </button>
            </form>
          )}
        </div>
        <SendError show={failed} />
      </div>
    </section>
  );
}

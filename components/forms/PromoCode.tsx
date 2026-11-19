"use client";

import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { promo } from "@/content/shared/promo";
import { cn } from "@/lib/utils";

const KEY = "websylime-promo";

/** Campaign pages call this so the code follows the visitor to the other forms. */
export function rememberPromo(code: string) {
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // storage blocked: they can still type the code
  }
}

const clean = (s: string) => s.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 30);

function savedPromo() {
  const fromUrl = new URLSearchParams(window.location.search).get("promo");
  if (fromUrl) return clean(fromUrl);
  try {
    return clean(localStorage.getItem(KEY) ?? "");
  } catch {
    return "";
  }
}

/**
 * Optional promo code box. Starts as a small "Have a promo code?" link so the form
 * stays short; opens filled in when the visitor brought a code (?promo= or a campaign page).
 * The code is sent with the form as `promo_code`; the discount is applied on the quote.
 */
export function PromoCode({ id, value, onChange, inputCls }: { id: string; value: string; onChange: (v: string) => void; inputCls: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const code = savedPromo();
    if (!code) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the saved code once, after hydration
    setOpen(true);
    if (!value) onChange(code);
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <Tag className="size-3.5" aria-hidden />
        {promo.open}
      </button>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {promo.label}
        <span className="ml-1 font-normal text-muted-foreground">({promo.optional})</span>
      </label>
      <input
        id={id}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(clean(e.target.value))}
        placeholder={promo.placeholder}
        aria-describedby={value ? `${id}-note` : undefined}
        className={cn(inputCls, "font-mono tracking-[0.08em] uppercase")}
      />
      {value && (
        <p id={`${id}-note`} className="mt-1.5 text-xs text-muted-foreground">
          {promo.saved}
        </p>
      )}
    </div>
  );
}

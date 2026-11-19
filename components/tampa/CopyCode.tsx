"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** The reader code with a one-tap copy button. */
export function CopyCode({ code, copy, copied }: { code: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      // clipboard blocked: the code is still visible to type
    }
  };
  return (
    <div className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-[#182D01]/40 bg-[#FBFBF7] p-2 pl-5">
      <span className="flex-1 font-mono text-2xl font-bold tracking-[0.12em] text-[#182D01] sm:text-3xl">{code}</span>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex h-12 min-w-28 items-center justify-center gap-2 rounded-xl bg-[#182D01] px-4 text-sm font-semibold text-white outline-none transition-colors hover:bg-[#223f02] focus-visible:ring-4 focus-visible:ring-[#182D01]/40"
      >
        {done ? <Check className="size-4 text-[#B8DD38]" aria-hidden /> : <Copy className="size-4 text-[#B8DD38]" aria-hidden />}
        <span aria-live="polite">{done ? copied : copy}</span>
      </button>
    </div>
  );
}

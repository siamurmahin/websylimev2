"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { THEME_EVENT as EVENT, THEME_KEY, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

const getTheme = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");

function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const { toLight, toDark } = site.header.theme;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={next === "dark" ? toDark : toLight}
      title={next === "dark" ? toDark : toLight}
      className={cn(
        "grid size-10 place-items-center rounded-full border bg-surface/60 text-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  );
}

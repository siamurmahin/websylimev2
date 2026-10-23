"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { site, type NavItem } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { DropdownPanel, MegaPanel, PANEL_WIDTH, ProductsPanel } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

type PanelItem = Exclude<NavItem, { kind: "link" }>;

const ease = [0.16, 1, 0.3, 1] as const;

function panelWidth(item: PanelItem) {
  return PANEL_WIDTH[item.kind === "mega" ? "mega" : item.kind === "products" ? "products" : "dropdown"];
}

/** Reports its content height before paint and on every resize. */
function Measured({ onHeight, children }: { onHeight: (h: number) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    onHeight(el.offsetHeight);
    const ro = new ResizeObserver(() => onHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [onHeight]);
  return <div ref={ref}>{children}</div>;
}

export function Header() {
  const { nav, primaryCta, skipLink, openMenu } = site.header;
  const pathname = usePathname();

  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [dir, setDir] = useState(1);
  const [panelHeight, setPanelHeight] = useState(0);
  const [panelX, setPanelX] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverOpenedAt = useRef(0);
  // Mirrors `active` for timers and callbacks; only written in event handlers
  const activeRef = useRef<string | null>(null);

  const activeItem = nav.find((n): n is PanelItem => n.kind !== "link" && n.id === active);

  /* ---------- scroll: shrink to glass pill, hide on down, show on up ---------- */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    if (y < 140) setHidden(false);
    else if (y - prev > 6) setHidden(true);
    else if (prev - y > 6) setHidden(false);
  });
  const isHidden = hidden && !active && !mobileOpen;

  /* ---------- open / close ---------- */
  const clearTimers = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
  };

  const open = useCallback(
    (id: string) => {
      const item = nav.find((n): n is PanelItem => n.kind !== "link" && n.id === id);
      const trigger = triggers.current[id];
      const bar = barRef.current;
      const region = regionRef.current;
      if (!item || !trigger || !bar || !region) return;

      const ids = nav.map((n) => (n.kind === "link" ? n.href : n.id));
      const prev = activeRef.current;
      if (prev) setDir(ids.indexOf(id) > ids.indexOf(prev) ? 1 : -1);

      // Center the floating panel under its trigger, clamped inside the bar.
      // x is relative to the nav region the panel is positioned in.
      const b = bar.getBoundingClientRect();
      const r = region.getBoundingClientRect();
      const t = trigger.getBoundingClientRect();
      const width = panelWidth(item);
      const ideal = t.left + t.width / 2 - r.left - width / 2;
      const min = b.left - r.left;
      const max = b.right - r.left - width;
      setPanelX(Math.max(min, Math.min(ideal, max)));
      activeRef.current = id;
      setActive(id);
    },
    [nav],
  );

  const close = useCallback(() => {
    clearTimers();
    activeRef.current = null;
    setActive(null);
    setPanelHeight(0);
  }, []);

  useEffect(() => clearTimers, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    burgerRef.current?.focus();
  }, []);

  const onTriggerEnter = (id: string, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimers();
    if (activeRef.current) {
      open(id);
    } else {
      hoverOpenedAt.current = e.timeStamp;
      openTimer.current = setTimeout(() => open(id), 70);
    }
  };

  const onTriggerClick = (id: string, e: React.MouseEvent) => {
    // A hover just opened this menu — don't let the follow-up click close it
    if (active === id && e.timeStamp - hoverOpenedAt.current < 600) return;
    if (active === id) close();
    else open(id);
  };

  const focusFirstInPanel = () =>
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a, button")?.focus());

  const onTriggerKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (active !== id) open(id);
      focusFirstInPanel();
    }
  };

  const onRegionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && activeRef.current) {
      const id = activeRef.current;
      close();
      triggers.current[id]?.focus();
    }
  };

  const onRegionBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
  };

  const renderPanel = (item: PanelItem) => {
    if (item.kind === "mega") return <MegaPanel item={item} onNavigate={close} />;
    if (item.kind === "products") return <ProductsPanel item={item} onNavigate={close} />;
    return <DropdownPanel item={item} onNavigate={close} />;
  };

  const highlight = hovered ?? active;

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        {skipLink}
      </a>

      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: isHidden ? "-120%" : "0%" }}
        transition={{ duration: 0.45, ease }}
      >
        {/* Dim the page while a mega menu is open */}
        <AnimatePresence>
          {active && (
            <motion.div
              aria-hidden
              className="fixed inset-0 -z-10 bg-black/10 backdrop-blur-[2px] dark:bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          )}
        </AnimatePresence>

        <div className="container-site">
          <div
            ref={barRef}
            className={cn(
              // Grid keeps the nav centered when there's room and never lets it overlap the CTAs
              "relative flex items-center justify-between gap-4 lg:grid xl:gap-8 lg:grid-cols-[1fr_auto_1fr] transition-[height,margin,padding,background-color,border-color,box-shadow,border-radius] duration-500 ease-out-expo",
              scrolled
                ? "mt-2.5 h-header-compact rounded-full border bg-background/70 pr-2 pl-5 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.12)] dark:shadow-[0_10px_40px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl backdrop-saturate-150"
                : "mt-0 h-header rounded-none border border-transparent px-0",
            )}
          >
            <Logo className="shrink-0 justify-self-start" />

            {/* ---------- desktop nav ---------- */}
            <div
              ref={regionRef}
              className="relative hidden lg:block"
              onPointerEnter={() => clearTimeout(closeTimer.current)}
              onPointerLeave={() => {
                clearTimeout(openTimer.current);
                setHovered(null);
                closeTimer.current = setTimeout(close, 180);
              }}
              onKeyDown={onRegionKeyDown}
              onBlur={onRegionBlur}
            >
              <nav aria-label="Main">
                <ul className="flex items-center gap-0.5">
                  {nav.map((item) => {
                    const key = item.kind === "link" ? item.href : item.id;
                    const isOn = highlight === key;
                    const pill = isOn && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.07]"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    );
                    const itemCls =
                      "relative isolate inline-flex h-10 items-center gap-1 rounded-full px-3 text-[14px] font-semibold xl:px-4 xl:text-[15px] tracking-[-0.01em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/60";

                    if (item.kind === "link") {
                      const current = pathname === item.href;
                      return (
                        <li key={key}>
                          <Link
                            href={item.href}
                            aria-current={current ? "page" : undefined}
                            onPointerEnter={() => {
                              setHovered(key);
                              clearTimers();
                              if (activeRef.current) closeTimer.current = setTimeout(close, 120);
                            }}
                            className={cn(itemCls, current ? "text-foreground" : "text-foreground/75 hover:text-foreground")}
                          >
                            {pill}
                            {item.label}
                          </Link>
                        </li>
                      );
                    }

                    const expanded = active === item.id;
                    return (
                      <li key={key}>
                        <button
                          ref={(el) => {
                            triggers.current[item.id] = el;
                          }}
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={`menu-${item.id}`}
                          aria-haspopup="true"
                          onPointerEnter={(e) => {
                            setHovered(key);
                            onTriggerEnter(item.id, e);
                          }}
                          onClick={(e) => onTriggerClick(item.id, e)}
                          onKeyDown={(e) => onTriggerKeyDown(item.id, e)}
                          className={cn(itemCls, expanded ? "text-foreground" : "text-foreground/75 hover:text-foreground")}
                        >
                          {pill}
                          {item.label}
                          <ChevronDown
                            aria-hidden
                            className={cn("size-3.5 opacity-60 transition-transform duration-300", expanded && "rotate-180")}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* ---------- floating morphing panel ---------- */}
              <AnimatePresence>
                {activeItem && (
                  <motion.div
                    key="panel"
                    className="absolute top-full left-0 pt-4"
                    initial={{ opacity: 0, y: -10, x: panelX, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, x: panelX, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.18 } }}
                    transition={{ duration: 0.35, ease, x: { type: "spring", stiffness: 380, damping: 36 } }}
                  >
                    <motion.div
                      ref={panelRef}
                      id={`menu-${activeItem.id}`}
                      role="region"
                      aria-label={activeItem.label}
                      className="relative overflow-hidden rounded-3xl border bg-popover/95 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.18)] dark:shadow-[0_30px_80px_-20px_rgb(0_0_0/0.55)] backdrop-blur-2xl"
                      initial={false}
                      animate={{ width: panelWidth(activeItem), height: panelHeight || "auto" }}
                      transition={{ type: "spring", stiffness: 380, damping: 36 }}
                    >
                      <AnimatePresence initial={false} mode="popLayout" custom={dir}>
                        <motion.div
                          key={activeItem.id}
                          custom={dir}
                          variants={{
                            enter: (d: number) => ({ opacity: 0, x: d * 28 }),
                            center: { opacity: 1, x: 0 },
                            exit: (d: number) => ({ opacity: 0, x: d * -28 }),
                          }}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.28, ease }}
                          className="w-max"
                        >
                          <Measured
                            onHeight={(h) => {
                              if (activeRef.current === activeItem.id) setPanelHeight(h);
                            }}
                          >
                            {renderPanel(activeItem)}
                          </Measured>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ---------- right side ---------- */}
            <div className="flex items-center gap-1.5 justify-self-end sm:gap-3">
              <Button asChild size="pill" className="group hidden sm:inline-flex hover:bg-lime hover:brightness-105">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <ThemeToggle />
              <button
                ref={burgerRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={openMenu}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="grid size-10 place-items-center rounded-full border bg-surface/60 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </>
  );
}

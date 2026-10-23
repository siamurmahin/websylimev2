"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Plus } from "lucide-react";
import type { NavItem, NavLink } from "@/content/site";
import { icons } from "@/components/icons";
import { Copy, href, plain } from "@/lib/copy";
import { cn } from "@/lib/utils";

type Mega = Extract<NavItem, { kind: "mega" }>;
type Products = Extract<NavItem, { kind: "products" }>;
type Dropdown = Extract<NavItem, { kind: "dropdown" }>;

/** Fixed panel widths (px) — the floating panel morphs between these. */
export const PANEL_WIDTH = { mega: 960, products: 600, dropdown: 340 } as const;

const linkBase =
  "group/link flex gap-3 rounded-xl p-3 outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring/60";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-lime/30 bg-lime-soft px-2 py-0.5 text-[10px] font-semibold tracking-wide text-lime-strong uppercase">
      {children}
    </span>
  );
}

function MenuLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const Icon = link.icon ? icons[link.icon] : null;
  return (
    <Link href={href(link.href)} onClick={onNavigate} className={linkBase}>
      {Icon && (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border bg-surface-2 text-muted-foreground transition-colors duration-300 group-hover/link:border-lime/40 group-hover/link:bg-lime group-hover/link:text-ink">
          <Icon className="size-4" />
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Copy text={link.label} />
          {link.badge && <Badge>{link.badge}</Badge>}
        </span>
        {link.description && (
          <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
            <Copy text={link.description} />
          </span>
        )}
      </span>
    </Link>
  );
}

function GroupTitle({ title, link, badge, onNavigate }: { title: string; link?: string; badge?: string; onNavigate: () => void }) {
  const inner = (
    <>
      <span>{title}</span>
      {badge && <Badge>{badge}</Badge>}
      {link && <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover/title:translate-x-0 group-hover/title:opacity-100" />}
    </>
  );
  const cls = "group/title mb-1 flex items-center gap-2 px-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase";
  return link ? (
    <Link href={href(link)} onClick={onNavigate} className={cn(cls, "w-fit rounded outline-none hover:text-foreground focus-visible:text-foreground")}>
      {inner}
    </Link>
  ) : (
    <p className={cls}>{inner}</p>
  );
}

export function MegaPanel({ item, onNavigate }: { item: Mega; onNavigate: () => void }) {
  const groups = item.groups.filter((g) => !g.hidden);
  const main = groups.filter((g) => g.placement !== "strip");
  const extra = groups.filter((g) => g.placement === "strip");
  const feature = item.feature;

  return (
    <div style={{ width: PANEL_WIDTH.mega }} className="grid grid-cols-[1fr_240px] gap-2 p-2">
      <div className="flex flex-col gap-2">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${main.length}, minmax(0, 1fr))` }}>
          {main.map((group) => (
            <div key={group.title} className="rounded-2xl p-2 pt-4">
              <GroupTitle title={group.title} link={group.href} badge={group.badge} onNavigate={onNavigate} />
              <ul className="space-y-0.5">
                {group.links.filter((l) => !l.hidden).map((link) => (
                  <li key={link.label}>
                    <MenuLink link={link} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {extra.map((group) => (
          <div key={group.title} className="flex items-center gap-4 rounded-2xl border border-dashed bg-surface-2/50 px-2 py-1">
            <div className="shrink-0 pt-1">
              <GroupTitle title={group.title} link={group.href} badge={group.badge} onNavigate={onNavigate} />
            </div>
            <ul className="flex flex-1 flex-wrap">
              {group.links.filter((l) => !l.hidden).map((link) => (
                <li key={link.label} className="flex-1">
                  <MenuLink link={{ ...link, badge: undefined }} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {feature && (
        <Link
          href={href(feature.href)}
          onClick={onNavigate}
          className="group/feature relative flex flex-col overflow-hidden rounded-2xl border bg-surface-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            {feature.image ? (
              <Image
                src={feature.image}
                alt={plain(feature.imageAlt)}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover/feature:scale-105"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_20%_10%,color-mix(in_oklch,var(--lime)_35%,transparent),transparent_60%),linear-gradient(160deg,var(--surface-2),var(--surface))] transition-transform duration-700 ease-out-expo group-hover/feature:scale-105">
                <span className="text-xs">
                  <Copy text="[Case study image]" />
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-lime-strong uppercase">{feature.eyebrow}</span>
            <span className="font-display text-base leading-tight font-semibold">
              <Copy text={feature.title} />
            </span>
            <span className="text-[13px] leading-snug text-muted-foreground">
              <Copy text={feature.description} />
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium">
              {feature.cta}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/feature:translate-x-0.5 group-hover/feature:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}

export function ProductsPanel({ item, onNavigate }: { item: Products; onNavigate: () => void }) {
  const { product, comingSoon } = item;
  return (
    <div style={{ width: PANEL_WIDTH.products }} className="grid grid-cols-[1.35fr_1fr] gap-2 p-2">
      <div className="relative overflow-hidden rounded-2xl border bg-surface-2 p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-lime/20 blur-3xl"
        />
        {/* TODO.md: replace with the WebsyChat logo */}
        <span className="grid size-11 place-items-center rounded-xl bg-lime text-ink shadow-[0_0_0_6px_var(--lime-soft)]">
          <MessageCircle className="size-5" />
        </span>
        <Link
          href={href(product.href)}
          onClick={onNavigate}
          className="mt-4 block w-fit rounded font-display text-xl font-semibold outline-none hover:text-lime-strong focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          <Copy text={product.tagline} />
        </p>
        <div className="mt-5 flex items-center gap-2">
          <Link
            href={href(product.cta.href, "/book-a-call")} // trial URL not set yet → Book a Call (same as the WebsyChat page)
            onClick={onNavigate}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-lime px-4 text-sm font-semibold text-ink outline-none transition-transform hover:scale-[1.03] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]"
          >
            {product.cta.label}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={href(product.secondary.href)}
            onClick={onNavigate}
            className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            {product.secondary.label}
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl border border-dashed p-5">
        <span className="grid size-11 place-items-center rounded-xl border border-dashed text-muted-foreground">
          <Plus className="size-5" />
        </span>
        <div>
          <p className="font-display text-base font-semibold">{comingSoon.title}</p>
          <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{comingSoon.description}</p>
        </div>
      </div>
    </div>
  );
}

export function DropdownPanel({ item, onNavigate }: { item: Dropdown; onNavigate: () => void }) {
  return (
    <ul style={{ width: PANEL_WIDTH.dropdown }} className="space-y-0.5 p-2">
      {item.links.filter((l) => !l.hidden).map((link) => (
        <li key={link.label}>
          <MenuLink link={link} onNavigate={onNavigate} />
        </li>
      ))}
    </ul>
  );
}

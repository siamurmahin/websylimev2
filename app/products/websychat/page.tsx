import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import {
  trialHref,
  WebsyChatDemo,
  WebsyChatFeatures,
  WebsyChatHelp,
  WebsyChatHow,
  WebsyChatPlans,
} from "@/components/sections/products/websychat/WebsyChatSections";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";

const c = site.products.websychat;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: "/products/websychat" },
  openGraph: { url: "/products/websychat", title: `${c.meta.title} · ${site.brand.name}`, description: c.meta.description },
};

/**
 * WebsyChat product page. One CTA everywhere ("Try it free" → trial URL):
 * photo hero → demo chat (#demo) → features → how it works → plans (#plans)
 * → "we'll set it up" banner → WebsyChat FAQ → final CTA.
 */
export default function WebsyChatPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={{ ...c.hero, primaryCta: { ...c.hero.primaryCta, href: trialHref } }} />
      <WebsyChatDemo />
      <WebsyChatFeatures />
      <WebsyChatHow />
      <WebsyChatPlans />
      <WebsyChatHelp />
      <FAQ categories={["WebsyChat"]} />
      <FinalCta />
    </main>
  );
}

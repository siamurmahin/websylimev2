import type { Metadata } from "next";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareSchema } from "@/lib/schema";
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
      <JsonLd
        data={softwareSchema({
          name: "WebsyChat",
          description: c.meta.description,
          path: "/products/websychat",
          plans: c.plans.items.map((p) => ({ name: `WebsyChat ${p.name}`, price: p.price, monthly: true, url: `/products/websychat#${p.id}` })),
        })}
      />
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

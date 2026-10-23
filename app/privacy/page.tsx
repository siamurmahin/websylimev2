import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/legal/LegalPage";

const p = site.legal.privacy;

export const metadata: Metadata = {
  title: p.meta.title,
  description: p.meta.description,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: `${p.meta.title} · ${site.brand.name}`, description: p.meta.description },
};

/** Privacy Policy — copy in content/pages/legal.ts (draft: needs a lawyer's review). */
export default function PrivacyPage() {
  return <LegalPage doc={p} />;
}

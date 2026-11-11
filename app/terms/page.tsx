import type { Metadata } from "next";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { LegalPage } from "@/components/legal/LegalPage";

const t = site.legal.terms;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title: `${t.meta.title} · ${site.brand.name}`, description: t.meta.description },
};

/** Terms of Service — copy in content/pages/legal.ts (draft: needs a lawyer's review). */
export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Terms of Service", path: "/terms" }])} />
      <LegalPage doc={t} />
    </>
  );
}

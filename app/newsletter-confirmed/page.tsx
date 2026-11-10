import type { Metadata } from "next";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { newsletterConfirmed as n } from "@/content/pages/newsletter-confirmed";

export const metadata: Metadata = {
  title: n.meta.title,
  description: n.meta.description,
  robots: { index: false, follow: true },
};

/** Thank-you page after the newsletter double opt-in link. */
export default function NewsletterConfirmedPage() {
  return (
    <main id="main" className="relative isolate overflow-hidden pb-20">
      <PhotoHero data={n.hero} />
    </main>
  );
}

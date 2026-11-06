import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/content/site";
import { GetStarted, GetStartedFallback } from "@/components/get-started/GetStarted";

const g = site.getStarted;

// A step in the sales flow, not a page to find on Google: left out of the sitemap too.
export const metadata: Metadata = {
  title: g.meta.title,
  description: g.meta.description,
  robots: { index: false, follow: true },
};

/** Where every plan's "Get started" lands. No photo hero: the visitor has already chosen. */
export default function GetStartedPage() {
  return (
    <main id="main" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute top-0 left-[-10%] -z-10 h-[26rem] w-[36rem] rounded-full bg-lime/15 blur-[120px]" />
      <section aria-label={g.meta.title} className="container-site pt-page-top pb-20">
        <div className="pt-10 sm:pt-14">
          <Suspense fallback={<GetStartedFallback />}>
            <GetStarted />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

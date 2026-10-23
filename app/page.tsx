// Collaboration has two designs: CollaborationStack (current) and Collaboration (timeline, previous)
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { CollaborationStack } from "@/components/sections/CollaborationStack";
import { FAQ } from "@/components/sections/FAQ";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { PortfolioStrip } from "@/components/sections/PortfolioStrip";
import { Pricing } from "@/components/sections/Pricing";
import { ProcessExpand } from "@/components/sections/process/ProcessExpand";
import { Results } from "@/components/sections/Results";
import { Services } from "@/components/sections/Services";
import { Shift } from "@/components/sections/Shift";
import { TestimonialsWall } from "@/components/sections/testimonials/TestimonialsWall";
import { TrustBar } from "@/components/sections/TrustBar";
import { Why } from "@/components/sections/Why";

// Canonical + share URL for the homepage (resolved against metadataBase)
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

// Homepage sections are added here one by one, in the order from the plan.
export default function Home() {
  return (
    <main id="main" className="relative">
      <JsonLd data={faqSchema()} />
      <Hero />
      <PortfolioStrip />
      <TrustBar />
      <PainPoints />
      <Shift />
      <Services />
      <Why />
      <CollaborationStack />
      <Results />
      <FeaturedWork />
      <ProcessExpand />
      <TestimonialsWall />
      <Pricing />
      <FAQ />
      <FinalCta />
    </main>
  );
}

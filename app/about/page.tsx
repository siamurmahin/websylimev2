import type { Metadata } from "next";
import { site } from "@/content/site";
import { AboutQuotes, AboutStats, AboutStory, AboutTeam, AboutTimeline, AboutValues } from "@/components/about/AboutSections";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { FinalCta } from "@/components/sections/FinalCta";

const a = site.about;

export const metadata: Metadata = {
  title: a.meta.title,
  description: a.meta.description,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: `${a.meta.title} · ${site.brand.name}`, description: a.meta.description },
};

/** About / Our Story: photo hero → real numbers → story → timeline (#story) → values → team → quotes → final CTA. */
export default function AboutPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={a.hero} />
      <AboutStats />
      <AboutStory />
      <AboutTimeline />
      <AboutValues />
      <AboutTeam />
      <AboutQuotes />
      <FinalCta />
    </main>
  );
}

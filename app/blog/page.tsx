import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { FinalCta } from "@/components/sections/FinalCta";

const b = site.blog;

export const metadata: Metadata = {
  title: b.meta.title,
  description: b.meta.description,
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: `${b.meta.title} · ${site.brand.name}`, description: b.meta.description },
};

/**
 * Blog index: photo hero → featured post + topic chips + grid (#articles)
 * → newsletter (#newsletter) → final CTA. Posts live in content/blog/posts.ts.
 */
export default function BlogPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={b.hero} />
      <BlogIndex />
      <BlogNewsletter />
      <FinalCta />
    </main>
  );
}

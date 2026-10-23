import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { posts } from "@/content/blog/posts";
import { caseStudies } from "@/content/case-studies";

// Only pages that actually exist — listing unbuilt routes would send search
// engines to 404s. Add each page here as it's built (see TODO.md).
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services/website-design", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/growth", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/graphic-design", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/video-editing", priority: 0.5, changeFrequency: "monthly" },
  { path: "/products/websychat", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/start-project", priority: 0.8, changeFrequency: "yearly" },
  { path: "/book-a-call", priority: 0.8, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = PAGES.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, site.meta.url).toString(),
    changeFrequency,
    priority,
  }));
  // every case study
  const studies: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: new URL(`/case-studies/${c.slug}`, site.meta.url).toString(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  // every blog post
  const blogPosts: MetadataRoute.Sitemap = posts.map((p) => ({
    url: new URL(`/blog/${p.slug}`, site.meta.url).toString(),
    lastModified: p.updated,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...pages, ...studies, ...blogPosts];
}

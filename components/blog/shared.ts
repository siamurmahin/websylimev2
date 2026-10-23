import { posts } from "@/content/blog/posts";

/** "Oct 23, 2026" — UTC so server and browser agree. */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** Categories in the order they first appear (newest posts first). */
export const blogCategories = [...new Set(posts.map((p) => p.category))];

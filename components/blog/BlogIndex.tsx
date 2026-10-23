"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { posts, type BlogPost } from "@/content/blog/posts";
import { blogCategories, formatDate } from "@/components/blog/shared";
import { cn } from "@/lib/utils";

const b = site.blog;

function Meta({ post, dark = false }: { post: BlogPost; dark?: boolean }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]", dark ? "text-white/60" : "text-muted-foreground")}>
      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", dark ? "bg-lime text-ink" : "bg-lime-soft text-lime-strong")}>{post.category}</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>·</span>
      {post.readTime}
    </p>
  );
}

/**
 * /blog articles: the newest post as a big featured card, then category
 * chips and a grid of the rest. Picking a category filters every post.
 */
export function BlogIndex() {
  const [cat, setCat] = useState(b.all);
  const [featured, ...rest] = posts;
  const showFeatured = cat === b.all;
  const list = showFeatured ? rest : posts.filter((p) => p.category === cat);

  return (
    <section id="articles" aria-label="Articles" className="scroll-mt-16 py-14 sm:py-20">
      <div className="container-site">
        {/* category chips */}
        {blogCategories.length > 1 && (
          <div role="group" aria-label="Filter by topic" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {[b.all, ...blogCategories].map((c) => {
              const on = c === cat;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCat(c)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                    on ? "border-lime bg-lime text-ink" : "bg-surface text-muted-foreground hover:border-lime hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}

        {/* featured (newest) */}
        {showFeatured && featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-8 grid grid-cols-1 overflow-hidden rounded-[2rem] bg-ink text-white outline-none focus-visible:ring-3 focus-visible:ring-lime/50 lg:grid-cols-[1.15fr_1fr] dark:border dark:border-white/10 dark:bg-surface"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                quality={90}
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">{b.featuredLabel}</p>
              <div className="mt-4">
                <Meta post={featured} dark />
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
                {featured.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/70">{featured.excerpt}</p>
              <span className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink">
                {b.readMore}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        )}

        {/* grid */}
        {list.length > 0 && (
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/** Card used in the /blog grid and "Keep reading" on post pages. */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border bg-surface outline-none transition-[border-color,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:border-lime/60 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          quality={90}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Meta post={post} />
        <h3 className="mt-3 font-display text-xl leading-snug font-bold tracking-[-0.02em] text-balance">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-lime-strong dark:text-lime">
          {b.readMore}
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lightbulb, Plus } from "lucide-react";
import { site } from "@/content/site";
import { posts, type BlogBlock } from "@/content/blog/posts";
import { formatDate } from "@/components/blog/shared";
import { PostCard } from "@/components/blog/BlogIndex";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { FadeUp } from "@/components/motion/SplitReveal";
import { RichText, slugify, stripMarkup } from "@/components/blog/RichText";

const b = site.blog;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    // keyword-first title; skip the " · Websy Lime" template so it stays under ~60 chars
    title: { absolute: post.seoTitle },
    description: post.metaDescription,
    keywords: [post.keyword, ...post.related],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.seoTitle,
      description: post.metaDescription,
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
  };
}

const listDot = <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-lime-strong dark:bg-lime" />;

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={slugify(block.text)} className="mt-14 scroll-mt-28 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.03em] text-foreground">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-8 font-display text-xl leading-snug font-bold tracking-[-0.02em] text-foreground">{block.text}</h3>;
    case "ul":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3">
              {listDot}
              <span>
                <RichText text={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 space-y-2.5">
          {block.items.map((it, i) => (
            <li key={it} className="flex gap-3">
              <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-lime-soft font-mono text-xs font-bold text-lime-strong">
                {i + 1}
              </span>
              <span>
                <RichText text={it} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <aside className="mt-6 flex gap-4 rounded-2xl border border-lime/50 bg-lime-soft/60 p-5 text-foreground dark:bg-lime/[0.06]">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-lime-strong dark:text-lime" aria-hidden />
          <p>
            <RichText text={block.text} />
          </p>
        </aside>
      );
    default:
      return (
        <p className="mt-5">
          <RichText text={block.text} />
        </p>
      );
  }
}

// Blocking route on purpose: the slug is read before anything renders so an
// unknown post returns a real 404 status (inside <Suspense> it would be a 200).
// Every post is prerendered by generateStaticParams, so it's still instant.
export const instant = false;

/** One blog post: header + cover photo → article → "done for you" box → keep reading → newsletter. */
export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = `${site.meta.url}/blog/${post.slug}`;
  const toc = post.body.filter((x): x is Extract<BlogBlock, { text: string }> => x.type === "h2");
  const firstH2 = post.body.findIndex((x) => x.type === "h2");
  // one graph: the article, its FAQ and the breadcrumb trail
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        keywords: [post.keyword, ...post.related].join(", "),
        datePublished: post.date,
        dateModified: post.updated,
        image: `${site.meta.url}${post.image.src}`,
        author: { "@type": "Organization", name: site.brand.name },
        publisher: { "@type": "Organization", name: site.brand.name },
        mainEntityOfPage: url,
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: stripMarkup(f.a) } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.meta.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.meta.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main id="main" className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- header + cover ---------- */}
      <header className="pt-header">
        <div className="container-site pt-8 sm:pt-12">
          <FadeUp className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-lime/60"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
              {b.post.back}
            </Link>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span className="rounded-full bg-lime-soft px-2.5 py-0.5 text-xs font-bold text-lime-strong">{post.category}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              {post.readTime}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.02] font-bold tracking-[-0.045em] text-balance">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">{post.excerpt}</p>
            <p className="mt-5 text-sm text-muted-foreground">
              {b.post.by} <span className="font-semibold text-foreground">{post.author}</span>
              {post.updated !== post.date && (
                <>
                  {" "}
                  · {b.post.updated} <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}
            </p>
          </FadeUp>
          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem] bg-surface sm:rounded-[2.5rem]">
            <Image src={post.image.src} alt={post.image.alt} fill preload quality={90} sizes="(min-width: 1100px) 1024px, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      {/* ---------- article ---------- */}
      <article className="container-site py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-[17px] leading-[1.75] text-foreground/85 sm:text-lg">
          {post.body.map((block, i) => (
            <Fragment key={i}>
              {/* "in this article" sits after the intro, right before the first heading */}
              {i === firstH2 && toc.length > 2 && (
                <nav aria-label={b.post.tocTitle} className="mt-10 rounded-[1.5rem] border bg-surface p-6">
                  <p className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">{b.post.tocTitle}</p>
                  <ol className="mt-3 space-y-1.5 text-[15px]">
                    {toc.map((h) => (
                      <li key={h.text} className="flex gap-3">
                        {listDot}
                        <a href={`#${slugify(h.text)}`} className="text-foreground/80 underline-offset-4 hover:text-foreground hover:underline">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <Block block={block} />
            </Fragment>
          ))}

          {/* FAQ (also sent to Google as FAQPage data) */}
          {post.faq.length > 0 && (
            <section aria-labelledby="post-faq" className="mt-14">
              <h2 id="post-faq" className="scroll-mt-28 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.03em] text-foreground">
                {b.post.faqTitle}
              </h2>
              <div className="mt-6 space-y-3">
                {post.faq.map((f) => (
                  <details key={f.q} className="group rounded-2xl border bg-surface open:border-lime/60">
                    <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                      <span className="flex-1 text-base sm:text-[17px]">{f.q}</span>
                      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-muted transition-[background-color,rotate] duration-300 group-open:rotate-45 group-open:bg-lime group-open:text-ink">
                        <Plus className="size-4" />
                      </span>
                    </summary>
                    <p className="px-5 pb-5 text-[16px] text-muted-foreground">
                      <RichText text={f.a} />
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* done-for-you box */}
          <div className="mt-14 rounded-[1.75rem] bg-ink p-7 text-white sm:p-9 dark:border dark:border-white/10 dark:bg-surface">
            <p className="font-display text-2xl leading-tight font-bold tracking-[-0.03em]">{post.cta.title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/70">{post.cta.body}</p>
            <Link
              href={post.cta.href}
              className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 text-sm font-semibold text-ink outline-none transition-[filter] hover:brightness-105 focus-visible:ring-3 focus-visible:ring-lime/50"
            >
              {post.cta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </article>

      {/* ---------- keep reading ---------- */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-site pb-14 sm:pb-20">
          <h2 id="related-title" className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.035em]">
            {b.post.relatedTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <BlogNewsletter />
    </main>
  );
}

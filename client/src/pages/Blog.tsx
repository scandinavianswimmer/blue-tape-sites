import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { blogPosts } from "@/content/blogPosts";
import { readAndClearBlogArchiveScroll, saveBlogArchiveScroll } from "@/lib/blogScroll";
import { applyPageSeo, SITE_URL } from "@/lib/seo";

const BLOG_TITLE = "Blue Tape Sites Blog | Website Advice for Contractors";
const BLOG_DESCRIPTION =
  "Practical website and local search advice for plumbers, electricians, cleaners, contractors, and home-service businesses.";

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function Blog() {
  useEffect(() => {
    applyPageSeo({
      title: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      canonicalUrl: `${SITE_URL}/blog`,
    });

    const savedScroll = readAndClearBlogArchiveScroll();

    if (savedScroll === null) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScroll, left: 0, behavior: "auto" });
    });
  }, []);

  const posts = useMemo(
    () => [...blogPosts].sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1)),
    []
  );

  const featuredPost = posts[0];
  const groupedPosts = posts.reduce<Record<string, typeof posts>>((groups, post) => {
    const monthLabel = new Date(`${post.publishDate}T12:00:00Z`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    });

    if (!groups[monthLabel]) {
      groups[monthLabel] = [];
    }

    groups[monthLabel].push(post);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-[#111111]">
      <header className="border-b border-black/8 bg-[rgba(247,245,241,0.94)] backdrop-blur-lg">
        <div className="container flex min-h-18 items-center justify-between gap-4 py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="relative flex size-10 items-center justify-center border border-black/10 bg-white">
              <span className="h-1.5 w-6 rotate-[-28deg] bg-blue-600" />
            </div>
            <div className="min-w-0 leading-none">
              <div className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Blue Tape Sites</div>
              <div className="mt-1 text-sm font-semibold tracking-[-0.03em] text-[#111111] sm:text-base">Blog</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="rounded-full border-black/10 bg-white px-5 text-[#111111] hover:bg-white/90">
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Back to site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-black/8">
          <div className="container grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:py-20">
            <div className="max-w-xl">
              <div className="inline-flex border border-black/10 bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Website advice for home-service businesses
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-[#111111] sm:text-5xl lg:text-[4.2rem]">
                The Blue Tape Sites blog
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Practical articles for plumbers, electricians, cleaners, contractors, and owner-operators who want clearer websites,
                stronger local visibility, and a more confident online presence.
              </p>
            </div>

            {featuredPost ? (
              <article className="border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(17,17,17,0.05)] sm:p-8">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Latest article</div>
                <div className="mt-5 text-sm text-slate-500">{formatDate(featuredPost.publishDate)} · {featuredPost.readingTime}</div>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#111111]">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{featuredPost.summary}</p>
                <Button asChild className="mt-6 rounded-full bg-[#111111] px-6 text-white hover:bg-slate-800">
                  <Link href={`/blog/${featuredPost.slug}`} onClick={() => saveBlogArchiveScroll()}>
                    Read article
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </article>
            ) : null}
          </div>
        </section>

        <section className="container py-14 sm:py-18">
          <div className="grid gap-10 xl:grid-cols-[0.34fr_0.66fr] xl:gap-14">
            <aside className="h-fit border border-black/10 bg-white p-6">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-[#111111]">Archive at a glance</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                This archive is organized around the questions home-service companies ask when they want a stronger website,
                better trust, and more qualified calls.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="border border-black/8 bg-[#f7f5f1] p-4">
                  <div className="text-2xl font-semibold tracking-[-0.05em] text-[#111111]">{posts.length}</div>
                  <div className="mt-1">Published posts</div>
                </div>
                <div className="border border-black/8 bg-[#f7f5f1] p-4">
                  <div className="text-2xl font-semibold tracking-[-0.05em] text-[#111111]">12</div>
                  <div className="mt-1">Months covered</div>
                </div>
              </div>
            </aside>

            <div className="space-y-10">
              {Object.entries(groupedPosts).map(([monthLabel, monthPosts]) => (
                <section key={monthLabel} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-black/10" />
                    <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-slate-500">{monthLabel}</h2>
                    <div className="h-px flex-1 bg-black/10" />
                  </div>

                  <div className="grid gap-4">
                    {monthPosts.map(post => (
                      <article key={post.slug} className="border border-black/10 bg-white p-5 shadow-[0_14px_40px_rgba(17,17,17,0.04)] sm:p-6">
                        <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                          <span>{formatDate(post.publishDate)}</span>
                          <span>{post.category} · {post.readingTime}</span>
                        </div>
                        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#111111]">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-base leading-8 text-slate-600">{post.excerpt}</p>
                        <Button asChild variant="outline" className="mt-5 rounded-full border-black/10 bg-white px-5 text-[#111111] hover:bg-[#f7f5f1]">
                          <Link href={`/blog/${post.slug}`} onClick={() => saveBlogArchiveScroll()}>
                            Read more
                            <ArrowRight className="ml-2 size-4" />
                          </Link>
                        </Button>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

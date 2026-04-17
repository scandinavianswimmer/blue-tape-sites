import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { blogPostMap, blogPosts } from "@/content/blogPosts";
import { renderArticleMarkdown } from "@/lib/renderArticle";
import { applyPageSeo } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = blogPostMap.get(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (!post) {
      return;
    }

    applyPageSeo({
      title: `${post.title} | Blue Tape Sites`,
      description: post.summary,
    });
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  const currentIndex = blogPosts.findIndex(item => item.slug === post.slug);
  const newerPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const olderPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-[#111111]">
      <header className="border-b border-black/8 bg-[rgba(247,245,241,0.94)] backdrop-blur-lg">
        <div className="container flex min-h-18 items-center justify-between gap-4 py-4">
          <Link href="/blog" className="flex min-w-0 items-center gap-3">
            <div className="relative flex size-10 items-center justify-center border border-black/10 bg-white">
              <span className="h-1.5 w-6 rotate-[-28deg] bg-blue-600" />
            </div>
            <div className="min-w-0 leading-none">
              <div className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Blue Tape Sites</div>
              <div className="mt-1 text-sm font-semibold tracking-[-0.03em] text-[#111111] sm:text-base">Blog archive</div>
            </div>
          </Link>

          <Button asChild variant="outline" className="rounded-full border-black/10 bg-white px-5 text-[#111111] hover:bg-white/90">
            <Link href="/blog">
              <ArrowLeft className="mr-2 size-4" />
              All posts
            </Link>
          </Button>
        </div>
      </header>

      <main className="container py-14 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex border border-black/10 bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {post.category}
          </div>
          <div className="mt-6 text-sm text-slate-500">{formatDate(post.publishDate)} · {post.readingTime}</div>
          <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#111111] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{post.summary}</p>

          <article className="mt-10 border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(17,17,17,0.05)] sm:p-10">
            <div
              className="article-markdown max-w-none"
              dangerouslySetInnerHTML={{
                __html: renderArticleMarkdown(post.content || "This article is being prepared for publication."),
              }}
            />
          </article>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="border border-black/10 bg-white p-5">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Newer post</div>
              {newerPost ? (
                <>
                  <div className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[#111111]">{newerPost.title}</div>
                  <Button asChild variant="outline" className="mt-5 rounded-full border-black/10 bg-white px-5 text-[#111111] hover:bg-[#f7f5f1]">
                    <Link href={`/blog/${newerPost.slug}`}>
                      <ArrowLeft className="mr-2 size-4" />
                      Read newer post
                    </Link>
                  </Button>
                </>
              ) : (
                <p className="mt-3 text-sm leading-7 text-slate-600">This is currently the newest post in the archive.</p>
              )}
            </div>

            <div className="border border-black/10 bg-white p-5">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Older post</div>
              {olderPost ? (
                <>
                  <div className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[#111111]">{olderPost.title}</div>
                  <Button asChild variant="outline" className="mt-5 rounded-full border-black/10 bg-white px-5 text-[#111111] hover:bg-[#f7f5f1]">
                    <Link href={`/blog/${olderPost.slug}`}>
                      Read older post
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <p className="mt-3 text-sm leading-7 text-slate-600">This is currently the oldest post in the archive.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

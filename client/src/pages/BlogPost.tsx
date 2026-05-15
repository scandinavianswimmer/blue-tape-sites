import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { blogPostMap, blogPosts, getBlogPostServiceCta } from "@/content/blogPosts";
import { trackBlogCtaClick, buildBlogCtaClickPayload } from "@/lib/blogCtaTracking";
import { renderArticleMarkdown } from "@/lib/renderArticle";
import { applyPageSeo, buildBlogPostSeo, SITE_URL } from "@/lib/seo";
import NotFound from "@/pages/NotFound";
import { BUSINESS } from "@shared/business";

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

    applyPageSeo(buildBlogPostSeo(post));
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  const currentIndex = blogPosts.findIndex(item => item.slug === post.slug);
  const newerPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const olderPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const serviceCta = getBlogPostServiceCta(post);
  const primaryCtaPayload = buildBlogCtaClickPayload({ post, cta: serviceCta, placement: "primary" });
  const secondaryCtaPayload = buildBlogCtaClickPayload({ post, cta: serviceCta, placement: "secondary" });
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f5f1] text-[#111111] selection:bg-blue-600 selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteHeader />

      <main className="container py-14 sm:py-18">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex border border-black/10 bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {post.category}
          </div>
          <div className="mt-6 text-sm text-slate-500">{formatDate(post.publishDate)} · {post.readingTime}</div>
          <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#111111] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {post.summary} For Southern California contractors, the practical next step is to make the page answer the buyer's question fast, show proof, and keep {BUSINESS.phoneDisplay} easy to call.
          </p>

          <article className="mt-10 border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(17,17,17,0.05)] sm:p-10">
            <div
              className="article-markdown max-w-none"
              dangerouslySetInnerHTML={{
                __html: renderArticleMarkdown(post.content || "This article is being prepared for publication."),
              }}
            />
          </article>

          <section className="mt-10 border border-black/10 bg-[#111111] px-6 py-7 text-white shadow-[0_22px_70px_rgba(17,17,17,0.12)] sm:px-8 sm:py-9">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/45">{serviceCta.eyebrow}</div>
            <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]">{serviceCta.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">{serviceCta.description}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-none border border-white bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-white/90">
                <a href={serviceCta.primaryHref} onClick={() => void trackBlogCtaClick(primaryCtaPayload)}>
                  {serviceCta.primaryLabel}
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-none border-white/35 bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10 hover:text-white">
                <a href={serviceCta.secondaryHref} onClick={() => void trackBlogCtaClick(secondaryCtaPayload)}>
                  {serviceCta.secondaryLabel}
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-white/65">
              Or call <a href={BUSINESS.phoneHref} className="font-semibold text-white underline decoration-blue-300/60 underline-offset-4">{BUSINESS.phoneDisplay}</a> - same-day reply.
            </p>
          </section>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="border border-black/10 bg-white p-5">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Newer post</div>
              {newerPost ? (
                <>
                  <div className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[#111111]">{newerPost.title}</div>
                  <Button asChild variant="outline" className="mt-5 h-11 rounded-none border-[#111111] bg-white px-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-[#f7f5f1]">
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
                  <Button asChild variant="outline" className="mt-5 h-11 rounded-none border-[#111111] bg-white px-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] hover:bg-[#f7f5f1]">
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
      <SiteFooter />
    </div>
  );
}

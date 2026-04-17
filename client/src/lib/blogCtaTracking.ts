import type { BlogPost, BlogPostServiceCta } from "@/content/blogPosts";

export type BlogCtaPlacement = "primary" | "secondary";

export type BlogCtaClickPayload = {
  postSlug: string;
  postTitle: string;
  postCategory: string;
  postPublishDate: string;
  postKeyword: string;
  ctaLabel: string;
  ctaHref: string;
  ctaPlacement: BlogCtaPlacement;
  sourcePath: string;
  destinationPath: string;
};

export function buildBlogCtaClickPayload(options: {
  post: BlogPost;
  cta: BlogPostServiceCta;
  placement: BlogCtaPlacement;
}): BlogCtaClickPayload {
  const { post, cta, placement } = options;
  const label = placement === "primary" ? cta.primaryLabel : cta.secondaryLabel;
  const href = placement === "primary" ? cta.primaryHref : cta.secondaryHref;

  return {
    postSlug: post.slug,
    postTitle: post.title,
    postCategory: post.category,
    postPublishDate: post.publishDate,
    postKeyword: post.targetKeyword,
    ctaLabel: label,
    ctaHref: href,
    ctaPlacement: placement,
    sourcePath: `/blog/${post.slug}`,
    destinationPath: href,
  };
}

export async function trackBlogCtaClick(payload: BlogCtaClickPayload): Promise<boolean> {
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const sent = navigator.sendBeacon(
      "/api/blog-cta-click",
      new Blob([body], { type: "application/json" })
    );

    if (sent) {
      return true;
    }
  }

  if (typeof fetch !== "function") {
    return false;
  }

  try {
    const response = await fetch("/api/blog-cta-click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      keepalive: true,
    });

    return response.ok;
  } catch (error) {
    console.error("[Tracking] Failed to send blog CTA click:", error);
    return false;
  }
}

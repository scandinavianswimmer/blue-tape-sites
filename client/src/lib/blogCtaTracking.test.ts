import { afterEach, describe, expect, it, vi } from "vitest";

import { blogPosts, getBlogPostServiceCta } from "@/content/blogPosts";
import { buildBlogCtaClickPayload, trackBlogCtaClick } from "./blogCtaTracking";

const samplePost = blogPosts[0]!;
const sampleCta = getBlogPostServiceCta(samplePost);

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("blogCtaTracking", () => {
  it("builds a payload that preserves the blog topic and CTA destination context", () => {
    const payload = buildBlogCtaClickPayload({
      post: samplePost,
      cta: sampleCta,
      placement: "primary",
    });

    expect(payload).toEqual({
      postSlug: samplePost.slug,
      postTitle: samplePost.title,
      postCategory: samplePost.category,
      postPublishDate: samplePost.publishDate,
      postKeyword: samplePost.targetKeyword,
      ctaLabel: sampleCta.primaryLabel,
      ctaHref: sampleCta.primaryHref,
      ctaPlacement: "primary",
      sourcePath: `/blog/${samplePost.slug}`,
      destinationPath: sampleCta.primaryHref,
    });
  });

  it("prefers sendBeacon when available", async () => {
    const sendBeacon = vi.fn(() => true);
    vi.stubGlobal("navigator", { sendBeacon });

    const result = await trackBlogCtaClick(
      buildBlogCtaClickPayload({
        post: samplePost,
        cta: sampleCta,
        placement: "secondary",
      })
    );

    expect(result).toBe(true);
    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon.mock.calls[0]?.[0]).toBe("/api/blog-cta-click");
  });

  it("falls back to keepalive fetch when beacon transport is unavailable", async () => {
    vi.stubGlobal("navigator", { sendBeacon: vi.fn(() => false) });
    const fetchMock = vi.fn(async () => ({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await trackBlogCtaClick(
      buildBlogCtaClickPayload({
        post: samplePost,
        cta: sampleCta,
        placement: "primary",
      })
    );

    expect(result).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/blog-cta-click",
      expect.objectContaining({
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      })
    );
  });
});

import { describe, expect, it } from "vitest";

import { blogPosts } from "@/content/blogPosts";

import { buildBlogPostSeo, HOME_SEO_DESCRIPTION, HOME_SEO_TITLE, SITE_URL, toMetadataDateTime } from "./seo";

describe("homepage SEO metadata", () => {
  it("keeps the homepage title within the recommended SEO range", () => {
    expect(HOME_SEO_TITLE.length).toBeGreaterThanOrEqual(30);
    expect(HOME_SEO_TITLE.length).toBeLessThanOrEqual(60);
    expect(HOME_SEO_TITLE).toContain("Service Businesses");
  });

  it("keeps the homepage description within the recommended SEO range", () => {
    expect(HOME_SEO_DESCRIPTION.length).toBeGreaterThanOrEqual(50);
    expect(HOME_SEO_DESCRIPTION.length).toBeLessThanOrEqual(160);
    expect(HOME_SEO_DESCRIPTION).toContain("local visibility");
    expect(HOME_SEO_DESCRIPTION).toContain("leads");
  });
});

describe("blog post SEO metadata", () => {
  it("converts represented publish dates into stable metadata timestamps", () => {
    expect(toMetadataDateTime("2025-05-05")).toBe("2025-05-05T12:00:00Z");
    expect(toMetadataDateTime("2026-04-20")).toBe("2026-04-20T12:00:00Z");
  });

  it("builds article metadata that matches a post's represented publication date", () => {
    const firstPost = blogPosts[0];
    const seo = buildBlogPostSeo(firstPost);

    expect(seo.canonicalUrl).toBe(`${SITE_URL}/blog/${firstPost.slug}`);
    expect(seo.ogType).toBe("article");
    expect(seo.publishedTime).toBe("2025-05-05T12:00:00Z");
    expect(seo.modifiedTime).toBe("2025-05-05T12:00:00Z");
    expect(seo.structuredData).toMatchObject({
      "@type": "BlogPosting",
      datePublished: "2025-05-05T12:00:00Z",
      dateModified: "2025-05-05T12:00:00Z",
      url: `${SITE_URL}/blog/${firstPost.slug}`,
      mainEntityOfPage: `${SITE_URL}/blog/${firstPost.slug}`,
    });
  });

  it("keeps later archive posts aligned with their own represented dates instead of a current timestamp", () => {
    const lastPost = blogPosts[blogPosts.length - 1];
    const seo = buildBlogPostSeo(lastPost);

    expect(lastPost.publishDate).toBe("2026-04-20");
    expect(seo.publishedTime).toBe("2026-04-20T12:00:00Z");
    expect(seo.modifiedTime).toBe("2026-04-20T12:00:00Z");
    expect(seo.structuredData).toMatchObject({
      datePublished: "2026-04-20T12:00:00Z",
      dateModified: "2026-04-20T12:00:00Z",
    });
  });
});

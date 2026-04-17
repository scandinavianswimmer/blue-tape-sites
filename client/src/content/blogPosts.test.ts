import { describe, expect, it } from "vitest";

import { blogPosts, getBlogPostServiceCta, hasDedicatedBlogPostServiceCta } from "./blogPosts";

const utcDate = (date: string) => new Date(`${date}T12:00:00Z`);

const mondayPosition = (date: string) => {
  const value = utcDate(date);
  const dayOfWeek = value.getUTCDay();
  const dayOfMonth = value.getUTCDate();

  expect(dayOfWeek).toBe(1);

  if (dayOfMonth <= 7) {
    return "first";
  }

  if (dayOfMonth >= 15 && dayOfMonth <= 21) {
    return "third";
  }

  return "other";
};

describe("blogPosts archive", () => {
  it("contains the full twice-monthly archive from May 2025 through April 2026", () => {
    expect(blogPosts).toHaveLength(24);
    expect(blogPosts[0]?.publishDate).toBe("2025-05-05");
    expect(blogPosts[blogPosts.length - 1]?.publishDate).toBe("2026-04-20");
  });

  it("uses the first and third Monday schedule for every month in the archive", () => {
    const monthMap = new Map<string, string[]>();

    for (const post of blogPosts) {
      const monthKey = post.publishDate.slice(0, 7);
      const positions = monthMap.get(monthKey) ?? [];
      positions.push(mondayPosition(post.publishDate));
      monthMap.set(monthKey, positions);
    }

    expect(monthMap.size).toBe(12);

    for (const positions of monthMap.values()) {
      expect(positions).toEqual(["first", "third"]);
    }
  });

  it("keeps every article body populated with substantial content", () => {
    for (const post of blogPosts) {
      expect(post.content.length).toBeGreaterThan(2500);
      expect(post.summary.length).toBeGreaterThanOrEqual(50);
      expect(post.summary.length).toBeLessThanOrEqual(160);
    }
  });

  it("assigns every post a service-specific CTA with homepage destinations", () => {
    for (const post of blogPosts) {
      const cta = getBlogPostServiceCta(post);

      expect(hasDedicatedBlogPostServiceCta(post)).toBe(true);
      expect(cta.eyebrow).toBeTruthy();
      expect(cta.title.length).toBeGreaterThan(20);
      expect(cta.description.length).toBeGreaterThan(40);
      expect(cta.primaryLabel).toBeTruthy();
      expect(cta.secondaryLabel).toBeTruthy();
      expect(["/#audit", "/#pricing", "/#service-area"]).toContain(cta.primaryHref);
      expect(["/#audit", "/#pricing", "/#service-area"]).toContain(cta.secondaryHref);
    }
  });
});

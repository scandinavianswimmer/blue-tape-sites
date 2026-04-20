import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { blogPosts } from "./blogPosts";

describe("SEMrush-facing content hygiene", () => {
  it("keeps every blog post opening with a markdown h1", () => {
    for (const post of blogPosts) {
      expect(post.content.trimStart().startsWith("# ")).toBe(true);
    }
  });

  it("avoids malformed quote-prefixed archive summaries and excerpts", () => {
    for (const post of blogPosts) {
      expect(post.summary.includes('"""')).toBe(false);
      expect(post.excerpt.includes('"""')).toBe(false);
      expect(post.summary.length).toBeGreaterThan(40);
      expect(post.excerpt.length).toBeGreaterThan(40);
    }
  });

  it("allows SEMrush to crawl the site in robots.txt", () => {
    const robotsPath = resolve(process.cwd(), "client/public/robots.txt");
    const robots = readFileSync(robotsPath, "utf8");

    expect(robots).toContain("User-agent: SemrushBot");
    expect(robots).toContain("User-agent: SemrushBot\nAllow: /");
  });
});

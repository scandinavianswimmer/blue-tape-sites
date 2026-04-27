import { describe, expect, it } from "vitest";

import { tradeLandingPages } from "./tradeLandingPages";

describe("trade landing pages", () => {
  it("keeps each landing page on a clear web-design route with a stable primary CTA", () => {
    for (const page of Object.values(tradeLandingPages)) {
      expect(page.path.startsWith("/web-design-for-")).toBe(true);
      expect(page.primaryCtaLabel.toLowerCase()).toContain("audit");
      expect(page.secondaryCtaLabel.length).toBeGreaterThan(10);
    }
  });

  it("keeps SEO titles and descriptions within practical search ranges", () => {
    for (const page of Object.values(tradeLandingPages)) {
      expect(page.seoTitle.length).toBeGreaterThanOrEqual(30);
      expect(page.seoTitle.length).toBeLessThanOrEqual(60);
      expect(page.seoDescription.length).toBeGreaterThanOrEqual(90);
      expect(page.seoDescription.length).toBeLessThanOrEqual(160);
    }
  });

  it("preserves trade-specific language so the pages do not collapse into generic contractor messaging", () => {
    expect(tradeLandingPages.plumber.heroTitle.toLowerCase()).toContain("plumbing");
    expect(tradeLandingPages.plumber.seoDescription.toLowerCase()).toContain("plumbing");
    expect(tradeLandingPages.remodeler.heroTitle.toLowerCase()).toContain("consultation");
    expect(tradeLandingPages.remodeler.seoDescription.toLowerCase()).toContain("remodeler");
  });
});

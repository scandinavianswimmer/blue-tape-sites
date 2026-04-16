import { describe, expect, it } from "vitest";

import { HOME_SEO_DESCRIPTION, HOME_SEO_TITLE } from "./seo";

describe("homepage SEO metadata", () => {
  it("keeps the homepage title within the recommended SEO range", () => {
    expect(HOME_SEO_TITLE.length).toBeGreaterThanOrEqual(30);
    expect(HOME_SEO_TITLE.length).toBeLessThanOrEqual(60);
  });

  it("keeps the homepage description within the recommended SEO range", () => {
    expect(HOME_SEO_DESCRIPTION.length).toBeGreaterThanOrEqual(50);
    expect(HOME_SEO_DESCRIPTION.length).toBeLessThanOrEqual(160);
  });
});

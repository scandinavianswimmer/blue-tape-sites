import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const homeSource = readFileSync(path.resolve(import.meta.dirname, "Home.tsx"), "utf8");

describe("Home homepage copy alignment", () => {
  it("avoids the internal-facing trust labels called out in feedback", () => {
    expect(homeSource).not.toContain("Trust signal");
    expect(homeSource).not.toContain("What the customer feels");
  });

  it("keeps the key outcome-driven replacements in the homepage copy", () => {
    expect(homeSource).toContain("what is making the page look weak");
    expect(homeSource).toContain("more trust, more qualified calls");
    expect(homeSource).toContain("what is hurting trust");
    expect(homeSource).toContain("what should be fixed first");
  });

  it("keeps the openness and no-runaround positioning visible", () => {
    expect(homeSource).toContain("straight answer on what it will take");
    expect(homeSource).toContain("Clear offer. Clear pricing. No agency runaround.");
    expect(homeSource).toContain("without making you book a call just to get a straight ballpark");
    expect(homeSource).toContain("free of the usual agency runaround");
  });
});

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
});

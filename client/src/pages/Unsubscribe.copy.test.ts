import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const unsubscribeSource = readFileSync(path.resolve(import.meta.dirname, "Unsubscribe.tsx"), "utf8");

describe("Unsubscribe page copy", () => {
  it("keeps the outbound sender address and direct removal language visible", () => {
    expect(unsubscribeSource).toContain("hello@trybluetape.com");
    expect(unsubscribeSource).toContain("Stop outreach to this address.");
    expect(unsubscribeSource).toContain("Submit Unsubscribe Request");
  });

  it("supports email-prefilled unsubscribe links", () => {
    expect(unsubscribeSource).toContain('new URLSearchParams(window.location.search).get("email")');
  });
});

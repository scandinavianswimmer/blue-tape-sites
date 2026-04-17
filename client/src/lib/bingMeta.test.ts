import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Bing verification meta tag", () => {
  it("keeps the msvalidate meta tag in the homepage head", () => {
    const html = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

    expect(html).toContain('<meta name="msvalidate.01" content="3F6C261D8CB95A9DF9C8B4FE43E368FC" />');
  });
});

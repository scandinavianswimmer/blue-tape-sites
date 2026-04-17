import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const appSource = readFileSync(path.resolve(import.meta.dirname, "App.tsx"), "utf8");

describe("App routing", () => {
  it("keeps the unsubscribe page registered", () => {
    expect(appSource).toContain('path={"/unsubscribe"}');
    expect(appSource).toContain('const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));');
  });
});

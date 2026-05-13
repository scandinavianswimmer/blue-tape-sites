import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { renderSeoHtml, seoPagesForSitemap } from "../server/seoHtml";

const publicDir = path.resolve(import.meta.dirname, "..", "dist", "public");
const templatePath = path.join(publicDir, "index.html");
const template = readFileSync(templatePath, "utf-8");

for (const page of seoPagesForSitemap) {
  const html = renderSeoHtml(template, page.path);

  if (page.path === "/") {
    writeFileSync(templatePath, html, "utf-8");
    continue;
  }

  const routeDir = path.join(publicDir, page.path.replace(/^\//, ""));
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
}

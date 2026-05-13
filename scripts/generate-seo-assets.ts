import { writeFileSync } from "node:fs";
import path from "node:path";

import { buildRobotsTxt, buildSitemapXml } from "../server/seoHtml";

const publicDir = path.resolve(import.meta.dirname, "..", "client", "public");

writeFileSync(path.join(publicDir, "robots.txt"), buildRobotsTxt(), "utf-8");
writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemapXml(), "utf-8");

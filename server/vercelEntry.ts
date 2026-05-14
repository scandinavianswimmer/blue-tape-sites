import express from "express";
import fs from "fs";
import path from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { handleAuditRequest, handleAuditSecretCheck } from "./auditIntake";
import { handleBlogCtaClick } from "./blogCtaTracking";
import { createContext } from "./_core/context";
import { registerOAuthRoutes } from "./_core/oauth";
import { handlePageView } from "./pageviewTracking";
import { appRouter } from "./routers";
import { buildLlmsTxt, buildRobotsTxt, buildSitemapXml, renderSeoHtml } from "./seoHtml";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerOAuthRoutes(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.post("/api/audit", handleAuditRequest);
app.post("/api/audit/verify-secret", handleAuditSecretCheck);
app.post("/api/blog-cta-click", handleBlogCtaClick);
app.post("/api/pageview", handlePageView);

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(buildRobotsTxt());
});

app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml").send(buildSitemapXml());
});

app.get("/llms.txt", (_req, res) => {
  res.type("text/plain").send(buildLlmsTxt());
});

app.use("*", async (req, res, next) => {
  try {
    const indexPath = path.resolve(process.cwd(), "dist", "public", "index.html");
    const template = await fs.promises.readFile(indexPath, "utf-8");
    res.status(200).set({ "Content-Type": "text/html" }).end(renderSeoHtml(template, req.originalUrl));
  } catch (error) {
    next(error);
  }
});

export default app;

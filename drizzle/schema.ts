import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const auditLeads = mysqlTable("auditLeads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  companyName: varchar("companyName", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  websiteUrl: varchar("websiteUrl", { length: 2048 }),
  primaryTrade: varchar("primaryTrade", { length: 120 }).notNull(),
  serviceArea: varchar("serviceArea", { length: 180 }).notNull(),
  projectDetails: text("projectDetails").notNull(),
  sourcePath: varchar("sourcePath", { length: 512 }),
  notifiedOwner: int("notifiedOwner").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const blogCtaClicks = mysqlTable("blogCtaClicks", {
  id: int("id").autoincrement().primaryKey(),
  postSlug: varchar("postSlug", { length: 255 }).notNull(),
  postTitle: varchar("postTitle", { length: 255 }).notNull(),
  postCategory: varchar("postCategory", { length: 120 }).notNull(),
  postPublishDate: varchar("postPublishDate", { length: 10 }).notNull(),
  postKeyword: varchar("postKeyword", { length: 255 }).notNull(),
  ctaLabel: varchar("ctaLabel", { length: 160 }).notNull(),
  ctaHref: varchar("ctaHref", { length: 512 }).notNull(),
  ctaPlacement: mysqlEnum("ctaPlacement", ["primary", "secondary"]).notNull(),
  sourcePath: varchar("sourcePath", { length: 512 }).notNull(),
  destinationPath: varchar("destinationPath", { length: 512 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type AuditLead = typeof auditLeads.$inferSelect;
export type InsertAuditLead = typeof auditLeads.$inferInsert;
export type BlogCtaClick = typeof blogCtaClicks.$inferSelect;
export type InsertBlogCtaClick = typeof blogCtaClicks.$inferInsert;

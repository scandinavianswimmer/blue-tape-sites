import { Request, Response } from "express";
import { z } from "zod";

import { createBlogCtaClick } from "./db";

export const blogCtaClickSchema = z.object({
  postSlug: z.string().trim().min(1).max(255),
  postTitle: z.string().trim().min(1).max(255),
  postCategory: z.string().trim().min(1).max(120),
  postPublishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  postKeyword: z.string().trim().min(1).max(255),
  ctaLabel: z.string().trim().min(1).max(160),
  ctaHref: z.string().trim().min(1).max(512),
  ctaPlacement: z.enum(["primary", "secondary"]),
  sourcePath: z.string().trim().min(1).max(512),
  destinationPath: z.string().trim().min(1).max(512),
});

export type BlogCtaClickPayload = z.infer<typeof blogCtaClickSchema>;

export async function recordBlogCtaClick(payload: BlogCtaClickPayload): Promise<void> {
  await createBlogCtaClick(payload);
}

export async function handleBlogCtaClick(request: Request, response: Response) {
  try {
    const payload = blogCtaClickSchema.parse(request.body);
    await recordBlogCtaClick(payload);
    response.status(204).end();
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status(400).json({
        error: "Invalid blog CTA click payload.",
      });
      return;
    }

    console.error("[Tracking] Failed to record blog CTA click:", error);
    response.status(500).json({
      error: "Unable to record blog CTA click.",
    });
  }
}

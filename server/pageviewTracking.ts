import { Request, Response } from "express";
import { z } from "zod";

import { createPageView } from "./db";

const nullableTrimmedString = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .transform(value => {
      if (!value) {
        return null;
      }

      return value;
    });

export const pageViewSchema = z.object({
  path: z.string().trim().min(1).max(512),
  referrer: nullableTrimmedString(2048),
  userAgent: nullableTrimmedString(512),
  sessionId: z.string().trim().min(1).max(128),
});

export type PageViewPayload = z.infer<typeof pageViewSchema>;

export async function recordPageView(payload: PageViewPayload): Promise<void> {
  await createPageView(payload);
}

export async function handlePageView(request: Request, response: Response) {
  try {
    const payload = pageViewSchema.parse(request.body);
    await recordPageView(payload);
    response.status(204).end();
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status(400).json({
        error: "Invalid pageview payload.",
      });
      return;
    }

    console.error("[Tracking] Failed to record pageview:", error);
    response.status(500).json({
      error: "Unable to record pageview.",
    });
  }
}

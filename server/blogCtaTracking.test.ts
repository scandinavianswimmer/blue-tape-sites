import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("./db", () => ({
  createBlogCtaClick: vi.fn(),
}));

import { createBlogCtaClick } from "./db";
import { blogCtaClickSchema, handleBlogCtaClick } from "./blogCtaTracking";

const validPayload = {
  postSlug: "why-most-contractor-websites-lose-trust-before-the-quote",
  postTitle: "Why Most Contractor Websites Lose Trust Before the Quote",
  postCategory: "Website Strategy",
  postPublishDate: "2025-05-05",
  postKeyword: "contractor website design",
  ctaLabel: "Request your free audit",
  ctaHref: "/audit",
  ctaPlacement: "primary" as const,
  sourcePath: "/blog/why-most-contractor-websites-lose-trust-before-the-quote",
  destinationPath: "/audit",
};

const createResponse = () => {
  const response = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
  };

  return response;
};

describe("blog CTA tracking handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts valid tracking payloads", () => {
    expect(() => blogCtaClickSchema.parse(validPayload)).not.toThrow();
  });

  it("persists valid click events and returns 204", async () => {
    const request = {
      body: validPayload,
    };
    const response = createResponse();

    await handleBlogCtaClick(request as never, response as never);

    expect(createBlogCtaClick).toHaveBeenCalledWith(validPayload);
    expect(response.status).toHaveBeenCalledWith(204);
    expect(response.end).toHaveBeenCalled();
  });

  it("rejects malformed payloads with a 400 response", async () => {
    const request = {
      body: {
        ...validPayload,
        postPublishDate: "05/05/2025",
      },
    };
    const response = createResponse();

    await handleBlogCtaClick(request as never, response as never);

    expect(createBlogCtaClick).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: "Invalid blog CTA click payload." });
  });
});

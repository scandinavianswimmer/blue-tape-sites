import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  createPageView: vi.fn(),
}));

import { createPageView } from "./db";
import { handlePageView, pageViewSchema } from "./pageviewTracking";

const validPayload = {
  path: "/web-design-for-plumbers",
  referrer: "https://www.google.com/",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  sessionId: "2ea5d97a-1e20-4660-a9e5-e6e8e2f6375f",
};

const createResponse = () => {
  const response = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
  };

  return response;
};

describe("pageview tracking handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts valid pageview payloads", () => {
    expect(() => pageViewSchema.parse(validPayload)).not.toThrow();
  });

  it("normalizes optional empty strings to null", () => {
    expect(
      pageViewSchema.parse({
        ...validPayload,
        referrer: "",
        userAgent: "",
      })
    ).toEqual({
      ...validPayload,
      referrer: null,
      userAgent: null,
    });
  });

  it("persists valid pageviews and returns 204", async () => {
    const request = {
      body: validPayload,
    };
    const response = createResponse();

    await handlePageView(request as never, response as never);

    expect(createPageView).toHaveBeenCalledWith(validPayload);
    expect(response.status).toHaveBeenCalledWith(204);
    expect(response.end).toHaveBeenCalled();
  });

  it("rejects malformed payloads with a 400 response", async () => {
    const request = {
      body: {
        ...validPayload,
        sessionId: "",
      },
    };
    const response = createResponse();

    await handlePageView(request as never, response as never);

    expect(createPageView).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: "Invalid pageview payload." });
  });
});

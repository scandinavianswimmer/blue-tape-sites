import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  createUnsubscribeRequest: vi.fn(),
  notifyOwner: vi.fn(),
}));

vi.mock("./db", () => ({
  createAuditLead: vi.fn(),
  createUnsubscribeRequest: mocks.createUnsubscribeRequest,
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: mocks.notifyOwner,
}));

import { appRouter } from "./routers";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };
}

describe("leads.submitUnsubscribeRequest", () => {
  beforeEach(() => {
    mocks.createUnsubscribeRequest.mockReset();
    mocks.notifyOwner.mockReset();
  });

  it("stores the unsubscribe request and notifies the owner", async () => {
    mocks.createUnsubscribeRequest.mockResolvedValue(undefined);
    mocks.notifyOwner.mockResolvedValue(true);

    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.leads.submitUnsubscribeRequest({
      email: "person@example.com",
      senderEmail: "hello@trybluetape.com",
      reason: "No longer relevant.",
      sourcePath: "/unsubscribe",
      sourceOrigin: "https://bluetapesites.com",
    });

    expect(mocks.createUnsubscribeRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "person@example.com",
        senderEmail: "hello@trybluetape.com",
        reason: "No longer relevant.",
        sourcePath: "/unsubscribe",
        sourceOrigin: "https://bluetapesites.com",
        status: "pending",
      })
    );

    expect(mocks.notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New unsubscribe request for person@example.com",
      })
    );
    expect(mocks.notifyOwner.mock.calls[0]?.[0]?.content).toContain("Sender address: hello@trybluetape.com");
    expect(result).toEqual({ success: true, notifiedOwner: true });
  });

  it("rejects invalid email addresses", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.leads.submitUnsubscribeRequest({
        email: "not-an-email",
        senderEmail: "hello@trybluetape.com",
        reason: "",
        sourcePath: "/unsubscribe",
        sourceOrigin: "https://bluetapesites.com",
      })
    ).rejects.toThrow();

    expect(mocks.createUnsubscribeRequest).not.toHaveBeenCalled();
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
  });
});

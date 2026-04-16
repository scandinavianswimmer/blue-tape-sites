import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  createAuditLead: vi.fn(),
  notifyOwner: vi.fn(),
}));

vi.mock("./db", () => ({
  createAuditLead: mocks.createAuditLead,
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

describe("leads.submitAudit", () => {
  beforeEach(() => {
    mocks.createAuditLead.mockReset();
    mocks.notifyOwner.mockReset();
  });

  it("stores the audit lead and notifies the owner", async () => {
    mocks.createAuditLead.mockResolvedValue(undefined);
    mocks.notifyOwner.mockResolvedValue(true);

    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.leads.submitAudit({
      name: " Rick Mendez ",
      companyName: " Mendez Plumbing & Rooter ",
      email: "rick@example.com",
      phone: "",
      websiteUrl: "https://mendezplumbing.example.com",
      primaryTrade: "Plumbing",
      serviceArea: "Southern California",
      projectDetails: "Need help tightening our homepage and making the mobile CTA path clearer.",
      sourcePath: "/",
    });

    expect(mocks.createAuditLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Rick Mendez",
        companyName: "Mendez Plumbing & Rooter",
        email: "rick@example.com",
        phone: null,
        websiteUrl: "https://mendezplumbing.example.com",
        primaryTrade: "Plumbing",
        serviceArea: "Southern California",
        sourcePath: "/",
        notifiedOwner: 0,
      })
    );

    expect(mocks.notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Blue Tape audit request from Mendez Plumbing & Rooter",
      })
    );
    expect(mocks.notifyOwner.mock.calls[0]?.[0]?.content).toContain("Primary trade: Plumbing");
    expect(result).toEqual({ success: true, notifiedOwner: true });
  });

  it("rejects website URLs without a protocol", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.leads.submitAudit({
        name: "Rick Mendez",
        companyName: "Mendez Plumbing & Rooter",
        email: "rick@example.com",
        phone: "",
        websiteUrl: "mendezplumbing.example.com",
        primaryTrade: "Plumbing",
        serviceArea: "Southern California",
        projectDetails: "Need help tightening our homepage and making the mobile CTA path clearer.",
        sourcePath: "/",
      })
    ).rejects.toThrow("Website URL must begin with http:// or https://");

    expect(mocks.createAuditLead).not.toHaveBeenCalled();
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
  });
});

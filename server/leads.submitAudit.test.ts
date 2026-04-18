import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  createAuditLead: vi.fn(),
  createAuditSubmissionLog: vi.fn(),
  notifyOwner: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("./db", () => ({
  createAuditLead: mocks.createAuditLead,
  createAuditSubmissionLog: mocks.createAuditSubmissionLog,
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
      ip: "203.0.113.10",
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };
}

describe("leads.submitAudit", () => {
  beforeEach(() => {
    mocks.createAuditLead.mockReset();
    mocks.createAuditSubmissionLog.mockReset();
    mocks.notifyOwner.mockReset();
    mocks.fetch.mockReset();
    vi.stubGlobal("fetch", mocks.fetch);

    process.env.RESEND_API_KEY = "re_test_key";
    process.env.AUDIT_INBOX = "hello@trybluetape.com";
    process.env.AUDIT_FROM_ADDRESS = "Bluetape Audit Form <hello@trybluetape.com>";
    process.env.AUDIT_SHARED_SECRET = "bt_audit_test_secret";
  });

  it("stores the audit lead, forwards it to the Paperclip email intake, persists a structured success log, and notifies the owner", async () => {
    mocks.createAuditLead.mockResolvedValue(undefined);
    mocks.createAuditSubmissionLog.mockResolvedValue(undefined);
    mocks.notifyOwner.mockResolvedValue(true);
    mocks.fetch.mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('{"id":"re_msg_123"}'),
    });

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
      honeypot: "",
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

    expect(mocks.fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(mocks.fetch.mock.calls[0]?.[1]?.headers).toMatchObject({
      Authorization: "Bearer re_test_key",
      "Content-Type": "application/json",
    });

    const resendPayload = JSON.parse(String(mocks.fetch.mock.calls[0]?.[1]?.body)) as {
      subject: string;
      text: string;
      headers: Record<string, string>;
    };

    expect(resendPayload.subject).toBe("[AUDIT REQUEST] Mendez Plumbing & Rooter — Southern California");
    expect(resendPayload.text).toContain("---BLUETAPE-AUDIT-v1---");
    expect(resendPayload.text).toContain("FRUSTRATION:");
    expect(resendPayload.headers).toEqual({
      "X-Bluetape-Source": "audit-form",
      "X-Bluetape-Sig": "bt_audit_test_secret",
    });

    expect(mocks.createAuditSubmissionLog).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Rick Mendez",
        company: "Mendez Plumbing & Rooter",
        email: "rick@example.com",
        serviceArea: "Southern California",
        status: "success",
        resendMessageId: "re_msg_123",
      })
    );

    expect(mocks.notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Blue Tape audit request from Mendez Plumbing & Rooter",
      })
    );
    expect(mocks.notifyOwner.mock.calls[0]?.[0]?.content).toContain("Pipeline forwarded: yes");
    expect(result).toEqual({ success: true, notifiedOwner: true, pipelineForwarded: true });
  });

  it("persists a structured failure log when the Resend forward fails", async () => {
    mocks.createAuditLead.mockResolvedValue(undefined);
    mocks.createAuditSubmissionLog.mockResolvedValue(undefined);
    mocks.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue("resend outage"),
    });

    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.leads.submitAudit({
        name: "Rick Mendez",
        companyName: "Mendez Plumbing & Rooter",
        email: "rick@example.com",
        phone: "",
        websiteUrl: "https://mendezplumbing.example.com",
        primaryTrade: "Plumbing",
        serviceArea: "Southern California",
        projectDetails: "Need help tightening our homepage and making the mobile CTA path clearer.",
        sourcePath: "/",
        honeypot: "",
      })
    ).rejects.toThrow("Audit pipeline email failed: 500 resend outage");

    expect(mocks.createAuditSubmissionLog).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Rick Mendez",
        company: "Mendez Plumbing & Rooter",
        email: "rick@example.com",
        serviceArea: "Southern California",
        status: "failure",
        resendMessageId: null,
      })
    );
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
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
        honeypot: "",
      })
    ).rejects.toThrow("Website URL must begin with http:// or https://");

    expect(mocks.createAuditLead).not.toHaveBeenCalled();
    expect(mocks.createAuditSubmissionLog).not.toHaveBeenCalled();
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
    expect(mocks.fetch).not.toHaveBeenCalled();
  });

  it("rejects blocked email domains before forwarding", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.leads.submitAudit({
        name: "Rick Mendez",
        companyName: "Mendez Plumbing & Rooter",
        email: "rick@example.ru",
        phone: "",
        websiteUrl: "https://mendezplumbing.example.com",
        primaryTrade: "Plumbing",
        serviceArea: "Southern California",
        projectDetails: "Need help tightening our homepage and making the mobile CTA path clearer.",
        sourcePath: "/",
        honeypot: "",
      })
    ).rejects.toThrow("Please use a valid business email address.");

    expect(mocks.createAuditLead).not.toHaveBeenCalled();
    expect(mocks.createAuditSubmissionLog).not.toHaveBeenCalled();
    expect(mocks.fetch).not.toHaveBeenCalled();
  });
});

import { describe, expect, it, beforeEach, vi } from "vitest";

process.env.AUDIT_SHARED_SECRET = "bt_audit_test_secret";

import { handleAuditSecretCheck } from "./auditIntake";

describe("handleAuditSecretCheck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 204 when the supplied audit secret matches", async () => {
    const json = vi.fn();
    const end = vi.fn();
    const status = vi.fn().mockReturnValue({ json, end });

    await handleAuditSecretCheck(
      {
        headers: {
          "x-audit-shared-secret": "bt_audit_test_secret",
        },
      } as never,
      {
        status,
      } as never
    );

    expect(status).toHaveBeenCalledWith(204);
    expect(end).toHaveBeenCalled();
  });

  it("returns 401 when the supplied audit secret does not match", async () => {
    const json = vi.fn();
    const end = vi.fn();
    const status = vi.fn().mockReturnValue({ json, end });

    await handleAuditSecretCheck(
      {
        headers: {
          "x-audit-shared-secret": "wrong-secret",
        },
      } as never,
      {
        status,
      } as never
    );

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ error: "Invalid audit shared secret." });
  });
});

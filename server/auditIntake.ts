import type { Request, Response } from "express";
import { z } from "zod";

import { notifyOwner } from "./_core/notification";
import { createAuditLead } from "./db";

const blockedEmailTlds = [".ru", ".cn", ".top"] as const;
const auditRateLimitWindowMs = 60 * 60 * 1000;
const auditRateLimitMaxRequests = 3;
const auditRateLimitStore = new Map<string, number[]>();

function isBlockedEmailDomain(email: string) {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return blockedEmailTlds.some(tld => domain.endsWith(tld));
}

export const auditLeadInputSchema = z.object({
  name: z.string().trim().min(2).max(160),
  companyName: z.string().trim().min(2).max(200),
  email: z
    .string()
    .trim()
    .email()
    .max(320)
    .refine(value => !isBlockedEmailDomain(value), {
      message: "Please use a valid business email address.",
    }),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  websiteUrl: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .or(z.literal(""))
    .refine(value => !value || /^https?:\/\//.test(value), {
      message: "Website URL must begin with http:// or https://",
    }),
  primaryTrade: z.string().trim().min(2).max(120),
  serviceArea: z.string().trim().min(2).max(180),
  projectDetails: z.string().trim().min(4).max(5000),
  sourcePath: z.string().trim().max(512).optional().or(z.literal("")),
  honeypot: z.string().trim().max(200).optional().or(z.literal("")),
});

export const auditApiPayloadSchema = z.object({
  name: z.string().trim().min(2).max(160),
  company: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  website: z.string().trim().max(2048),
  trade: z.string().trim().min(2).max(120),
  service_area: z.string().trim().min(2).max(180),
  frustration: z.string().trim().min(4).max(5000),
  honeypot: z.string().trim().max(200).optional().or(z.literal("")),
});

export type AuditLeadInput = z.infer<typeof auditLeadInputSchema>;

function getAuditPipelineConfig() {
  return {
    resendApiKey: process.env.RESEND_API_KEY ?? "",
    auditInbox: process.env.AUDIT_INBOX ?? "",
    auditFromAddress: process.env.AUDIT_FROM_ADDRESS ?? "",
    auditSharedSecret: process.env.AUDIT_SHARED_SECRET ?? "",
  };
}

function getRequestIp(request: Pick<Request, "ip" | "headers">) {
  const forwardedFor = request.headers["x-forwarded-for"];
  const forwardedValue = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;

  if (typeof forwardedValue === "string" && forwardedValue.trim()) {
    return forwardedValue.split(",")[0]?.trim() || null;
  }

  return request.ip?.trim() || null;
}

function isRateLimited(ipAddress: string | null) {
  if (!ipAddress) {
    return false;
  }

  const now = Date.now();
  const recentRequests = (auditRateLimitStore.get(ipAddress) ?? []).filter(
    timestamp => now - timestamp < auditRateLimitWindowMs
  );

  if (recentRequests.length >= auditRateLimitMaxRequests) {
    auditRateLimitStore.set(ipAddress, recentRequests);
    return true;
  }

  recentRequests.push(now);
  auditRateLimitStore.set(ipAddress, recentRequests);
  return false;
}

function normalizeWebsiteUrlFromApi(rawWebsite: string) {
  const website = rawWebsite.trim();

  if (!website) {
    return "";
  }

  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

function formatAuditPipelineBody(input: AuditLeadInput, submittedAt: string) {
  return [
    "---BLUETAPE-AUDIT-v1---",
    `name: ${input.name}`,
    `company: ${input.companyName}`,
    `email: ${input.email}`,
    `website: ${input.websiteUrl || "Not provided"}`,
    `trade: ${input.primaryTrade}`,
    `service_area: ${input.serviceArea}`,
    `submitted_at: ${submittedAt}`,
    "",
    "FRUSTRATION:",
    input.projectDetails,
  ].join("\n");
}

async function sendAuditPipelineEmail(input: AuditLeadInput, submittedAt: string) {
  const { resendApiKey, auditInbox, auditFromAddress, auditSharedSecret } = getAuditPipelineConfig();

  if (!resendApiKey || !auditInbox || !auditFromAddress || !auditSharedSecret) {
    throw new Error("Audit pipeline email configuration is incomplete.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: auditFromAddress,
      to: [auditInbox],
      subject: `[AUDIT REQUEST] ${input.companyName} — ${input.serviceArea}`,
      text: formatAuditPipelineBody(input, submittedAt),
      headers: {
        "X-Bluetape-Sig": auditSharedSecret,
      },
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Audit pipeline email failed: ${response.status} ${responseText}`);
  }
}

export async function submitAuditLead(
  rawInput: AuditLeadInput,
  requestMeta?: {
    ipAddress?: string | null;
  }
) {
  const input = auditLeadInputSchema.parse(rawInput);

  if (input.honeypot) {
    throw new Error("Unable to submit the audit request.");
  }

  if (isRateLimited(requestMeta?.ipAddress ?? null)) {
    throw new Error("Too many audit requests from this connection. Please wait and try again.");
  }

  const { honeypot: _honeypot, ...persistableInput } = input;
  const normalizedInput = {
    ...persistableInput,
    phone: input.phone || null,
    websiteUrl: input.websiteUrl || null,
    sourcePath: input.sourcePath || null,
  };

  const submittedAt = new Date().toISOString();

  await createAuditLead({
    ...normalizedInput,
    notifiedOwner: 0,
  });

  await sendAuditPipelineEmail(input, submittedAt);

  const notifiedOwner = await notifyOwner({
    title: `New Blue Tape audit request from ${input.companyName}`,
    content: [
      `Name: ${input.name}`,
      `Company: ${input.companyName}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || "Not provided"}`,
      `Website: ${input.websiteUrl || "Not provided"}`,
      `Primary trade: ${input.primaryTrade}`,
      `Service area: ${input.serviceArea}`,
      `Source path: ${input.sourcePath || "/"}`,
      `Pipeline forwarded: yes`,
      `Project details: ${input.projectDetails}`,
    ].join("\n"),
  });

  return {
    success: true,
    notifiedOwner,
    pipelineForwarded: true,
  } as const;
}

export async function handleAuditRequest(request: Request, response: Response) {
  try {
    const ipAddress = getRequestIp(request);
    const payload = auditApiPayloadSchema.parse(request.body);

    const result = await submitAuditLead(
      {
        name: payload.name,
        companyName: payload.company,
        email: payload.email,
        phone: "",
        websiteUrl: normalizeWebsiteUrlFromApi(payload.website),
        primaryTrade: payload.trade,
        serviceArea: payload.service_area,
        projectDetails: payload.frustration,
        sourcePath: request.path,
        honeypot: payload.honeypot || "",
      },
      { ipAddress }
    );

    response.status(200).json({
      ok: true,
      pipelineForwarded: result.pipelineForwarded,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      response.status(400).json({ error: "Invalid audit request payload." });
      return;
    }

    const message = error instanceof Error ? error.message : "Unable to process the audit request.";
    const statusCode = /Too many audit requests/i.test(message) ? 429 : 500;
    response.status(statusCode).json({ error: message });
  }
}

export async function handleAuditSecretCheck(request: Request, response: Response) {
  const suppliedSecret = request.headers["x-audit-shared-secret"];
  const headerValue = Array.isArray(suppliedSecret) ? suppliedSecret[0] : suppliedSecret;
  const configuredSecret = getAuditPipelineConfig().auditSharedSecret;

  if (!configuredSecret || headerValue !== configuredSecret) {
    response.status(401).json({ error: "Invalid audit shared secret." });
    return;
  }

  response.status(204).end();
}

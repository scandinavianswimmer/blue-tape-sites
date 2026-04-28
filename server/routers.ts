import { z } from "zod";

import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { auditLeadInputSchema, submitAuditLead } from "./auditIntake";
import { createUnsubscribeRequest } from "./db";

const unsubscribeRequestSchema = z.object({
  email: z.string().trim().email().max(320),
  senderEmail: z.string().trim().email().max(320),
  reason: z.string().trim().max(2000).optional().or(z.literal("")),
  sourcePath: z.string().trim().max(512).optional().or(z.literal("")),
  sourceOrigin: z.string().trim().max(255).optional().or(z.literal("")),
});

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  leads: router({
    submitAudit: publicProcedure.input(auditLeadInputSchema).mutation(async ({ input, ctx }) => {
      return submitAuditLead(input, {
        ipAddress: ctx.req.ip ?? null,
      });
    }),
    submitUnsubscribeRequest: publicProcedure.input(unsubscribeRequestSchema).mutation(async ({ input }) => {
      const normalizedInput = {
        email: input.email,
        senderEmail: input.senderEmail,
        reason: input.reason || null,
        sourcePath: input.sourcePath || null,
        sourceOrigin: input.sourceOrigin || null,
        status: "pending" as const,
      };

      await createUnsubscribeRequest(normalizedInput);

      const notifiedOwner = await notifyOwner({
        title: `New unsubscribe request for ${input.email}`,
        content: [
          `Email: ${input.email}`,
          `Sender address: ${input.senderEmail}`,
          `Source origin: ${input.sourceOrigin || "Not provided"}`,
          `Source path: ${input.sourcePath || "/unsubscribe"}`,
          `Reason: ${input.reason || "Not provided"}`,
        ].join("\n"),
      });

      return {
        success: true,
        notifiedOwner,
      } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;

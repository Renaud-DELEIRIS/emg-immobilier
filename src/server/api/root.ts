/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getIpFromRequest } from "~/utils/server/getIpFromRequest";
import {
  getSession,
  getVersion,
  initSession,
  initVersion,
  updateTrackingStepDuration,
  updateVersion,
} from "../data/session";
import { schemaData } from "~/constants/lead.constant";
import { schemaStep } from "~/constants/step.constant";

dayjs.extend(utc);
dayjs.extend(timezone);

export const appRouter = createTRPCRouter({
  fetchSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string().nullable(),
        versionId: z.string().nullable(),
        urlParams: z.record(z.string()),
        isBot: z.boolean(),
        isMobile: z.boolean(),
        formVersion: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const ip = getIpFromRequest(ctx.req!);
      let session = await getSession(input.sessionId);
      if (!session) {
        session = await initSession();
      }
      let version = await getVersion(input.versionId);
      if (!version) {
        version = await initVersion({
          ip: ip ?? "",
          gtmParams: input.urlParams,
          isBot: input.isBot,
          isMobile: input.isMobile,
          sessionId: session.id,
          formVersion: input.formVersion,
        });
      }
      return { version, session };
    }),
  updateSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        versionId: z.string(),
        data: schemaData.partial(),
        currentStep: schemaStep,
      })
    )
    .mutation(async ({ input }) => {
      const { sessionId, versionId, data, currentStep } = input;
      await updateVersion(sessionId, versionId, data, currentStep);
    }),
  trackDurationStep: publicProcedure
    .input(
      z.object({
        versionId: z.string(),
        stepId: z.string(),
        duration: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { versionId, stepId, duration } = input;
      await updateTrackingStepDuration(versionId, stepId, duration);
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

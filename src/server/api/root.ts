/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import mime from "mime-types";
import { z } from "zod";
import { schemaData } from "~/constants/lead.constant";
import { schemaStep } from "~/constants/step.constant";
import { env } from "~/env.mjs";
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

dayjs.extend(utc);
dayjs.extend(timezone);

const s3 = new S3({
  region: "eu-central-2",
  credentials: {
    accessKeyId: env.AWS_PUBLIC,
    secretAccessKey: env.AWS_SECRET,
  },
});

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
  createPresignedUrl: publicProcedure
    .input(
      z.object({
        token: z.string(),
        filename: z.string(),
        contentType: z.string().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const { token, filename, contentType } = input;
      const ext = contentType ? mime.extension(contentType) : null;
      const key = `comparea-maladie-frontalier/${token}/${filename}${
        ext ? `.${ext}` : ""
      }`;
      const command = new PutObjectCommand({
        Bucket: "emg-dashboard",
        Key: key,
        ...(contentType ? { ContentType: contentType } : undefined),
        ...(contentType
          ? {
              ContentDisposition: `inline; filename=${filename}${
                ext ? `.${ext}` : ""
              }`,
            }
          : undefined),
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 30 });
      return {
        key,
        url,
        headers: {
          ...(contentType ? { "Content-Type": contentType } : undefined),
          ...(contentType
            ? {
                "Content-Disposition": `inline; filename=${filename}${
                  ext ? `.${ext}` : ""
                }`,
              }
            : undefined),
        },
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

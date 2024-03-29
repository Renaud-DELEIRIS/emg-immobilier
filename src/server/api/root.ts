/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import mime from "mime-types";
import { z } from "zod";
import { Offre } from "~/components/steps/result/ResultCard";
import { schemaData } from "~/constants/lead.constant";
import { schemaStep } from "~/constants/step.constant";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetOffer } from "~/type/getoffer.type";
import { formatAmount } from "~/utils/money";
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

type Vehicle = {
  brand: string;
  description: string;
  firstRegistrationYears: number[];
  typeId: number;
};

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

  createHypothequeLead: publicProcedure
    .input(
      z.object({
        gtmparams: z.record(z.string().optional()).optional(),
        idlead: z.string().optional(),
        idtracking: z.string().optional(),
        data: schemaData,
      })
    )
    .mutation(async ({ input: { data, ...input } }) => {
      const url = env.NEXT_PUBLIC_APIV2_ROOT + "/hypotheque/createlead";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...input,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating lead");
      }

      const json = (await response.json()) as string;
      return json;
    }),

  updateLead: publicProcedure
    .input(
      z.object({
        idlead: z.string(),
        data: schemaData.partial(),
      })
    )
    .mutation(async ({ input }) => {
      const url = env.NEXT_PUBLIC_APIV2_ROOT + "/hypotheque/createlead";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idlead: input.idlead,
          ...input.data,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating lead");
      }
      return true;
    }),

  fixRdv: publicProcedure
    .input(
      z.object({
        typeRdv: z.string(),
        dateRdv: z.string(),
        tz: z.string(),
        company: z.string(),
        telephone: z.string(),
        email: z.string(),
        name: z.string(),
        firstname: z.string(),
        idlead: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const url = env.NEXT_PUBLIC_APIV2_ROOT + "/hypotheque/fixrdv";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error("Error fixing rdv");
      }
      return true;
    }),

  sendSmsCode: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ input }) => {
      const url =
        env.NEXT_PUBLIC_APIV2_ROOT +
        "/verifyleadv2?telephone=" +
        input.phone.replace("+", "%2B");

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error sending sms");
      }
      const data = (await response.json()) as { code: number };
      return data.code;
    }),

  beCalled: publicProcedure
    .input(z.object({ phone: z.string(), idlead: z.string().optional() }))
    .mutation(async ({ input }) => {
      const url =
        env.NEXT_PUBLIC_APIV2_ROOT +
        "/hypotheque/becalled?telephone=" +
        input.phone +
        (input.idlead ? "&idlead=" + input.idlead : "");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error sending sms");
      }
      return true;
    }),

  getOffers: publicProcedure
    .input(
      z.object({
        revenues: z.number(),
        apport: z.number(),
        totalPret: z.number(),
      })
    )
    .query(async ({ input }) => {
      const b64 = Buffer.from(JSON.stringify(input)).toString("base64");
      const url = "https://scrapping.emgsa.ch/?domain=hypotheque&p=" + b64;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error getting offer");
      }
      const data = (await response.json()) as GetOffer;
      const offers: Offre[] = [];

      // BCBE
      if (data.bcbe)
        offers.push({
          name: "Bcbe",
          img: "/logo/bcbe.svg",
          interest: isNaN(parseFloat(data.bcbe.interest_rate))
            ? 5
            : parseFloat(data.bcbe.interest_rate),
          mensual_payment: parseFloat(data.bcbe.mensual_payment),
          advantages: [
            {
              key_title: "interest",
              value: {
                val: formatAmount(parseFloat(data.bcbe.interest), false),
              },
              active: true,
            },
            {
              key_title: "additional_cost",
              value: {
                val: formatAmount(parseFloat(data.bcbe.additional_cost), false),
              },
              active: true,
            },
          ],
        });

      // migros
      if (data.migros)
        offers.push({
          name: "Migros",
          img: "/logo/migros.png",
          interest: parseFloat(data.migros["7years_interest"]) || 5,
          mensual_payment: parseFloat(data.migros.mensual_payment),
          advantages: [
            {
              key_title: "ammortissement",
              value: {
                val: formatAmount(parseFloat(data.migros.amortization), false),
              },
              active: true,
            },
            {
              key_title: "interest_7years",
              value: {
                val: data.migros["7years_interest"] + "%",
              },
              active: true,
            },
            {
              key_title: "interest_10years",
              value: {
                val: data.migros["10years_interest"] + "%",
              },
              active: true,
            },
          ],
        });

      // swisslife
      if (data.swisslife && data.swisslife.interest_rate)
        offers.push({
          name: "Swisslife",
          img: "/logo/swisslife.svg",
          interest: isNaN(parseFloat(data.swisslife.interest_rate))
            ? null
            : parseFloat(data.swisslife.interest_rate),
          mensual_payment: parseFloat(data.swisslife.mensual_payment),
          advantages: [
            {
              key_title: "interest",
              value: {
                val: formatAmount(parseFloat(data.swisslife.interest), false),
              },
              active: true,
            },
            {
              key_title: "additional_cost",
              value: {
                val: formatAmount(
                  parseFloat(data.swisslife.additional_cost),
                  false
                ),
              },
              active: true,
            },
          ],
        });

      // ubs
      if (data.ubs)
        offers.push({
          name: "UBS",
          img: "/logo/ubs.svg",
          interest: isNaN(parseFloat(data.ubs.interest_rate))
            ? null
            : parseFloat(data.ubs.interest_rate),
          mensual_payment: parseFloat(data.ubs.mensual_payment),
          advantages: [
            {
              key_title: "interest",
              value: {
                val: formatAmount(parseFloat(data.ubs.interest), false),
              },
              active: true,
            },
            {
              key_title: "additional_cost",
              value: {
                val: formatAmount(parseFloat(data.ubs.additional_cost), false),
              },
              active: true,
            },
          ],
        });

      return offers;
    }),

  sendOffer: publicProcedure
    .input(
      z.object({
        idlead: z.string(),
        offre: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const url = env.NEXT_PUBLIC_APIV2_ROOT + "/hypotheque/sendoffer";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error("Error sending offer");
      }
      return true;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

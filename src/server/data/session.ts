import { type Prisma, type Step } from "@prisma/client";
import { initialData, type schemaData } from "~/constants/lead.constant";
import { STEPS } from "~/constants/step.constant";
import { env } from "~/env.mjs";
import { prisma } from "../db";

export const getVersion = async (id: string | null) => {
  if (!id) return null;
  const version = await prisma.version.findUnique({ where: { id: id } });
  return version;
};

export const getSession = async (id: string | null) => {
  if (!id) return null;
  const session = await prisma.session.findUnique({ where: { id: id } });
  return session;
};

interface ParamsInitVersion {
  ip: string;
  gtmParams: Record<string, string>;
  isBot: boolean;
  isMobile: boolean;
  sessionId: string;
  formVersion: string;
}

export const initVersion = async ({
  ip,
  gtmParams,
  isBot,
  isMobile,
  sessionId,
  formVersion,
}: ParamsInitVersion) => {
  const newVersion = await prisma.version.create({
    data: {
      currentStep: {
        id: STEPS[0]!.id,
        stepNumber: 1,
        lastStep: 8,
      },
      data: initialData,
      ip,
      session: {
        connect: {
          id: sessionId,
        },
      },
      tunnel: env.NEXT_PUBLIC_TUNNEL,
      isBot: isBot,
      isMobile: isMobile,
      gtmparams: gtmParams,
      formVersion,
    },
  });
  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      updatedAt: newVersion.updatedAt,
    },
  });
  return newVersion;
};

export const initSession = async () => {
  const newSession = await prisma.session.create({
    data: {
      site: env.NEXT_PUBLIC_SITE,
    },
  });
  return newSession;
};

export const updateVersion = async (
  sessionId: string,
  versionId: string,
  data: Partial<schemaData>,
  currentStep: Step
) => {
  const currentVersion = await prisma.version.findUnique({
    where: {
      id: versionId,
    },
  });
  const updatedVersion = await prisma.version.update({
    where: {
      id: versionId,
    },
    data: {
      data: { ...(currentVersion!.data as Prisma.JsonObject), ...data },
      currentStep,
    },
  });
  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      updatedAt: updatedVersion.updatedAt,
    },
  });
};

export const updateTrackingStepDuration = async (
  versionId: string,
  stepId: string,
  duration: number
) => {
  const updatedVersion = await prisma.version.update({
    where: {
      id: versionId,
    },
    data: {
      listStepDuration: {
        push: {
          id: stepId,
          duration,
        },
      },
    },
  });
  await prisma.session.update({
    where: {
      id: updatedVersion.sessionId,
    },
    data: {
      updatedAt: updatedVersion.updatedAt,
    },
  });
};

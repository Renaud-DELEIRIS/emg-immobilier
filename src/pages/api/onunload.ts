import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { type NextApiRequest, type NextApiResponse } from "next";
import { ZodError, z } from "zod";
import { prisma } from "~/server/db";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function onUnload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const versionId = z.string().parse(req.body);
        const versionUpdated = await prisma.version.update({
          where: {
            id: versionId,
          },
          data: {
            dateLastVisibilityChange: dayjs().toDate(),
          },
        });
        await prisma.session.update({
          where: {
            id: versionUpdated.sessionId,
          },
          data: {
            updatedAt: versionUpdated.updatedAt,
          },
        });
        return res.status(200).json({ message: "success" });
      default:
        res.setHeader("Allow", ["POST"]);
        return res
          .status(405)
          .json({ message: `Method ${req.method ?? ""} Not Allowed` });
    }
  } catch (cause) {
    if (cause instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json({ message: cause.message });
    }
    if (cause instanceof ZodError) {
      return res.status(401).json({ message: JSON.stringify(cause.errors) });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

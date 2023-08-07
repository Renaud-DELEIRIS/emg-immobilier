import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_API: z.string().url(),
    NEXT_PUBLIC_SMS: z.string().url(),
    NEXT_PUBLIC_RECALL: z.string().url(),
    NEXT_PUBLIC_SCRAPPER: z.string().url(),
    NEXT_PUBLIC_LCA: z.string().url(),
    NEXT_PUBLIC_TRACKING: z.string().url(),
    NEXT_PUBLIC_GTMID: z.string(),
    NEXT_PUBLIC_TRACKING_USER_ACTIONS: z.string().url(),
    NEXT_PUBLIC_APIV2_ROOT: z.string().url(),
    NEXT_PUBLIC_APIV2: z.string().url(),
    NEXT_PUBLIC_MAPBOX: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    NEXT_PUBLIC_SMS: process.env.NEXT_PUBLIC_SMS,
    NEXT_PUBLIC_RECALL: process.env.NEXT_PUBLIC_RECALL,
    NEXT_PUBLIC_SCRAPPER: process.env.NEXT_PUBLIC_SCRAPPER,
    NEXT_PUBLIC_LCA: process.env.NEXT_PUBLIC_LCA,
    NEXT_PUBLIC_TRACKING: process.env.NEXT_PUBLIC_TRACKING,
    NEXT_PUBLIC_GTMID: process.env.NEXT_PUBLIC_GTMID,
    NEXT_PUBLIC_TRACKING_USER_ACTIONS:
      process.env.NEXT_PUBLIC_TRACKING_USER_ACTIONS,
    NEXT_PUBLIC_APIV2_ROOT: process.env.NEXT_PUBLIC_APIV2_ROOT,
    NEXT_PUBLIC_APIV2: process.env.NEXT_PUBLIC_APIV2,
    NEXT_PUBLIC_MAPBOX: process.env.NEXT_PUBLIC_MAPBOX,
  },
});

import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DATABASE_URL: z.string().url(),
    AWS_PUBLIC: z.string(),
    AWS_SECRET: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SCRAPPER: z.string().url(),
    NEXT_PUBLIC_LCA: z.string().url(),
    NEXT_PUBLIC_GTMID: z.string(),
    NEXT_PUBLIC_APIV2_ROOT: z.string().url(),
    NEXT_PUBLIC_MAPBOX: z.string(),
    NEXT_PUBLIC_SITE: z.string(),
    NEXT_PUBLIC_TUNNEL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SCRAPPER: process.env.NEXT_PUBLIC_SCRAPPER,
    NEXT_PUBLIC_LCA: process.env.NEXT_PUBLIC_LCA,
    NEXT_PUBLIC_GTMID: process.env.NEXT_PUBLIC_GTMID,
    NEXT_PUBLIC_APIV2_ROOT: process.env.NEXT_PUBLIC_APIV2_ROOT,
    NEXT_PUBLIC_MAPBOX: process.env.NEXT_PUBLIC_MAPBOX,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SITE: process.env.NEXT_PUBLIC_SITE,
    NEXT_PUBLIC_TUNNEL: process.env.NEXT_PUBLIC_TUNNEL,
    AWS_PUBLIC: process.env.AWS_PUBLIC,
    AWS_SECRET: process.env.AWS_SECRET,
  },
});

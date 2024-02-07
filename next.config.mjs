/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import i18n from "./next-i18next.config.mjs";
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  i18n: i18n.i18n,
};
export default config;

import path from "path";
import { i18nLocales } from "./i18nlocales.mjs";

/** @type {import("next-i18next").UserConfig} */
const config = {
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: { domains: [], ...i18nLocales },
  localePath: path.resolve("./public/locales/"),
};
export default config;

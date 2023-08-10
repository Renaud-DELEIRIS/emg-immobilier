import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
import { type AppType } from "next/dist/shared/lib/utils";
import "react-phone-input-2/lib/style.css";

import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { appWithTranslation } from "next-i18next";
import nexti18nConfig from "next-i18next.config.mjs";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { env } from "~/env.mjs";
import "~/styles/globals.css";
import "~/styles/loader.scss";
import { api } from "~/utils/api";

dayjs.extend(customParseFormat);
dayjs.locale(fr);

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if (!sessionStorage.getItem("createdAt"))
      sessionStorage.setItem("createdAt", new Date().toISOString());
  }, []);
  return (
    <GTMProvider
      state={{ id: env.NEXT_PUBLIC_GTMID, dataLayerName: "dataLayer" }}
    >
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </GTMProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp, nexti18nConfig));

import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
import { type AppType } from "next/dist/shared/lib/utils";
import "react-phone-input-2/lib/style.css";

import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { appWithTranslation } from "next-i18next";
import nexti18nConfig from "next-i18next.config.mjs";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import "react-phone-number-input/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GtmTrackProvider } from "~/components/provider/GmtTrack";
import { HypoCalculateurProvider } from "~/components/provider/ResultProvider";
import { env } from "~/env.mjs";
import "~/styles/globals.css";
import { api } from "~/utils/api";

dayjs.extend(customParseFormat);
dayjs.locale(fr);

const inter = Inter({
  subsets: ["latin-ext"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if (!sessionStorage.getItem("createdAt"))
      sessionStorage.setItem("createdAt", new Date().toISOString());
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <GtmTrackProvider>
        <GTMProvider
          state={{ id: env.NEXT_PUBLIC_GTMID, dataLayerName: "dataLayer" }}
        >
          <HypoCalculateurProvider>
            <div className="text-dark">
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
            </div>
            <ToastContainer />
          </HypoCalculateurProvider>
        </GTMProvider>
      </GtmTrackProvider>
    </>
  );
};

export default api.withTRPC(appWithTranslation(MyApp, nexti18nConfig));

import { type AppType } from "next/dist/shared/lib/utils";
import { LeadProvider } from "~/components/provider/LeadProvider";
import { StepsProvider } from "~/components/provider/StepsProvider";
import "react-phone-input-2/lib/style.css";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";

import "~/styles/globals.css";
import "~/styles/loader.scss";
import { ToastContainer } from "react-toastify";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <GTMProvider state={{ id: "GTM-W6DFR53", dataLayerName: "dataLayer" }}>
      <LeadProvider>
        <StepsProvider>
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
        </StepsProvider>
      </LeadProvider>
    </GTMProvider>
  );
};

export default MyApp;

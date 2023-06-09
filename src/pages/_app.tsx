import { type AppType } from "next/dist/shared/lib/utils";
import { LeadProvider } from "~/components/provider/LeadProvider";
import { StepsProvider } from "~/components/provider/StepsProvider";
import "react-phone-input-2/lib/style.css";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";

import "~/styles/globals.css";
import "~/styles/loader.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <GTMProvider state={{ id: "GTM-W6DFR53", dataLayerName: "dataLayer" }}>
      <LeadProvider>
        <StepsProvider>
          <Component {...pageProps} />
        </StepsProvider>
      </LeadProvider>
    </GTMProvider>
  );
};

export default MyApp;

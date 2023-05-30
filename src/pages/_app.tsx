import { type AppType } from "next/dist/shared/lib/utils";
import { LeadProvider } from "~/components/provider/LeadProvider";
import { StepsProvider } from "~/components/provider/StepsProvider";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <LeadProvider>
      <StepsProvider>
        <Component {...pageProps} />
      </StepsProvider>
    </LeadProvider>
  );
};

export default MyApp;

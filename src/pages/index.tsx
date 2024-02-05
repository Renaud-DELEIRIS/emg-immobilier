import dayjs from "dayjs";
import { type GetStaticProps, type NextPage } from "next";
import { useTranslation } from "next-i18next";
import nextI18nextConfig from "next-i18next.config.mjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Footer from "~/components/navigation/Footer";
import Header from "~/components/navigation/Header";
import Sidebar from "~/components/navigation/Sidebar";
import { STEPS } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";
import { useSessionStore } from "~/stores/session";
import getParamsUrl from "~/utils/client/getParamsUrl";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale ?? "fr",
        ["common", "footer", "sidebar", "frontalier", "result"],
        nextI18nextConfig
      )),
    },
  };
};
const Home: NextPage = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const activeStep = useFormStore((state) => state.currentStep);
  const getStepComponent = useFormStore((state) => state.getStepComponent);
  const [beCalled, setBeCalled] = useState(false);
  const { t } = useTranslation("common");
  const router = useRouter();

  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const versionId = useFormStore((state) => state.versionId);
  const setVersionId = useFormStore((state) => state.setVersionId);
  const setVisibleStep = useFormStore((state) => state.setVisibleStep);
  const initScroll = useFormStore((state) => state.initScroll);
  const trackDurationStep = useFormStore((state) => state.trackDurationStep);
  const initStep = useFormStore((state) => state.initStep);

  const fetchSession = useSessionStore((state) => state.fetchSession);
  const setSessionId = useSessionStore((state) => state.setSessionId);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    initStep();
    fetchSession()
      .then((r) => {
        setSessionId(r.session.id);
        setVersionId(r.version.id);
      })
      .catch((e) => console.log(e));
    setLoaded(true);
  }, []);

  useEffect(() => {
    const stepLabelFromUrl = router.query.step;
    console.log(stepLabelFromUrl);
    console.log(currentVisibleStep);
    if (
      typeof stepLabelFromUrl === "string" &&
      stepLabelFromUrl !== currentVisibleStep.id
    ) {
      const stepFromUrl = STEPS.find((s) => s.id === stepLabelFromUrl);
      if (stepFromUrl) {
        setVisibleStep(stepFromUrl.id);
      }
    } else if (!stepLabelFromUrl) {
      const queryParams = getParamsUrl();
      void router.replace({
        query: {
          ...queryParams,
          step: currentVisibleStep.id,
        },
      });
    }
    initScroll();
  }, [router.query.step]);

  useEffect(() => {
    const start = dayjs();
    return () => {
      const end = dayjs();
      const duration = end.diff(start, "second");
      trackDurationStep(currentStep, duration);
    };
  }, [currentStep]);

  // Create an event on page close that sebd api call
  const beforeUnload = () => {
    if (document.visibilityState === "hidden" && versionId) {
      navigator.sendBeacon("/api/onunload", versionId);
    }
  };
  useEffect(() => {
    window.addEventListener("visibilitychange", beforeUnload);
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("visibilitychange", beforeUnload);
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Comparea.ch - Comparateur de Bases et de Complémentaires</title>
        <meta
          name="description"
          content="Comparea.ch - Comparateur de Bases et de Complémentaires"
        />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      {loaded && (
        <main
          className={twMerge(
            "relative flex min-h-[100dvh] flex-col",
            !(
              currentVisibleStep.id === "result" ||
              currentVisibleStep.id === "loader"
            )
              ? "pt-[106px]"
              : "pt-0"
          )}
        >
          {currentVisibleStep && !!currentVisibleStep.stepInfo && (
            <>
              {currentVisibleStep.id === "result" ||
              currentVisibleStep.id === "loader" ? null : (
                <Header />
              )}
              {/* <div
              className={
                "becalled-btn container-shadow fixed bottom-4 right-4 z-20 gap-1  bg-primary p-2 font-normal text-white " +
                (beCalled
                  ? "open rounded-2xl p-4"
                  : "w-10 rounded-[50px] md:w-auto")
              }
            >
              <button
                onClick={() => setBeCalled(!beCalled)}
                className="flex items-center gap-1"
              >
                {!beCalled ? (
                  <IconPhoneFilled size={20} className="mx-auto md:mx-0" />
                ) : (
                  <div className="w-5" />
                )}
                <span className={beCalled ? "" : "hidden md:inline"}>
                  {t("BECALLED_BTN")}
                </span>
                <IconChevronDown
                  size={20}
                  className={
                    beCalled
                      ? "rotate-180 "
                      : "" + "hidden transition-all md:inline"
                  }
                />
              </button>
              <div
                className={`grid ${
                  beCalled ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                } transition-[grid-template-rows,padding]`}
              >
                <div
                  className={`overflow-hidden ${
                    beCalled
                      ? "mt-4 flex flex-col items-center gap-2 text-dark"
                      : ""
                  }`}
                >
                  <PhoneInput
                    onChange={(e: string) =>
                      changeLead({
                        phone: e,
                      })
                    }
                    inputProps={{
                      type: "tel",
                      name: "phone",
                      id: "phone",
                      autoComplete: "phone",
                    }}
                    inputClass="block !w-full border-gray-300 focus:!border-primary-500 focus:!ring-primary-500 !sm:text-sm !h-[38px] !rounded-md"
                    preferredCountries={["ch", "fr"]}
                    regions={"europe"}
                    country={"ch"}
                    containerClass="relative mt-1  h-[38px] !border-transparent"
                    value={lead.phone || ""}
                  />
                  <button
                    onClick={() =>
                      void recallResident(
                        lead.phone,
                        "Recall asked at step " + activeStep.id
                      ).then(() => {
                        toast.success(t("BECALLED_SUCCESS"));
                        setBeCalled(false);
                      })
                    }
                    className="flex items-center gap-1 text-base text-white"
                  >
                    <IconPhoneCall size={20} />
                    {t("BECALLED_BTN_CALL")}
                  </button>
                </div>
              </div>
            </div> */}
              <div
                className={twMerge(
                  "relative mx-auto flex w-full flex-1  scroll-m-0 gap-[60px] px-4",
                  !(
                    currentVisibleStep.id === "result" ||
                    currentVisibleStep.id === "loader"
                  ) && "max-w-[1070px]"
                )}
              >
                {getStepComponent()}
                {currentVisibleStep.id === "result" ||
                currentVisibleStep.id === "loader" ? null : (
                  <Sidebar></Sidebar>
                )}
              </div>
              <div className="hidden md:block">
                <Footer />
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Home;

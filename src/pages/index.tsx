import { Dialog, Transition } from "@headlessui/react";
import {
  IconChevronDown,
  IconMenu2,
  IconPhoneCall,
  IconPhoneFilled,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { type GetStaticProps, type NextPage } from "next";
import { useTranslation } from "next-i18next";
import nextI18nextConfig from "next-i18next.config.mjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { useWindowSize } from "react-use";
import Footer from "~/components/navigation/Footer";
import Header from "~/components/navigation/Header";
import Sidebar from "~/components/navigation/Sidebar";
import { STEPS } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";
import { useSessionStore } from "~/stores/session";
import { recallResident } from "~/utils/api/recallResident";
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
  const trackDurationStep = useFormStore((state) => state.trackDurationStep);
  const initStep = useFormStore((state) => state.initStep);

  const fetchSession = useSessionStore((state) => state.fetchSession);
  const setSessionId = useSessionStore((state) => state.setSessionId);
  const [loaded, setLoaded] = useState(false);
  const [openSide, setOpenSide] = useState(false);

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

  const { width } = useWindowSize();
  const isMobile = width < 768;

  const removeStyleStep = () => {
    const steps = document.querySelector("#step-container");

    // Clear style of all steps
    const stepsChildren = steps?.children;
    if (stepsChildren) {
      for (let i = 0; i < stepsChildren.length; i++) {
        const step = stepsChildren[i];
        step!.removeAttribute("style");
      }
    }
  };

  const resizeLastStepMobile = () => {
    const steps = document.querySelector("#step-container");
    const stepsChildren = steps?.children;
    if (stepsChildren) {
      const lastStep = stepsChildren[stepsChildren.length - 1];

      if (lastStep) {
        const height =
          window.innerHeight -
          64 -
          144 +
          (currentVisibleStep.id === "adherent" ? 180 : 0);
        (lastStep as HTMLElement).style.minHeight = height + "px";
      }
    }
  };

  useEffect(() => {
    removeStyleStep();
    if (isMobile) {
      setTimeout(() => {
        resizeLastStepMobile();
      }, 50);
    }
  }, [isMobile, currentStep, currentVisibleStep, lead]);

  const isFrontalier =
    lead.situation === "frontalier" && lead.npa && lead.npa.key === -1;

  return (
    <>
      <Head>
        <title>Comparea.ch - Comparateur de Bases et de Complémentaires</title>
        <meta
          name="description"
          content="Comparea.ch - Comparateur de Bases et de Complémentaires"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="min-h-screen-d relative flex flex-col pt-16">
        {currentVisibleStep && !!currentVisibleStep.stepInfo && loaded && (
          <>
            <Header />
            <div
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
            </div>
            <div className="mx-auto w-full flex-1 pb-36 pt-12 md:pt-0">
              {getStepComponent()}
            </div>
            {activeStep.id !== "loader" &&
              activeStep.id !== "result" &&
              !isFrontalier && (
                <>
                  <div className="fixed right-0 top-1/3 z-10  hidden items-center xl:block 2xl:right-[5%]">
                    <Sidebar />
                  </div>
                  <button
                    className="fixed bottom-16 right-4 z-20 gap-1 rounded-2xl bg-primary p-2 font-bold text-white xl:hidden"
                    onClick={() => setOpenSide(!openSide)}
                  >
                    <IconMenu2 size={20} className="mx-auto md:mx-0" />
                  </button>
                </>
              )}
            <div className="hidden md:block">
              <Footer />
            </div>
          </>
        )}
        <Transition appear show={openSide} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40"
            onClose={() => setOpenSide(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30 backdrop-blur-[5px]" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4  text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <Sidebar
                      onClose={() => {
                        setOpenSide(false);
                      }}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
      <div className="md:hidden">
        <Footer />
      </div>
    </>
  );
};

export default Home;

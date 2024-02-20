import dayjs from "dayjs";
import { type GetStaticProps, type NextPage } from "next";
import nextI18nextConfig from "next-i18next.config.mjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Footer from "~/components/navigation/Footer";
import Header from "~/components/navigation/Header";
import Sidebar from "~/components/navigation/Sidebar";
import { useFormStore } from "~/stores/form";
import { useSessionStore } from "~/stores/session";
import { StepComponent } from "~/stores/StepComponent";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale ?? "fr",
        ["common", "footer", "step", "sidebar", "header"],
        nextI18nextConfig
      )),
    },
  };
};
const Home: NextPage = () => {
  const router = useRouter();

  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const versionId = useFormStore((state) => state.versionId);
  const setVersionId = useFormStore((state) => state.setVersionId);
  const trackDurationStep = useFormStore((state) => state.trackDurationStep);
  const initStep = useFormStore((state) => state.initStep);
  const onRouterChange = useFormStore((state) => state.onRouterChange);
  const formLoaded = useFormStore((state) => state.loaded);
  const [loaded, setLoaded] = useState(false);
  const fetchSession = useSessionStore((state) => state.fetchSession);
  const setSessionId = useSessionStore((state) => state.setSessionId);

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

  // On router change update visible step
  useEffect(() => {
    if (router.query.step && formLoaded && loaded) {
      onRouterChange();
    }
  }, [router.query]);

  const displayHeader = currentVisibleStep.id !== "loader";
  const displaySidebar =
    currentVisibleStep.id !== "result" &&
    currentVisibleStep.id !== "loader" &&
    currentVisibleStep.id !== "verif";

  return (
    <>
      <Head>
        <title>Déclaration en ligne - Digitaxe</title>
        <meta name="description" content="Déclaration en ligne - Digitaxe" />
      </Head>
      {formLoaded && loaded && (
        <main
          className={twMerge(
            "relative flex min-h-[100dvh] flex-col",
            displayHeader ? "pt-[106px]" : "pt-0"
          )}
        >
          {currentVisibleStep && (
            <>
              {displayHeader && <Header />}

              <div
                className={twMerge(
                  "relative mx-auto flex w-full flex-1 scroll-m-0  justify-center gap-[60px] px-4 pb-[40px]"
                )}
              >
                <StepComponent />
                {displaySidebar && (
                  <div className="hidden xl:block">
                    <aside className="sticky top-[106px] flex h-fit w-[340px] flex-col gap-4">
                      <Sidebar />
                    </aside>
                  </div>
                )}
              </div>
              <Footer />
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Home;

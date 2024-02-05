import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState, type FC } from "react";
import { useFormStore } from "~/stores/form";
import { StepTitle } from "../StepContainer";

const partnaire = [
  "/logo/LOGO_PARTENAIRE-10.png",
  "/logo/LOGO_PARTENAIRE-22.png",
  "/logo/LOGO_PARTENAIRE-40.png",
  "/logo/LOGO_PARTENAIRE-41.png",
  "/logo/LOGO_PARTENAIRE-46.png",
];

const appearAnimation = 400;
const processAnimationTime = 6800;
const totalAnimationTime = appearAnimation + processAnimationTime;
const Loading: FC = () => {
  const { t } = useTranslation("common");
  const [show, setShow] = useState(true);
  const nextStep = useFormStore((state) => state.nextStep);
  const [partnaireToShow, setPartnaireToShow] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    scrollTo(0, 0);
    const interval = setInterval(() => {
      setPartnaireToShow((prev) => {
        if (prev === partnaire.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, totalAnimationTime / partnaire.length);

    const appear = setTimeout(() => {
      setHasStarted(true);
    }, appearAnimation);

    const time = setTimeout(() => {
      nextStep("loader");
    }, 6800);
    return () => {
      clearInterval(interval);
      clearTimeout(appear);
      clearTimeout(time);
    };
  }, [show]);

  return (
    <>
      {/* <button
        className="fixed left-20 top-20"
        onClick={() => {
          setShow(false);
          setHasStarted(false);

          setTimeout(() => setShow(true), 10);
        }}
      >
        Relaunch animation
      </button> */}
      {show && (
        <motion.div
          className="mx-auto flex w-full max-w-[350px] flex-1 flex-col items-center justify-center text-center md:max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative mb-[22px] flex h-40 w-40 items-end justify-center overflow-hidden rounded-full">
            {/* Scale and come from under */}
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: -100, opacity: 0 }}
              transition={{ duration: appearAnimation / 1000 }}
            >
              <Image
                src={"/mascotte/doctor.png"}
                width={136}
                height={136}
                alt="mascotte"
              />
            </motion.div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
              className="absolute h-full w-full"
            >
              <path
                opacity="0.15"
                d="M160 80C160 124.183 124.183 160 80 160C35.8172 160 0 124.183 0 80C0 35.8172 35.8172 0 80 0C124.183 0 160 35.8172 160 80ZM6.4 80C6.4 120.648 39.3518 153.6 80 153.6C120.648 153.6 153.6 120.648 153.6 80C153.6 39.3518 120.648 6.4 80 6.4C39.3518 6.4 6.4 39.3518 6.4 80Z"
                fill="url(#paint0_linear_983_2754)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_983_2754"
                  x1="0.363635"
                  y1="0.363673"
                  x2="159.909"
                  y2="159.909"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0CBCB0" />
                  <stop offset="1" stop-color="#0CBCB0" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* make the parent border turn */}
            {hasStarted && (
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                height="160"
                viewBox="0 0 160 160"
                fill="none"
                className="absolute h-full w-full animate-spin"
              >
                <path
                  d="M156.8 80C158.567 80 160.007 78.5667 159.936 76.8008C159.559 67.387 157.522 58.105 153.91 49.3853C149.89 39.6793 143.997 30.8601 136.569 23.4315C129.14 16.0028 120.321 10.11 110.615 6.08964C101.895 2.47784 92.613 0.440739 83.1992 0.0639908C81.4333 -0.00668197 80 1.43269 80 3.2C80 4.96731 81.4334 6.39274 83.1991 6.46956C91.7721 6.84253 100.222 8.71233 108.165 12.0025C117.095 15.7012 125.209 21.1225 132.043 27.9569C138.877 34.7913 144.299 42.9049 147.998 51.8345C151.288 59.7776 153.157 68.2279 153.53 76.8009C153.607 78.5666 155.033 80 156.8 80Z"
                  fill="#0CBCB0"
                />
              </motion.svg>
            )}
          </div>
          <StepTitle>{t("STEP_LOADER_TITLE")}</StepTitle>
          <span>{t("STEP_LOADER_DESCRIPTION")}</span>
          <div className="relative mt-[18px] h-10 w-40 opacity-50">
            <AnimatePresence>
              <motion.img
                key={partnaireToShow}
                src={partnaire[partnaireToShow]}
                alt="partnaire"
                className="absolute left-0 right-0 top-0 mx-auto h-10 w-40 object-contain"
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: -100 }}
                transition={{ duration: 0.5 }}
                width={160}
                height={40}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Loading;

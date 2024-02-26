import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState, type FC } from "react";
import { useFormStore } from "~/stores/form";
import EmgLoader from "../icon/EmgLoader";
import Logo from "../icon/Logo";
import { StepTitle } from "./StepContainer";

const partnaire = [
  "/logo/42.png",
  "/logo/43.png",
  "/logo/44.png",
  "/logo/45.png",
  "/logo/47.png",
];

const appearAnimation = 200;
const processAnimationTime = 6800;
const totalAnimationTime = appearAnimation + processAnimationTime;
const Loading: FC = () => {
  const { t } = useTranslation("step");
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
    }, totalAnimationTime);
    return () => {
      clearInterval(interval);
      clearTimeout(appear);
      clearTimeout(time);
    };
  }, [show]);

  return (
    <>
      <Image
        src={"/logo/loader_back.svg"}
        width={630}
        height={630}
        alt="loader"
        className="absolute  bottom-0 right-0 mx-auto opacity-80"
      />
      {show && (
        <motion.div
          className="relative mx-auto flex w-full max-w-[350px] flex-1 flex-col items-center justify-center text-center md:max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mb-9 scale-150 overflow-hidden">
            {/* Scale and come from under */}
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: -100, opacity: 0 }}
              transition={{ duration: appearAnimation / 1000 }}
            >
              <Logo />
            </motion.div>
          </div>
          <StepTitle>{t("loader.title")}</StepTitle>
          <span>{t("loader.subtitle")}</span>
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
      <div className="mb-9 flex w-full justify-center">
        <EmgLoader />
      </div>
    </>
  );
};

export default Loading;

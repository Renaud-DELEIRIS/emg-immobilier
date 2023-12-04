import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState, type FC } from "react";
import { useFormStore } from "~/stores/form";

const loadingSteps = [
  "LOADING_STEP_1",
  "LOADING_STEP_2",
  "LOADING_STEP_3",
  "LOADING_STEP_4",
];

const APPEAR_DELAY = 0.2;
const APPEAR_DURATION = 0.4;
const TEXT_INIT_DURATION = 0.2;
const TEXT_INIT_DELAY = APPEAR_DELAY + APPEAR_DURATION + 0.4;
const PROGRESS_DELAY = TEXT_INIT_DURATION + 0.2;
const PROGRESS_DURATION = 0.35;
const CHECK_DELAY = PROGRESS_DELAY + PROGRESS_DURATION + 0.1;
const CHECK_DURATION = 0.3;
const TIMEOUT_AFTER_CHECK = 0.2;
const TOTAL_TIME = CHECK_DELAY + CHECK_DURATION + TIMEOUT_AFTER_CHECK;
const REDIRECT_AFTER_TIMEOUT = 0.3;

const TRUST_DELAY = APPEAR_DELAY + 0.2;
const TRUST_DURATION = 0.8;

const Loading: FC = () => {
  const { t } = useTranslation("common");
  const [show, setShow] = useState(true);
  const nextStep = useFormStore((state) => state.nextStep);

  useEffect(() => {
    scrollTo(0, 0);
    const time = setTimeout(() => {
      nextStep("loader");
    }, TOTAL_TIME * 1000 * loadingSteps.length + REDIRECT_AFTER_TIMEOUT * 1000 + TEXT_INIT_DELAY * 1000);
    return () => clearTimeout(time);
  }, [show]);

  return (
    <>
      {/* <button
        className="fixed left-20 top-20"
        onClick={() => {
          setShow(false);
          setTimeout(() => setShow(true), 10);
        }}
      >
        Relaunch animation
      </button> */}
      {show && (
        <motion.div
          className="mx-auto mt-9 flex w-full max-w-[350px] flex-col justify-center md:mt-16 md:max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: APPEAR_DELAY, duration: APPEAR_DURATION }}
        >
          <motion.h1
            className="text-center text-base font-bold text-dark md:text-[22px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: APPEAR_DELAY, duration: APPEAR_DURATION }}
          >
            {t("LOADING_TITLE")}
          </motion.h1>
          <ul className="mt-8 flex flex-col gap-5 md:mt-12">
            {loadingSteps.map((step, index) => (
              <li
                className="flex items-center justify-between gap-2"
                key={index}
              >
                <motion.span
                  className="font-sans text-xs text-dark md:text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: TEXT_INIT_DELAY + index * TOTAL_TIME,
                    duration: TEXT_INIT_DURATION,
                  }}
                >
                  {t(step)}
                </motion.span>
                <div className="flex items-center gap-1.5 md:gap-2.5">
                  <motion.div
                    className="relative h-[3.5px] w-32 rounded-md bg-grey-200 md:h-1.5 md:w-[212px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: TEXT_INIT_DELAY + index * TOTAL_TIME,
                      duration: TEXT_INIT_DURATION,
                    }}
                  >
                    <motion.div
                      className="absolute h-full w-0 rounded-md bg-green"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay:
                          PROGRESS_DELAY + index * TOTAL_TIME + TEXT_INIT_DELAY,
                        duration: PROGRESS_DURATION,
                      }}
                    />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: CHECK_DELAY + index * TOTAL_TIME + TEXT_INIT_DELAY,
                      duration: CHECK_DURATION,
                    }}
                  >
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="scale-90 md:scale-100"
                    >
                      <path
                        d="M5.16624 16.5108C4.23016 15.4591 3.47401 14.4304 2.74358 13.4341C2.07614 12.5282 1.49741 11.5602 1.0154 10.5435C0.713708 9.92652 0.580173 9.30183 1.23365 8.90019C3.10645 7.74927 3.49023 8.84821 4.50816 10.1233C5.11154 10.8789 6.00127 12.1248 6.55875 12.912C7.09126 13.6638 7.74043 12.3069 7.99959 11.9241C8.92068 10.5635 11.3147 7.23244 12.3039 6.00116C13.2431 4.83229 16.2746 1.55773 16.8397 1.03689C17.3207 0.593411 18.3363 -0.379314 19.0193 0.157297C19.737 0.721109 20.0876 1.79285 19.5831 2.4897C18.7045 3.70288 17.3245 4.85697 16.3697 6.01214C14.4368 8.35047 12.6068 10.871 10.8503 13.3807C10.2534 14.2335 9.4153 15.6619 8.89501 16.5868C7.92174 18.317 7.06688 18.6463 5.16624 16.5108Z"
                        fill="#00B67A"
                      />
                    </svg>
                  </motion.span>
                </div>
              </li>
            ))}
          </ul>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: TRUST_DELAY,
              duration: TRUST_DURATION,
            }}
            className="mt-20 flex justify-center md:mt-40"
          >

          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Loading;

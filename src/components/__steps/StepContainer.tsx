import Image from "next/image";
import type DefaultProps from "~/types/DefaultProps";
import { motion } from "framer-motion";
import { useEffect, type ReactElement } from "react";
import { type StepId } from "~/constants/step.constant";
import { useSteps } from "../provider/StepsProvider";
import { useToggle } from "react-use";

const StepContainer = ({
  title,
  children,
  description,
  infoTitle,
  info,
  className = "",
  stepId,
  id,
}: {
  title: string;
  description?: ReactElement | string;
  info?: string;
  infoTitle?: string;
  stepId: StepId;
} & DefaultProps) => {
  const { activeStep, increaseSignal } = useSteps();
  const active = activeStep.id === stepId;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={"mx-auto flex w-full flex-col " + className}
      id={id ?? stepId}
    >
      {active && (
        <>
          <div className="relative mb-2 flex items-center">
            <Image
              src={"/portrait.png"}
              alt="Assistance"
              width={50}
              height={50}
              className="h-10 w-10 rounded-full border md:absolute md:-left-16 md:h-12 md:w-12"
            ></Image>
            <div className="absolute left-7 top-0.5 h-4 w-4 rounded-full border-2 border-white bg-primary md:-left-7 md:top-5"></div>
            <p className="ml-2 font-extrabold text-dark md:ml-0">Emma</p>
          </div>
          <p className="mb-2 text-dark">{description}</p>
        </>
      )}
      <h1 className="mb-4 text-base font-extrabold leading-[1.6] text-dark md:leading-[1.4]">
        {title}
      </h1>

      <div className="w-full">{children}</div>
      {info && (
        <div className="mt-8 flex w-full flex-row items-center rounded-lg bg-[#00c49b14] p-3">
          <div className="ml-2">
            {infoTitle && (
              <h2 className="text-sm font-semibold text-primary-800">
                {infoTitle}
              </h2>
            )}
            {info && <p className="text-sm text-primary-700">{info}</p>}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StepContainer;

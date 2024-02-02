import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { type StepId } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";
import type DefaultProps from "~/types/DefaultProps";

export const StepTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className="text-[22px] font-semibold leading-[normal]">
      {children}
    </span>
  );
};

export const StepDescription: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className="text-[16px] font-normal leading-[22px] text-grey">
      {children}
    </span>
  );
};

const StepContainer = ({
  title,
  children,
  infoTitle,
  info,
  className = "",
  description,
  stepId,
  id,
  forceActive = false,
}: {
  title?: string;
  description?: React.ReactNode | string;
  info?: string;
  infoTitle?: string;
  stepId: StepId;
  forceActive?: boolean;
} & DefaultProps) => {
  const activeStep = useFormStore((state) => state.currentVisibleStep);
  const active = forceActive ? forceActive : activeStep.id === stepId;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={twMerge(
        "flex w-full flex-col",
        active && "min-h-[calc(100dvh-210px)]",
        className
      )}
      id={id ?? stepId}
    >
      {title && (
        <div className="mb-[20px] flex flex-col gap-[10px]">
          <StepTitle>{title}</StepTitle>
          {description && <StepDescription>{description}</StepDescription>}
        </div>
      )}

      {children}
      {info && (
        <div className="mt-8 flex w-full flex-row items-center rounded-lg bg-[#00c49b14] p-3">
          <div className="ml-2">
            {infoTitle && (
              <h2 className="text-primary-800 text-sm font-semibold">
                {infoTitle}
              </h2>
            )}
            {info && <p className="text-primary-700 text-sm">{info}</p>}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StepContainer;

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { type StepId } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";

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
  className = "",
  description,
  stepId,
  id,
  forceActive = false,
}: {
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  stepId: StepId;
  forceActive?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const currentStep = useFormStore((state) => state.currentStep);
  const active = forceActive ? forceActive : currentStep.id === stepId;

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
    </motion.div>
  );
};

export default StepContainer;

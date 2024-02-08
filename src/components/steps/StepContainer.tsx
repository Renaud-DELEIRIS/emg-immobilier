import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { isLastStepDisplayed, type StepId } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
  info,
}: {
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  stepId: StepId;
  forceActive?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
  info?: React.ReactNode;
}) => {
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const lead = useFormStore((state) => state.data);
  const isMaxSize =
    isLastStepDisplayed(stepId, currentStep.id, lead) &&
    currentVisibleStep.id === stepId;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={twMerge(
        "flex w-full flex-col",
        isMaxSize && "min-h-[calc(100dvh-210px)]",
        className
      )}
      id={id ?? stepId}
    >
      {title && (
        <div className="flex items-start justify-between gap-[10px]">
          <div className="mb-[20px] flex flex-col gap-[10px]">
            <StepTitle>{title}</StepTitle>
            {description && <StepDescription>{description}</StepDescription>}
          </div>
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger data-nofocus>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    className="transition-all hover:opacity-80"
                  >
                    <rect
                      x="6"
                      y="6"
                      width="24"
                      height="24"
                      rx="12"
                      fill="#0CBCB0"
                    />
                    <rect
                      x="3"
                      y="3"
                      width="30"
                      height="30"
                      rx="15"
                      stroke="#0CBCB0"
                      strokeOpacity="0.1"
                      strokeWidth="6"
                    />
                    <path
                      d="M17.6324 22.0884C16.9462 22.0884 16.3906 22.6603 16.3906 23.3465C16.3906 24.0164 16.9298 24.6046 17.6324 24.6046C18.335 24.6046 18.8905 24.0164 18.8905 23.3465C18.8905 22.6603 18.3187 22.0884 17.6324 22.0884Z"
                      fill="white"
                    />
                    <path
                      d="M17.8448 12.5625C15.639 12.5625 14.626 13.8696 14.626 14.7519C14.626 15.3892 15.1651 15.6833 15.6063 15.6833C16.4886 15.6833 16.1292 14.4252 17.7958 14.4252C18.6127 14.4252 19.2663 14.7847 19.2663 15.5363C19.2663 16.4186 18.3513 16.9251 17.8121 17.3826C17.3383 17.7911 16.7174 18.461 16.7174 19.8662C16.7174 20.7158 16.9461 20.9609 17.616 20.9609C18.4167 20.9609 18.58 20.6015 18.58 20.291C18.58 19.4414 18.5964 18.9512 19.4951 18.2486C19.9362 17.9055 21.3251 16.7944 21.3251 15.2585C21.3251 13.7226 19.9362 12.5625 17.8448 12.5625Z"
                      fill="white"
                    />
                  </svg>
                </TooltipTrigger>
                <TooltipContent sideOffset={10}>{info}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      {children}
    </motion.div>
  );
};

export default StepContainer;

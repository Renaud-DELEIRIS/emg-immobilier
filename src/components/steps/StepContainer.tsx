import { IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "next-i18next";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import {
  getStepById,
  isLastStepDisplayed,
  type StepId,
} from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";
import { Alert } from "../feedback/alert";

export const StepTitle: React.FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ children, className }) => {
  return (
    <span
      className={twMerge(
        "text-[22px] font-semibold leading-[normal]",
        className
      )}
    >
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
  withTitle = true,
  children,
  className = "",
  withDescription = false,
  stepId,
  id,
  withInfo = true,
}: {
  stepId: StepId;
  forceActive?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
  withInfo?: boolean;
  withTitle?: boolean;
  withDescription?: boolean;
}) => {
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const lead = useFormStore((state) => state.data);
  const backStep = useFormStore((state) => state.backStep);
  const { t: tCommon } = useTranslation("common");
  const { t } = useTranslation("step");
  const stepWithError = useFormStore((state) => state.stepWithError);
  const isErrored = stepWithError.includes(stepId);
  const withBackButton = getStepById(stepId).newTab;
  const isMaxSize =
    isLastStepDisplayed(stepId, currentStep.id, lead) &&
    currentVisibleStep.id === stepId;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={twMerge(
        "flex w-full flex-col",
        isMaxSize && "min-h-[calc(100dvh-190px)] md:min-h-[calc(100dvh-250px)]",
        className
      )}
      id={id ?? stepId}
      data-stepcontainer
    >
      {withBackButton && (
        <button
          className="mb-8 flex h-11 w-fit items-center gap-2.5 rounded-full border border-[#88889440] bg-[#8888941A] px-5 text-base font-semibold text-[#082623CC] transition-colors hover:bg-[#082623CC] hover:text-white md:mb-[40px]"
          onClick={() => backStep(stepId)}
        >
          <IconChevronLeft size={20} />
          {tCommon`BACK`}
        </button>
      )}
      {withTitle && (
        <div className="flex items-start justify-between gap-[10px]">
          <div className="mb-[20px] flex flex-col gap-[10px]">
            <StepTitle
              className={
                isErrored
                  ? "underline decoration-red-500 decoration-wavy underline-offset-4"
                  : ""
              }
            >
              {t(stepId + ".title")}
            </StepTitle>
            {withDescription && (
              <StepDescription>{t(stepId + ".description")}</StepDescription>
            )}
          </div>
        </div>
      )}

      {children}
      {withInfo && (
        <Alert noTitle variant={"info"} className="mt-4">
          <IconInfoCircle size={22} />
          <div>
            <Trans
              i18nKey={stepId + ".info"}
              t={t}
              components={{
                li: <li />,
                ul: <ul className="list-inside list-['-_']" />,
              }}
            />
          </div>
        </Alert>
      )}
    </motion.div>
  );
};

export default StepContainer;

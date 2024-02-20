import { IconCheck } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { twMerge } from "tailwind-merge";
import {
  StepId,
  getFirstStepOfGroup,
  stepGroupId,
} from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";
import { formatAmount } from "~/utils/money";
import Gauge from "../gauge/Gauge";
import HypoCalculateur from "../hypoCalculateur/hypoCalculateur";
import { EMGIconInforCircle } from "../icon/IconInfoCircle";
import { useHypoCalculateur } from "../provider/ResultProvider";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const lead = useFormStore((state) => state.data);
  const currentStep = useFormStore((state) => state.currentStep);
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const setVisibleStep = useFormStore((state) => state.setVisibleStep);
  const resetStep = useFormStore((state) => state.resetStep);

  const currentStepGroup = currentStep.group;
  const groupIndex = stepGroupId.indexOf(currentStepGroup);

  const { t } = useTranslation("sidebar");
  const { t: tStep } = useTranslation("step");
  const { tauxDentement } = useHypoCalculateur();

  const getInfoComponent = () => {
    const stepWithInfo: StepId[] = [
      "canton_bien",
      "project",
      "research_budget",
    ];
    if (stepWithInfo.includes(currentVisibleStep.id)) {
      return (
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <EMGIconInforCircle />
            <span className="text-base font-semibold">{t("info")}</span>
          </div>
          <span className="text-sm">
            {tStep(currentVisibleStep.id + ".info")}
          </span>
        </div>
      );
    }
    if (currentVisibleStep.id === "bien_price")
      return (
        <div className="grid w-full place-items-center">
          <div className="flex items-center gap-2">
            <EMGIconInforCircle />
            <span className="text-base font-semibold">
              {tStep(currentVisibleStep.id + ".info")}
            </span>
          </div>
          <div
            className={`mask ${
              lead.bien_type === "house"
                ? "house"
                : lead.bien_type === "building" ||
                  lead.bien_type === "appartement"
                ? "building"
                : lead.bien_type === "construction"
                ? "construction"
                : "house"
            } my-2`}
          >
            <div
              className="filler"
              style={{
                // Height is at 100% when acquerirPrice is 2000000 and 0% when acquerirPrice is 100000
                height: `${
                  100 -
                  ((lead.bien_price - 100000) / 1900000 < 0
                    ? 0
                    : (lead.bien_price - 100000) / 1900000 > 1
                    ? 1
                    : (lead.bien_price - 100000) / 1900000) *
                    100
                }%`,
              }}
            ></div>
          </div>
          <p className="text-center text-[30px] font-bold">
            CHF {formatAmount(lead.bien_price)}
          </p>
        </div>
      );

    if (currentVisibleStep.id === "revenue")
      return (
        <div className="grid w-full place-items-center">
          <div className="flex items-center gap-2">
            <EMGIconInforCircle />
            <span className="text-base font-semibold">
              {tStep(currentVisibleStep.id + ".info")}
            </span>
          </div>
          <Gauge value={Math.max(Math.round(tauxDentement * 100), 0)} />
        </div>
      );

    if (currentVisibleStep.id === "fonds_propres")
      return (
        <div className="grid w-full place-items-center">
          <HypoCalculateur />
          <div className="mt-4 flex items-center gap-2">
            <EMGIconInforCircle />
            <span className="text-sm">
              {tStep(currentVisibleStep.id + ".info")}
            </span>
          </div>
        </div>
      );
  };

  return (
    <>
      {getInfoComponent() !== undefined && (
        <div
          className={twMerge(
            `flex h-fit w-full flex-col gap-6 rounded-lg border border-[#E6E8EC] bg-white px-4 py-6`
          )}
        >
          {getInfoComponent()}
        </div>
      )}
      <div
        className={twMerge(
          `flex h-fit w-full flex-col gap-6 rounded-lg border border-[#E6E8EC] bg-white px-4 py-6`
        )}
      >
        {onClose && (
          <div className="ml-auto">
            <button className="hover:opacity-80" onClick={onClose}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_805_5022)">
                  <path
                    opacity="0.65"
                    d="M27.5 14C27.5 21.4561 21.4561 27.5 14 27.5C6.54394 27.5 0.5 21.4561 0.5 14C0.5 6.54394 6.54394 0.5 14 0.5C21.4561 0.5 27.5 6.54394 27.5 14Z"
                    stroke="#888894"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g opacity="0.65">
                    <path
                      d="M8.64972 8.75L19.1497 19.25"
                      stroke="#888894"
                      strokeWidth="2.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.1497 8.75L8.64972 19.25"
                      stroke="#888894"
                      strokeWidth="2.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_805_5022">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        )}
        <ul className="w-full space-y-6 leading-[normal]">
          {stepGroupId.map((stepGroupId, index) => {
            const toStep = getFirstStepOfGroup(stepGroupId, lead);

            if (!toStep) return null;

            const passed = index <= groupIndex;
            return (
              <li key={stepGroupId}>
                <button
                  onClick={() => {
                    // resetStep();
                    setVisibleStep(toStep.id, {
                      bypassSameStep: true,
                      scrollToNextStep: true,
                    });
                    onClose && onClose();
                  }}
                  disabled={!passed}
                  className={"flex items-center gap-4 disabled:opacity-50"}
                >
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-full ${
                      !passed ? "bg-primary/5" : "bg-primary"
                    }`}
                  >
                    <IconCheck
                      size={20}
                      className={!passed ? "text-primary" : "text-white"}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      !passed ? "text-grey" : "text-secondary"
                    }`}
                  >
                    {t("group." + stepGroupId)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

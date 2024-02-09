import { IconCheck } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { twMerge } from "tailwind-merge";
import { getFirstStepOfGroup, stepGroupId } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const lead = useFormStore((state) => state.data);
  const currentStep = useFormStore((state) => state.currentStep);
  const setVisibleStep = useFormStore((state) => state.setVisibleStep);
  const resetStep = useFormStore((state) => state.resetStep);

  const currentStepGroup = currentStep.group;
  const groupIndex = stepGroupId.indexOf(currentStepGroup);

  const { t } = useTranslation("sidebar");

  return (
    <>
      <aside
        className={twMerge(
          `flex h-fit w-full flex-col gap-6 bg-white p-6`,
          onClose
            ? "rounded-lg"
            : "sticky top-[106px] max-w-[340px] rounded-lg border border-[#8888941A]"
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
                <g clip-path="url(#clip0_805_5022)">
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
                    setVisibleStep(toStep.id);
                    onClose && onClose();
                  }}
                  disabled={!passed}
                  className={"flex items-center gap-4 disabled:opacity-50"}
                >
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-full ${
                      !passed ? "bg-[#0CBCB01A]" : "bg-primary"
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
      </aside>
    </>
  );
};

export default Sidebar;

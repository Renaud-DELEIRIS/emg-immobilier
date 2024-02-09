import { IconCheck } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { getFirstStepOfGroup, stepGroupId } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";

const Sidebar = ({ onClose = () => null }: { onClose?: () => void }) => {
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
        className={`sticky top-[106px] hidden h-fit w-full max-w-[340px]  rounded-lg border border-[#8888941A] bg-white p-6 xl:block`}
      >
        <ul className="space-y-6 leading-[normal]">
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
                    onClose();
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

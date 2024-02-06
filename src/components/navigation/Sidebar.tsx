import { IconCheck } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { getStepById, type StepId } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";

const Sidebar = ({ onClose = () => null }: { onClose?: () => void }) => {
  const lead = useFormStore((state) => state.data);
  const activeStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const setVisibleStep = useFormStore((state) => state.setVisibleStep);

  const passed =
    currentStep.stepInfo(lead)[0] >= 0 && currentStep.stepInfo(lead)[0] <= 5
      ? 1
      : currentStep.stepInfo(lead)[0] >= 6 && currentStep.stepInfo(lead)[0] <= 9
      ? 2
      : currentStep.stepInfo(lead)[0] >= 10 &&
        currentStep.stepInfo(lead)[0] <= 11
      ? 3
      : currentStep.stepInfo(lead)[0] >= 12 &&
        currentStep.stepInfo(lead)[0] <= 13
      ? 4
      : 5;

  const isFrontalier =
    lead.situation === "frontalier" && lead.npa && lead.npa.key === -1;
  const { t } = useTranslation("sidebar");

  return (
    <>
      <aside
        className={`sticky top-[106px] hidden h-fit w-full max-w-[340px]  rounded-lg border border-[#8888941A] bg-white p-6 md:block`}
      >
        <ul className="space-y-6 leading-[normal]">
          <li>
            <button
              className="flex items-center gap-4"
              onClick={() => {
                let toStep: StepId = "car-brand";
                const activeStepInfo = currentStep.stepInfo(lead)[0];
                while (getStepById(toStep).stepInfo(lead)[0] > activeStepInfo) {
                  toStep = getStepById(toStep).previous(lead) as StepId;
                }
                setVisibleStep(toStep);
                onClose();
              }}
            >
              <div className="grid h-6 w-6 place-items-center rounded-full bg-primary">
                <IconCheck size={20} className="text-white" />
              </div>
              <span className={`text-sm font-medium text-secondary`}>
                {t("STEP_CAR_POSSESION")}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                let toStep: StepId = "package";
                const activeStepInfo = currentStep.stepInfo(lead)[0];
                while (getStepById(toStep).stepInfo(lead)[0] > activeStepInfo) {
                  toStep = getStepById(toStep).previous(lead) as StepId;
                }
                setVisibleStep(toStep);
                onClose();
              }}
              disabled={passed <= 1}
              className={"flex items-center  gap-4 disabled:opacity-50"}
            >
              <div
                className={`grid h-6 w-6 place-items-center rounded-full ${
                  passed <= 1 ? "bg-[#0CBCB01A]" : "bg-primary"
                }`}
              >
                <IconCheck
                  size={20}
                  className={passed <= 1 ? "text-primary" : "text-white"}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  passed <= 1 ? "text-grey" : "text-secondary"
                }`}
              >
                {t("STEP_CAR_USAGE")}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                let toStep: StepId = "package";
                const activeStepInfo = currentStep.stepInfo(lead)[0];
                while (getStepById(toStep).stepInfo(lead)[0] > activeStepInfo) {
                  toStep = getStepById(toStep).previous(lead) as StepId;
                }
                setVisibleStep(toStep);
                onClose();
              }}
              disabled={passed <= 2}
              className={"flex items-center  gap-4 disabled:opacity-50"}
            >
              <div
                className={`grid h-6 w-6 place-items-center rounded-full ${
                  passed <= 2 ? "bg-[#0CBCB01A]" : "bg-primary"
                }`}
              >
                <IconCheck
                  size={20}
                  className={passed <= 2 ? "text-primary" : "text-white"}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  passed <= 2 ? "text-grey" : "text-secondary"
                }`}
              >
                {t("STEP_CAR_INFORMATIONS")}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                let toStep: StepId = "package";
                const activeStepInfo = currentStep.stepInfo(lead)[0];
                while (getStepById(toStep).stepInfo(lead)[0] > activeStepInfo) {
                  toStep = getStepById(toStep).previous(lead) as StepId;
                }
                setVisibleStep(toStep);
                onClose();
              }}
              disabled={passed <= 3}
              className={"flex items-center  gap-4 disabled:opacity-50"}
            >
              <div
                className={`grid h-6 w-6 place-items-center rounded-full ${
                  passed <= 3 ? "bg-[#0CBCB01A]" : "bg-primary"
                }`}
              >
                <IconCheck
                  size={20}
                  className={passed <= 3 ? "text-primary" : "text-white"}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  passed <= 3 ? "text-grey" : "text-secondary"
                }`}
              >
                {t("STEP_CAR_COVERAGE")}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                let toStep: StepId = "package";
                const activeStepInfo = currentStep.stepInfo(lead)[0];
                while (getStepById(toStep).stepInfo(lead)[0] > activeStepInfo) {
                  toStep = getStepById(toStep).previous(lead) as StepId;
                }
                setVisibleStep(toStep);
                onClose();
              }}
              disabled={passed <= 4}
              className={"flex items-center  gap-4 disabled:opacity-50"}
            >
              <div
                className={`grid h-6 w-6 place-items-center rounded-full ${
                  passed <= 4 ? "bg-[#0CBCB01A]" : "bg-primary"
                }`}
              >
                <IconCheck
                  size={20}
                  className={passed <= 4 ? "text-primary" : "text-white"}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  passed <= 4 ? "text-grey" : "text-secondary"
                }`}
              >
                {t("STEP_CAR_INFOS")}
              </span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;

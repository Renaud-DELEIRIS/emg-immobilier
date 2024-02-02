import { IconCheck } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { getStepById, type StepId } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";

const Sidebar = ({ onClose = () => null }: { onClose?: () => void }) => {
  const lead = useFormStore((state) => state.data);
  const activeStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const setVisibleStep = useFormStore((state) => state.setVisibleStep);

  const active =
    activeStep.stepInfo(lead)[0] >= 0 && activeStep.stepInfo(lead)[0] <= 4
      ? "adherant"
      : activeStep.stepInfo(lead)[0] >= 5 && activeStep.stepInfo(lead)[0] <= 6
      ? "besoins"
      : "finalisation";

  const passed =
    currentStep.stepInfo(lead)[0] >= 0 && currentStep.stepInfo(lead)[0] <= 4
      ? "adherant"
      : currentStep.stepInfo(lead)[0] >= 5 && currentStep.stepInfo(lead)[0] <= 6
      ? "besoins"
      : "finalisation";

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
              className="flex  items-center gap-4"
              onClick={() => {
                let toStep: StepId =
                  lead.npa?.key === -1 ? "situation" : "assurance-actuelle";
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
                {t("STEP_ADHERENT")}
              </span>
            </button>
          </li>
          {isFrontalier ? (
            <li>
              <button
                onClick={() => {
                  setVisibleStep("work-hours");
                  onClose();
                }}
                disabled={passed === "adherant"}
                className={"flex items-center  gap-4 disabled:opacity-50"}
              >
                <div
                  className={`grid h-6 w-6 place-items-center rounded-full ${
                    passed === "adherant" ? "bg-[#0CBCB01A]" : "bg-primary"
                  }`}
                >
                  <IconCheck
                    size={20}
                    className={
                      passed === "adherant" ? "text-primary" : "text-white"
                    }
                  />
                </div>
                <span
                  className={`text-sm font-medium ${
                    passed === "adherant" ? "text-grey" : "text-secondary"
                  }`}
                >
                  {t("STEP_FRONTALIER")}
                </span>
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    let toStep: StepId = "package";
                    const activeStepInfo = currentStep.stepInfo(lead)[0];
                    while (
                      getStepById(toStep).stepInfo(lead)[0] > activeStepInfo
                    ) {
                      toStep = getStepById(toStep).previous(lead) as StepId;
                    }
                    setVisibleStep(toStep);
                    onClose();
                  }}
                  disabled={passed === "adherant"}
                  className={"flex items-center  gap-4 disabled:opacity-50"}
                >
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-full ${
                      passed === "adherant" ? "bg-[#0CBCB01A]" : "bg-primary"
                    }`}
                  >
                    <IconCheck
                      size={20}
                      className={
                        passed === "adherant" ? "text-primary" : "text-white"
                      }
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      passed === "adherant" ? "text-grey" : "text-secondary"
                    }`}
                  >
                    {t("STEP_BESOINS")}
                  </span>
                </button>
              </li>
              <li>
                <button
                  className="flex  items-center gap-4 disabled:opacity-50"
                  disabled={passed === "adherant" || passed === "besoins"}
                  onClick={() => {
                    setVisibleStep("name");
                    onClose();
                  }}
                >
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-full ${
                      passed === "adherant" || passed === "besoins"
                        ? "bg-[#0CBCB01A]"
                        : "bg-primary"
                    }`}
                  >
                    <IconCheck
                      size={20}
                      className={
                        passed === "adherant" || passed === "besoins"
                          ? "text-primary"
                          : "text-white"
                      }
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      passed === "adherant" || passed === "besoins"
                        ? "text-grey"
                        : "text-secondary"
                    }`}
                  >
                    {t("STEP_FINALISATION")}
                  </span>
                </button>
              </li>
            </>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;

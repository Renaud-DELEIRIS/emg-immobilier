import { getStepById, type StepId } from "~/constants/step.constant";
import { useLead } from "../provider/LeadProvider";
import { useSteps } from "../provider/StepsProvider";

const Sidebar = ({ inModal = false }) => {
  const { lead } = useLead();
  const { currentStep, activeStep, setActiveStep } = useSteps();

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

  const isFrontalier = lead.situation === "frontalier";

  return (
    <>
      <aside className={`flex flex-col ${inModal ? "" : "border-l p-7"}`}>
        <h3 className="text-xl font-bold text-dark">Mes étapes</h3>
        <p className="mt-4 text-dark">
          Cliquez pour revenir
          <br /> sur une étape
        </p>
        <ul className="leading-4 [&>li]:my-1">
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
                setActiveStep(toStep);
              }}
            >
              <div className="my-3 box-content h-2.5 w-2.5 rounded-full bg-primary" />
              <span
                className={`${
                  active === "adherant" ? "ml-2 font-bold text-primary" : ""
                }`}
              >
                Adhérant
              </span>
            </button>
          </li>
          {isFrontalier ? (
            <li>
              <button
                onClick={() => {
                  setActiveStep("work-hours");
                }}
                disabled={passed === "adherant"}
                className={"flex items-center  gap-4 disabled:opacity-50"}
              >
                <div
                  className={`my-3 box-content h-2.5 w-2.5 rounded-full ${
                    passed === "adherant" ? "bg-dark" : "bg-primary"
                  }`}
                />
                <span
                  className={`${
                    active === "besoins" ? "ml-2 font-bold text-primary" : ""
                  }`}
                >
                  Frontalier
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
                    setActiveStep(toStep);
                  }}
                  disabled={passed === "adherant"}
                  className={"flex items-center  gap-4 disabled:opacity-50"}
                >
                  <div
                    className={`my-3 box-content h-2.5 w-2.5 rounded-full ${
                      passed === "adherant" ? "bg-dark" : "bg-primary"
                    }`}
                  />
                  <span
                    className={`${
                      active === "besoins" ? "ml-2 font-bold text-primary" : ""
                    }`}
                  >
                    Besoins
                  </span>
                </button>
              </li>
              <li>
                <button
                  className="flex  items-center gap-4 disabled:opacity-50"
                  disabled={passed === "adherant" || passed === "besoins"}
                  onClick={() => setActiveStep("name")}
                >
                  <div
                    className={`my-3 box-content h-2.5 w-2.5 rounded-full ${
                      passed === "adherant" || passed === "besoins"
                        ? "bg-dark"
                        : "bg-primary"
                    }`}
                  />
                  <span
                    className={`${
                      active === "finalisation"
                        ? "ml-2 font-bold text-primary"
                        : ""
                    }`}
                  >
                    Finalisation
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

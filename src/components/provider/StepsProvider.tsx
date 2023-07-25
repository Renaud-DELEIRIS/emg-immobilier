import {
  type Step,
  STEPS,
  getNextStep,
  getStepById,
  getPreviousStep,
  isStepDisabled,
  type StepId,
} from "~/constants/step.constant";
import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import DefaultStep from "../__steps/step/DefaultStep";
import { type LeadData, useLead } from "./LeadProvider";
import For from "../__steps/step/For";
import Adherant from "../__steps/step/Adherant";
import Npa from "../__steps/step/Npa";
import Situation from "../__steps/step/Situation";
import Assurance from "../__steps/step/Assurance";
import Franchise from "../__steps/step/Franchise";
import ChoosePack from "../__steps/step/ChoosePack";
import Name from "../__steps/step/Name";
import Loader from "../__steps/step/Loader";
import Verification from "../__steps/step/Verification";
import { ResultProvider } from "../__steps/step/result/ResultProvider";
import Result from "../__steps/step/result/Result";

interface StepContext {
  currentStep: Step;
  activeStep: Step;
  steps: Step[];

  setActiveStep: (step: StepId) => void;

  increaseStep: (step: StepId, newLead?: LeadData) => void;
  decreaseStep: () => void;

  getStepComponent: () => ReactNode;

  isDisabled: () => boolean;
}

export const StepContext = createContext<StepContext>({
  currentStep: STEPS[0] as Step,
  activeStep: STEPS[0] as Step,
  steps: STEPS,

  setActiveStep: () => null,

  increaseStep: () => null,
  decreaseStep: () => null,

  getStepComponent: () => null,

  isDisabled: () => false,
});

const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<Step>(STEPS[0] as Step);
  const [activeStep, setActiveStep] = useState<Step>(STEPS[0] as Step);
  const { lead } = useLead();

  const setSteps = useCallback(
    (askedStep: Step) => {
      setActiveStep(askedStep);
      sessionStorage.setItem("step", askedStep.id);
    },
    [currentStep, lead]
  );

  useEffect(() => {
    const step = sessionStorage.getItem("step");
    const currentStep = sessionStorage.getItem("currentStep");
    if (step) {
      setActiveStep(getStepById(step));
    }
    if (currentStep) {
      setCurrentStep(getStepById(currentStep));
    }
  }, []);

  const increaseStep = useCallback(
    (step: StepId, newLead?: LeadData) => {
      console.log("increaseStep", step);
      setSteps(getNextStep(getStepById(step), newLead ?? lead));
    },
    [activeStep, setSteps]
  );

  const isDisabled = useCallback(() => {
    if (isStepDisabled(activeStep, lead)) return true;
    return false;
  }, [lead]);

  const decreaseStep = () => {
    const previousStep = getPreviousStep(activeStep, lead);
    if (previousStep) setSteps(previousStep);
  };

  const getStepComponent = () => {
    const childs: ReactNode[] = [];
    switch (activeStep.id) {
      case "situation":
      case "assurance-actuelle":
        if (activeStep.id === "situation")
          childs.push(<Situation key={"situation"} />);
        else childs.push(<Assurance key={"assurance-actuelle"} />);
      case "npa":
        childs.push(<Npa key={"npa"} />);
      case "adherent":
        childs.push(<Adherant key={"adherant"} />);
      case "for-who":
        childs.push(<For key={"for-who"} />);
        childs.push(
          <div
            className="relative mb-6 mt-12 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block"
            key={"title"}
          >
            Adhérent
          </div>
        );
    }

    // if (activeStep.id === "for-who") return <For />;
    // if (activeStep.id === "adherent") return <Adherant />;
    // if (activeStep.id === "npa") return <Npa />;
    // if (activeStep.id === "situation") return <Situation />;
    // if (activeStep.id === "assurance-actuelle") return <Assurance />;
    // if (activeStep.id === "franchise") return <Franchise />;
    // if (activeStep.id === "package") return <ChoosePack />;
    // if (activeStep.id === "name") return <Name />;
    // if (activeStep.id === "loader") return <Loader />;
    // if (activeStep.id === "verification" || activeStep.id === "result") {
    //   return (
    //     <ResultProvider>
    //       {activeStep.id === "verification" && <Verification />}
    //       <Result />
    //     </ResultProvider>
    //   );
    // }
    return (
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 md:gap-12">
        {childs.reverse()}
      </div>
    );
  };

  return (
    <StepContext.Provider
      value={{
        steps: STEPS,
        currentStep,
        activeStep,
        increaseStep,
        decreaseStep,
        getStepComponent,
        isDisabled,
        setActiveStep: (step) => setActiveStep(getStepById(step)),
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

const useSteps = () => {
  return useContext(StepContext);
};

export { StepsProvider, useSteps };

import {
  type Step,
  STEPS,
  getNextStep,
  getStepById,
  getPreviousStep,
  isStepDisabled,
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

interface StepContext {
  currentStep: Step;
  activeStep: Step;
  steps: Step[];

  increaseStep: (newLead?: LeadData) => void;
  decreaseStep: () => void;

  getStepComponent: () => ReactNode;

  isDisabled: () => boolean;
}

export const StepContext = createContext<StepContext>({
  currentStep: STEPS[0] as Step,
  activeStep: STEPS[0] as Step,
  steps: STEPS,

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
    (newLead?: LeadData) => {
      setSteps(getNextStep(activeStep, newLead ?? lead));
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
    if (activeStep.id === "for-who") return <For />;
    if (activeStep.id === "adherent") return <Adherant />;
    if (activeStep.id === "npa") return <Npa />;
    if (activeStep.id === "situation") return <Situation />;
    if (activeStep.id === "assurance-actuelle") return <Assurance />;
    if (activeStep.id === "franchise") return <Franchise />;
    if (activeStep.id === "package") return <ChoosePack />;
    if (activeStep.id === "name") return <Name />;
    return <DefaultStep />;
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

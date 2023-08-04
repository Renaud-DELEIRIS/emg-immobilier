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
import Result from "../__steps/step/result/Result";
import Verification from "../__steps/step/Verification";
import { ResultProvider } from "../__steps/step/result/ResultProvider";
import Hours from "../__steps/step/Hours";
import ResultFrontalier from "../__steps/step/frontalier/ResultFrontalier";
import Souscrire from "../__steps/step/frontalier/Souscire";
import PersonalData from "../__steps/step/frontalier/PersonalData";
import Documents from "../__steps/step/frontalier/Documents";
import Profils from "../__steps/step/frontalier/Profils";
import { IconArrowLeft } from "@tabler/icons-react";

interface StepContext {
  currentStep: Step;
  activeStep: Step;
  steps: Step[];

  increaseSignal?: boolean;

  setActiveStep: (step: StepId) => void;
  setCurrentStep: (step: StepId) => void;

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
  setCurrentStep: () => null,
});

const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<Step>(STEPS[0] as Step);
  const [activeStep, setActiveStep] = useState<Step>(STEPS[0] as Step);
  const { lead } = useLead();
  const [increaseSignal, toggle] = useState(false);

  const setSteps = useCallback(
    (askedStep: Step) => {
      setActiveStep(askedStep);
      sessionStorage.setItem("step", askedStep.id);

      if (askedStep.stepInfo(lead)[0] > currentStep.stepInfo(lead)[0]) {
        sessionStorage.setItem("currentStep", askedStep.id);
        setCurrentStep(askedStep);
      }

      toggle((prev) => !prev);
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

  const increaseStep = (step: StepId, newLead?: LeadData) => {
    const nextStep = getNextStep(getStepById(step), newLead ?? lead);
    setSteps(nextStep);

    // // Scroll smo  oth to this step #id with 100 px offset
    setTimeout(() => {
      const element = document.getElementById(nextStep.id);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offsetTop - 100,
          behavior: "smooth",
        });
      }
    }, 100);
  };

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
      case "documents":
        childs.push(<Documents key={"documents"} />);
        childs.push(
          <div className=" mt-8" key={"title"}>
            <button
              className="mb-4 flex items-center gap-1 text-primary hover:underline"
              onClick={() => {
                decreaseStep();
              }}
            >
              <IconArrowLeft size={20} />
              <span>Retour</span>
            </button>
            <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
              Documents
            </div>
          </div>
        );
        break;
      case "donnee-personnelle":
        childs.push(<PersonalData key={"personnelle"} />);
        childs.push(
          <div className=" mt-8" key={"title"}>
            <button
              className="mb-4 flex items-center gap-1 text-primary hover:underline"
              onClick={() => {
                decreaseStep();
              }}
            >
              <IconArrowLeft size={20} />
              <span>Retour</span>
            </button>
            <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
              Donnée personnelle
            </div>
          </div>
        );
        break;
      case "profils":
        childs.push(<Profils key={"profil"} />);
        childs.push(
          <div className=" mt-8" key={"title"}>
            <button
              className="mb-4 flex items-center gap-1 text-primary hover:underline"
              onClick={() => {
                decreaseStep();
              }}
            >
              <IconArrowLeft size={20} />
              <span>Retour</span>
            </button>
            <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
              Pour qui souhaitez vous souscrire ?
            </div>
          </div>
        );
        break;
      case "souscrire":
        childs.push(<Souscrire key={"souscrire"} />);
        childs.push(
          <div className=" mt-8" key={"title"}>
            <button
              className="mb-4 flex items-center gap-1 text-primary hover:underline"
              onClick={() => {
                decreaseStep();
              }}
            >
              <IconArrowLeft size={20} />
              <span>Retour</span>
            </button>
            <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
              Souscrire
            </div>
          </div>
        );
        break;
      case "work-hours":
        childs.push(<Hours key={"hours"} />);
        childs.push(
          <div
            className="relative mb-6 mt-12 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block"
            key={"title"}
          >
            Frontalier
          </div>
        );
        break;
      case "result-frontalier":
        childs.push(
          <div key={"result-frontalier"} className="md:pt-12">
            {!lead.verified && <Verification />}

            <ResultFrontalier />
          </div>
        );
        break;

      case "loader":
        childs.push(<Loader key={"loader"} />);
        break;
      case "result":
        return (
          <>
            <div className="mx-auto max-w-7xl md:py-8" key={"result"}>
              {!lead.verified && <Verification />}
              <ResultProvider>
                <Result />
              </ResultProvider>
            </div>
          </>
        );
      case "name":
        childs.push(<Name key={"name"} />);
        childs.push(
          <div
            className="relative mb-6 mt-12 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block"
            key={"title"}
          >
            Finalisation
          </div>
        );
        break;
      case "package":
        childs.push(<ChoosePack key={"package"} />);
      case "franchise":
        childs.push(<Franchise key={"franchise"} />);
        childs.push(
          <div
            className="relative mb-6 mt-12 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block"
            key={"title"}
          >
            Besoins
          </div>
        );
        break;
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
        increaseSignal,
        setCurrentStep: (step) => setCurrentStep(getStepById(step)),
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

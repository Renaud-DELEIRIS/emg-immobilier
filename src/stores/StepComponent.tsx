import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import BienPrice from "~/components/steps/BienPrice";
import BienType from "~/components/steps/BienType";
import CantonBien from "~/components/steps/CantonBien";
import Ddn from "~/components/steps/Ddn";
import DoWork from "~/components/steps/DoWork";
import Emprunteur from "~/components/steps/Emprunteur";
import FinancementActuelle from "~/components/steps/FinancementActuelle";
import FondsPropre from "~/components/steps/FondsPropre";
import Loading from "~/components/steps/Loader";
import Project from "~/components/steps/Project";
import ResearchBudget from "~/components/steps/ResearchBudget";
import ResearchZone from "~/components/steps/ResearchZone";
import ResidenceType from "~/components/steps/ResidenceType";
import Result from "~/components/steps/Result";
import Revenue from "~/components/steps/Revenue";
import Verif from "~/components/steps/Verif";
import WhichStep from "~/components/steps/WhichStep";
import { StepId, getComponentToDisplay } from "~/constants/step.constant";
import { useFormStore } from "./form";

export const StepComponent = () => {
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const lead = useFormStore((state) => state.data);

  // Map component with step Id
  const componentMap: Partial<Record<StepId, React.ReactNode>> = {
    project: <Project />,
    which_step: <WhichStep />,
    research_zone: <ResearchZone />,
    research_budget: <ResearchBudget />,
    residence_type: <ResidenceType />,
    bien_type: <BienType />,
    canton_bien: <CantonBien />,
    bien_price: <BienPrice />,
    financement_actuel: <FinancementActuelle />,
    do_work: <DoWork />,
    emprunteur: <Emprunteur />,
    ddn: <Ddn />,
    revenue: <Revenue />,
    fonds_propres: <FondsPropre />,
    loader: <Loading />,
    verif: <Verif />,
    result: <Result />,
  };

  const stepWithoutMaxwidth: StepId[] = ["result"];

  return (
    <div
      className={twMerge(
        `flex w-full flex-col gap-[40px] md:max-w-[670px]`,
        stepWithoutMaxwidth.includes(currentVisibleStep.id) && "md:max-w-none"
      )}
      id="step-container"
    >
      {getComponentToDisplay(currentVisibleStep.id, currentStep.id, lead).map(
        (c) => (
          <Fragment key={c}>{componentMap[c]}</Fragment>
        )
      )}
    </div>
  );
};

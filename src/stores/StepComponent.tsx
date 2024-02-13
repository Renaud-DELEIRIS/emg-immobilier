import { Fragment } from "react";
import CantonsWork from "~/components/steps/CantonsWork";
import Children from "~/components/steps/Children";
import Info from "~/components/steps/Info";
import Nationality from "~/components/steps/Nationality";
import Npa from "~/components/steps/Npa";
import PaysResidence from "~/components/steps/PaysResidence";
import PermisType from "~/components/steps/PermisType";
import RegimeAssuranceMaladie from "~/components/steps/RegimeAssuranceMaladie";
import SituationMarital from "~/components/steps/SituationMarital";
import SituationProfessionnelle from "~/components/steps/SituationProfessionnelle";
import Yob from "~/components/steps/Yob";
import { StepId, getComponentToDisplay } from "~/constants/step.constant";
import { useFormStore } from "./form";

export const StepComponent = () => {
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const lead = useFormStore((state) => state.data);

  // Map component with step Id
  const componentMap: Partial<Record<StepId, React.ReactNode>> = {
    pays_residence: <PaysResidence />,
    canton_work: <CantonsWork />,
    regime_assurance_maladie: <RegimeAssuranceMaladie />,
    nationality: <Nationality />,
    permis_type: <PermisType />,
    npa: <Npa />,
    situation_marital: <SituationMarital />,
    yob: <Yob />,
    children: <Children />,
    info: <Info />,
    situation_professionnelle: <SituationProfessionnelle />,
    // salary_above_120k: <SalaryAbove />,
    // salary_brut: <SalaryBrut />,
    // owner: <Owner />,
    // situation: <Situation />,
    // loader: <Loading />,
    // verif: <Verif />,
    // result: <></>,
  };

  return (
    <div
      className={`flex w-full flex-col gap-[40px] md:max-w-[670px] `}
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

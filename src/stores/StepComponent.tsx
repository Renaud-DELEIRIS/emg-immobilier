import { Fragment, type ReactNode } from "react";
import CarBrand from "~/components/steps/CarBrand";
import CarModel from "~/components/steps/CarModel";
import CarPossesion from "~/components/steps/CarPossesion";
import { StepId, getComponentToDisplay } from "~/constants/step.constant";
import { useFormStore } from "./form";

export const StepComponent = () => {
  const childs: ReactNode[] = [];

  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const lead = useFormStore((state) => state.data);

  // Map component with step Id
  const componentMap: Record<StepId, React.ReactNode> = {
    "car-possesion": <CarPossesion />,
    "car-brand": <CarBrand />,
    "car-model": <CarModel />,
    end: <></>,
    "for-who": <></>,
    name: <></>,
    npa: <></>,
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

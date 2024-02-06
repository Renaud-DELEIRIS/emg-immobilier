import { type ReactNode } from "react";
import CarBrand from "~/components/__steps/step/auto/CarBrand";
import CarModel from "~/components/__steps/step/auto/CarModel";
import CarPossesion from "~/components/__steps/step/auto/CarPossesion";
import { schemaData } from "~/constants/lead.constant";
import { StepId } from "~/constants/step.constant";

export const getStepComponent = (
  stepId: StepId,
  decreaseStep: () => void,
  lead: schemaData
) => {
  const childs: ReactNode[] = [];

  console.log(stepId);

  switch (stepId) {
    case "car-model":
      childs.push(<CarModel key={"car-model"} />);
      break;
    case "car-brand":
      console.log("here");
      childs.push(<CarBrand key={"car-brand"} />);
      break;
    case "car-possesion":
      childs.push(<CarPossesion key={"car-possesion"} />);
  }

  return (
    <div
      className={`flex w-full flex-col gap-[40px] md:min-w-[670px]`}
      id="step-container"
    >
      {childs.reverse()}
    </div>
  );
};

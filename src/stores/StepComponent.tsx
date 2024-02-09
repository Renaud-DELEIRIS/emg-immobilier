import { Fragment, useEffect } from "react";
import AlreadyAssure from "~/components/steps/AlreadyAssure";
import CarDistance from "~/components/steps/CarDistance";
import CarInfoWrapper from "~/components/steps/CarInfo/CarInfoWrapper";
import CarParkPlace from "~/components/steps/CarParkPlace";
import CarParkType from "~/components/steps/CarParkType";
import CarType from "~/components/steps/CarType";
import Carusage from "~/components/steps/CarUsage";
import Civility from "~/components/steps/Civility";
import ContractStart from "~/components/steps/ContractStart";
import Dob from "~/components/steps/Dob";
import EcoAssuranceMenage from "~/components/steps/EcoAssuranceMenage";
import Leasing from "~/components/steps/Leasing";
import Loading from "~/components/steps/Loader";
import Name from "~/components/steps/Name";
import Nationality from "~/components/steps/Nationality";
import Needs from "~/components/steps/Needs";
import ResidencyType from "~/components/steps/ResidencyType";
import { getComponentToDisplay, StepId } from "~/constants/step.constant";
import { useFormStore } from "./form";

export const StepComponent = () => {
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const lead = useFormStore((state) => state.data);

  // Map component with step Id
  const componentMap: Partial<Record<StepId, React.ReactNode>> = {
    car_type: <CarType />,
    car_info: <CarInfoWrapper />,
    car_distance: <CarDistance />,
    car_usage: <Carusage />,
    car_park_place: <CarParkPlace />,
    car_park_type: <CarParkType />,
    civility: <Civility />,
    dob: <Dob />,
    nationality: <Nationality />,
    residency_type: <ResidencyType />,
    eco_assurance_menage: <EcoAssuranceMenage />,
    car_leasing: <Leasing />,
    needs: <Needs />,
    contract_start: <ContractStart />,
    already_assure: <AlreadyAssure />,
    info: <Name />,
    loader: <Loading />,
    result: <></>,
  };

  useEffect(() => {
    console.log(
      getComponentToDisplay(currentVisibleStep.id, currentStep.id, lead)
    );
  }, []);

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

import { Fragment } from "react";
import AlreadyAssure from "~/components/steps/AlreadyAssure";
import CarBuyDate from "~/components/steps/CarBuyDate";
import CarDistance from "~/components/steps/CarDistance";
import CarParkPlace from "~/components/steps/CarParkPlace";
import CarParkType from "~/components/steps/CarParkType";
import CarType from "~/components/steps/CarType";
import Carusage from "~/components/steps/CarUsage";
import ContractStart from "~/components/steps/ContractStart";
import Leasing from "~/components/steps/Leasing";
import Loading from "~/components/steps/Loader";
import Name from "~/components/steps/Name";
import Needs from "~/components/steps/Needs";
import { StepId, getComponentToDisplay } from "~/constants/step.constant";
import { useFormStore } from "./form";

export const StepComponent = () => {
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const currentStep = useFormStore((state) => state.currentStep);
  const lead = useFormStore((state) => state.data);

  // Map component with step Id
  const componentMap: Record<StepId, React.ReactNode> = {
    car_type: <CarType />,
    car_buy_date: <CarBuyDate />,
    car_distance: <CarDistance />,
    car_usage: <Carusage />,
    car_park_place: <CarParkPlace />,
    car_park_type: <CarParkType />,
    car_leasing: <Leasing />,
    needs: <Needs />,
    contract_start: <ContractStart />,
    already_assure: <AlreadyAssure />,
    info: <Name />,
    loader: <Loading />,
    result: <></>,
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

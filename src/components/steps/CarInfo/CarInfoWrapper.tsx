import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";
import CarBrand from "./CarBrand";
import CarModel from "./CarModel";
import CarRecap from "./CarRecap";

const CarInfoWrapper = () => {
  const lead = useFormStore((state) => state.data);
  const { t } = useTranslation("step");

  return (
    <StepContainer
      title={t(
        lead.car_type != undefined && lead.car_brand == undefined
          ? "car-brand.title"
          : "car-model.title"
      )}
      stepId="car_info"
    >
      {lead.car_type != undefined && lead.car_brand == undefined && (
        <CarBrand />
      )}
      {lead.car_brand != undefined && lead.car_option == undefined && (
        <CarModel />
      )}
      {lead.car_option != undefined && <CarRecap />}
    </StepContainer>
  );
};

export default CarInfoWrapper;

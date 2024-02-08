import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";
import CarModel from "./CarModel";

const CarBrand = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  return (
    <StepContainer title={t("car-brand.title")} stepId="car_info">
      {lead.car_brand == undefined && <CarBrand />}
      {lead.car_model == undefined && <CarModel />}
    </StepContainer>
  );
};

export default CarBrand;

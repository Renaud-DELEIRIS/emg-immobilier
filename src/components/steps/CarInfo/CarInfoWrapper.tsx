import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";
import CarBrand from "./CarBrand";
import CarModel from "./CarModel";

const CarInfoWrapper = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  const [activeSubStep, setActiveSubStep] = useState<"car_brand" | "car_model">(
    "car_brand"
  );

  return (
    <StepContainer title={t("car-brand.title")} stepId="car_info">
      {activeSubStep == "car_brand" && <CarBrand />}
      {activeSubStep == "car_model" && <CarModel />}
    </StepContainer>
  );
};

export default CarInfoWrapper;

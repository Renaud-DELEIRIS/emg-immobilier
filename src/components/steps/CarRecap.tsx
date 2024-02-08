import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import CarInfos from "../containers/CarInfos";
import StepContainer from "./StepContainer";

const CarPossesion = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const backStep = useFormStore((state) => state.backStep);
  const nextStep = useFormStore((state) => state.nextStep);
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer
      className={currentVisibleStep.id != "car-recap" ? "hidden" : ""}
      title={t("car-recap.title")}
      stepId="car-recap"
    >
      <CarInfos carOption={lead.carOption!} onClick={() => backStep()} />
    </StepContainer>
  );
};

export default CarPossesion;

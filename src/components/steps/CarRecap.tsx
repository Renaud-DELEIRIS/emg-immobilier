import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import CarInfos from "./CarInfo/components/CarInfos";

const CarPossesion = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const backStep = useFormStore((state) => state.backStep);
  const nextStep = useFormStore((state) => state.nextStep);
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const { t } = useTranslation("step");

  return <CarInfos carOption={lead.car_option!} onClick={() => backStep()} />;
};

export default CarPossesion;

import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const CarType = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer title={t("car_type.title")} stepId="car_type">
      <TileInput
        value={lead.car_type}
        onChange={(value) => {
          changeLead({ car_type: value });
          nextStep("car_type");
        }}
        options={[
          {
            value: "my_car",
            label: t("car_type.my_car"),
          },
          {
            value: "future_car",
            label: t("car_type.future_car"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default CarType;

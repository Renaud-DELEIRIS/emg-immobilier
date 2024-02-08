import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const CarDistance = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer title={t("car_distance.title")} stepId="car_distance">
      <TileInput
        value={lead.car_distance}
        onChange={(value) => {
          changeLead({ car_distance: value });
          nextStep("car_distance");
        }}
        options={[
          {
            value: "-7000km",
            label: t("car_distance.7000km"),
          },
          {
            value: "7000-15000",
            label: t("car_distance.7000-15000"),
          },
          {
            value: "+15000km",
            label: t("car_distance.15000km"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default CarDistance;

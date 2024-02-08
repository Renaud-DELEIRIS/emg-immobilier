import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const CarPossesion = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer title={t("car-possesion.title")} stepId="car-possesion">
      <TileInput
        value={lead.carPossesion}
        onChange={(value) => {
          changeLead({ carPossesion: value.toString() });
          nextStep("car-possesion");
        }}
        options={[
          {
            value: "1",
            label: t("car-possesion.current"),
          },
          {
            value: "2",
            label: t("car-possesion.next"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default CarPossesion;

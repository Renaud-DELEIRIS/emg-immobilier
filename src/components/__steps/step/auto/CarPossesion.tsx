import { useTranslation } from "next-i18next";
import StepContainer from "~/components/__steps/StepContainer";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";

const CarPossesion = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");
  return (
    <StepContainer title={t("STEP_CAR_POSSESION_TITLE")} stepId="car-possesion">
      <TileInput
        value={lead.carPossesion}
        onChange={(value) => {
          changeLead({ carPossesion: value.toString() });
          nextStep("car-possesion");
        }}
        options={[
          {
            value: "1",
            label: t("STEP_CAR_POSSESION_CURRENT"),
          },
          {
            value: "2",
            label: t("STEP_CAR_POSSESION_NEXT"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default CarPossesion;

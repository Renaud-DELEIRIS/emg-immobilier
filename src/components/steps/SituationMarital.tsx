import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import TileInput from "../inputs/Tile";
import StepContainer from "./StepContainer";

const SituationMarital = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  return (
    <StepContainer stepId="situation_marital">
      <TileInput
        value={lead.situation_marital}
        onChange={(value) => {
          changeLead({ situation_marital: value });
          nextStep("situation_marital", {
            situation_marital: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: "célibataire",
            label: t("situation_marital.celibataire"),
          },
          {
            value: "marié",
            label: t("situation_marital.marie"),
          },
          {
            value: "divorcé",
            label: t("situation_marital.divorce"),
          },
          {
            value: "autre",
            label: t("other"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default SituationMarital;

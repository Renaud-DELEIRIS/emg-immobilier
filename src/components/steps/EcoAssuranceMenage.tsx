import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const EcoAssuranceMenage = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer
      title={t("eco_assurance_menage.title")}
      stepId="eco_assurance_menage"
      description={t("eco_assurance_menage.description")}
    >
      <TileInput
        value={lead.eco_assurance_menage}
        onChange={(value) => {
          changeLead({ eco_assurance_menage: value });
          nextStep("eco_assurance_menage");
        }}
        className="grid gap-4 lg:grid-cols-2"
        options={[
          {
            value: true,
            label: t("eco_assurance_menage.yes"),
          },
          {
            value: false,
            label: t("eco_assurance_menage.no"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default EcoAssuranceMenage;

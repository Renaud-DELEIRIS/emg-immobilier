import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const SituationProfessionnelle = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="situation_professionnelle">
      <TileInput
        value={lead.situation_professionnelle}
        onChange={(value) => {
          changeLead({ situation_professionnelle: value });
          nextStep("situation_professionnelle", {
            situation_professionnelle: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: "employé",
            label: t("situation_professionnelle.employe"),
          },
          {
            value: "indépendant",
            label: t("situation_professionnelle.inde"),
          },
          {
            value: "employé et indépendant",
            label: t("situation_professionnelle.employe_inde"),
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

export default SituationProfessionnelle;

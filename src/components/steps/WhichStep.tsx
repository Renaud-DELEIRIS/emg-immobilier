import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const WhichStep = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="which_step">
      <TileInput
        value={lead.which_step}
        onChange={(value) => {
          changeLead({ which_step: value });
          nextStep("which_step", {
            which_step: value,
          });
        }}
        options={[
          {
            value: "recherche bien",
            label: t("which_step.recherche"),
          },
          {
            value: "bien trouvé",
            label: t("which_step.find"),
          },
          {
            value: "offre acceptée",
            label: t("which_step.accepted_offer"),
          },
          {
            value: "bientot signer",
            label: t("which_step.soon_signer"),
          },
          {
            value: "signer",
            label: t("which_step.signer"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default WhichStep;

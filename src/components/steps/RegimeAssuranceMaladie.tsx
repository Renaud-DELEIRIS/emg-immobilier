import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const RegimeAssuranceMaladie = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="regime_assurance_maladie">
      <TileInput
        value={lead.regime_assurance_maladie_frontalier}
        onChange={(value) => {
          changeLead({ regime_assurance_maladie_frontalier: value });
          nextStep("regime_assurance_maladie", {
            regime_assurance_maladie_frontalier: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: "LAMal",
            label: t("regime_assurance_maladie.lamal"),
          },
          {
            value: "CMU",
            label: t("regime_assurance_maladie.cmu"),
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

export default RegimeAssuranceMaladie;

import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const ResidenceType = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="residence_type">
      <TileInput
        value={lead.residence_type}
        onChange={(value) => {
          changeLead({ residence_type: value });
          nextStep("residence_type", {
            residence_type: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: "principal",
            label: t("residence_type.principal"),
          },
          {
            value: "secondaire",
            label: t("residence_type.secondaire"),
          },
          {
            value: "invest",
            label: t("residence_type.invest"),
          },
          {
            value: "other",
            label: t("other"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default ResidenceType;

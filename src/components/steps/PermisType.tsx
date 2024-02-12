import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import TileInput from "../inputs/Tile";
import StepContainer from "./StepContainer";

const PermisType = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  return (
    <StepContainer stepId="permis_type">
      <TileInput
        value={lead.permis_type}
        onChange={(value) => {
          changeLead({ permis_type: value });
          nextStep("permis_type", {
            permis_type: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: "B",
            label: t("permis_type.permis_b"),
          },
          {
            value: "C",
            label: t("permis_type.permis_c"),
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

export default PermisType;

import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const Needs = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer title={t("needs.title")} stepId="needs">
      <TileInput
        value={lead.needs}
        onChange={(value) => {
          changeLead({ needs: value });
          nextStep("needs");
        }}
        options={[
          {
            value: "casco-partielle",
            label: t("needs.casco-partielle"),
            info: t("needs.casco-partielle-info"),
          },
          {
            value: "casco-complete",
            label: t("needs.casco-complete"),
            info: t("needs.casco-complete-info"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default Needs;

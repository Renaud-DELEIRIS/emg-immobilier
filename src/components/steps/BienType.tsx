import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const BienType = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="bien_type">
      <TileInput
        value={lead.bien_type}
        onChange={(value) => {
          changeLead({ bien_type: value });
          nextStep("bien_type", {
            bien_type: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: "house",
            label: t("bien_type.house"),
          },
          {
            value: "appartement",
            label: t("bien_type.appartement"),
          },
          {
            value: "building",
            label: t("bien_type.building"),
          },
          {
            value: "construction",
            label: t("bien_type.construction"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default BienType;

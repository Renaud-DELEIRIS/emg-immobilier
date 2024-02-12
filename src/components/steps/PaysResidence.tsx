import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const PaysResidence = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="pays_residence" withTitle withInfo>
      <TileInput
        value={lead.pays_residence}
        onChange={(value) => {
          changeLead({ pays_residence: value });
          nextStep("pays_residence", {
            pays_residence: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: "suisse",
            label: t("pays_residence.sui"),
          },
          {
            value: "france",
            label: t("pays_residence.fra"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default PaysResidence;

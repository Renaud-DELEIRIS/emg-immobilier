import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const AlreadyAssure = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const { t: tCommon } = useTranslation("common");
  return (
    <StepContainer title={t("already_assure.title")} stepId="already_assure">
      <TileInput
        value={lead.already_assure}
        onChange={(value) => {
          changeLead({ already_assure: value });
          nextStep("already_assure");
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: true,
            label: tCommon("YES"),
          },
          {
            value: false,
            label: tCommon("NO"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default AlreadyAssure;

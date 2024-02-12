import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { situation } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const Situation = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="situation">
      <TileInput
        value={lead.situation}
        multiple
        onChange={(value) => {
          changeLead({ situation: value });
        }}
        options={situation.map((situation) => ({
          value: situation,
          label: t(`situation.${situation}`),
        }))}
      ></TileInput>
    </StepContainer>
  );
};

export default Situation;

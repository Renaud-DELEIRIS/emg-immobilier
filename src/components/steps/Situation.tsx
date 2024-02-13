import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { situation } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import StepContainer from "./StepContainer";

const Situation = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="situation">
      <div className="flex flex-col items-center">
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
        <Button
          variant={"thirdy"}
          className="mt-4"
          onClick={() => nextStep("situation")}
        >
          {t("situation.action")}
        </Button>
      </div>
    </StepContainer>
  );
};

export default Situation;

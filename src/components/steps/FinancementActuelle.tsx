import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import { formatAmount, parseMoney } from "~/utils/money";
import { Button } from "../button/Button";
import { Slider } from "../inputs/Slider";
import Input from "../inputs/input";
import StepContainer from "./StepContainer";

const FinancementActuelle = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const showValidate = currentVisibleStep.id === "financement_actuel";

  return (
    <StepContainer stepId="financement_actuel">
      <div className="flex flex-col gap-4">
        <Input
          value={formatAmount(lead.financement_actuel)}
          placeholder={t("financement_actuelle.placeholder")}
          onChange={(value) => {
            changeLead({
              financement_actuel: parseMoney(value),
            });
          }}
          insideText="CHF"
        ></Input>
        <Slider
          value={[lead.financement_actuel ?? 0]}
          onValueChange={(value) => {
            changeLead({
              financement_actuel: value[0]!,
            });
          }}
          min={50_000}
          max={2_000_000}
          step={50_000}
        ></Slider>
        {showValidate && (
          <Button
            onClick={() => {
              nextStep("financement_actuel", {
                research: lead.research,
              });
            }}
            className="ml-auto w-fit"
          >
            {t("next")}
          </Button>
        )}
      </div>
    </StepContainer>
  );
};

export default FinancementActuelle;

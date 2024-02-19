import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { useFormStore } from "~/stores/form";
import { formatAmount, parseMoney } from "~/utils/money";
import { Button } from "../button/Button";
import { Slider } from "../inputs/Slider";
import Input from "../inputs/input";
import StepContainer from "./StepContainer";

const ResearchBudget = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const showValidate = currentVisibleStep.id === "research_budget";
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <StepContainer stepId="research_budget">
      <div className="flex flex-col gap-4">
        <Input
          value={`${formatAmount(lead.research.budget[0]!)} - ${formatAmount(
            lead.research.budget[1]!
          )}`}
          ref={inputRef}
          onChange={(value) => {
            const [min, max] = value.split(" - ");
            if (
              min === "" ||
              max === "" ||
              min === undefined ||
              max === undefined
            )
              return;

            changeLead({
              research: {
                ...lead.research,
                budget: [parseMoney(min) ?? 0, parseMoney(max) ?? 0],
              },
            });
          }}
          insideText="CHF"
        ></Input>
        <Slider
          value={lead.research.budget}
          onValueChange={(value) => {
            changeLead({
              research: {
                ...lead.research,
                budget: value,
              },
            });
          }}
          min={50_000}
          max={1_000_000}
          step={50_000}
        ></Slider>
        {showValidate && (
          <Button
            onClick={() => {
              nextStep("research_budget", {
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

export default ResearchBudget;

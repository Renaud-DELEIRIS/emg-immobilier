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
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <StepContainer stepId="research_budget">
      <div className="flex flex-col gap-4">
        <Input
          value={`${formatAmount(lead.research.budget[0])} - ${formatAmount(
            lead.research.budget[1]
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

            const nbMin = parseMoney(min) ?? 0;
            const nbMax = parseMoney(max) ?? 0;
            const moyen = (nbMin + nbMax) / 2;

            changeLead({
              research: {
                ...lead.research,
                budget: [parseMoney(min) ?? 0, parseMoney(max) ?? 0],
              },
              // 20 % of the moyen budget
              fonds_propres: {
                ...lead.fonds_propres,
                fonds_propres: Math.round(moyen * 0.2),
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
              fonds_propres: {
                ...lead.fonds_propres,
                fonds_propres: Math.round(((value[0]! + value[1]!) / 2) * 0.2),
              },
            });
          }}
          min={300_000}
          max={3_000_000}
          step={50_000}
        ></Slider>
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
      </div>
    </StepContainer>
  );
};

export default ResearchBudget;

import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import { formatAmount, parseMoney } from "~/utils/money";
import { Button } from "../button/Button";
import { Slider } from "../inputs/Slider";
import Input from "../inputs/input";
import StepContainer from "./StepContainer";

const BienPrice = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const showValidate = currentVisibleStep.id === "bien_price";

  return (
    <StepContainer stepId="bien_price">
      <div className="flex flex-col gap-4">
        <Input
          value={`${formatAmount(lead.bien_price)}`}
          placeholder={t("bien_price.placeholder")}
          onChange={(value) => {
            changeLead({
              bien_price: parseMoney(value),
              revenue: Math.round((parseMoney(value) ?? 0) * 0.2)
            });
          }}
          insideText="CHF"
        ></Input>
        <Slider
          value={[lead.bien_price]}
          onValueChange={(value) => {
            changeLead({
              bien_price: value[0]!,
              revenue: Math.round(value[0]! * 0.2)
            });
          }}
          min={50_000}
          max={2_000_000}
          step={50_000}
        ></Slider>
        {showValidate && (
          <Button
            onClick={() => {
              nextStep("bien_price", {
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

export default BienPrice;

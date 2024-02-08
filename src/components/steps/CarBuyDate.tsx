import { useTranslation } from "next-i18next";
import { month } from "~/constants/month.constant";
import { useFormStore } from "~/stores/form";
import { SelectInput } from "../inputs/Select";
import StepContainer from "./StepContainer";

const CarBuyDate = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const { t: tCommon } = useTranslation("common");

  return (
    <StepContainer title={t("car_buy_date.title")} stepId="car_buy_date">
      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
        <SelectInput
          options={month.map((m, i) => ({
            value: m,
            label: tCommon(`month.${m}`),
          }))}
          value={lead.car_buy_date.month}
          onChange={(value) =>
            changeLead({ car_buy_date: { ...lead.car_buy_date, month: value } })
          }
          placeholder={t("car_buy_date.placeholder_month")}
        ></SelectInput>

        <SelectInput
          options={Array.from({
            length: new Date().getFullYear() - 1990 + 1,
          }).map((_, i) => ({
            value: (1990 + i).toString(),
            label: (1990 + i).toString(),
          }))}
          value={lead.car_buy_date.year}
          onChange={(value) => {
            changeLead({ car_buy_date: { ...lead.car_buy_date, year: value } });
            nextStep("car_buy_date");
          }}
          placeholder={t("car_buy_date.placeholder_year")}
        ></SelectInput>
      </div>
    </StepContainer>
  );
};

export default CarBuyDate;

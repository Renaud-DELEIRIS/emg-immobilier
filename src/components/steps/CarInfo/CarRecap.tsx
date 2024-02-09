import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { SelectInput } from "~/components/inputs/Select";
import { month } from "~/constants/month.constant";
import { useFormStore } from "~/stores/form";
import { StepTitle } from "../StepContainer";
import CarInfos from "./components/CarInfos";

const CarRecap = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const { t: tCommon } = useTranslation("common");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex flex-col gap-[40px]">
          <CarInfos
            carOption={lead.car_option!}
            onClick={() =>
              changeLead({
                ...lead,
                car_brand: undefined,
                car_model: undefined,
                car_option: undefined,
              })
            }
          />
          <div>
            <div className="mb-[20px] flex flex-col gap-[10px]">
              <StepTitle>{t("car_buy_date.title")}</StepTitle>
            </div>

            <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
              <SelectInput
                options={month.map((m, i) => ({
                  value: m,
                  label: tCommon(`month.${m}`),
                }))}
                value={lead.car_buy_date.month}
                onChange={(value) => {
                  changeLead({
                    car_buy_date: { ...lead.car_buy_date, month: value },
                  });
                  if ((lead.car_buy_date?.year ?? "") != "") {
                    nextStep("car_info");
                  }
                }}
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
                  changeLead({
                    car_buy_date: { ...lead.car_buy_date, year: value },
                  });
                  if ((lead.car_buy_date?.month ?? "") != "") {
                    nextStep("car_info");
                  }
                }}
                placeholder={t("car_buy_date.placeholder_year")}
              ></SelectInput>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarRecap;

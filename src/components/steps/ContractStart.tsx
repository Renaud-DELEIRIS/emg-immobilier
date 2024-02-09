import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import { isValidDate } from "~/utils/validation/date.validation";
import { DateInput } from "../inputs/input";
import StepContainer from "./StepContainer";

const ContractStart = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const { t: tCommon } = useTranslation("common");

  const today = dayjs();
  const oneMonth = today.add(1, "month");
  const tomorrow = today.add(1, "day");

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const isOther =
    lead.contract_start !== undefined &&
    lead.contract_start !== today.format("DD.MM.YYYY") &&
    lead.contract_start !== tomorrow.format("DD.MM.YYYY") &&
    lead.contract_start !== oneMonth.format("DD.MM.YYYY");

  return (
    <StepContainer title={t("contract_start.title")} stepId="contract_start">
      <TileInput
        value={lead.contract_start}
        onChange={(value) => {
          changeLead({ contract_start: value });
          // If contract start === today tomorrow or in one month, go to next step
          if (
            value === today.format("DD.MM.YYYY") ||
            value === tomorrow.format("DD.MM.YYYY") ||
            value === oneMonth.format("DD.MM.YYYY")
          ) {
            nextStep("contract_start");
          }
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: today.format("DD.MM.YYYY"),
            info: capitalize(today.format("dddd D MMMM")),
            label: t("contract_start.today"),
          },
          {
            value: oneMonth.format("DD.MM.YYYY"),
            info: capitalize(oneMonth.format("dddd D MMMM")),
            label: t("contract_start.one_month"),
          },
          {
            value: tomorrow.format("DD.MM.YYYY"),
            info: capitalize(tomorrow.format("dddd D MMMM")),
            label: t("contract_start.tomorrow"),
          },
          {
            value: isOther ? lead.contract_start : "",
            label: t("contract_start.other"),
          },
        ]}
      ></TileInput>

      {isOther && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-5"
        >
          <DateInput
            id="contract_start_other"
            name="contract_start_other"
            type="text"
            label={t("contract_start.label")}
            autoFocus
            value={lead.contract_start}
            error={
              isValidDate(dayjs(lead.contract_start, "DD.MM.YYYY"), {
                inFuture: true,
              }) === "inFuture"
                ? tCommon("date.inFuture")
                : ""
            }
            valid={
              !isValidDate(dayjs(lead.contract_start, "DD.MM.YYYY"), {
                inFuture: true,
              })
            }
            onChange={(e) => {
              const date = dayjs(e, "YYYY-MM-DD");
              changeLead({
                contract_start: date.format("DD.MM.YYYY"),
              });
              if (
                !isValidDate(date, {
                  inFuture: true,
                })
              ) {
                nextStep("contract_start");
              }
            }}
          />
        </motion.div>
      )}
    </StepContainer>
  );
};

export default ContractStart;

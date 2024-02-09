import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import { isValidDate } from "~/utils/validation/date.validation";
import { DateInput } from "../inputs/input";
import StepContainer from "./StepContainer";

const Dob = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const { t: tCommon } = useTranslation("common");

  const validDateInfo = isValidDate(dayjs(lead.dob, "YYYY-MM-DD"), {
    inPast: true,
  });

  return (
    <StepContainer title={t("dob.title")} stepId="dob">
      <DateInput
        value={lead.dob}
        onChange={(value) => {
          changeLead({ dob: value });
          if (!isValidDate(dayjs(value, "YYYY-MM-DD"), { inPast: true })) {
            nextStep("dob");
          }
        }}
        name="dob"
        aria-label="Date de naissance"
        error={
          validDateInfo === "inPast" ? tCommon("date.inFuture") : undefined
        }
        valid={!validDateInfo}
      ></DateInput>
    </StepContainer>
  );
};

export default Dob;

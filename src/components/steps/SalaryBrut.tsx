import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import { formatAmount, parseMoney } from "~/utils/money";
import { Button } from "../button/Button";
import Input from "../inputs/input";
import StepContainer from "./StepContainer";

const SalaryBrut = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="salary_brut">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (lead.salary_brut !== undefined) nextStep("salary_brut");
        }}
      >
        <Input
          value={
            lead.salary_brut !== undefined ? formatAmount(lead.salary_brut) : ""
          }
          onChange={(value) => {
            const val = parseMoney(value);

            changeLead({ salary_brut: val });
          }}
          placeholder={t("salary_brut.placeholder")}
          name="salary_brut"
          aria-label="Salaire Brut"
          insideText="CHF"
          valid={lead.salary_brut !== undefined}
        ></Input>
        <Button type="submit" className="mt-4">
          {t("salary_brut.action")}
        </Button>
      </form>
    </StepContainer>
  );
};

export default SalaryBrut;

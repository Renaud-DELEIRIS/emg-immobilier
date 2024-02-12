import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const SalaryAbove = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="salary_above_120k">
      <TileInput
        value={lead.is_salary_above_120k}
        onChange={(value) => {
          changeLead({ is_salary_above_120k: value });
          nextStep("salary_above_120k", {
            is_salary_above_120k: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: true,
            label: t("yes"),
          },
          {
            value: false,
            label: t("no"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default SalaryAbove;

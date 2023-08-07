import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import { useTranslation } from "next-i18next";

const Npa = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();
  const { t } = useTranslation("common");

  return (
    <StepContainer
      title={t("STEP_NPA_TITLE")}
      description={t("STEP_NPA_DESCRIPTION")}
      stepId="npa"
    >
      <AutoComplete
        value={
          lead.npa || {
            key: 0,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ npa: value });
          increaseStep("npa", {
            ...lead,
            npa: value,
          });
        }}
        options={localtion}
        placeholder={t("STEP_NPA_PLACEHOLDER")}
      ></AutoComplete>
      <p className="mt-2 text-sm text-gray-500">
        <strong>{t("STEP_NPA_NOTHERE")} </strong>
        <button
          className="text-primary hover:underline"
          onClick={() => {
            changeLead({ npa: { key: -1, value: t("STEP_NPA_NOTHERE_SPAN") } });
            increaseStep("npa", {
              ...lead,
              npa: { key: -1, value: t("STEP_NPA_NOTHERE_SPAN") },
            });
          }}
        >
          {t("STEP_NPA_NOTHERE_LINK")}
        </button>
      </p>
    </StepContainer>
  );
};

export default Npa;

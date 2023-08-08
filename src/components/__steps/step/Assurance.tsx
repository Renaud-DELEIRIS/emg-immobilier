import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import insurers from "~/data/insurers.json";
import { useTranslation, Trans } from "next-i18next";

const Assurance = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();
  const { t } = useTranslation("common");
  return (
    <StepContainer
      title={t('STEP_ASSURANCE_TITLE')}
      description={
        <Trans
          t={t}
          i18nKey="STEP_ASSURANCE_DESCRIPTION"
          />
      }
      stepId="assurance-actuelle"
    >
      <AutoComplete
        value={
          lead.actualInsurance || {
            key: 0,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ actualInsurance: value });
          increaseStep("assurance-actuelle", {
            ...lead,
            actualInsurance: value,
          });
        }}
        options={insurers}
        placeholder={t("STEP_ASSURANCE_PLACEHOLDER")}
      ></AutoComplete>
      <p className="mt-2 text-sm text-gray-500">
        <strong>{t("STEP_ASSURANCE_NO")} </strong>
        <button
          className="text-primary hover:underline"
          onClick={() => {
            changeLead({
              actualInsurance: { key: -1, value: t("STEP_ASSURANCE_NO_SPAN") },
            });
            increaseStep("assurance-actuelle", {
              ...lead,
              actualInsurance: { key: -1, value: t("STEP_ASSURANCE_NO_SPAN") },
            });
          }}
        >
          {t("STEP_ASSURANCE_NO_LINK")}
        </button>
      </p>
    </StepContainer>
  );
};

export default Assurance;

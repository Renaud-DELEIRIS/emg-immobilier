import StepContainer from "../StepContainer";
import AutoComplete from "~/components/inputs/Autocomplete";
import insurers from "~/data/insurers.json";
import { useTranslation, Trans } from "next-i18next";
import { useFormStore } from "~/stores/form";

const Assurance = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");
  return (
    <StepContainer
      title={t("STEP_ASSURANCE_TITLE")}
      description={<Trans t={t} i18nKey="STEP_ASSURANCE_DESCRIPTION" />}
      stepId="assurance-actuelle"
    >
      <AutoComplete
        value={
          lead.actualInsurance || {
            key: 0 as number | string,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ actualInsurance: value });
          nextStep("assurance-actuelle", {
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
            nextStep("assurance-actuelle", {
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

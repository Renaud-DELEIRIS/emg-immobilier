import StepContainer from "../StepContainer";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";

const Npa = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
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
          nextStep("npa", {
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
            nextStep("npa", {
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

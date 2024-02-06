import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import StepContainer from "~/components/__steps/StepContainer";
import AutoComplete from "~/components/inputs/Autocomplete";
import { useFormStore } from "~/stores/form";

const CarModel = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const test = useFormStore((state) => state.backStep);
  const { t } = useTranslation("common");

  useEffect(() => {
    console.log("test after init");
    test();
  }, []);

  return (
    <StepContainer title={t("STEP_MODEL_TITLE")} stepId="car-model">
      <AutoComplete
        value={
          lead.npa ?? {
            key: -1,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ npa: value, situation: undefined });
          nextStep("car-model");
        }}
        name="car-model"
        aria-label="Marque de voiture"
        options={[]}
        placeholder={t("STEP_MODEL_PLACEHOLDER")}
        valid={!!lead.npa}
      ></AutoComplete>
    </StepContainer>
  );
};

export default CarModel;

import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import StepContainer from "~/components/__steps/StepContainer";
import AutoComplete from "~/components/inputs/Autocomplete";
import { useFormStore } from "~/stores/form";

const CarBrand = () => {
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
    <StepContainer title={t("STEP_BRAND_TITLE")} stepId="car-brand">
      <AutoComplete
        value={
          lead.npa ?? {
            key: -1,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ npa: value, situation: undefined });
          nextStep("car-brand");
        }}
        name="car-brand"
        aria-label="Marque de voiture"
        options={[]}
        placeholder={t("STEP_BRAND_PLACEHOLDER")}
        valid={!!lead.npa}
      ></AutoComplete>
    </StepContainer>
  );
};

export default CarBrand;

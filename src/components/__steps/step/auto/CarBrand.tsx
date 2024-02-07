import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import StepContainer from "~/components/__steps/StepContainer";
import { IconMagnify } from "~/components/icon/IconMagnify";
import TextInput from "~/components/inputs/TextInput";
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
      <TextInput
        className="h-[68px] px-[14px]"
        value={lead.carBrand}
        onChange={(value) => {
          changeLead({ carBrand: value });
          // nextStep("car-brand");
        }}
        name="car-brand"
        aria-label="Marque de voiture"
        placeholder={t("STEP_BRAND_PLACEHOLDER")}
        icon={<IconMagnify size={32} className="pr-[8px]" />}
      ></TextInput>
    </StepContainer>
  );
};

export default CarBrand;

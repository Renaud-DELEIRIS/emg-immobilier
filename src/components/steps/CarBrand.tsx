import { useTranslation } from "next-i18next";
import CarLogos from "~/components/containers/CarLogos";
import { IconMagnify } from "~/components/icon/IconMagnify";
import Input from "~/components/inputs/input";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const CarBrand = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  return (
    <StepContainer title={t("car-brand.title")} stepId="car-brand">
      <Input
        wrapperClassName="inline-flex px-[14px] items-center gap-[8px] shrink-0 w-[670px] h-[68px]"
        className="border-transparent bg-[#8888941a] text-sm font-normal not-italic leading-none text-[#082623] opacity-50"
        value={lead.carBrand}
        onChange={(carBrand) => {
          changeLead({ carBrand });
        }}
        name="car-brand"
        aria-label="Marque de voiture"
        placeholder={t("car-brand.placeholder")}
        icon={
          <IconMagnify
            size={32}
            className="opacity-1 pr-[8px] text-[#082623]"
          />
        }
      />
      <CarLogos
        query={lead.carBrand}
        onClick={(modelName) => {
          changeLead({ carBrand: modelName });
          nextStep("car-brand");
        }}
      />
    </StepContainer>
  );
};

export default CarBrand;

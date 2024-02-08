import { useTranslation } from "next-i18next";
import { Badge } from "~/components/containers/Badge";
import { IconCloseRemove } from "~/components/icon/IconCloseRemove";
import { CustomAutoComplete } from "~/components/inputs/CustomAutoComplete";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

export interface ICarOption {
  value: string;
  brand: string;
  label: string;
  from: number;
  to: number;
}

const CarModel = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const backStep = useFormStore((state) => state.backStep);
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const { t } = useTranslation("step");

  return (
    <StepContainer
      className={currentVisibleStep.id != "car-model" ? "hidden" : ""}
      title={t("car-model.title")}
      stepId="car-model"
    >
      <CustomAutoComplete
        className="h-[68px]"
        value={lead.carOption?.label ?? ""}
        onChange={(carOption: ICarOption) => {
          changeLead({ carOption });
          nextStep("car-model");
        }}
        carBrand={lead.carBrand!}
        name="car-model"
        aria-label="Marque de voiture"
        placeholder={t("car-model.placeholder")}
        before={
          <Badge className="flex items-center justify-center rounded-[40px] border-0 bg-[#082623] px-3.5 py-2 text-center font-semibold text-white">
            {lead.carBrand!.toUpperCase()}
            <IconCloseRemove
              className="hover:cursor-pointer"
              onClick={() => backStep()}
              size={20}
            />
          </Badge>
        }
      ></CustomAutoComplete>
    </StepContainer>
  );
};

export default CarModel;

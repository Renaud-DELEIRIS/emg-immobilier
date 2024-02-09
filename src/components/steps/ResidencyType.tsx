import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import { SelectInput } from "../inputs/Select";
import StepContainer from "./StepContainer";

const ResidencyType = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const { t: tCommon } = useTranslation("common");
  return (
    <StepContainer
      title={t("residency_type.title")}
      stepId="residency_type"
      description={t("residency_type.description")}
    >
      <SelectInput
        value={lead.residency_type}
        onChange={(value) => {
          changeLead({
            residency_type: value as typeof lead.residency_type,
          });
          nextStep("residency_type");
        }}
        placeholder={t("residency_type.placeholder")}
        options={[
          {
            value: "rent_apartment",
            label: t("residency_type.rent_apartment"),
          },
          {
            value: "rent_house",
            label: t("residency_type.rent_house"),
          },
          {
            value: "owner_apartment",
            label: t("residency_type.owner_apartment"),
          },
          {
            value: "owner_house",
            label: t("residency_type.owner_house"),
          },
        ]}
      ></SelectInput>
    </StepContainer>
  );
};

export default ResidencyType;

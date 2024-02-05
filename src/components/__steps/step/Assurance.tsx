import { useTranslation } from "next-i18next";
import AutoComplete from "~/components/inputs/Autocomplete";
import TileInput from "~/components/inputs/Tile";
import insurers from "~/data/insurers.json";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

const Assurance = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");
  return (
    <StepContainer
      title={t("STEP_ASSURANCE_TITLE")}
      stepId="assurance-actuelle"
    >
      <TileInput
        value={lead.hasInsurance}
        onChange={(value) => {
          changeLead({ hasInsurance: value as boolean });
          if (value === false)
            nextStep("assurance-actuelle", {
              ...lead,
              hasInsurance: value as boolean,
            });
        }}
        className="w-full flex-row"
        options={[
          {
            value: true,
            label: t("YES"),
          },
          {
            value: false,
            label: t("NO"),
          },
        ]}
      ></TileInput>

      {lead.hasInsurance && (
        <AutoComplete
          value={
            lead.actualAssurance || {
              key: 0 as number | string,
              value: "",
            }
          }
          onChange={(value) => {
            changeLead({ actualAssurance: value });
            nextStep("assurance-actuelle", {
              ...lead,
              actualAssurance: value,
            });
          }}
          options={insurers}
          placeholder={t("STEP_ASSURANCE_PLACEHOLDER")}
          className="mt-4"
          label={t("STEP_ASSURANCE_LABEL")}
        ></AutoComplete>
      )}
    </StepContainer>
  );
};

export default Assurance;

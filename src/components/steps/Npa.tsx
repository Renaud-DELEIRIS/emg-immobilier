import { useTranslation } from "next-i18next";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const Npa = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  return (
    <StepContainer stepId="npa">
      <AutoComplete
        value={lead.npa}
        onChange={(value) => {
          changeLead({ npa: value.toString() });
          nextStep("npa");
        }}
        placeholder={t("npa.placeholder")}
        name="locality"
        aria-label="Localité"
        options={localtion.map((loc) => ({
          value: loc.key.toString(),
          label: `${loc.value}`,
        }))}
        valid={lead.npa !== undefined}
      ></AutoComplete>
    </StepContainer>
  );
};

export default Npa;

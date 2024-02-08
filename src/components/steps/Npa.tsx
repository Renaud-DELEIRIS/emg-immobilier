import { Trans, useTranslation } from "next-i18next";
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
    <StepContainer
      title={t("npa.title")}
      description={
        <Trans
          i18nKey="npa.description"
          t={t}
          components={{
            notHere: (
              <button
                data-nofocus
                className="font-semibold text-primary hover:font-bold"
                onClick={() => {
                  nextStep("npa");
                }}
              />
            ),
          }}
        />
      }
      stepId="npa"
    >
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
          value: loc.key,
          label: `${loc.key} - ${loc.value}`,
        }))}
      ></AutoComplete>
    </StepContainer>
  );
};

export default Npa;

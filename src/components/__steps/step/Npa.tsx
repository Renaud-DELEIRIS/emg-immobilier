import { Trans, useTranslation } from "next-i18next";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

const Npa = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");

  return (
    <StepContainer
      title={t("STEP_NPA_TITLE")}
      description={
        <Trans
          i18nKey="STEP_NPA_DESCRIPTION"
          components={{
            notHere: (
              <button
                className="font-semibold text-primary hover:font-bold"
                onClick={() => {
                  changeLead({
                    npa: { key: -1, value: t("STEP_NPA_NOTHERE_SPAN") },
                  });
                  nextStep("npa", {
                    ...lead,
                    npa: { key: -1, value: t("STEP_NPA_NOTHERE_SPAN") },
                  });
                }}
              />
            ),
          }}
        />
      }
      stepId="npa"
    >
      <AutoComplete
        value={
          lead.npa ?? {
            key: -1,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ npa: value, situation: undefined });
          nextStep("npa", {
            ...lead,
            npa: value,
          });
        }}
        name="locality"
        aria-label="Localité"
        options={localtion}
        placeholder={t("STEP_NPA_PLACEHOLDER")}
        valid={!!lead.npa}
      ></AutoComplete>
    </StepContainer>
  );
};

export default Npa;

import StepContainer from "../StepContainer";
import Button from "~/components/button/Button";
import TextInput from "~/components/inputs/TextInput";
import { Trans, useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";

const Name = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const { t } = useTranslation("common");

  const isDisabled = currentVisibleStep.disabled(lead);

  return (
    <StepContainer
      title={t("STEP_NAME_TITLE")}
      description={<Trans i18nKey="STEP_NAME_DESCRIPTION" t={t} />}
      stepId="name"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep("name");
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput
            value={lead.nom || ""}
            onChange={(value) => {
              changeLead({ nom: value });
            }}
            placeholder={t("STEP_NAME_PLACEHOLDER_LASTNAME")}
            autocomplete="family-name"
          ></TextInput>
          <TextInput
            value={lead.prenom || ""}
            onChange={(value) => {
              changeLead({ prenom: value });
            }}
            placeholder={t("STEP_NAME_PLACEHOLDER_FIRSTNAME")}
            autocomplete="given-name"
          ></TextInput>
        </div>
        <div className="mt-4 flex w-full">
          <Button
            type="submit"
            disabled={isDisabled || !lead.nom || !lead.prenom}
          >
            {t("CONTINUE")}
          </Button>
        </div>
      </form>
    </StepContainer>
  );
};

export default Name;

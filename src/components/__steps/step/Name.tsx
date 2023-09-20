import { Trans, useTranslation } from "next-i18next";
import Button from "~/components/button/Button";
import TextInput from "~/components/inputs/TextInput";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

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
            value={lead.prenom || ""}
            onChange={(value) => {
              changeLead({
                prenom: value,
                adherent: lead.adherent.map((adherant) => {
                  if (adherant.type === "main")
                    return { ...adherant, prenom: value };
                  return adherant;
                }),
              });
            }}
            placeholder={t("STEP_NAME_PLACEHOLDER_FIRSTNAME")}
            autocomplete="given-name"
          />
          <TextInput
            value={lead.nom || ""}
            onChange={(value) => {
              changeLead({
                nom: value,
                adherent: lead.adherent.map((adherant) => {
                  if (adherant.type === "main")
                    return { ...adherant, nom: value };
                  return adherant;
                }),
              });
            }}
            placeholder={t("STEP_NAME_PLACEHOLDER_LASTNAME")}
            autocomplete="family-name"
          />
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

import { Trans, useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

const Economie = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");

  return (
    <StepContainer
      title={t("STEP_ECONOMIE_TITLE")}
      description={<Trans i18nKey="STEP_ECONOMIE_DESCRIPTION" t={t} />}
      stepId="economies"
    >
      <TileInput
        value={
          lead.economieimpots === undefined
            ? undefined
            : lead.economieimpots
            ? "yes"
            : "no"
        }
        onChange={(value) => {
          changeLead({
            ...lead,
            economieimpots: value === "yes" ? true : false,
          });
          nextStep("economies");
        }}
        options={[
          {
            label: t("STEP_ECONOMIE_YES"),
            value: "yes",
          },
          {
            label: t("STEP_ECONOMIE_NO"),
            value: "no",
          },
        ]}
        className="flex-wrap gap-4 md:flex-nowrap"
      ></TileInput>
    </StepContainer>
  );
};

export default Economie;

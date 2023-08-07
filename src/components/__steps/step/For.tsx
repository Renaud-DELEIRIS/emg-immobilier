import { useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import { EmgAdulte } from "~/icons/EmgAdulte";
import { EmgCouple } from "~/icons/EmgCouple";
import { EmgAdulteEnfant } from "~/icons/EmgAdulteEnfant";
import { EmgCoupleEnfant } from "~/icons/EmgCoupleEnfant";
import { useTranslation, Trans } from "next-i18next";

const For = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep, setCurrentStep } = useSteps();
  const { t } = useTranslation("common");
  return (
    <StepContainer
      title={t("STEP_FOR_TITLE")}
      description={
        <span>
          <Trans t={t} i18nKey="STEP_FOR_DESCRIPTION" />
        </span>
      }
      stepId="for-who"
    >
      <TileInput
        value={lead.for}
        onChange={(value) => {
          changeLead({ for: value as "you", adherent: [] });
          setCurrentStep("adherent");
          increaseStep("for-who");
        }}
        options={[
          {
            value: "you",
            label: t("STEP_FOR_YOURSELF"),
            icon: <EmgAdulte />,
          },
          {
            value: "you and your partner",
            label: t("STEP_FOR_SPOUSE"),
            icon: <EmgCouple />,
          },
          {
            value: "you and your kids",
            label: t("STEP_FOR_CHILD"),
            icon: <EmgAdulteEnfant />,
          },
          {
            value: "you, your partner and your kids",
            label: t("STEP_FOR_FAMILY"),
            icon: <EmgCoupleEnfant />,
          },
        ]}
        className="grid grid-cols-2 gap-4"
      ></TileInput>
    </StepContainer>
  );
};

export default For;

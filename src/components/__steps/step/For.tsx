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

const For = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();
  return (
    <StepContainer
      title="Pour qui souhaitez-vous comparer ?"
      description="En quelques minutes, comparons ensemble plus de 42 compagnies."
    >
      <TileInput
        value={lead.for}
        onChange={(value) => {
          changeLead({ for: value as "you", adherent: [] });
          increaseStep();
        }}
        options={[
          {
            value: "you",
            label: "Vous",
            icon: <EmgAdulte />,
          },
          {
            value: "you and your partner",
            label: "Vous et votre conjoint",
            icon: <EmgCouple />,
          },
          {
            value: "you and your kids",
            label: "Vous et vos enfants",
            icon: <EmgAdulteEnfant />,
          },
          {
            value: "you, your partner and your kids",
            label: "Vous, votre conjoint(e) et vos enfants",
            icon: <EmgCoupleEnfant />,
          },
        ]}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      ></TileInput>
    </StepContainer>
  );
};

export default For;

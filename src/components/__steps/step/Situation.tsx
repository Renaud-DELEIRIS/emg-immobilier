import { useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";

const Situation = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();
  return (
    <StepContainer
      title="Vous ne résidez pas en Suisse ?"
      description="Quelle est votre situation ?"
    >
      <TileInput
        value={lead.situation}
        onChange={(value) => {
          changeLead({ situation: value as "frontalier" });
          increaseStep("situation");
        }}
        options={[
          {
            value: "frontalier",
            label: "Travailleur frontalier",
            icon: <IconGenderMale size={40} />,
          },
          {
            value: "future resident",
            label: "Future résident suisse",
            icon: <IconGenderFemale size={40} />,
          },
        ]}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      ></TileInput>
    </StepContainer>
  );
};

export default Situation;

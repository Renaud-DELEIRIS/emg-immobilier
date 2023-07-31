import { useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";

const Situation = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();
  return (
    <StepContainer
      title="Quelle est votre situation ?"
      description={
        <span>
          Vous ne résidez pas en Suisse ?<br />
          J‘ai besoin d‘un peu plus d‘informations.
        </span>
      }
      stepId="situation"
    >
      <TileInput
        value={lead.situation}
        onChange={(value) => {
          changeLead({ situation: value as "frontalier" | "future resident" });
          increaseStep("situation", {
            ...lead,
            situation: value as "frontalier" | "future resident",
          });
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

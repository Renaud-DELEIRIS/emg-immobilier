import { useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import Image from "next/image";

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
          changeLead({
            situation: value as "frontalier" | "future resident",
            adherent: lead.adherent.map((a) => {
              if (a.type === "main")
                return {
                  ...a,
                  travailSuisse: value === "frontalier" ? true : undefined,
                };
              return a;
            }),
          });
          increaseStep("situation", {
            ...lead,
            situation: value as "frontalier" | "future resident",
          });
        }}
        options={[
          {
            value: "frontalier",
            label: "Travailleur frontalier",
            icon: (
              <Image
                src="/icons/frontalier.svg"
                alt="frontalier"
                width={50}
                height={50}
              />
            ),
          },
          {
            value: "future resident",
            label: "Future résident suisse",
            icon: (
              <Image
                src="/icons/resident.svg"
                alt="resident"
                width={50}
                height={50}
              />
            ),
          },
        ]}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      ></TileInput>
    </StepContainer>
  );
};

export default Situation;

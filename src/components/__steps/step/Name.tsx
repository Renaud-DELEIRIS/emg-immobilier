import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import Button from "~/components/button/Button";
import TextInput from "~/components/inputs/TextInput";

const Name = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, isDisabled } = useSteps();

  return (
    <StepContainer
      maxWidth="max-w-xl"
      title="Pour qui souhaitez-vous comparer ?"
      description="En quelques minutes, comparons ensemble plus de 42 compagnies."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInput
          value={lead.nom || ""}
          onChange={(value) => {
            changeLead({ nom: value });
          }}
          label="Votre nom"
          placeholder="Snow"
        ></TextInput>
        <TextInput
          value={lead.prenom || ""}
          onChange={(value) => {
            changeLead({ prenom: value });
          }}
          label="Votre prénom"
          placeholder="John"
        ></TextInput>
      </div>
      <div className="mt-4 flex w-full justify-center">
        <Button
          onClick={() => {
            increaseStep();
          }}
          disabled={isDisabled()}
        >
          Continuer
        </Button>
      </div>
    </StepContainer>
  );
};

export default Name;

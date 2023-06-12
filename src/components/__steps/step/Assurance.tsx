import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import insurers from "~/data/insurers.json";
import Button from "~/components/button/Button";

const Assurance = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();

  return (
    <StepContainer
      maxWidth="max-w-xl"
      title="Quelle est votre assurance actuelle ?"
    >
      <AutoComplete
        value={
          lead.actualInsurance || {
            key: 0,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ actualInsurance: value });
          increaseStep({
            ...lead,
            actualInsurance: value,
          });
        }}
        options={insurers}
        placeholder="p. ex. Helsana"
      ></AutoComplete>
      <p className="mt-2 text-sm text-gray-500">
        <strong>Pas encore d‘assurance ? </strong>
        <button
          className="text-primary hover:underline"
          onClick={() => {
            changeLead({
              actualInsurance: { key: -1, value: "Pas d'assurance" },
            });
            increaseStep({
              ...lead,
              actualInsurance: { key: -1, value: "Pas d'assurance" },
            });
          }}
        >
          Cliquez ici
        </button>
      </p>
    </StepContainer>
  );
};

export default Assurance;

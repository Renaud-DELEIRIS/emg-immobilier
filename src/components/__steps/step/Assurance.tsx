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
  const [aldreadyFilled, setAlreadyFilled] = useState(false);

  useEffect(() => {
    if (lead.npa && lead.npa.key !== 0) {
      setAlreadyFilled(true);
    }
  }, [lead]);

  return (
    <StepContainer
      title="Pour qui souhaitez-vous comparer ?"
      description="En quelques minutes, comparons ensemble plus de 42 compagnies."
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
        label="Votre assurance actuelle"
      ></AutoComplete>
      <p className="mt-2 text-sm text-gray-500">
        Pas encore d‘assurance ?{" "}
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
      {aldreadyFilled && lead.npa?.key !== 0 && (
        <Button
          className="mt-4"
          onClick={() => {
            increaseStep();
          }}
        >
          Continuer
        </Button>
      )}
    </StepContainer>
  );
};

export default Assurance;

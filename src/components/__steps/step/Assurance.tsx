import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import insurers from "~/data/insurers.json";

const Assurance = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();

  return (
    <StepContainer
      title="Quelle est votre assurance actuelle ?"
      description={
        <span>
          Très bien !<br />
          Possedez-vous une assurance santé ? Si oui,
        </span>
      }
      active={activeStep.id === "assurance-actuelle"}
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
          increaseStep("assurance-actuelle", {
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
            increaseStep("assurance-actuelle", {
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

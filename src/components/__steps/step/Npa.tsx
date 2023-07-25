import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";

const Npa = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();

  return (
    <StepContainer
      title="Quel est votre code postal de résident (NPA) ?"
      description={<>Maintenant j‘ai besoin de savoir où vous résidez.</>}
      active={activeStep.id === "npa"}
    >
      <AutoComplete
        value={
          lead.npa || {
            key: 0,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ npa: value });
          increaseStep("npa", {
            ...lead,
            npa: value,
          });
        }}
        options={localtion}
        placeholder="Ville ou NPA"
      ></AutoComplete>
      <p className="mt-2 text-sm text-gray-500">
        <strong>Pas sur le territoire Suisse ? </strong>
        <button
          className="text-primary hover:underline"
          onClick={() => {
            changeLead({ npa: { key: -1, value: "Pas sur le territoire" } });
            increaseStep("npa", {
              ...lead,
              npa: { key: -1, value: "Pas sur le territoire" },
            });
          }}
        >
          Cliquez ici
        </button>
      </p>
    </StepContainer>
  );
};

export default Npa;

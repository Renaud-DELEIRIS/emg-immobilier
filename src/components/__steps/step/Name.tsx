import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import Button from "~/components/button/Button";
import TextInput from "~/components/inputs/TextInput";

const Name = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, isDisabled } = useSteps();

  return (
    <StepContainer
      title="Comment vous appelez-vous ?

      "
      description={
        <span>
          Nous sommes sur la fin !
          <br />
          J‘ai besoin d‘informations supplémentaires pour établir votre offre.
        </span>
      }
      stepId="name"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInput
          value={lead.nom || ""}
          onChange={(value) => {
            changeLead({ nom: value });
          }}
          placeholder="Nom"
        ></TextInput>
        <TextInput
          value={lead.prenom || ""}
          onChange={(value) => {
            changeLead({ prenom: value });
          }}
          placeholder="Prénom"
        ></TextInput>
      </div>
      <div className="mt-4 flex w-full">
        <Button
          onClick={() => {
            increaseStep("name");
          }}
          disabled={isDisabled() || !lead.nom || !lead.prenom}
        >
          Continuer
        </Button>
      </div>
    </StepContainer>
  );
};

export default Name;

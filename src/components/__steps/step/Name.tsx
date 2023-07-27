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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          increaseStep("name");
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput
            value={lead.nom || ""}
            onChange={(value) => {
              changeLead({ nom: value });
            }}
            placeholder="Nom"
            autocomplete="family-name"
          ></TextInput>
          <TextInput
            value={lead.prenom || ""}
            onChange={(value) => {
              changeLead({ prenom: value });
            }}
            placeholder="Prénom"
            autocomplete="given-name"
          ></TextInput>
        </div>
        <div className="mt-4 flex w-full">
          <Button
            type="submit"
            disabled={isDisabled() || !lead.nom || !lead.prenom}
          >
            Continuer
          </Button>
        </div>
      </form>
    </StepContainer>
  );
};

export default Name;

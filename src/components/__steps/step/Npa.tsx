import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import Button from "~/components/button/Button";

const Npa = () => {
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
          lead.npa || {
            key: 0,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ npa: value });
          increaseStep({
            ...lead,
            npa: value,
          });
        }}
        options={localtion}
        label="Votre NPA"
      ></AutoComplete>
      <p className="mt-2 text-sm text-gray-500">
        Pas sur le territoire Suisse ?{" "}
        <button
          className="text-primary hover:underline"
          onClick={() => {
            changeLead({ npa: { key: -1, value: "Pas sur le territoire" } });
            increaseStep({
              ...lead,
              npa: { key: -1, value: "Pas sur le territoire" },
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

export default Npa;

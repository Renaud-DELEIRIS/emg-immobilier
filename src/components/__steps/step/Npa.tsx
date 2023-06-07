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
      maxWidth="max-w-xl"
      title="Quel est votre lieu de résidence ?"
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
        placeholder="Ville ou NPA"
      ></AutoComplete>
      <p className="mt-2 text-sm text-gray-500">
        <strong>Pas sur le territoire Suisse ? </strong>
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
        <div className="mt-4 flex w-full justify-center">
          <Button
            onClick={() => {
              increaseStep();
            }}
          >
            Continuer
          </Button>
        </div>
      )}
    </StepContainer>
  );
};

export default Npa;

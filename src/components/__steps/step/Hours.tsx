import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import TileInput from "~/components/inputs/Tile";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";

const Hours = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();

  return (
    <StepContainer
      title="Travaillez-vous plus de 8h par semaine pour le même employeur ?"
      description={
        <span>
          Très bien,
          <br />
          Concernant votre travail en Suisse,
        </span>
      }
      stepId="work-hours"
    >
      <TileInput
        value={lead.situation}
        onChange={(value) => {
          changeLead({
            workHours: value === "yes" ? "more than 8" : "less than 8",
          });
          increaseStep("work-hours");
        }}
        options={[
          {
            label: "Oui",
            value: "yes",
            rightIcon: <IconThumbUp />,
          },
          {
            label: "Non",
            value: "no",
            rightIcon: <IconThumbDown />,
          },
        ]}
        className="gap-4"
      ></TileInput>
    </StepContainer>
  );
};

export default Hours;

import { useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";

const DefaultStep = () => {
  const [value, setValue] = useState("");
  return (
    <StepContainer
      title="Default step"
      description="This is a default step with a TileInput component."
      info="This is an info message."
      infoTitle="Info title"
    >
      <TileInput
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        options={[
          {
            value: "male",
            label: "Monsieur",
            icon: <IconGenderMale size={40} />,
          },
          {
            value: "female",
            label: "Madame",
            icon: <IconGenderFemale size={40} />,
          },
        ]}
        className="w-full gap-4"
      ></TileInput>
    </StepContainer>
  );
};

export default DefaultStep;

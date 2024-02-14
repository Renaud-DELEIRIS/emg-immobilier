import { useTranslation } from "next-i18next";
import { useState } from "react";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import { SelectInput } from "../inputs/Select";
import StepContainer, { StepTitle } from "./StepContainer";

const Children = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const [hasJustBeenSet, setHasJustBeenSet] = useState(false);
  return (
    <StepContainer stepId="children">
      <TileInput
        value={lead.child_nb?.toString()}
        onChange={(value) => {
          if (lead.child_nb === undefined || lead.child_nb === 0)
            setHasJustBeenSet(true);
          changeLead({ child_nb: parseInt(value!) });
          if (value === "0")
            nextStep("children", {
              child_nb: parseInt(value),
            });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value:
              lead.child_nb === undefined
                ? "1"
                : lead.child_nb.toString() !== "0"
                ? lead.child_nb.toString()
                : "1",
            label: t("yes"),
          },
          {
            value: "0",
            label: t("no"),
          },
        ]}
      ></TileInput>
      {lead.child_nb !== undefined && lead.child_nb >= 1 && (
        <div className="mt-4 flex flex-col gap-4">
          <StepTitle>{t`children.how_many`}</StepTitle>
          <SelectInput
            value={hasJustBeenSet ? "" : lead.child_nb.toString()}
            onChange={(e) => {
              setHasJustBeenSet(false);
              changeLead({ child_nb: parseInt(e) });
              nextStep("children", {
                child_nb: parseInt(e),
              });
            }}
            placeholder={t`children.select_placeholder`}
            options={Array(10)
              .fill(0)
              .map((_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}`,
              }))}
          />
        </div>
      )}
    </StepContainer>
  );
};

export default Children;

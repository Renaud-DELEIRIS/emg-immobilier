import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const Owner = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="owner">
      <TileInput
        value={lead.is_owner_property}
        onChange={(value) => {
          changeLead({ is_owner_property: value });
          nextStep("owner", {
            is_owner_property: value,
          });
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: true,
            label: t("yes"),
          },
          {
            value: false,
            label: t("no"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default Owner;

import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const Civility = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer
      title={t("civility.title")}
      stepId="civility"
      description={t("civility.description")}
      withBackButton
    >
      <TileInput
        value={lead.civility}
        onChange={(value) => {
          changeLead({ civility: value });
          nextStep("civility");
        }}
        withoutDot
        className="grid gap-4 md:grid-cols-2"
        options={[
          {
            value: "mr",
            label: t("civility.mr"),
            icon: <IconGenderMale size={28} />,
          },
          {
            value: "mrs",
            label: t("civility.mrs"),
            icon: <IconGenderFemale size={28} />,
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default Civility;

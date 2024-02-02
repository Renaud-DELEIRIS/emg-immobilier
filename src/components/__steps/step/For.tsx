import { useTranslation } from "next-i18next";
import { EmgAdulte } from "~/components/icon/EmgAdulte";
import { EmgAdulteEnfant } from "~/components/icon/EmgAdulteEnfant";
import { EmgCouple } from "~/components/icon/EmgCouple";
import { EmgCoupleEnfant } from "~/components/icon/EmgCoupleEnfant";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

const For = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");
  return (
    <StepContainer title={t("STEP_FOR_TITLE")} stepId="for-who">
      <TileInput
        value={lead.for}
        onChange={(value) => {
          changeLead({ for: value as "you", adherent: [] });
          nextStep("for-who");
        }}
        options={[
          {
            value: "you",
            label: t("STEP_FOR_YOURSELF"),
            icon: <EmgAdulte size={38} />,
          },
          {
            value: "you and your partner",
            label: t("STEP_FOR_SPOUSE"),
            icon: <EmgCouple size={38} />,
          },
          {
            value: "you and your kids",
            label: t("STEP_FOR_CHILD"),
            icon: <EmgAdulteEnfant size={38} />,
          },
          {
            value: "you, your partner and your kids",
            label: t("STEP_FOR_FAMILY"),
            icon: <EmgCoupleEnfant size={38} />,
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default For;

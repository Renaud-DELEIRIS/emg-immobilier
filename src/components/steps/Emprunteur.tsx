import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import { EmgAdulte } from "../icon/EmgAdulte";
import { EmgCouple } from "../icon/EmgCouple";
import StepContainer from "./StepContainer";

const Emprunteur = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="emprunteur">
      <TileInput
        value={lead.emprunteur}
        onChange={(value) => {
          changeLead({ emprunteur: value });
          nextStep("emprunteur", {
            emprunteur: value,
          });
        }}
        options={[
          {
            value: "seul",
            label: t("emprunteur.seul"),
            icon: <EmgAdulte size={38} />,
          },
          {
            value: "deux",
            label: t("emprunteur.deux"),
            icon: <EmgCouple size={38} />,
          },
          {
            value: "other",
            label: t("other"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default Emprunteur;

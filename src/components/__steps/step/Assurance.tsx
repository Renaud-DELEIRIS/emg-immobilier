import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

const Assurance = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");
  return (
    <StepContainer
      title={t("STEP_ASSURANCE_TITLE")}
      stepId="assurance-actuelle"
    >
      <TileInput
        value={lead.actualInsurance}
        onChange={(value) => {
          changeLead({ actualInsurance: value as boolean });
          nextStep("assurance-actuelle", {
            ...lead,
            actualInsurance: value as boolean,
          });
        }}
        className="w-full flex-row"
        options={[
          {
            value: true,
            label: t("YES"),
          },
          {
            value: false,
            label: t("NO"),
          },
        ]}
      ></TileInput>

      {/* <AutoComplete
        value={
          lead.actualInsurance || {
            key: 0 as number | string,
            value: "",
          }
        }
        onChange={(value) => {
          changeLead({ actualInsurance: value });
          nextStep("assurance-actuelle", {
            ...lead,
            actualInsurance: value,
          });
        }}
        options={insurers}
        placeholder={t("STEP_ASSURANCE_PLACEHOLDER")}
      ></AutoComplete> */}
    </StepContainer>
  );
};

export default Assurance;

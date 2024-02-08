import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const Carusage = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer
      title={t("car_usage.title")}
      description={t("car_usage.description")}
      info={t("car_usage.info")}
      stepId="car_usage"
    >
      <TileInput
        value={lead.car_usage}
        onChange={(value) => {
          changeLead({ car_usage: value });
          nextStep("car_usage");
        }}
        options={[
          {
            value: "private and go to work",
            label: t("car_usage.semi-private"),
          },
          {
            value: "private",
            label: t("car_usage.private"),
          },
          {
            value: "professional",
            label: t("car_usage.professional"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default Carusage;

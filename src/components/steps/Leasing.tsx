import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const Leasing = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const { t: tCommon } = useTranslation("common");
  return (
    <StepContainer
      title={t("car_leasing.title")}
      stepId="car_leasing"
      withBackButton
    >
      <TileInput
        value={lead.car_leasing}
        onChange={(value) => {
          changeLead({ car_leasing: value });
          nextStep("car_leasing");
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: true,
            label: tCommon("YES"),
          },
          {
            value: false,
            label: tCommon("NO"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default Leasing;

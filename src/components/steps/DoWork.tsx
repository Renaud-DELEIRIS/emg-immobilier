import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const DoWork = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="do_work">
      <TileInput
        value={lead.do_work}
        className="grid md:grid-cols-2"
        onChange={(value) => {
          changeLead({ do_work: value });
          nextStep("do_work", {
            do_work: value,
          });
        }}
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

export default DoWork;

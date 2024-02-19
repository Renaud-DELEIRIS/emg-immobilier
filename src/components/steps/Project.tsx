import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const Project = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer stepId="project" withTitle>
      <TileInput
        value={lead.project}
        onChange={(value) => {
          changeLead({ project: value });
          nextStep("project", {
            project: value,
          });
        }}
        options={[
          {
            value: "nouveau bien",
            label: t("project.new"),
          },
          {
            value: "capacité d'emprunt",
            label: t("project.capa_emprunt"),
          },
          {
            value: "renouveller hypothèque",
            label: t("project.renew_hypo"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default Project;

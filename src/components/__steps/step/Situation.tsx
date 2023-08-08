import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";

import Image from "next/image";
import { useTranslation, Trans } from "next-i18next";
import { useFormStore } from "~/stores/form";

const Situation = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");
  return (
    <StepContainer
      title={t("STEP_SITUATION_TITLE")}
      description={<Trans t={t} i18nKey="STEP_SITUATION_DESCRIPTION" />}
      stepId="situation"
    >
      <TileInput
        value={lead.situation}
        onChange={(value) => {
          changeLead({
            situation: value as "frontalier" | "future resident",
            adherent: lead.adherent.map((a) => {
              if (a.type === "main")
                return {
                  ...a,
                  travailSuisse: value === "frontalier" ? true : undefined,
                };
              return a;
            }),
          });
          nextStep("situation", {
            ...lead,
            situation: value as "frontalier" | "future resident",
          });
        }}
        options={[
          {
            value: "frontalier",
            label: t("STEP_SITUATION_FRONTALIER"),
            icon: (
              <Image
                src="/icons/frontalier.svg"
                alt="frontalier"
                width={50}
                height={50}
              />
            ),
          },
          {
            value: "future resident",
            label: t("STEP_SITUATION_SUISSE"),
            icon: (
              <Image
                src="/icons/resident.svg"
                alt="resident"
                width={50}
                height={50}
              />
            ),
          },
        ]}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      ></TileInput>
    </StepContainer>
  );
};

export default Situation;

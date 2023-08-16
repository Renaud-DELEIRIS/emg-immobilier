import { Trans, useTranslation } from "next-i18next";
import { useState } from "react";
import Pack from "~/components/steps/Pack";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

const ChoosePack = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const [adherent, setAdherent] = useState<number>(0);
  const { t } = useTranslation("common");
  return (
    <>
      <div className="flex flex-col gap-8">
        <div id="package" />
        {lead.adherent.map((data, index) => {
          if (index > adherent) return null;
          return (
            <StepContainer
              description={<Trans i18nKey={"STEP_PACK_DESCRIPTION"} t={t} />}
              title={
                data.type === "main"
                  ? t("STEP_PACK_MAIN")
                  : data.type === "partner"
                  ? data.civility === "female"
                    ? t("STEP_PACK_SPOUSE_FEMALE")
                    : t("STEP_PACK_SPOUSE_MALE")
                  : t("STEP_PACK_CHILD", {
                      year: data.year,
                    })
              }
              className="pb-12"
              stepId={"package"}
              id={index.toString()}
              key={index}
            >
              <Pack
                adherent={data}
                setPack={(pack) => {
                  changeLead({
                    adherent: [
                      ...lead.adherent.slice(0, index),
                      {
                        ...data,
                        pack,
                      },
                      ...lead.adherent.slice(index + 1),
                    ],
                  });
                }}
                adherentIndex={index}
                setAdherent={setAdherent}
                showNext={index === adherent}
              />
            </StepContainer>
          );
        })}
      </div>
    </>
  );
};

export default ChoosePack;

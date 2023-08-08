import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import Button from "~/components/button/Button";
import { type Adherent, useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import Pack from "~/components/steps/Pack";
import StepContainer from "../StepContainer";
import { Trans, useTranslation } from "next-i18next";

const ChoosePack = () => {
  const { lead, changeLead } = useLead();
  const [adherent, setAdherent] = useState<number>(0);
  const { increaseStep } = useSteps();
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
                      year: dayjs(data.dob, "DD.MM.YYYY").year().toString(),
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
              />
            </StepContainer>
          );
        })}
      </div>
      <div className="mt-4 flex w-full justify-between">
        <div></div>
        <Button
          onClick={() => {
            if (lead.adherent.length === adherent + 1) {
              increaseStep("package");
              return;
            }
            setAdherent(adherent + 1);
            // Scroll smooth to top

            setTimeout(() => {
              const elem = document.getElementById((adherent + 1).toString());
              if (elem) {
                const offsetTop =
                  elem.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                  top: offsetTop - 100,
                  behavior: "smooth",
                });
              }
            }, 100);
          }}
          iconRight={<IconArrowRight />}
        >
          {t("VALIDATE")}
        </Button>
      </div>
    </>
  );
};

export default ChoosePack;

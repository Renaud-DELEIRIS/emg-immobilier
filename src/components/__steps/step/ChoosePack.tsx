import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import Button from "~/components/button/Button";
import Pack from "~/components/steps/Pack";
import StepContainer from "../StepContainer";
import { Trans, useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";

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
              nextStep("package");
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

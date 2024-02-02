import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "next-i18next";
import { Fragment, useEffect, useState } from "react";
import { SelectInput } from "~/components/inputs/Select";
import TileInput from "~/components/inputs/Tile";
import {
  franchiseAdulte,
  franchiseEnfant,
} from "~/constants/franchise.constant";
import { useFormStore } from "~/stores/form";
import StepContainer, { StepDescription, StepTitle } from "../StepContainer";

const Franchise = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const activeStep = useFormStore((state) => state.currentVisibleStep);
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [step, setStep] = useState<"franchise" | "couverture">("franchise");
  const { t } = useTranslation("common");

  const nextToEdit = () => {
    for (const adherent of lead.adherent) {
      if (
        adherent.franchise === undefined ||
        (adherent.couvertureAccident === undefined && adherent.type !== "child")
      ) {
        return lead.adherent.indexOf(adherent);
      }
    }
  };

  const isChild = (dob: string) => {
    return dayjs().diff(dayjs(dob, "YYYY"), "year") < 19;
  };

  useEffect(() => {
    if (activeStep.id !== "franchise") return;
    const next = nextToEdit();
    if (next !== undefined) {
      setIsEditing(nextToEdit());
      if (isEditing !== next) setStep("franchise");
    } else {
      nextStep("franchise");
      setIsEditing(undefined);
    }
  }, [lead]);

  const adherant =
    isEditing !== undefined ? lead.adherent[isEditing] : undefined;

  return (
    <StepContainer stepId="franchise" className="gap-10">
      {lead.adherent
        .filter(
          (data) =>
            data.franchise !== undefined &&
            (data.couvertureAccident !== undefined || data.type === "child")
        )
        .map((adherent, index) => (
          <Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-[20px] flex flex-col gap-[10px]">
                <StepTitle>
                  {index === 0
                    ? t("STEP_FRANCHISE_TITLE_MAIN")
                    : adherent.civility === "female"
                    ? t("STEP_FRANCHISE_TITLE_SPOUSE_FEMALE")
                    : t("STEP_FRANCHISE_TITLE_SPOUSE_MALE")}
                </StepTitle>
                <StepDescription>
                  <Trans i18nKey={"STEP_FRANCHISE_INFO_FRANCHISE"} t={t} />.
                </StepDescription>
              </div>
              <SelectInput
                options={
                  isChild(adherent.year || "")
                    ? franchiseEnfant
                    : franchiseAdulte
                }
                value={adherent.franchise}
                placeholder={t("STEP_FRANCHISE_PLACEHOLDER")}
                onChange={(value: string) => {
                  changeLead({
                    adherent: [
                      ...lead.adherent.slice(0, index),
                      {
                        ...adherent,
                        franchise: value as "0",
                      },
                      ...lead.adherent.slice(index + 1),
                    ],
                  });
                }}
              />
            </motion.div>

            {adherent.type !== "child" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-5 flex flex-col gap-[10px]">
                  <StepTitle>
                    {index === 0
                      ? t("STEP_FRANCHISE_COUVERTURE_TITLE_MAIN")
                      : adherent.civility === "female"
                      ? t("STEP_FRANCHISE_COUVERTURE_TITLE_SPOUSE_FEMALE")
                      : t("STEP_FRANCHISE_COUVERTURE_TITLE_SPOUSE_MALE")}
                  </StepTitle>
                  <StepDescription>
                    <Trans i18nKey={"STEP_FRANCHISE_INFO_COUVERTURE"} t={t} />.
                  </StepDescription>
                </div>
                <TileInput
                  value={adherent.couvertureAccident}
                  onChange={(value) => {
                    setIsEditing(undefined);
                    changeLead({
                      adherent: [
                        ...lead.adherent.slice(0, index),
                        {
                          ...adherent,
                          couvertureAccident: value as "oui",
                        },
                        ...lead.adherent.slice(index + 1),
                      ],
                    });
                  }}
                  options={[
                    {
                      label: t("YES"),
                      value: "oui",
                    },
                    {
                      label: t("NO"),
                      value: "non",
                    },
                  ]}
                  className="flex-row"
                ></TileInput>
              </motion.div>
            )}
          </Fragment>
        ))}

      {adherant !== undefined && (
        <div
          className="flex min-h-[calc(100dvh-210px)] flex-col gap-10"
          id="franchise-editing"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-[20px] flex flex-col gap-[10px]">
              <StepTitle>
                {isEditing === 0
                  ? t("STEP_FRANCHISE_TITLE_MAIN")
                  : adherant.civility === "female"
                  ? t("STEP_FRANCHISE_TITLE_SPOUSE_FEMALE")
                  : t("STEP_FRANCHISE_TITLE_SPOUSE_MALE")}
              </StepTitle>
              <StepDescription>
                {isChild(adherant.year || "") ? (
                  <Trans i18nKey={"STEP_FRANCHISE_INFO_CHILD"} t={t} />
                ) : (
                  <Trans i18nKey={"STEP_FRANCHISE_INFO_FRANCHISE"} t={t} />
                )}
              </StepDescription>
            </div>
            <SelectInput
              options={
                isChild(adherant.year || "") ? franchiseEnfant : franchiseAdulte
              }
              value={adherant.franchise}
              placeholder={t("STEP_FRANCHISE_PLACEHOLDER")}
              onChange={(value: string) => {
                changeLead({
                  adherent: [
                    ...lead.adherent.slice(0, isEditing),
                    {
                      ...adherant,
                      franchise: value as "0",
                    },
                    ...lead.adherent.slice((isEditing as number) + 1),
                  ],
                });
                if (isChild(adherant.year || "")) {
                  setIsEditing(undefined);
                } else setStep("couverture");
              }}
            />
          </motion.div>

          {step === "couverture" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-5 flex flex-col gap-[10px]">
                <StepTitle>
                  {isEditing === 0
                    ? t("STEP_FRANCHISE_COUVERTURE_TITLE_MAIN")
                    : adherant.civility === "female"
                    ? t("STEP_FRANCHISE_COUVERTURE_TITLE_SPOUSE_FEMALE")
                    : t("STEP_FRANCHISE_COUVERTURE_TITLE_SPOUSE_MALE")}
                </StepTitle>
                <StepDescription>
                  <Trans i18nKey={"STEP_FRANCHISE_INFO_COUVERTURE"} t={t} />.
                </StepDescription>
              </div>
              <TileInput
                value={adherant.couvertureAccident}
                onChange={(value) => {
                  setStep("franchise");
                  setIsEditing(undefined);
                  changeLead({
                    adherent: [
                      ...lead.adherent.slice(0, isEditing),
                      {
                        ...adherant,
                        couvertureAccident: value as "oui",
                      },
                      ...lead.adherent.slice((isEditing as number) + 1),
                    ],
                  });
                  setIsEditing(undefined);
                  setStep("franchise");
                  setTimeout(() => {
                    const element =
                      document.getElementById("franchise-editing");
                    if (element) {
                      console.log(element, element.getBoundingClientRect());
                      const offsetTop =
                        element.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: offsetTop - 100,
                        behavior: "smooth",
                      });
                    }
                  }, 50);
                }}
                options={[
                  {
                    label: t("YES"),
                    value: "oui",
                  },
                  {
                    label: t("NO"),
                    value: "non",
                  },
                ]}
                className="flex-row"
              ></TileInput>
            </motion.div>
          )}
        </div>
      )}
    </StepContainer>
  );
};

export default Franchise;

import {
  IconCheck,
  IconEdit,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Button from "~/components/button/Button";
import Select from "~/components/inputs/Select";
import TileInput from "~/components/inputs/Tile";
import { Adherent } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

const Franchise = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const activeStep = useFormStore((state) => state.currentVisibleStep);
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [step, setStep] = useState<"franchise" | "couverture">("franchise");
  const [showContinue, setShowContinue] = useState<boolean>(false);
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
      if ((lead.adherent[next] as Adherent).type === "child") {
        changeLead({
          adherent: [
            ...lead.adherent.slice(0, next),
            {
              ...lead.adherent[next],
              franchise: isChild((lead.adherent[next] as Adherent).year || "")
                ? "0"
                : "2500",
            } as Adherent,
            ...lead.adherent.slice(next + 1),
          ],
        });
        setIsEditing(next);
        setShowContinue(true);
        return;
      }
      setIsEditing(nextToEdit());
      if (isEditing !== next) setStep("franchise");
    } else {
      setShowContinue(true);
      nextStep("franchise");
      setIsEditing(undefined);
    }
  }, [lead, activeStep]);

  const adherant =
    isEditing !== undefined ? lead.adherent[isEditing] : undefined;

  return (
    <div>
      {lead.adherent.filter(
        (data) =>
          data.franchise !== undefined && data.couvertureAccident !== undefined
      ).length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl">{t("STEP_FRANCHISE_LIST_TITLE")}</h3>
          <div className="mt-4 flex flex-col gap-4">
            {lead.adherent
              .filter(
                (data) =>
                  data.franchise !== undefined &&
                  data.couvertureAccident !== undefined
              )
              .map((adherent, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <button
                    onClick={() => {
                      setIsEditing(index);
                    }}
                    className="group flex w-full justify-between gap-4 rounded-lg border border-neutral-100 bg-white p-4 text-left shadow"
                  >
                    <p className="text-base text-neutral-800">
                      {adherent.type === "main" && (
                        <span>
                          <Trans
                            i18nKey="STEP_FRANCHISE_LIST_MAIN"
                            t={t}
                            values={{
                              value: adherent.franchise,
                            }}
                          />
                          {adherent.couvertureAccident === "oui" ? (
                            <span>
                              {" "}
                              <Trans
                                i18nKey={"STEP_FRANCHISE_LIST_COUVERTURE"}
                                t={t}
                              />
                            </span>
                          ) : (
                            <span>
                              {" "}
                              <Trans
                                i18nKey={"STEP_FRANCHISE_LIST_NOCOUVERTURE"}
                                t={t}
                              />
                            </span>
                          )}
                          .
                        </span>
                      )}

                      {adherent.type === "partner" &&
                        (adherent.civility === "female" ? (
                          <span>
                            <Trans
                              i18nKey={"STEP_FRANCHISE_LIST_SPOUSE_FEMALE"}
                              t={t}
                              values={{
                                value: adherent.franchise,
                              }}
                            />
                            {adherent.couvertureAccident === "oui" ? (
                              <span>
                                {" "}
                                <Trans
                                  i18nKey={"STEP_FRANCHISE_LIST_COUVERTURE"}
                                  t={t}
                                />
                              </span>
                            ) : (
                              <span>
                                {" "}
                                <Trans
                                  i18nKey={"STEP_FRANCHISE_LIST_NOCOUVERTURE"}
                                  t={t}
                                />
                              </span>
                            )}
                            .
                          </span>
                        ) : (
                          <span>
                            <Trans
                              i18nKey={"STEP_FRANCHISE_LIST_SPOUSE_MALE"}
                              t={t}
                              values={{
                                value: adherent.franchise,
                              }}
                            />
                            {adherent.couvertureAccident === "oui" ? (
                              <span>
                                {" "}
                                <Trans
                                  i18nKey={"STEP_FRANCHISE_LIST_COUVERTURE"}
                                  t={t}
                                />
                              </span>
                            ) : (
                              <span>
                                {" "}
                                <Trans
                                  i18nKey={"STEP_FRANCHISE_LIST_NOCOUVERTURE"}
                                  t={t}
                                />
                              </span>
                            )}
                            .
                          </span>
                        ))}

                      {adherent.type === "child" && (
                        <Trans
                          i18nKey={"STEP_FRANCHISE_LIST_CHILD"}
                          t={t}
                          values={{
                            value: adherent.franchise,
                            year: adherent.year,
                          }}
                        />
                      )}
                    </p>
                    <IconEdit className="group-hover:text-primary-500" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
      {adherant !== undefined && adherant.type !== "child" && (
        <div>
          {step === "franchise" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <StepContainer
                description={
                  isEditing === 0
                    ? t("STEP_FRANCHISE_DESCRIPTION_MAIN")
                    : adherant.civility === "female"
                    ? t("STEP_FRANCHISE_DESCRIPTION_SPOUSE_FEMALE")
                    : t("STEP_FRANCHISE_DESCRIPTION_SPOUSE_MALE")
                }
                title={
                  isEditing === 0
                    ? t("STEP_FRANCHISE_TITLE_MAIN")
                    : adherant.civility === "female"
                    ? t("STEP_FRANCHISE_TITLE_SPOUSE_FEMALE")
                    : t("STEP_FRANCHISE_TITLE_SPOUSE_MALE")
                }
                stepId="franchise"
              >
                <Select
                  options={
                    isChild(adherant.year || "")
                      ? [
                          {
                            label: "0 CHF",
                            value: "0",
                          },
                          {
                            label: "100 CHF",
                            value: "100",
                          },
                          {
                            label: "200 CHF",
                            value: "200",
                          },
                          {
                            label: "300 CHF",
                            value: "300",
                          },
                          {
                            label: "400 CHF",
                            value: "400",
                          },
                          {
                            label: "500 CHF",
                            value: "500",
                          },
                          {
                            label: "600 CHF",
                            value: "600",
                          },
                        ]
                      : [
                          {
                            label: "300 CHF",
                            value: "300",
                          },
                          {
                            label: "500 CHF",
                            value: "500",
                          },
                          {
                            label: "1000 CHF",
                            value: "1000",
                          },
                          {
                            label: "1500 CHF",
                            value: "1500",
                          },
                          {
                            label: "2000 CHF",
                            value: "2000",
                          },
                          {
                            label: "2500 CHF",
                            value: "2500",
                          },
                        ]
                  }
                  value={
                    adherant.franchise ||
                    (isChild(adherant.year || "") ? "600" : "2500")
                  }
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
                  }}
                  icon={<IconEdit />}
                />
                <p className="mt-2 text-sm text-neutral-400">
                  <IconInfoCircle className="mr-1 inline" size={16} />
                  <Trans i18nKey={"STEP_FRANCHISE_INFO_FRANCHISE"} t={t} />.
                </p>

                <motion.div
                  className="flex w-full justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={() => {
                      if (!adherant.franchise)
                        changeLead({
                          adherent: [
                            ...lead.adherent.slice(0, isEditing),
                            {
                              ...adherant,
                              franchise: isChild(adherant.year || "")
                                ? "600"
                                : "2500",
                            },
                            ...lead.adherent.slice((isEditing as number) + 1),
                          ],
                        });

                      setStep("couverture");
                    }}
                    className="mt-4 w-52"
                  >
                    {t("CONTINUE")}
                  </Button>
                </motion.div>
              </StepContainer>
            </motion.div>
          )}

          {step === "couverture" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <StepContainer
                description={
                  isEditing === 0
                    ? t("STEP_FRANCHISE_COUVERTURE_TITLE")
                    : t("STEP_FRANCHISE_COUVERTURE_OTHER")
                }
                title={
                  isEditing === 0
                    ? t("STEP_FRANCHISE_COUVERTURE_TITLE_MAIN")
                    : adherant.civility === "female"
                    ? t("STEP_FRANCHISE_COUVERTURE_TITLE_SPOUSE_FEMALE")
                    : t("STEP_FRANCHISE_COUVERTURE_TITLE_SPOUSE_MALE")
                }
                stepId="franchise"
              >
                <TileInput
                  value={adherant.couvertureAccident ?? "non"}
                  onChange={(value) => {
                    setStep("franchise");
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
                  }}
                  options={[
                    {
                      label: t("YES"),
                      value: "oui",
                      rightIcon: <IconCheck />,
                    },
                    {
                      label: t("NO"),
                      value: "non",
                      rightIcon: <IconX />,
                    },
                  ]}
                  className="gap-4"
                ></TileInput>
                <p className="mt-2 text-sm text-neutral-400">
                  <IconInfoCircle className="mr-1 inline" size={16} />
                  <Trans i18nKey={"STEP_FRANCHISE_INFO_COUVERTURE"} t={t} />.
                </p>
                <motion.div
                  className="flex w-full justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={() => {
                      if (!adherant.couvertureAccident) {
                        changeLead({
                          adherent: [
                            ...lead.adherent.slice(0, isEditing),
                            {
                              ...adherant,
                              couvertureAccident: "non",
                            },
                            ...lead.adherent.slice((isEditing as number) + 1),
                          ],
                        });
                      }
                      setIsEditing(undefined);
                      setStep("franchise");
                    }}
                    className="mt-4 w-52"
                  >
                    {t("VALIDATE")}
                  </Button>
                </motion.div>
              </StepContainer>
            </motion.div>
          )}
        </div>
      )}
      {isEditing === undefined && (
        <div className="flex flex-col gap-12">
          {lead.adherent
            .filter((data) => data.type === "child")
            .map((adherent, index) => (
              <div
                className="container-shadow rounded-lg border bg-white p-6"
                key={index}
              >
                <p className="mb-4 text-base font-bold">
                  {t("STEP_FRANCHISE_TITLE_CHILD", {
                    year: adherent.year || "",
                  })}
                </p>
                <Select
                  options={
                    isChild(adherent.year || "")
                      ? [
                          {
                            label: "0 CHF",
                            value: "0",
                          },
                          {
                            label: "100 CHF",
                            value: "100",
                          },
                          {
                            label: "200 CHF",
                            value: "200",
                          },
                          {
                            label: "300 CHF",
                            value: "300",
                          },
                          {
                            label: "400 CHF",
                            value: "400",
                          },
                          {
                            label: "500 CHF",
                            value: "500",
                          },
                          {
                            label: "600 CHF",
                            value: "600",
                          },
                        ]
                      : [
                          {
                            label: "300 CHF",
                            value: "300",
                          },
                          {
                            label: "500 CHF",
                            value: "500",
                          },
                          {
                            label: "1000 CHF",
                            value: "1000",
                          },
                          {
                            label: "1500 CHF",
                            value: "1500",
                          },
                          {
                            label: "2000 CHF",
                            value: "2000",
                          },
                          {
                            label: "2500 CHF",
                            value: "2500",
                          },
                        ]
                  }
                  value={
                    adherent.franchise ||
                    (isChild(adherent.year || "") ? "600" : "2500")
                  }
                  onChange={(value: string) => {
                    const i =
                      lead.for === "you and your kids"
                        ? index + 1
                        : lead.for === "you, your partner and your kids"
                        ? index + 2
                        : index;
                    changeLead({
                      adherent: [
                        ...lead.adherent.slice(0, i),
                        {
                          ...adherent,
                          franchise: value as "0",
                        },
                        ...lead.adherent.slice(i + 1),
                      ],
                    });
                  }}
                  label="Franchise"
                  icon={<IconEdit />}
                />
                <p className="mt-2 text-sm text-neutral-400">
                  <IconInfoCircle className="mr-1 inline" size={16} />
                  <Trans i18nKey={"STEP_FRANCHISE_INFO_CHILD"} t={t} />
                </p>
              </div>
            ))}
        </div>
      )}

      {showContinue && activeStep.id === "franchise" && (
        <motion.div
          className=""
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => {
              nextStep("franchise");
            }}
            className="mt-4 w-52"
          >
            {t("CONTINUE")}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Franchise;

import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { type Adherent, useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import dayjs from "dayjs";
import Button from "~/components/button/Button";
import {
  IconCheck,
  IconEdit,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";
import Select from "~/components/inputs/Select";
import { motion } from "framer-motion";

const Franchise = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [step, setStep] = useState<"franchise" | "couverture">("franchise");
  const [showContinue, setShowContinue] = useState<boolean>(false);

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
    return dayjs().diff(dayjs(dob), "year") < 19;
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
              franchise: isChild((lead.adherent[next] as Adherent).dob || "")
                ? "0"
                : "2500",
            },
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
          <h3 className="text-xl">Vos franchises</h3>
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
                          Vous souhaitez une franchise de{" "}
                          <b>{adherent.franchise} CHF</b>
                          {adherent.couvertureAccident === "oui" && (
                            <span>
                              {" "}
                              ainsi que d‘une <b>couverture accident</b>
                            </span>
                          )}
                          .
                        </span>
                      )}

                      {adherent.type === "partner" &&
                        (adherent.civility === "female" ? (
                          <span>
                            Votre conjointe a besoin d‘une franchise de{" "}
                            <b>{adherent.franchise} CHF</b>
                            {adherent.couvertureAccident === "oui" && (
                              <span>
                                {" "}
                                ainsi que d‘une <b>couverture accident</b>
                              </span>
                            )}
                            .
                          </span>
                        ) : (
                          <span>
                            Votre conjoint a besoin d‘une franchise de{" "}
                            <b>{adherent.franchise} CHF</b>
                            {adherent.couvertureAccident === "oui" && (
                              <span>
                                {" "}
                                ainsi que d‘une <b>couverture accident</b>
                              </span>
                            )}
                            .
                          </span>
                        ))}

                      {adherent.type === "child" && (
                        <span>
                          Votre enfant né en{" "}
                          {dayjs(adherent.dob).format("YYYY")} a besoin d‘une
                          franchise de <b>{adherent.franchise} CHF</b>
                        </span>
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
                    ? "Je vais maintenant m'interesser à vos besoins."
                    : adherant.civility === "female"
                    ? "Concernant votre conjointe,"
                    : "Concernant votre coinjoit,"
                }
                title={
                  isEditing === 0
                    ? "Quelle franchise souhaitez-vous ?"
                    : adherant.civility === "female"
                    ? "Quelle franchise souhaitez-vous pour votre elle ?"
                    : "Quelle franchise souhaitez-vous pour votre lui ?"
                }
                stepId="franchise"
              >
                <Select
                  options={
                    isChild(adherant.dob || "")
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
                    (isChild(adherant.dob || "") ? "600" : "2500")
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
                  Si vos dépenses médicales sont <b>
                    inférieures à 1‘700 CHF
                  </b>{" "}
                  par année, je vous conseille <b>une franchise à 2‘500 CHF</b>.
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
                              franchise: isChild(adherant.dob || "")
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
                    Continuer
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
                    ? "Concernant le risque accident,"
                    : "Concernant son risque accident,"
                }
                title={
                  isEditing === 0
                    ? "Souhaitez-vous une couverture accident ?"
                    : adherant.civility === "female"
                    ? "Souhaitez-vous une couverture accident pour votre conjointe ?"
                    : "Souhaitez-vous une couverture accident pour votre conjoint ?"
                }
                stepId="franchise"
              >
                <TileInput
                  value={adherant.couvertureAccident ?? "non"}
                  onChange={(value) => {
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
                      label: "Oui",
                      value: "oui",
                      rightIcon: <IconCheck />,
                    },
                    {
                      label: "Non",
                      value: "non",
                      rightIcon: <IconX />,
                    },
                  ]}
                  className="gap-4"
                ></TileInput>
                <p className="mt-2 text-sm text-neutral-400">
                  <IconInfoCircle className="mr-1 inline" size={16} />
                  Si vous travaillez plus de 8h/semaine pour le même employeur,
                  le risque accident est couvert par votre employeur.
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
                    Valider
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
                  Votre enfant né(e) en {dayjs(adherent.dob).format("YYYY")}
                </p>
                <Select
                  options={
                    isChild(adherent.dob || "")
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
                    (isChild(adherent.dob || "") ? "600" : "2500")
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
                  La franchise 0 est recommandée pour les enfants de moins de 15
                  ans.
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
              increaseStep("franchise");
            }}
            className="mt-4 w-52"
          >
            Continuer
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Franchise;

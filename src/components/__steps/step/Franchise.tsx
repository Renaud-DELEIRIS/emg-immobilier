import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import dayjs from "dayjs";
import Button from "~/components/button/Button";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import Select from "~/components/inputs/Select";
import { motion } from "framer-motion";

const textByIndex = [
  {
    title: "Nous allons maintenant établir votre profil.",
    franchise: "De quelle franchise souhaitez-vous bénéficier ?",
    accident: "Souhaitez-vous une couverture accident ?",
  },
  {
    title: "Nous allons maintenant établir le profil de votre conjoint(e).",
    franchise: "De quelle franchise souhaite bénéficier votre conjoint(e) ?",
    accident: "Souhaitez-vous une couverture accident pour votre conjointe ?",
  },
  {
    title: "Nous allons maintenant établir le profil de votre enfant.",
    franchise: "De quelle franchise souhaite bénéficier votre enfant ?",
    accident: "",
  },
];

const Franchise = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [step, setStep] = useState<"franchise" | "couverture">("franchise");

  const textIndex =
    isEditing !== undefined
      ? lead.for === "you and your kids" && isEditing > 0
        ? 2
        : isEditing > 2
        ? 2
        : isEditing
      : 0;

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
    const next = nextToEdit();
    if (next !== undefined) {
      setIsEditing(nextToEdit());
    }
  }, [lead]);

  return (
    <StepContainer
      title={
        isEditing !== undefined
          ? textByIndex[textIndex]?.title || ""
          : "Voulez vous modifier un profil ?"
      }
      info={
        isEditing !== undefined
          ? step === "franchise"
            ? isChild(lead.adherent[isEditing]?.dob || "")
              ? "La franchise 0 est recommandée pour les enfants de moins de 15 ans."
              : "Si vos dépenses médicales sont inférieures à 1‘700 CHF par année, je vous conseille une franchise à 2‘500 CHF."
            : step === "couverture"
            ? "Si vous travaillez plus de 8h/semaine pour le même employeur, le risque accident est couvert par votre employeur."
            : ""
          : ""
      }
    >
      {isEditing !== undefined && (
        <div>
          {step === "franchise" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="mb-2">{textByIndex[textIndex]?.franchise || ""}</p>
              <Select
                options={
                  isChild(lead.adherent[isEditing]?.dob || "")
                    ? [
                        {
                          label: "0€",
                          value: "0",
                        },
                        {
                          label: "100€",
                          value: "100",
                        },
                        {
                          label: "200€",
                          value: "200",
                        },
                        {
                          label: "300€",
                          value: "300",
                        },
                        {
                          label: "400€",
                          value: "400",
                        },
                        {
                          label: "500€",
                          value: "500",
                        },
                        {
                          label: "600€",
                          value: "600",
                        },
                      ]
                    : [
                        {
                          label: "300€",
                          value: "300",
                        },
                        {
                          label: "500€",
                          value: "500",
                        },
                        {
                          label: "1000€",
                          value: "1000",
                        },
                        {
                          label: "1500€",
                          value: "1500",
                        },
                        {
                          label: "2000€",
                          value: "2000",
                        },
                        {
                          label: "2500€",
                          value: "2500",
                        },
                      ]
                }
                value={
                  lead.adherent[isEditing]?.franchise ||
                  (isChild(lead.adherent[isEditing]?.dob || "")
                    ? "600"
                    : "2500")
                }
                onChange={(value: string) => {
                  console.log(value);
                  changeLead({
                    adherent: [
                      ...lead.adherent.slice(0, isEditing),
                      {
                        ...lead.adherent[isEditing],
                        franchise: value as "0",
                      },
                      ...lead.adherent.slice(isEditing + 1),
                    ],
                  });
                }}
                placeholder="Votre franchise"
                label="Franchise"
                icon={<IconEdit />}
              />
              {lead.adherent[isEditing]?.franchise && (
                <motion.div
                  className="flex w-full justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button
                    onClick={() => {
                      if (!lead.adherent[isEditing]?.franchise)
                        changeLead({
                          adherent: [
                            ...lead.adherent.slice(0, isEditing),
                            {
                              ...lead.adherent[isEditing],
                              franchise: isChild(
                                lead.adherent[isEditing]?.dob || ""
                              )
                                ? "600"
                                : "2500",
                            },
                            ...lead.adherent.slice(isEditing + 1),
                          ],
                        });

                      if (isChild(lead.adherent[isEditing]?.dob || "")) {
                        setStep("couverture");
                      } else {
                        setIsEditing(undefined);
                      }
                    }}
                    className="mt-4 w-52"
                  >
                    Valider
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === "couverture" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="mb-2 mt-4">
                {textByIndex[
                  lead.for === "you and your kids" && isEditing > 0
                    ? 2
                    : isEditing > 2
                    ? 2
                    : isEditing
                ]?.accident || ""}
              </p>
              <TileInput
                value={lead.adherent[isEditing]?.couvertureAccident}
                onChange={(value) => {
                  changeLead({
                    adherent: [
                      ...lead.adherent.slice(0, isEditing),
                      {
                        ...lead.adherent[isEditing],
                        couvertureAccident: value as "oui",
                      },
                      ...lead.adherent.slice(isEditing + 1),
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
              {(lead.adherent[isEditing]?.type === "child" ||
                lead.adherent[isEditing]?.couvertureAccident !== undefined) && (
                <motion.div
                  className="flex w-full justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button
                    onClick={() => {
                      setIsEditing(undefined);
                      setStep("franchise");
                    }}
                    className="mt-4 w-52"
                  >
                    Valider
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {lead.adherent.length > 0 && isEditing === undefined && (
        <>
          <h3 className="text-xl">Vos profils</h3>
          <div className="mt-4 flex flex-col gap-4">
            {lead.adherent.map((adherent, index) => (
              <div className="flex items-center gap-4" key={index}>
                <button
                  onClick={() => {
                    setIsEditing(index);
                  }}
                  className="group flex w-full justify-between gap-4 rounded-lg border border-neutral-100 bg-white p-4 text-left shadow"
                >
                  <p className="text-base text-neutral-800">
                    {adherent.type === "main"
                      ? `Vous avez besoins d'une franchise de ${
                          adherent.franchise || ""
                        }${
                          adherent.couvertureAccident === "oui"
                            ? " ainsi que d'une couverture accident"
                            : ""
                        }.`
                      : adherent.type === "partner"
                      ? `Votre conjoint${
                          adherent.civility === "female" ? "e" : ""
                        } a besoin d'une franchise de ${
                          adherent.franchise || ""
                        }${
                          adherent.couvertureAccident === "oui"
                            ? " ainsi que d'une couverture accident"
                            : ""
                        }.`
                      : `Votre enfant né en ${dayjs(adherent.dob).format(
                          "YYYY"
                        )} a besoin d'une franchise de ${
                          adherent.franchise || ""
                        }$.`}
                  </p>
                  <IconEdit className="group-hover:text-primary-500" />
                </button>
              </div>
            ))}
            <Button
              onClick={() => {
                increaseStep();
              }}
              className="mx-auto w-fit"
            >
              Continuer
            </Button>
          </div>
        </>
      )}
    </StepContainer>
  );
};

export default Franchise;

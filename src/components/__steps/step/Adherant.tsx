import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import TileInput from "~/components/inputs/Tile";
import { type LeadData, useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import TextInput from "~/components/inputs/TextInput";
import dayjs from "dayjs";
import Button from "~/components/button/Button";
import {
  IconEdit,
  IconGenderFemale,
  IconGenderMale,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
``;
import { motion } from "framer-motion";

const textByIndex = [
  {
    title: "Nous allons maintenant établir votre profil.",
    dob: "Quelle est votre date de naissance ?",
    civilite: "Quelle est votre civilité ?",
  },
  {
    title: "Nous allons maintenant établir le profil de votre conjoint(e).",
    dob: "Quelle est la date de naissance de votre conjoint(e) ?",
    civilite: "Quelle est la civilité de votre conjoint(e) ?",
  },
  {
    title: "Nous allons maintenant établir le profil de votre enfant.",
    dob: "Quelle est la date de naissance de votre enfant ?",
    civilite: "Quelle est la civilité de votre enfant ?",
  },
];

const Adherant = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [adherent, setAdherent] = useState<LeadData["adherent"]["0"]>();
  const [step, setStep] = useState<"dob" | "civilite">("dob");

  const getType = (index: number) => {
    if (index === 0) {
      return "main";
    } else if (index === 1 && lead.for !== "you and your kids") {
      return "partner";
    } else {
      return "child";
    }
  };

  const isValidDob = (dob: string) => {
    // Is valid date
    if (!dayjs(dob).isValid()) {
      return "La date de naissance n'est pas valide.";
    }
    // check if more than 100 years old
    if (dayjs().diff(dayjs(dob), "year") > 100) {
      return "Vous devez avoir moins de 100 ans.";
    }
    // Check if is more than 9 months in the future
    if (dayjs().diff(dayjs(dob), "month") < -9) {
      return "Vous devez avoir plus de 9 mois.";
    }
  };

  const nextToEdit = () => {
    if (lead.adherent.length === 0) {
      return 0;
    }
    if (lead.adherent.length === 1 && lead.for != "you") return 1;
    if (
      lead.adherent.length === 2 &&
      lead.for == "you, your partner and your kids"
    )
      return 2;
    return undefined;
  };

  const textIndex =
    isEditing !== undefined
      ? lead.for === "you and your kids" && isEditing > 0
        ? 2
        : isEditing > 2
        ? 2
        : isEditing
      : 0;

  useEffect(() => {
    if (activeStep.id !== "adherent") return;
    const next = nextToEdit();
    if (next !== undefined) {
      setIsEditing(nextToEdit());
    } else {
      increaseStep("adherent");
    }
  }, [lead, activeStep]);

  return (
    <div>
      {lead.adherent.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl text-dark">Les adhérants</h3>
          <div className="mt-4 flex flex-col gap-4">
            {lead.adherent.map((adherent, index) => (
              <div className="flex items-center gap-4" key={index}>
                <button
                  onClick={() => {
                    setAdherent(adherent);
                    setIsEditing(index);
                  }}
                  className="group flex w-full justify-between rounded-lg border border-neutral-100 bg-white p-4 shadow"
                >
                  <p className="text-base text-neutral-800">
                    {adherent.type === "main" ? (
                      adherent.civility === "female" ? (
                        <span>
                          Vous êtes <strong>une femme</strong>, née en{" "}
                          <strong>{dayjs(adherent.dob).format("YYYY")}</strong>
                        </span>
                      ) : (
                        <span>
                          Vous êtes <strong>un homme</strong>, né en{" "}
                          <strong>{dayjs(adherent.dob).format("YYYY")}</strong>
                        </span>
                      )
                    ) : adherent.type === "partner" ? (
                      adherent.civility === "female" ? (
                        <span>
                          Votre conjointe est née en{" "}
                          <strong>{dayjs(adherent.dob).format("YYYY")}</strong>
                        </span>
                      ) : (
                        <span>
                          Votre conjoint est né en{" "}
                          <strong>{dayjs(adherent.dob).format("YYYY")}</strong>
                        </span>
                      )
                    ) : adherent.civility === "female" ? (
                      <span>
                        Votre enfant est née en{" "}
                        <strong>{dayjs(adherent.dob).format("YYYY")}</strong>
                      </span>
                    ) : (
                      <span>
                        Votre enfant est né en{" "}
                        <strong>{dayjs(adherent.dob).format("YYYY")}</strong>
                      </span>
                    )}
                  </p>
                  <IconEdit className="group-hover:text-primary-500" />
                </button>
                {(index > 2 &&
                  lead.for === "you, your partner and your kids") ||
                (index > 1 && lead.for === "you and your kids") ? (
                  <button
                    onClick={() => {
                      const newAdherents = [...lead.adherent];
                      newAdherents.splice(index, 1);
                      changeLead({
                        adherent: newAdherents,
                      });
                    }}
                    className="text-red-500"
                  >
                    <IconX />
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
            {(lead.for === "you and your kids" ||
              lead.for === "you, your partner and your kids") &&
              isEditing === undefined && (
                <Button
                  onClick={() => {
                    setIsEditing(lead.adherent.length);
                    setAdherent({});
                  }}
                  size="small"
                  className="w-fit"
                  iconRight={<IconPlus />}
                >
                  Ajouter un enfant
                </Button>
              )}
          </div>
        </div>
      )}
      {isEditing !== undefined && (
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <StepContainer
              title={
                isEditing !== undefined
                  ? textByIndex[textIndex]?.dob || ""
                  : "Voulez vous modifier un profil ?"
              }
              description={
                <span>
                  Parfait !
                  <br />
                  {isEditing !== undefined
                    ? textByIndex[textIndex]?.title || ""
                    : "Voulez vous modifier un profil ?"}
                </span>
              }
              stepId="adherent"
            >
              <form
                className="flex flex-row items-start gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("civilite");
                  setTimeout(() => {
                    const element =
                      document.getElementById("adherent-civilite");
                    if (element) {
                      const offsetTop = element.getBoundingClientRect().top;
                      window.scrollTo({
                        top: offsetTop - 100,
                        behavior: "smooth",
                      });
                    }
                  }, 100);
                }}
              >
                <TextInput
                  value={adherent?.dob || ""}
                  onChange={(value) => {
                    setAdherent({ ...adherent, dob: value });
                  }}
                  placeholder="JJ/MM/AAAA"
                  type="date"
                  wrapperClassName="w-80 mt-1.5"
                  widthFull={false}
                  error={
                    adherent?.dob === "" || adherent?.dob === undefined
                      ? ""
                      : isValidDob(adherent?.dob || "")
                  }
                />

                <Button
                  type="submit"
                  className="w-52"
                  disabled={
                    !(
                      !isValidDob(adherent?.dob || "") &&
                      step === "dob" &&
                      adherent?.dob !== undefined &&
                      adherent?.dob !== ""
                    )
                  }
                >
                  Valider
                </Button>
              </form>
            </StepContainer>
          </motion.div>
          {step === "civilite" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <StepContainer
                title={
                  isEditing !== undefined
                    ? textByIndex[textIndex]?.civilite || ""
                    : "Voulez vous modifier un profil ?"
                }
                description={<span>Continuons !</span>}
                stepId="adherent"
                className="mt-8"
                id="adherent-civilite"
              >
                <TileInput
                  value={adherent?.civility}
                  onChange={(value) => {
                    if (lead.adherent[isEditing] === undefined) {
                      changeLead({
                        adherent: [
                          ...lead.adherent,
                          {
                            ...adherent,
                            civility:
                              value as LeadData["adherent"]["0"]["civility"],
                            type: getType(isEditing),
                          },
                        ],
                      });
                    } else {
                      const newAdherents = [...lead.adherent];
                      newAdherents[isEditing] = {
                        ...adherent,
                        civility:
                          value as LeadData["adherent"]["0"]["civility"],
                        type: getType(isEditing),
                      };
                      changeLead({
                        adherent: newAdherents,
                      });
                    }
                    setIsEditing(undefined);
                    setAdherent(undefined);
                    setStep("dob");
                  }}
                  options={[
                    {
                      label: "Homme",
                      value: "man",
                      rightIcon: <IconGenderMale />,
                    },
                    {
                      label: "Femme",
                      value: "female",
                      rightIcon: <IconGenderFemale />,
                    },
                  ]}
                  className="gap-4"
                ></TileInput>
              </StepContainer>
            </motion.div>
          )}
          {((isEditing > 2 && lead.for === "you, your partner and your kids") ||
            (isEditing > 1 && lead.for === "you and your kids")) && (
            <Button
              onClick={() => {
                setIsEditing(undefined);
                setAdherent(undefined);
                setStep("dob");
              }}
              className="mt-4 w-fit"
              size={"small"}
              intent={"secondary"}
            >
              Annuler
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Adherant;

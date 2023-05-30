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
  const { increaseStep } = useSteps();
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [adherent, setAdherent] = useState<LeadData["adherent"]["0"]>();
  const [hasEdited, setHasEdited] = useState(false);

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

  useEffect(() => {
    const next = nextToEdit();
    if (next !== undefined) {
      setHasEdited(true);
      setIsEditing(nextToEdit());
    }
  }, [lead]);

  const sort = () => {
    const sortedAdherents = lead.adherent.sort((a, b) => {
      if (a.type === "main") {
        return -1;
      }
      if (b.type === "main") {
        return 1;
      }
      if (a.type === "partner") {
        return -1;
      }
      if (b.type === "partner") {
        return 1;
      }
      if (a.type === "child" && b.type === "child") {
        return dayjs(a.dob).diff(dayjs(b.dob));
      }
      return 0;
    });
    changeLead({ ...lead, adherent: sortedAdherents });
  };

  return (
    <StepContainer
      title={
        isEditing !== undefined
          ? textByIndex[isEditing > 2 ? 2 : isEditing]?.title || ""
          : "Voulez vous modifier un profil ?"
      }
      info={
        isEditing !== undefined && lead.adherent.length > 0 && hasEdited
          ? "Vous pourrez modifier les profils après avoir terminé la saisie."
          : ""
      }
    >
      {isEditing !== undefined && (
        <div>
          <p className="mb-2">
            {textByIndex[isEditing > 2 ? 2 : isEditing]?.dob || ""}
          </p>
          <TextInput
            value={adherent?.dob || ""}
            onChange={(value) => {
              setAdherent({ ...adherent, dob: value });
            }}
            placeholder="JJ/MM/AAAA"
            className="w-full"
            type="date"
            error={
              adherent?.dob === "" || adherent?.dob === undefined
                ? ""
                : isValidDob(adherent?.dob || "")
            }
          />
          {!isValidDob(adherent?.dob || "") &&
            adherent?.dob !== undefined &&
            adherent?.dob !== "" && (
              <>
                <p className="mb-2 mt-4">
                  {textByIndex[isEditing > 2 ? 2 : isEditing]?.civilite || ""}
                </p>
                <TileInput
                  value={adherent?.civility}
                  onChange={(value) => {
                    setAdherent({
                      ...adherent,
                      civility: value as "man",
                    });
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
                {adherent?.civility !== undefined && (
                  <div className="flex w-full justify-center">
                    <Button
                      onClick={() => {
                        if (lead.adherent[isEditing] === undefined) {
                          changeLead({
                            adherent: [
                              ...lead.adherent,
                              {
                                ...adherent,
                                type: getType(isEditing),
                              },
                            ],
                          });
                        } else {
                          const newAdherents = [...lead.adherent];
                          newAdherents[isEditing] = {
                            ...adherent,
                            type: getType(isEditing),
                          };
                          changeLead({
                            adherent: newAdherents,
                          });
                        }
                        setIsEditing(undefined);
                        setAdherent(undefined);
                      }}
                      className="mt-4 w-52"
                    >
                      Valider
                    </Button>
                  </div>
                )}
              </>
            )}
          {((isEditing > 2 && lead.for === "you, your partner and your kids") ||
            (isEditing > 1 && lead.for === "you and your kids")) && (
            <Button
              onClick={() => {
                setIsEditing(undefined);
                setAdherent(undefined);
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
      {lead.adherent.length > 0 && isEditing === undefined && (
        <>
          <h3 className="text-xl">Vos profils</h3>
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
                    {adherent.type === "main"
                      ? `Vous êtes né${
                          adherent.civility === "female" ? "e" : ""
                        } en `
                      : adherent.type === "partner"
                      ? `Votre conjoint${
                          adherent.civility === "female" ? "e" : ""
                        } est né${
                          adherent.civility === "female" ? "e" : ""
                        } en `
                      : `Votre enfant est né${
                          adherent.civility === "female" ? "e" : ""
                        } en `}
                    {dayjs(adherent.dob).format("YYYY")}
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
              lead.for === "you, your partner and your kids") && (
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

export default Adherant;

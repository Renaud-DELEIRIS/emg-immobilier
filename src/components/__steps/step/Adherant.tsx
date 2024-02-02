import {
  IconEdit,
  IconGenderFemale,
  IconGenderMale,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import TextInput from "~/components/inputs/TextInput";
import TileInput from "~/components/inputs/Tile";
import { type Adherent } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";
``;

const Adherant = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const activeStep = useFormStore((state) => state.currentVisibleStep);
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [adherent, setAdherent] = useState<Partial<Adherent>>();
  const [step, setStep] = useState<"dob" | "civilite">("dob");
  const { t } = useTranslation("common");
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
    // Is valid date*
    if (!dayjs(dob, "YYYY").isValid()) {
      return t("STEP_ADHERENT_DOB_ERR_INVALID");
    }
    const year = parseInt(dob);
    if (isNaN(year)) {
      return t("STEP_ADHERENT_DOB_ERR_INVALID");
    }
    const thisYear = dayjs().year();
    if (thisYear - year > 100) {
      return t("STEP_ADHERENT_DOB_ERR_TOO_OLD");
    }

    if (year > thisYear) {
      return t("STEP_ADHERENT_DOB_ERR_IN_FUTURE");
    }
    if (dob.length > 4) {
      return t("STEP_ADHERENT_DOB_ERR_INVALID");
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

  const textByIndex = [
    {
      title: t("STEP_ADHERENT_PROFIL_MAIN"),
      dob: t("STEP_ADHERENT_DOB_MAIN"),
      civilite: t("STEP_ADHERENT_CIVILITY_MAIN"),
    },
    {
      title: t("STEP_ADHERENT_PROFIL_SPOUSE"),
      dob: t("STEP_ADHERENT_DOB_SPOUSE"),
      civilite: t("STEP_ADHERENT_CIVILITY_SPOUSE"),
    },
    {
      title: t("STEP_ADHERENT_PROFIL_CHILD"),
      dob: t("STEP_ADHERENT_DOB_CHILD"),
      civilite: t("STEP_ADHERENT_CIVILITY_CHILD"),
    },
  ];

  useEffect(() => {
    if (activeStep.id !== "adherent") return;
    const next = nextToEdit();
    if (next !== undefined) {
      setIsEditing(nextToEdit());
    } else {
      nextStep("adherent");
    }
  }, [lead, activeStep]);

  return (
    <>
      {lead.adherent.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl text-dark">{t("STEP_ADHERENT_LIST_TITLE")}</h3>
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
                        <Trans
                          t={t}
                          i18nKey={"STEP_ADHERENT_LIST_CIVILITY_MAIN_FEMALE"}
                          values={{
                            year: adherent.year,
                          }}
                        />
                      ) : (
                        <Trans
                          t={t}
                          i18nKey={"STEP_ADHERENT_LIST_CIVILITY_MAIN_MALE"}
                          values={{
                            year: adherent.year,
                          }}
                        />
                      )
                    ) : adherent.type === "partner" ? (
                      adherent.civility === "female" ? (
                        <Trans
                          t={t}
                          i18nKey={"STEP_ADHERENT_LIST_CIVILITY_SPOUSE_FEMALE"}
                          values={{
                            year: adherent.year,
                          }}
                        />
                      ) : (
                        <Trans
                          t={t}
                          i18nKey={"STEP_ADHERENT_LIST_CIVILITY_SPOUSE_MALE"}
                          values={{
                            year: adherent.year,
                          }}
                        />
                      )
                    ) : adherent.civility === "female" ? (
                      <Trans
                        t={t}
                        i18nKey={"STEP_ADHERENT_LIST_CIVILITY_CHILD_FEMALE"}
                        values={{
                          year: adherent.year,
                        }}
                      />
                    ) : (
                      <Trans
                        t={t}
                        i18nKey={"STEP_ADHERENT_LIST_CIVILITY_CHILD_MALE"}
                        values={{
                          year: adherent.year,
                        }}
                      />
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
                    setAdherent({
                      type: "child",
                      civility: "man",
                    });
                  }}
                  className="w-fit"
                >
                  <IconPlus />
                  {t("STEP_ADHERENT_LIST_ADD")}
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
              title={textByIndex[textIndex]?.dob || ""}
              description={
                <span>
                  {t("STEP_ADHERENT_PERFECT")}
                  <br />
                  {textByIndex[textIndex]?.title || ""}
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
                      const offsetTop =
                        element.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: offsetTop - 100,
                        behavior: "smooth",
                      });
                    }
                  }, 100);
                }}
              >
                <TextInput
                  value={adherent?.year || ""}
                  onChange={(value) => {
                    setAdherent({
                      ...adherent,
                      year: value,
                      dob: value + "--",
                    });
                  }}
                  wrapperClassName="mt-0.5 w-80"
                  widthFull={false}
                  // Ifd more than 100 years old error
                  error={
                    adherent?.year === undefined || adherent.year.length <= 3
                      ? undefined
                      : isValidDob(adherent?.year || "")
                  }
                  type="number"
                  placeholder="p. ex. 1985"
                />

                <Button
                  type="submit"
                  className="mt-1.5 w-28"
                  disabled={
                    !(
                      !isValidDob(adherent?.year || "") &&
                      step === "dob" &&
                      adherent?.year !== undefined &&
                      adherent?.year !== ""
                    )
                  }
                >
                  {t("VALIDATE")}
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
                title={textByIndex[textIndex]?.civilite || ""}
                description={<span>{t("STEP_ADHERENT_CONTINUE")}</span>}
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
                            civility: value as Adherent["civility"],
                            type: getType(isEditing),
                          },
                        ],
                      });
                    } else {
                      const newAdherents = [...lead.adherent];
                      newAdherents[isEditing] = {
                        ...adherent,
                        civility: value as Adherent["civility"],
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
                      label: t("STEP_ADHERENT_CIVILITY_MAN"),
                      value: "man",
                      rightIcon: <IconGenderMale />,
                    },
                    {
                      label: t("STEP_ADHERENT_CIVILITY_FEMALE"),
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
            >
              {t("CANCEL")}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Adherant;

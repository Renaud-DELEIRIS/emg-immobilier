import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { Fragment, useEffect, useState } from "react";
import { IconFemale } from "~/components/icon/IconFemale";
import { IconMale } from "~/components/icon/IconMale";
import TileInput from "~/components/inputs/Tile";
import { DateInput } from "~/components/inputs/input";
import { type Adherent } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";
import StepContainer, { StepTitle } from "../StepContainer";
``;

const Adherant = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const activeStep = useFormStore((state) => state.currentVisibleStep);
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [adherant, setAdherent] = useState<Partial<Adherent>>();
  const [step, setStep] = useState<"dob" | "civilite">("civilite");
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
    const dayjsDob = dayjs(dob, "YYYY-MM-DD");
    // Is valid date*
    if (!dayjsDob.isValid()) {
      return t("STEP_ADHERENT_DOB_ERR_INVALID");
    }
    const year = dayjsDob.year();
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
      dob: t("STEP_ADHERENT_DOB_MAIN"),
      civilite: t("STEP_ADHERENT_CIVILITY_MAIN"),
    },
    {
      dob: t("STEP_ADHERENT_DOB_SPOUSE"),
      civilite: t("STEP_ADHERENT_CIVILITY_SPOUSE"),
    },
    {
      dob: t("STEP_ADHERENT_DOB_CHILD"),
      civilite: t("STEP_ADHERENT_CIVILITY_CHILD"),
    },
  ];

  useEffect(() => {
    if (activeStep.id !== "adherent") return;
    const next = nextToEdit();
    if (next !== undefined) {
      setIsEditing(nextToEdit());
      setAdherent((prev) => (prev ? prev : {}));
    } else {
      nextStep("adherent");
    }
  }, [lead, activeStep]);

  return (
    <StepContainer stepId="adherent" className="gap-10">
      {lead.adherent.map((adherent, index) => {
        const txtIndex = adherent?.type === "child" ? 2 : index;
        return (
          <Fragment key={index}>
            <div className="flex flex-col gap-[20px]">
              <StepTitle>{textByIndex[txtIndex]?.civilite || ""}</StepTitle>
              <TileInput
                value={adherent?.civility}
                onChange={(value) => {
                  const newAdherents = [...lead.adherent];
                  newAdherents[index] = {
                    ...adherent,
                    civility: value as Adherent["civility"],
                  };
                  changeLead({
                    adherent: newAdherents,
                  });
                }}
                options={[
                  {
                    label: t("STEP_ADHERENT_CIVILITY_MAN"),
                    value: "man",
                    icon: <IconMale size={28} />,
                  },
                  {
                    label: t("STEP_ADHERENT_CIVILITY_FEMALE"),
                    value: "female",
                    icon: <IconFemale size={28} />,
                  },
                ]}
              ></TileInput>
            </div>
            <div className="flex flex-col gap-[20px]">
              <StepTitle>{textByIndex[txtIndex]?.dob || ""}</StepTitle>
              <DateInput
                value={adherent?.dob || ""}
                onChange={(value) => {
                  const newAdherents = [...lead.adherent];
                  newAdherents[index] = {
                    ...adherent,
                    year: value.split("-")[0],
                    dob: value,
                  };
                  changeLead({
                    adherent: newAdherents,
                  });
                }}
                error={isValidDob(adherent?.dob || "")}
                valid={!isValidDob(adherent?.dob || "")}
              />
            </div>
          </Fragment>
        );
      })}
      {isEditing !== undefined && adherant && (
        <div className="flex min-h-[calc(100dvh-210px)] flex-col gap-10">
          <div className="flex flex-col gap-[20px]" id="adherant-editing">
            <StepTitle>{textByIndex[textIndex]?.civilite || ""}</StepTitle>
            <TileInput
              value={adherant?.civility}
              onChange={(value) => {
                setAdherent({
                  ...adherant,
                  civility: value as Adherent["civility"],
                });
                setStep("dob");
              }}
              options={[
                {
                  label: t("STEP_ADHERENT_CIVILITY_MAN"),
                  value: "man",
                  icon: <IconGenderMale size={28} />,
                },
                {
                  label: t("STEP_ADHERENT_CIVILITY_FEMALE"),
                  value: "female",
                  icon: <IconGenderFemale size={28} />,
                },
              ]}
            ></TileInput>
          </div>
          {step === "dob" && (
            <div className="flex flex-col gap-[20px]">
              <StepTitle>{textByIndex[textIndex]?.dob || ""}</StepTitle>
              <DateInput
                autoFocus
                value={adherant?.dob || ""}
                onChange={(value) => {
                  setAdherent({
                    ...adherant,
                    dob: value,
                    year: value.split("-")[0],
                  });
                  // if is valid dob
                  if (!isValidDob(value)) {
                    setAdherent(undefined);
                    setIsEditing(undefined);
                    setStep("civilite");
                    changeLead({
                      adherent: [
                        ...lead.adherent,
                        {
                          ...adherant,
                          dob: value,
                          year: value.split("-")[0],
                          type: getType(isEditing),
                        },
                      ],
                    });
                    setTimeout(() => {
                      const element =
                        document.getElementById("adherant-editing");
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
                  }
                }}
              />
            </div>
          )}
        </div>
      )}
    </StepContainer>

    // <div>
    //   {isEditing !== undefined && (
    //     <div className="space-y-[40px]">
    //       <motion.div
    //         initial={{ opacity: 0, x: -20 }}
    //         animate={{ opacity: 1, x: 0 }}
    //       >
    //         <StepContainer
    //           title={textByIndex[textIndex]?.civilite || ""}
    //           stepId="adherent"
    //           id="adherent-civilite"
    //         >
    //           <TileInput
    //             value={adherent?.civility}
    //             onChange={(value) => {
    //               setAdherent({
    //                 ...adherent,
    //                 civility: value as Adherent["civility"],
    //               });
    //               setStep("dob");
    //               setTimeout(() => {
    //                 const element = document.getElementById("adherent-dob");
    //                 if (element) {
    //                   const offsetTop =
    //                     element.getBoundingClientRect().top + window.scrollY;
    //                   window.scrollTo({
    //                     top: offsetTop - 100,
    //                     behavior: "smooth",
    //                   });
    //                 }
    //               }, 100);
    //             }}
    //             options={[
    //               {
    //                 label: t("STEP_ADHERENT_CIVILITY_MAN"),
    //                 value: "man",
    //                 icon: <IconGenderMale size={28} />,
    //               },
    //               {
    //                 label: t("STEP_ADHERENT_CIVILITY_FEMALE"),
    //                 value: "female",
    //                 icon: <IconGenderFemale size={28} />,
    //               },
    //             ]}
    //             className="gap-4"
    //           ></TileInput>
    //         </StepContainer>
    //       </motion.div>

    //       {step === "dob" && (
    //         <motion.div
    //           initial={{ opacity: 0, x: -20 }}
    //           animate={{ opacity: 1, x: 0 }}
    //         >
    //           <StepContainer
    //             title={textByIndex[textIndex]?.dob || ""}
    //             stepId="adherent"
    //             id="adherent-dob"
    //           >
    //             <form
    //               className="flex flex-row items-start gap-4"
    //               onSubmit={(e) => {
    //                 e.preventDefault();

    //                 if (lead.adherent[isEditing] === undefined) {
    //                   changeLead({
    //                     adherent: [
    //                       ...lead.adherent,
    //                       {
    //                         ...adherent,
    //                         type: getType(isEditing),
    //                       },
    //                     ],
    //                   });
    //                 } else {
    //                   const newAdherents = [...lead.adherent];
    //                   newAdherents[isEditing] = {
    //                     ...adherent,
    //                     type: getType(isEditing),
    //                   };
    //                   changeLead({
    //                     adherent: newAdherents,
    //                   });
    //                 }

    //                 setIsEditing(undefined);
    //                 setAdherent(undefined);
    //                 setStep("civilite");
    //               }}
    //             >
    //               <Input
    //                 value={adherent?.year || ""}
    //                 valid={lead.adherent[isEditing]?.year !== undefined}
    //                 onChange={(e) => {
    //                   setAdherent({
    //                     ...adherent,
    //                     year: e.currentTarget.value,
    //                     dob: e.currentTarget.value + "--",
    //                   });
    //                 }}
    //                 error={
    //                   adherent?.year === undefined || adherent.year.length <= 3
    //                     ? undefined
    //                     : isValidDob(adherent?.year || "")
    //                 }
    //                 type="number"
    //                 placeholder="p. ex. 1985"
    //               />

    //               <Button
    //                 type="submit"
    //                 className="w-28"
    //                 disabled={
    //                   !(
    //                     !isValidDob(adherent?.year || "") &&
    //                     step === "dob" &&
    //                     adherent?.year !== undefined &&
    //                     adherent?.year !== ""
    //                   )
    //                 }
    //               >
    //                 {t("VALIDATE")}
    //               </Button>
    //             </form>
    //           </StepContainer>
    //         </motion.div>
    //       )}
    //       {((isEditing > 2 && lead.for === "you, your partner and your kids") ||
    //         (isEditing > 1 && lead.for === "you and your kids")) && (
    //         <Button
    //           onClick={() => {
    //             setIsEditing(undefined);
    //             setAdherent(undefined);
    //             setStep("civilite");
    //           }}
    //           className="mt-4 w-fit"
    //         >
    //           {t("CANCEL")}
    //         </Button>
    //       )}
    //     </div>
    //   )}
    // </div>
  );
};

export default Adherant;

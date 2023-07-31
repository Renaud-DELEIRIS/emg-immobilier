import StepContainer from "../StepContainer";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import TileInput from "~/components/inputs/Tile";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { useState } from "react";
import Button from "~/components/button/Button";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const Hours = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep, activeStep } = useSteps();

  const hasOtherWorkers =
    lead.adherent
      .filter((p) => p.type !== "main")
      // Has more than 18
      .filter((p) =>
        dayjs(p.dob, "YYYY-MM-DD").isBefore(dayjs().subtract(18, "year"))
      ).length > 0;

  const otherWorkersRenseignedWorkPlace =
    lead.adherent
      .filter((p) => p.type !== "main")
      .filter((p) =>
        dayjs(p.dob, "YYYY-MM-DD").isBefore(dayjs().subtract(18, "year"))
      )
      .filter((p) => p.travailSuisse === undefined).length === 0;

  const showContinue =
    lead.adherent
      .filter((p) =>
        dayjs(p.dob, "YYYY-MM-DD").isBefore(dayjs().subtract(18, "year"))
      )
      .filter((p) => p.couverture === undefined).length === 0;

  return (
    <>
      {hasOtherWorkers && (
        <StepContainer
          title=""
          description={
            <span>
              Parfait!
              <br />
              Nous allons préciser votre profil.
            </span>
          }
          stepId="package"
          id="partner"
          forceActive={!otherWorkersRenseignedWorkPlace}
        >
          <div className="flex flex-col gap-6">
            {lead.adherent.map((p, index) => {
              if (p.type === "main") return null;
              if (
                !dayjs(p.dob, "YYYY-MM-DD").isBefore(
                  dayjs().subtract(18, "year")
                )
              )
                return null;
              return (
                <div key={index + "" + p.dob + p.type}>
                  <h1 className="mb-4 text-base font-extrabold leading-[1.6] text-dark md:leading-[1.4]">
                    {p.type === "partner"
                      ? p.civility === "female"
                        ? "Votre conjointe travaille-t-elle sur le territoire Suisse ?"
                        : "Votre conjoint travaille-t-il sur le territoire Suisse ?"
                      : `Votre enfant né en ${dayjs(
                          p.dob,
                          "YYYY-MM-DD"
                        ).year()} travaille-t-il sur le territoire Suisse ?
                  `}
                  </h1>
                  <TileInput
                    value={
                      p.travailSuisse === undefined
                        ? undefined
                        : p.travailSuisse
                        ? "yes"
                        : "no"
                    }
                    onChange={(value) => {
                      changeLead({
                        ...lead,
                        adherent: lead.adherent.map((a, i) => {
                          if (i === index) {
                            return {
                              ...a,
                              travailSuisse: value === "yes",
                            };
                          }
                          return a;
                        }),
                      });
                    }}
                    options={[
                      {
                        label: "Oui",
                        value: "yes",
                        rightIcon: <IconThumbUp />,
                      },
                      {
                        label: "Non",
                        value: "no",
                        rightIcon: <IconThumbDown />,
                      },
                    ]}
                    className="gap-4"
                  ></TileInput>
                </div>
              );
            })}
          </div>
        </StepContainer>
      )}
      {otherWorkersRenseignedWorkPlace && (
        <StepContainer
          title=""
          description={
            <span>
              Très bien,
              <br />
              Concernant votre travail en Suisse,
            </span>
          }
          stepId="work-hours"
        >
          <div className="flex flex-col gap-6">
            {lead.adherent.map((p, index) => {
              if (
                !dayjs(p.dob, "YYYY-MM-DD").isBefore(
                  dayjs().subtract(18, "year")
                )
              )
                return null;
              return (
                <div className="" key={index + "" + p.dob + p.type}>
                  <h1 className="mb-4 text-base font-extrabold leading-[1.6] text-dark md:leading-[1.4]">
                    {p.type === "partner"
                      ? p.civility === "female"
                        ? "Votre conjointe travaille-t-elle plus de 8h par semaine pour le même employeur sur le territoire Suisse ?"
                        : "Votre conjoint travaille-t-il plus de 8h par semaine pour le même employeur sur le territoire Suisse ?"
                      : p.type === "child"
                      ? `Votre enfant né en ${dayjs(
                          p.dob,
                          "YYYY-MM-DD"
                        ).year()} travaille-t-il plus de 8h par semaine pour le même employeur sur le territoire Suisse ?`
                      : p.type === "main"
                      ? "Travaillez-vous plus de 8h par semaine pour le même employeur ?"
                      : ""}
                  </h1>
                  <TileInput
                    value={
                      p.couverture === undefined
                        ? undefined
                        : p.couverture
                        ? "non"
                        : "oui"
                    }
                    onChange={(value) => {
                      changeLead({
                        ...lead,
                        adherent: lead.adherent.map((a, i) => {
                          if (i === index) {
                            return {
                              ...a,
                              couverture: value === "non",
                            };
                          }
                          return a;
                        }),
                      });
                    }}
                    options={[
                      {
                        label: "Oui",
                        value: "oui",
                        rightIcon: <IconThumbUp />,
                      },
                      {
                        label: "Non",
                        value: "non",
                        rightIcon: <IconThumbDown />,
                      },
                    ]}
                    className="gap-4"
                  ></TileInput>
                </div>
              );
            })}
          </div>

          {showContinue && (
            <motion.div
              className=""
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={() => {
                  increaseStep("work-hours");
                }}
                className="mt-4 w-52"
              >
                Continuer
              </Button>
            </motion.div>
          )}
        </StepContainer>
      )}
    </>
  );
};

export default Hours;

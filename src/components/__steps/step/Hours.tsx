import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "next-i18next";
import Button from "~/components/button/Button";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import StepContainer from "../StepContainer";

const Hours = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("common");

  const hasOtherWorkers =
    lead.adherent
      .filter((p) => p.type !== "main")
      // Has more than 18
      .filter((p) =>
        dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year"))
      ).length > 0;

  const otherWorkersRenseignedWorkPlace =
    lead.adherent
      .filter((p) => p.type !== "main")
      .filter((p) =>
        dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year"))
      )
      .filter((p) => p.travailSuisse === undefined).length === 0;

  const showContinue =
    lead.adherent
      .filter((p) =>
        dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year"))
      )
      .filter((p) => p.travailSuisse)
      .filter((p) => p.couverture === undefined).length === 0;

  lead.adherent
    .filter((p) => dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year")))
    .filter((p) => p.travailSuisse === undefined).length === 1;

  return (
    <>
      {hasOtherWorkers && (
        <StepContainer
          title=""
          description={<Trans i18nKey={"STEP_HOURS_SUISSE"} t={t} />}
          stepId="package"
          id="partner"
          forceActive={!otherWorkersRenseignedWorkPlace}
        >
          <div className="flex flex-col gap-6">
            {lead.adherent.map((p, index) => {
              if (p.type === "main") return null;
              if (!dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year")))
                return null;
              return (
                <div
                  key={index.toString() + "" + (p.year || "") + (p.type || "")}
                >
                  <h1 className="mb-4 text-base font-extrabold leading-[1.6] text-dark md:leading-[1.4]">
                    {p.type === "partner"
                      ? p.civility === "female"
                        ? t("STEP_HOURS_SUISSE_SPOUSE_FEMALE")
                        : t("STEP_HOURS_SUISSE_SPOUSE_MALE")
                      : t("STEP_HOURS_SUISSE_CHILD", {
                          year: dayjs(p.year, "YYYY").year(),
                        })}
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
                        label: t("YES"),
                        value: "yes",
                        rightIcon: <IconThumbUp />,
                      },
                      {
                        label: t("NO"),
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
          description={<Trans i18nKey={"STEP_HOURS_TITLE"} t={t} />}
          stepId="work-hours"
        >
          <div className="flex flex-col gap-6">
            {lead.adherent.map((p, index) => {
              if (!dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year")))
                return null;
              if (!p.travailSuisse) return null;
              return (
                <div
                  className=""
                  key={index.toString() + "" + (p.year || "") + (p.type || "")}
                >
                  <h1 className="mb-4 text-base font-extrabold leading-[1.6] text-dark md:leading-[1.4]">
                    {p.type === "partner"
                      ? p.civility === "female"
                        ? t("STEP_HOURS_SPOUSE_FEMALE")
                        : t("STEP_HOURS_SPOUSE_MALE")
                      : p.type === "child"
                      ? t("STEP_HOURS_SPOUSE_CHILD", {
                          year: dayjs(p.year, "YYYY").year(),
                        })
                      : p.type === "main"
                      ? t("STEP_HOURS_MAIN")
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
                      if (
                        lead.adherent
                          .filter((p) =>
                            dayjs(p.year, "YYYY").isBefore(
                              dayjs().subtract(18, "year")
                            )
                          )
                          .filter((p) => p.travailSuisse).length === 1
                      ) {
                        nextStep("work-hours");
                      }
                    }}
                    options={[
                      {
                        label: t("YES"),
                        value: "oui",
                        rightIcon: <IconThumbUp />,
                      },
                      {
                        label: t("NO"),
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
            >
              <Button
                onClick={() => {
                  nextStep("work-hours");
                }}
                className="mt-4 w-52"
              >
                {t("CONTINUE")}
              </Button>
            </motion.div>
          )}
        </StepContainer>
      )}
    </>
  );
};

export default Hours;

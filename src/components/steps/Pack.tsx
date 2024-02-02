import { IconCheck, IconCircleCaretDown } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Adherent, type Pack } from "~/constants/lead.constant";
import {
  packById,
  prestationsConfort,
  prestationsEssentials,
  prestationsPremium,
} from "~/data/Pack";
import {
  optionCapitalHospitalier,
  optionHospitalisation,
  optionMedecineAlternative,
  optionTraitementsDentaires,
} from "~/data/PackOption";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import PackShowOption from "./PackShowOption";

const Pack = ({
  adherent,
  setPack,
  setAdherent,
  adherentIndex,
  showNext,
}: {
  adherent: Adherent;
  setPack: (pack?: Pack) => void;
  setAdherent: (adherent: number) => void;
  adherentIndex: number;
  showNext?: boolean;
}) => {
  const [selected, setSelected] = useState<number | undefined>(
    adherent.pack?.id
  );
  const lead = useFormStore((state) => state.data);
  const nextStep = useFormStore((state) => state.nextStep);
  const age = dayjs().diff(dayjs(adherent.year, "YYYY"), "year");
  const [optionExpanded, setOptionExpanded] = useState<boolean>(false);
  const [options, setOptions] = useState<Pack["options"]>(
    adherent.pack?.options || age <= 3
      ? [
          {
            id: 4,
            label: "Hospitalisation",
            level: 3,
          },
        ]
      : age <= 15
      ? [
          {
            id: 2,
            label: "Traitements dentaires",
            level: 1,
          },
        ]
      : age <= 23
      ? [
          {
            id: 1,
            label: "Médecine alternative",
            level: 1,
          },
        ]
      : [
          {
            id: 3,
            label: "Capital hospitalier",
            level: 2,
          },
          {
            id: 4,
            label: "Hospitalisation",
            level: 1,
          },
        ]
  );
  const { t } = useTranslation("common");

  useEffect(() => {
    // If adherent age is under or equal at 3 make premium selected
    if (
      dayjs().diff(dayjs(adherent.year, "YYYY"), "year") <= 3 &&
      selected === undefined
    )
      setSelected(3);
    else if (
      dayjs().diff(dayjs(adherent.year, "YYYY"), "year") > 3 &&
      selected === undefined
    )
      setSelected(2);
  }, []);

  useEffect(() => {
    setPack(
      selected
        ? {
            id: selected,
            principal: packById(selected),
            options,
          }
        : undefined
    );
  }, [options, selected]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start gap-4 md:flex-row">
        <PackShowOption
          prestation={[prestationsEssentials]}
          defaultLevel={1}
          pack={t("STEP_PACK_ESSENTIEL")}
          recommended={false}
          selected={selected === 1}
          onClick={() => setSelected(1)}
        />
        <PackShowOption
          prestation={[prestationsConfort]}
          pack={t("STEP_PACK_CONFORT")}
          defaultLevel={1}
          recommended={dayjs().diff(dayjs(adherent.year, "YYYY"), "year") > 3}
          selected={selected === 2}
          onClick={() => setSelected(2)}
        />
        <PackShowOption
          defaultLevel={1}
          prestation={[prestationsPremium]}
          pack={t("STEP_PACK_PREMIUM")}
          recommended={dayjs().diff(dayjs(adherent.year, "YYYY"), "year") <= 3}
          selected={selected === 3}
          onClick={() => setSelected(3)}
        />
      </div>
      <div className="container-shadow mt-8 rounded-lg border p-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOptionExpanded(!optionExpanded)}
        >
          <span className="text-lg ">{t("STEP_PACK_OPTIONS")}</span>
          <IconCircleCaretDown
            size={24}
            className={`transition-transform ${
              !optionExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`${
            optionExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          } grid overflow-hidden transition-[grid-template-rows] duration-700 ease-out`}
        >
          <div
            className={`${
              optionExpanded ? "mt-8 p-1" : ""
            } grid grid-cols-1 gap-8 overflow-hidden md:grid-cols-2`}
          >
            <PackShowOption
              prestation={optionMedecineAlternative}
              pack={t("STEP_PACK_OPTIONS_MED_ALTERNATIVE")}
              defaultLevel={
                options?.find(
                  (option) => option.label === "Médecine alternative"
                )?.level || 1
              }
              onChangeLevel={(level) => {
                if (selected === undefined) return;
                if (
                  options?.find(
                    (option) => option.label === "Médecine alternative"
                  )
                ) {
                  setOptions(
                    options.map((option) =>
                      option.label === "Médecine alternative"
                        ? { label: "Médecine alternative", level: level, id: 1 }
                        : option
                    )
                  );
                }
              }}
              recommended={false}
              selected={
                !!options?.find(
                  (option) => option.label === "Médecine alternative"
                )
              }
              onClick={(level) => {
                if (selected === undefined) return;
                if (
                  options?.find(
                    (option) => option.label === "Médecine alternative"
                  )
                ) {
                  setOptions(
                    options.filter(
                      (option) => option.label !== "Médecine alternative"
                    )
                  );
                } else {
                  if (options)
                    setOptions([
                      ...options,
                      { label: "Médecine alternative", level: level, id: 1 },
                    ]);
                  else {
                    setOptions([
                      { label: "Médecine alternative", level: level, id: 1 },
                    ]);
                  }
                }
              }}
            />{" "}
            <PackShowOption
              prestation={optionTraitementsDentaires}
              pack={t("STEP_PACK_OPTIONS_TRAITEMENTS_DENTAIRE")}
              recommended={false}
              selected={
                !!options?.find(
                  (option) => option.label === "Traitements dentaires"
                )
              }
              onClick={(level) => {
                if (selected === undefined) return;
                if (
                  options?.find(
                    (option) => option.label === "Traitements dentaires"
                  )
                ) {
                  setOptions(
                    options.filter(
                      (option) => option.label !== "Traitements dentaires"
                    )
                  );
                } else {
                  if (options)
                    setOptions([
                      ...options,
                      { label: "Traitements dentaires", level, id: 2 },
                    ]);
                  else {
                    setOptions([
                      { label: "Traitements dentaires", level, id: 2 },
                    ]);
                  }
                }
              }}
              defaultLevel={
                options?.find(
                  (option) => option.label === "Traitements dentaires"
                )?.level || 1
              }
              onChangeLevel={(level) => {
                if (selected === undefined) return;
                if (
                  options?.find(
                    (option) => option.label === "Traitements dentaires"
                  )
                ) {
                  setOptions(
                    options.map((option) =>
                      option.label === "Traitements dentaires"
                        ? {
                            label: "Traitements dentaires",
                            level: level,
                            id: 2,
                          }
                        : option
                    )
                  );
                }
              }}
            />{" "}
            <PackShowOption
              prestation={optionCapitalHospitalier}
              pack={t("STEP_PACK_OPTIONS_CAPITAL_HOSPITALIER")}
              recommended={false}
              selected={
                !!options?.find(
                  (option) => option.label === "Capital hospitalier"
                )
              }
              onClick={(level) => {
                if (selected === undefined) return;
                if (
                  options?.find(
                    (option) => option.label === "Capital hospitalier"
                  )
                ) {
                  setOptions(
                    options.filter(
                      (option) => option.label !== "Capital hospitalier"
                    )
                  );
                } else {
                  if (options)
                    setOptions([
                      ...options,
                      { label: "Capital hospitalier", level: level, id: 3 },
                    ]);
                  else {
                    setOptions([
                      { label: "Capital hospitalier", level: level, id: 3 },
                    ]);
                  }
                }
              }}
              defaultLevel={
                options?.find(
                  (option) => option.label === "Capital hospitalier"
                )?.level || 1
              }
              onChangeLevel={(level) => {
                if (selected === undefined) return;
                if (
                  options?.find(
                    (option) => option.label === "Capital hospitalier"
                  )
                ) {
                  setOptions(
                    options.map((option) =>
                      option.label === "Capital hospitalier"
                        ? { label: "Capital hospitalier", level: level, id: 3 }
                        : option
                    )
                  );
                }
              }}
            />{" "}
            <PackShowOption
              prestation={optionHospitalisation}
              pack={t("STEP_PACK_OPTIONS_HOSPITALISATION")}
              customLevel={["Flexible", "Semi-privée", "Privée"]}
              recommended={true}
              selected={
                !!options?.find((option) => option.label === "Hospitalisation")
              }
              onClick={(level) => {
                if (selected === undefined) return;
                if (
                  options?.find((option) => option.label === "Hospitalisation")
                ) {
                  setOptions(
                    options.filter(
                      (option) => option.label !== "Hospitalisation"
                    )
                  );
                } else {
                  if (options)
                    setOptions([
                      ...options,
                      { label: "Hospitalisation", level: level, id: 4 },
                    ]);
                  else {
                    setOptions([
                      { label: "Hospitalisation", level: level, id: 4 },
                    ]);
                  }
                }
              }}
              defaultLevel={
                options?.find((option) => option.label === "Hospitalisation")
                  ?.level || 1
              }
              onChangeLevel={(level) => {
                if (selected === undefined) return;
                if (
                  options?.find((option) => option.label === "Hospitalisation")
                ) {
                  setOptions(
                    options.map((option) =>
                      option.label === "Hospitalisation"
                        ? { label: "Hospitalisation", level: level, id: 4 }
                        : option
                    )
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between gap-8">
        <button
          className="flex w-fit items-center gap-2 rounded-lg border border-red-500 bg-white p-2 text-lg font-bold text-red-500 hover:bg-red-100"
          onClick={() => {
            setOptions([]);
            setSelected(undefined);
          }}
        >
          {t("STEP_PACK_BASE")}
          {!selected && <IconCheck size={24} />}
        </button>
        {showNext && (
          <Button
            className="w-40"
            onClick={() => {
              if (lead.adherent.length === adherentIndex + 1) {
                nextStep("package");
                return;
              }
              setAdherent(adherentIndex + 1);
              // Scroll smooth to top

              setTimeout(() => {
                const elem = document.getElementById(
                  (adherentIndex + 1).toString()
                );
                if (elem) {
                  const offsetTop =
                    elem.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: offsetTop - 100,
                    behavior: "smooth",
                  });
                }
              }, 100);
            }}
          >
            {t("VALIDATE")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pack;

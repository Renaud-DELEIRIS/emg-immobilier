import { IconCheck, IconCircleCaretDown } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
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
import type { Adherent } from "../provider/LeadProvider";
import PackShowOption from "./PackShowOption";

const Pack = ({
  adherent,
  setPack,
}: {
  adherent: Adherent;
  setPack: (pack: {
    principal: "Essentiel" | "Confort" | "Premium" | undefined | null;
    options: {
      label:
        | "Médecine alternative"
        | "Traitements dentaires"
        | "Hospitalisation"
        | "Capital hospitalier";
      level: number;
    }[];
  }) => void;
}) => {
  const [selected, setSelected] = useState<
    "Essentiel" | "Confort" | "Premium" | undefined | null
  >(adherent.pack?.principal);
  const [optionExpanded, setOptionExpanded] = useState<boolean>(false);
  const [options, setOptions] = useState<
    {
      label:
        | "Médecine alternative"
        | "Traitements dentaires"
        | "Hospitalisation"
        | "Capital hospitalier";
      level: number;
    }[]
  >(
    adherent.pack?.options || [
      {
        label: "Capital hospitalier",
        level: 2,
      },
      {
        label: "Hospitalisation",
        level: 1,
      },
    ]
  );

  useEffect(() => {
    // If adherent age is under or equal at 3 make premium selected
    if (dayjs().diff(adherent.dob, "year") <= 3 && selected === undefined)
      setSelected("Premium");
    else if (dayjs().diff(adherent.dob, "year") > 3 && selected === undefined)
      setSelected("Confort");
  }, []);

  useEffect(() => {
    setPack({
      principal: selected,
      options,
    });
  }, [options, selected]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-8">
        <PackShowOption
          prestation={[prestationsEssentials]}
          defaultLevel={1}
          pack="Essentiel"
          recommended={false}
          selected={selected === "Essentiel"}
          onClick={() => setSelected("Essentiel")}
        />
        <PackShowOption
          prestation={[prestationsConfort]}
          pack="Confort"
          defaultLevel={1}
          recommended={dayjs().diff(adherent.dob, "year") > 3}
          selected={selected === "Confort"}
          onClick={() => setSelected("Confort")}
        />
        <PackShowOption
          defaultLevel={1}
          prestation={[prestationsPremium]}
          pack="Premium"
          recommended={dayjs().diff(adherent.dob, "year") <= 3}
          selected={selected === "Premium"}
          onClick={() => setSelected("Premium")}
        />
      </div>
      <div className="container-shadow mt-8 rounded-lg border p-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOptionExpanded(!optionExpanded)}
        >
          <span className="text-lg ">Options supplémentaires</span>
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
              optionExpanded ? "mt-8" : ""
            } grid grid-cols-1 gap-8 overflow-hidden md:grid-cols-2`}
          >
            <PackShowOption
              prestation={optionMedecineAlternative}
              pack="Médecine alternative"
              defaultLevel={
                options.find(
                  (option) => option.label === "Médecine alternative"
                )?.level || 1
              }
              onChangeLevel={(level) => {
                if (selected === undefined) return;
                if (
                  options.find(
                    (option) => option.label === "Médecine alternative"
                  )
                ) {
                  setOptions(
                    options.map((option) =>
                      option.label === "Médecine alternative"
                        ? { label: "Médecine alternative", level: level }
                        : option
                    )
                  );
                }
              }}
              recommended={false}
              selected={
                !!options.find(
                  (option) => option.label === "Médecine alternative"
                )
              }
              onClick={(level) => {
                if (selected === undefined) return;
                if (
                  options.find(
                    (option) => option.label === "Médecine alternative"
                  )
                ) {
                  setOptions(
                    options.filter(
                      (option) => option.label !== "Médecine alternative"
                    )
                  );
                } else {
                  setOptions([
                    ...options,
                    { label: "Médecine alternative", level: level },
                  ]);
                }
              }}
            />{" "}
            <PackShowOption
              prestation={optionTraitementsDentaires}
              pack="Traitements dentaires"
              recommended={false}
              selected={
                !!options.find(
                  (option) => option.label === "Traitements dentaires"
                )
              }
              onClick={(level) => {
                if (selected === undefined) return;
                if (
                  options.find(
                    (option) => option.label === "Traitements dentaires"
                  )
                ) {
                  setOptions(
                    options.filter(
                      (option) => option.label !== "Traitements dentaires"
                    )
                  );
                } else {
                  setOptions([
                    ...options,
                    { label: "Traitements dentaires", level },
                  ]);
                }
              }}
              defaultLevel={
                options.find(
                  (option) => option.label === "Traitements dentaires"
                )?.level || 1
              }
              onChangeLevel={(level) => {
                if (selected === undefined) return;
                if (
                  options.find(
                    (option) => option.label === "Traitements dentaires"
                  )
                ) {
                  setOptions(
                    options.map((option) =>
                      option.label === "Traitements dentaires"
                        ? { label: "Traitements dentaires", level: level }
                        : option
                    )
                  );
                }
              }}
            />{" "}
            <PackShowOption
              prestation={optionCapitalHospitalier}
              pack="Capital hospitalier"
              recommended={false}
              selected={
                !!options.find(
                  (option) => option.label === "Capital hospitalier"
                )
              }
              onClick={(level) => {
                if (selected === undefined) return;
                if (
                  options.find(
                    (option) => option.label === "Capital hospitalier"
                  )
                ) {
                  setOptions(
                    options.filter(
                      (option) => option.label !== "Capital hospitalier"
                    )
                  );
                } else {
                  setOptions([
                    ...options,
                    { label: "Capital hospitalier", level: level },
                  ]);
                }
              }}
              defaultLevel={
                options.find((option) => option.label === "Capital hospitalier")
                  ?.level || 1
              }
              onChangeLevel={(level) => {
                if (selected === undefined) return;
                if (
                  options.find(
                    (option) => option.label === "Capital hospitalier"
                  )
                ) {
                  setOptions(
                    options.map((option) =>
                      option.label === "Capital hospitalier"
                        ? { label: "Capital hospitalier", level: level }
                        : option
                    )
                  );
                }
              }}
            />{" "}
            <PackShowOption
              prestation={optionHospitalisation}
              pack="Hospitalisation"
              customLevel={["Flexible", "Semi-privée", "Privée"]}
              recommended={true}
              selected={
                !!options.find((option) => option.label === "Hospitalisation")
              }
              onClick={(level) => {
                if (selected === undefined) return;
                if (
                  options.find((option) => option.label === "Hospitalisation")
                ) {
                  setOptions(
                    options.filter(
                      (option) => option.label !== "Hospitalisation"
                    )
                  );
                } else {
                  setOptions([
                    ...options,
                    { label: "Hospitalisation", level: level },
                  ]);
                }
              }}
              defaultLevel={
                options.find((option) => option.label === "Hospitalisation")
                  ?.level || 1
              }
              onChangeLevel={(level) => {
                if (selected === undefined) return;
                if (
                  options.find((option) => option.label === "Hospitalisation")
                ) {
                  setOptions(
                    options.map((option) =>
                      option.label === "Hospitalisation"
                        ? { label: "Hospitalisation", level: level }
                        : option
                    )
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <button
        className="mt-8 flex w-fit items-center gap-2 rounded-lg border border-red-500 bg-white p-2 text-lg font-bold text-red-500 hover:bg-red-100"
        onClick={() => {
          setOptions([]);
          setSelected(null);
        }}
      >
        Je ne veux que la base
        {!selected && <IconCheck size={24} />}
      </button>
    </div>
  );
};

export default Pack;

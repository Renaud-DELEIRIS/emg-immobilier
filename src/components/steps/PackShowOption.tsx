import { IconCheck, IconX } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import ReactSwitch from "react-switch";
import { type Prestation } from "~/data/Pack";
import RangeSlider from "../inputs/Range";

const PackShowOption = ({
  pack,
  prestation,
  onClick,
  selected,
  recommended,
  customLevel,
  defaultLevel,
  onChangeLevel = () => null,
}: {
  pack: string;
  prestation: Prestation[][];
  onClick: (level: number) => void;
  selected: boolean;
  recommended: boolean;
  customLevel?: string[];
  defaultLevel: number;
  onChangeLevel?: (level: number) => void;
}) => {
  const [options, setOptions] = useState<number>(defaultLevel || 1);
  const maxLevel = prestation.length;
  const { t } = useTranslation("common");

  return (
    <div
      className={`container-shadow relative flex w-full flex-col items-center rounded-lg ${
        selected ? "border-2 border-primary-400" : "border-0"
      }`}
    >
      {recommended && (
        <div className="absolute left-0 top-0 rounded-br-md rounded-tl-md bg-primary-400 text-white">
          <span className="px-1 text-[10px] font-bold leading-3">
            {t("STEP_PACK_RECOMMENDATION")}
          </span>
        </div>
      )}
      <h3 className="flex w-full items-center justify-between rounded-t-md bg-stone-600 pb-4 pt-4 text-lg font-bold text-white [&>*]:flex-1">
        <div />
        {t(pack)}
        <div className="mr-2 flex w-full justify-end">
          <ReactSwitch
            checked={selected}
            onChange={() => onClick(options)}
            className="md:hidden"
            onColor="#00C49B"
            height={18}
            width={40}
            handleDiameter={6}
            onHandleColor="#f5f5f5"
            offHandleColor="#f5f5f5"
          />
        </div>
      </h3>
      {maxLevel > 1 && (
        <div className="mt-4 w-full px-8">
          <span className="text-sm font-bold text-neutral-600">
            {t("STEP_PACK_LEVEL")}{" "}
            {customLevel ? customLevel[options - 1] : options}
          </span>
          <RangeSlider
            values={[options]}
            onChange={(values) => {
              setOptions(values[0] as number);
              onChangeLevel(values[0] as number);
            }}
            max={maxLevel}
            disabled={!selected}
          ></RangeSlider>
        </div>
      )}

      <ul
        className={`mt-6 w-full justify-start space-y-1.5 px-4 pb-4 text-left ${
          selected ? "opacity-100" : "opacity-40"
        }`}
      >
        {(prestation[options - 1] as Prestation[]).map((presta, i) => (
          <li key={i} className="flex items-center gap-2 text-left">
            {presta.status ? (
              <IconCheck className="h-5 w-5 text-primary-400" />
            ) : (
              <IconX className="h-5 w-5 text-neutral-400" />
            )}
            <span
              className={`text-base ${
                presta.status ? "text-neutral-600" : "text-neutral-400"
              }`}
            >
              {t(presta.label)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackShowOption;

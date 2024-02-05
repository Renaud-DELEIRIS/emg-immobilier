import { useTranslation } from "next-i18next";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { type Prestation } from "~/data/Pack";
import RangeSlider from "../inputs/Range";

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#clip0_770_6143)">
      <path
        d="M12 24C18.6276 24 24 18.6276 24 12C24 5.3724 18.6276 0 12 0C5.3724 0 0 5.3724 0 12C0 18.6276 5.3724 24 12 24Z"
        fill="#0CBCB0"
        fillOpacity="0.25"
      />
      <path
        d="M6.57031 12.7759L9.67353 15.8791L17.4316 8.12109"
        stroke="#006D73"
        strokeWidth="1.84615"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_770_6143">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const IconX = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_770_6168)">
      <path
        d="M12 24C18.6276 24 24 18.6276 24 12C24 5.3724 18.6276 0 12 0C5.3724 0 0 5.3724 0 12C0 18.6276 5.3724 24 12 24Z"
        fill="#888894"
        fillOpacity="0.14"
      />
      <path
        d="M7.41406 7.5L16.4141 16.5"
        stroke="#888894"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4141 7.5L7.41406 16.5"
        stroke="#888894"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_770_6168">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

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
    <button
      className={twMerge(
        `relative flex w-full flex-col rounded-xl border-[1.5px] border-grey/10 bg-white p-4`,
        selected && "border-primary bg-[#0CBCB00D]",
        recommended && "pt-[28px]"
      )}
      onClick={() => onClick(options)}
    >
      {recommended && (
        <div className="absolute left-1/2 right-1/2 top-0 grid h-[32px] w-fit -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[32px] bg-primary px-[14px] text-white">
          <span className="text-[13px] font-semibold leading-[normal] tracking-[-0.26px]">
            {t("STEP_PACK_RECOMMENDATION")}
          </span>
        </div>
      )}
      <span className={`mb-5 text-[18px] font-bold leading-[normal]`}>
        {t(pack)}
      </span>
      {maxLevel > 1 && (
        <div className="mb-2 w-full px-8">
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

      <ul className={`space-y-5`}>
        {(prestation[options - 1] as Prestation[]).map((presta, i) => (
          <li key={i} className="flex items-center gap-1.5 text-left">
            <div className="flex-shrink-0">
              {presta.status ? <IconCheck /> : <IconX />}
            </div>
            <span className={`text-xs font-medium`}>{t(presta.label)}</span>
          </li>
        ))}
      </ul>
    </button>
  );
};

export default PackShowOption;

import { IconCircleCheckFilled } from "@tabler/icons-react";
import React from "react";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
    icon?: React.ReactElement;
    rightIcon?: React.ReactElement;
  }[];
  className?: string;
}

const TileInput = ({ value, onChange, options, className = "" }: Props) => {
  const hasIcon = options.some((option) => option.icon);
  return (
    <div className={`flex items-center ${className}`}>
      {options.map((option) =>
        hasIcon ? (
          <button
            key={option.value}
            className={`flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 bg-white px-2 py-8 ${
              value === option.value
                ? "border-primary text-primary"
                : "text-neutral-700 hover:border-primary hover:text-primary"
            } hover:border-primary`}
            onClick={() => onChange(option.value)}
          >
            {option.icon}
            <span className="text-base ">{option.label}</span>
            <div className="relative grid h-6 w-6 place-items-center rounded-full border-2">
              {value === option.value && (
                <IconCircleCheckFilled className="absolute h-7 w-7" />
              )}
            </div>
          </button>
        ) : (
          <button
            key={option.value}
            className={`flex w-full items-center gap-4 rounded-md p-3 ${
              value === option.value
                ? "border-primary text-primary"
                : "border-neutral-300 text-neutral-700"
            } border hover:border-primary`}
            onClick={() => onChange(option.value)}
          >
            <div className="relative grid h-4 w-4 place-items-center rounded-full border border-neutral-300">
              {value === option.value && (
                <IconCircleCheckFilled className="absolute h-5 w-5" />
              )}
            </div>
            <span className="text-base">{option.label}</span>
            {option.rightIcon && (
              <div className="ml-auto">{option.rightIcon}</div>
            )}
          </button>
        )
      )}
    </div>
  );
};

export default TileInput;

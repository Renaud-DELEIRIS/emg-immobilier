import { IconCircleCheckFilled } from "@tabler/icons-react";
import React from "react";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
    icon?: React.ReactElement;
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
            className={`flex h-44 w-full flex-col items-center justify-center gap-4 rounded-md ${
              value === option.value
                ? "border-primary text-primary"
                : "border-neutral-300 text-neutral-900 hover:border-primary hover:text-primary"
            } border-2 text-lg hover:border-primary`}
            onClick={() => onChange(option.value)}
          >
            {option.icon}
            <span className="text-lg">{option.label}</span>
            <div className="relative grid h-6 w-6 place-items-center rounded-full border border-neutral-300">
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
                : "border-neutral-300 text-neutral-900"
            } border hover:border-primary`}
            onClick={() => onChange(option.value)}
          >
            <div className="relative grid h-4 w-4 place-items-center rounded-full border border-neutral-300">
              {value === option.value && (
                <IconCircleCheckFilled className="absolute h-5 w-5" />
              )}
            </div>
            <span className="text-base">{option.label}</span>
          </button>
        )
      )}
    </div>
  );
};

export default TileInput;

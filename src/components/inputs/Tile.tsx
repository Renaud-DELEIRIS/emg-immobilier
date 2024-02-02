import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  value: string | string[] | undefined | boolean;
  onChange: (value: string | string[] | boolean) => void;
  options: {
    value: string | boolean;
    label: string;
    icon?: React.ReactElement;
  }[];
  className?: string;
  multiple?: boolean;
}

const TileInput = ({
  value,
  onChange,
  options,
  className = "",
  multiple,
}: Props) => {
  const handleChange = (value: string | boolean) => {
    if (multiple && typeof value === "string") {
      if (Array.isArray(value)) {
        onChange(value);
      } else {
        onChange([...(value as unknown as string[])]);
      }
    } else {
      onChange(value);
    }
  };

  const isSelected = (option: string | boolean) => {
    if (multiple && typeof option === "string") {
      return (value as string[]).includes(option);
    }
    return value === option;
  };

  return (
    <div className={twMerge(`flex w-full flex-col gap-[18px]`, className)}>
      {options.map((option) => (
        <button
          key={option.value.toString()}
          className={twMerge(
            `group flex h-[68px] w-full items-center gap-[10px] rounded-xl border-[1.5px] border-[#8888941A] bg-white px-[20px] text-left shadow-[0px_0px_20px_0px_rgba(8,38,35,0.05)] transition-all duration-200 ease-in-out hover:border-primary hover:shadow-[0px_0px_20px_0px_rgba(8,38,35,0.1)]`,
            isSelected(option.value) && "border-primary bg-[#0CBCB014]"
          )}
          onClick={() => handleChange(option.value)}
        >
          <div className="shrink-0">{option.icon}</div>
          <div
            className={twMerge(
              "h-6 w-6 shrink-0 rounded-full border-2 border-[#8888944D] bg-white transition-all duration-200 ease-in-out group-hover:border-primary",
              isSelected(option.value) && "border-[8px] border-primary"
            )}
          />
          <span className="text-[16px] font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TileInput;

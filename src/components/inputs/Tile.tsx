import React from "react";
import { twMerge } from "tailwind-merge";

interface Props<T> {
  value: T;
  onChange: (value: T) => void;
  options: {
    // If T is an array, value should be a string
    value: T extends string[] ? string : T;
    label: string;
    info?: string;
    icon?: React.ReactElement;
  }[];
  className?: string;
  multiple?: boolean;
  withoutDot?: boolean;
}

const TileInput = <T extends string | boolean | string[] | undefined>({
  value,
  onChange,
  options,
  className = "",
  withoutDot = false,
  multiple,
}: Props<T>) => {
  const handleChange = (newVal: T extends string[] ? string : T) => {
    if (newVal === undefined) return;
    if (multiple) {
      if (typeof newVal !== "string") {
        console.error("TileInput: Multiple mode only accepts string");
        return;
      }
      if (Array.isArray(value)) {
        if (value.includes(newVal)) {
          onChange(value.filter((v) => v !== newVal) as T);
          return;
        }
        onChange([...value, newVal] as T);
      } else {
        onChange([newVal] as T);
      }
    } else {
      onChange(newVal as T);
    }
  };

  const isSelected = (option: T extends string[] ? string : T) => {
    if (multiple && typeof option === "string") {
      return (value as string[]).includes(option);
    }
    return value === option;
  };

  return (
    <div className={twMerge(`flex w-full flex-col gap-[18px]`, className)}>
      {options.map((option) => (
        <button
          key={option.value?.toString()}
          className={twMerge(
            `group flex min-h-[68px] w-full items-center gap-[10px] rounded-xl border-[1.5px] border-[#8888941A] bg-white px-[20px] py-[14px] text-left shadow-[0px_0px_20px_0px_rgba(8,38,35,0.05)] transition-[color] duration-200 ease-in-out hover:border-primary hover:shadow-[0px_0px_20px_0px_rgba(8,38,35,0.1)] focus:outline-primary focus-visible:outline-primary`,
            isSelected(option.value) && "border-primary bg-primary/5"
          )}
          onClick={() => handleChange(option.value)}
        >
          {!withoutDot && (
            <div
              className={twMerge(
                "h-6 w-6 shrink-0 rounded-full border-2 border-[#8888944D] bg-white transition-all duration-200 ease-in-out group-hover:border-primary",
                isSelected(option.value) && "border-[8px] border-primary"
              )}
            />
          )}
          <div className="flex flex-col">
            <span className="text-[16px] font-medium leading-[normal]">
              {option.label}
            </span>
            {option.info && (
              <span className="text-[14px] leading-5 text-grey">
                {option.info}
              </span>
            )}
          </div>
          <div className="ml-auto shrink-0">{option.icon}</div>
        </button>
      ))}
    </div>
  );
};

export default TileInput;

import { Combobox } from "@headlessui/react";
import { IconInfoCircle } from "@tabler/icons-react";
import React, { ReactNode, useId, useRef } from "react";
import { twMerge } from "tailwind-merge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ICarOption } from "../steps/CarModel";

export interface IInput extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  tooltip?: string;
  insideText?: string;
  error?: string;
  placeholder?: string;
  wrapperClassName?: string;
  valid?: boolean;
  before?: ReactNode;
  after?: ReactNode;
  displayValue: (option: ICarOption) => string;
  onChangeQuery: (newQuery: string) => void;
}

const CustomAutoCompleteInput = React.forwardRef<HTMLInputElement, IInput>(
  (
    {
      label = "",
      className = "",
      wrapperClassName = "",
      tooltip,
      insideText = "",
      error = "",
      valid = false,
      before,
      after,
      displayValue,
      onChangeQuery,
      value,
      placeholder,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const localRef = useRef(null);

    return (
      <div className={twMerge("w-full", wrapperClassName)}>
        {label && (
          <label
            className="mb-[6px] block text-sm font-medium opacity-80"
            htmlFor={id}
          >
            {label}
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <IconInfoCircle size={16} />
                  </TooltipTrigger>
                  <TooltipContent>{tooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </label>
        )}
        <div
          className={
            "flex w-full flex-shrink-0 items-center gap-2 rounded-lg border-[1.5px] px-4 outline-8 hover:cursor-text"
          }
          onClick={() => {
            if (localRef?.current) {
              let parsedRef = localRef.current as HTMLInputElement;
              parsedRef.focus();
            }
          }}
        >
          {before != null && before}
          <Combobox.Input
            id={id}
            value={value}
            onChange={(event) => onChangeQuery(event.currentTarget.value)}
            className={twMerge(
              `py-[18px] text-base font-medium outline-none placeholder:text-grey focus-within:outline-none`,
              className
            )}
            placeholder={placeholder}
            displayValue={displayValue}
            autoComplete="off"
          />
          {/* <input
            id={id}
            className={twMerge(
              `py-[18px] text-base font-medium outline-none placeholder:text-grey focus-within:outline-none`,
              className
            )}
            ref={localRef}
            {...props}
          /> */}
          {insideText && (
            <div className="absolute bottom-0 right-0 top-0 flex items-center px-4 text-sm font-medium text-grey opacity-80">
              {insideText}
            </div>
          )}
          {after != null && after}
        </div>
        {error && (
          <span className="mt-1 block text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

export default CustomAutoCompleteInput;

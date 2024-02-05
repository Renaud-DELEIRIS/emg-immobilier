import { IconInfoCircle } from "@tabler/icons-react";
import dayjs from "dayjs";
import { E164Number } from "libphonenumber-js";
import React, {
  ChangeEvent,
  Fragment,
  MutableRefObject,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import PhoneInput from "react-phone-number-input";
import { twMerge } from "tailwind-merge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export interface IInput extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  tooltip?: string;
  insideText?: string;
  error?: string;
  placeholder?: string;
  wrapperClassName?: string;
  valid?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, IInput>(
  (
    {
      label = "",
      className = "",
      wrapperClassName = "",
      tooltip,
      insideText = "",
      error = "",
      valid = false,
      icon,
      ...props
    },
    ref
  ) => {
    const id = useId();

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
        <div className={"full-width relative"}>
          <input
            id={id}
            className={twMerge(
              `w-full rounded-lg border-[1.5px] border-secondary px-4 py-[18px] text-base font-medium outline-8 placeholder:text-grey focus-within:border-secondary  focus-within:outline-secondary`,
              insideText ? "pr-10" : "pr-4",
              icon && "pl-12",
              valid &&
                "border-primary bg-[#0CBCB014] focus-within:border-primary focus-within:outline-primary",
              className
            )}
            ref={ref}
            {...props}
          />

          {insideText && (
            <div className="absolute bottom-0 right-0 top-0 flex items-center px-4 text-sm font-medium text-grey opacity-80">
              {insideText}
            </div>
          )}
          {icon && (
            <div className="absolute bottom-0 left-0 top-0 flex items-center pl-4 text-grey opacity-80">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <span className="mt-1 block text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

export const PhoneNumberInput = React.forwardRef<
  React.ElementRef<typeof PhoneInput>,
  Omit<IInput, "onChange" | "insideText"> & {
    onChange?: (e?: E164Number) => void;
  }
>(
  (
    {
      label = "",
      className = "",
      tooltip,
      error = "",
      wrapperClassName = "",
      value: val,
      valid,
      onChange,
      ...props
    },
    ref
  ) => {
    const id = useId();

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
        <div className={"full-width relative bg-white"}>
          <PhoneInput
            id={id}
            ref={ref}
            value={val?.toString() ?? ""}
            className={twMerge(
              `w-full rounded-lg border-[1.5px] border-secondary px-4 py-[18px] text-base font-medium placeholder:text-grey
              focus-within:ring-1 focus-within:ring-secondary`,
              valid &&
                "border-primary bg-[#EAF6F8] focus-within:border-primary focus-within:ring-primary",
              className
            )}
            defaultCountry="CH"
            numberInputProps={{
              ...props,
              className:
                "focus-within:outline-none focus-within:ring-0 bg-inherit",
            }}
            onChange={(e) => onChange && onChange(e)}
          />
        </div>
        {error && (
          <span className="mt-1 block text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

export const DateInput = React.forwardRef<
  HTMLInputElement,
  Omit<IInput, "insideText" | "onChange"> & {
    format?: "DD.MM.YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY" | "YYYY";
    value?: string;
    defaultYear?: string;
    onChange?: (value: string) => void;
  }
>(
  (
    {
      label = "",
      className = "",
      tooltip,
      error = "",
      wrapperClassName = "",
      onChange,
      format = "DD.MM.YYYY",
      value,
      defaultYear,
      valid,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const separator =
      format
        .replace("DD", "")
        .replace("MM", "")
        .replace("YYYY", "")
        .charAt(0) || "reytayfhabh";
    const arrFormat = format.split(separator);
    const asDate =
      value && dayjs(value, "YYYY-MM-DD", true).isValid()
        ? dayjs(value, "YYYY-MM-DD")
        : undefined;
    const [day, setDay] = useState(asDate?.date().toString() ?? "");
    const [month, setMonth] = useState(
      asDate ? (asDate.month() + 1).toString() : ""
    );
    const [year, setYear] = useState(
      asDate?.year().toString() ?? defaultYear ?? ""
    );
    const objectRef: Record<
      string,
      MutableRefObject<HTMLInputElement | null>
    > = {
      DD: useRef<HTMLInputElement | null>(null),
      MM: useRef<HTMLInputElement | null>(null),
      YYYY: useRef<HTMLInputElement | null>(null),
    };
    const onChangeDay = (e: ChangeEvent<HTMLInputElement>) => {
      // If e value is not a number cancel
      const val = e.target.value;
      const nbVal = parseInt(val);
      if (val) {
        if (isNaN(nbVal)) {
          return;
        }

        if (parseInt(val) > 31) {
          return;
        }
      }

      const value = e.target.value.slice(0, 2);
      setDay(value);
      if (value.length === 2) {
        const indexinput = arrFormat.indexOf("DD");
        if (indexinput < arrFormat.length - 1) {
          const formatNextInput = arrFormat[indexinput + 1];
          if (formatNextInput) {
            const r = objectRef[formatNextInput];
            r?.current?.focus();
          }
        }
      }
    };
    const onChangeMonth = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const nbVal = parseInt(val);
      if (val) {
        if (isNaN(nbVal)) {
          return;
        }

        if (parseInt(val) > 12) {
          return;
        }
      }
      const value = e.target.value.slice(0, 2);
      setMonth(value);
      if (value.length === 2) {
        const indexinput = arrFormat.indexOf("MM");
        if (indexinput < arrFormat.length - 1) {
          const formatNextInput = arrFormat[indexinput + 1];
          if (formatNextInput) {
            const r = objectRef[formatNextInput];
            r?.current?.focus();
          }
        }
      }
    };
    const onChangeYear = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const nbVal = parseInt(val);
      if (val) {
        if (isNaN(nbVal)) {
          return;
        }
      }
      const value = e.target.value.slice(0, 4);
      setYear(value);
      if (value.length === 2) {
        const indexinput = arrFormat.indexOf("YYYY");
        if (indexinput < arrFormat.length - 1) {
          const formatNextInput = arrFormat[indexinput + 1];
          if (formatNextInput) {
            const r = objectRef[formatNextInput];
            r?.current?.focus();
          }
        }
      }
    };
    const onBackSpace = (
      e: KeyboardEvent<HTMLInputElement>,
      format: "DD" | "MM" | "YYYY"
    ) => {
      // If key = deciaml or negative cancel

      if (e.key === "Dot" || e.key === "Minus") {
        e.preventDefault();
        return;
      }

      if (e.key === "Backspace") {
        const indexInput = arrFormat.indexOf(format);
        if (indexInput > 0) {
          const formatPrevInput = arrFormat[indexInput - 1];
          if (formatPrevInput && format === "DD" && day.length === 0) {
            objectRef[formatPrevInput]?.current?.focus();
          } else if (formatPrevInput && format === "MM" && month.length === 0) {
            objectRef[formatPrevInput]?.current?.focus();
          } else if (
            formatPrevInput &&
            format === "YYYY" &&
            year.length === 0
          ) {
            objectRef[formatPrevInput]?.current?.focus();
          }
        }
      }
    };
    useEffect(() => {
      onChange &&
        // Fire html input event
        onChange(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    }, [day, month, year]);

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
        <div className={"relative w-full"}>
          <div
            className={twMerge(
              `flex h-[58px] w-full rounded-lg border-[1.5px] border-secondary bg-white px-4 py-[18px] text-sm
              font-medium opacity-80 placeholder:text-grey focus-within:ring-1 focus-within:ring-secondary`,
              valid &&
                "border-primary bg-[#EAF6F8] focus-within:border-primary focus-within:ring-primary",
              className
            )}
          >
            {arrFormat.map((m, i) => (
              <Fragment key={m}>
                {i > 0 && <span className="pb-2">{separator}</span>}
                {m === "DD" ? (
                  <input
                    {...props}
                    value={day}
                    onKeyUp={(e) => onBackSpace(e, "DD")}
                    onChange={onChangeDay}
                    maxLength={2}
                    size={2}
                    id={id}
                    className="w-0 flex-1 bg-inherit text-center text-sm placeholder:text-neutral-400 focus:outline-none focus:outline-0"
                    pattern="[0-9]*"
                    type="number"
                    inputMode="numeric"
                    placeholder="DD"
                    min={1}
                    max={31}
                    ref={objectRef["DD"]}
                    step={1}
                  />
                ) : m === "MM" ? (
                  <input
                    value={month}
                    onKeyUp={(e) => onBackSpace(e, "MM")}
                    onChange={onChangeMonth}
                    maxLength={2}
                    size={2}
                    className="w-0 flex-1 bg-inherit text-center text-sm placeholder:text-neutral-400 focus:outline-none focus:outline-0"
                    pattern="[0-9]*"
                    type="number"
                    inputMode="numeric"
                    placeholder="MM"
                    min={1}
                    max={12}
                    ref={objectRef["MM"]}
                    step={1}
                  />
                ) : (
                  <input
                    value={year}
                    onKeyUp={(e) => onBackSpace(e, "YYYY")}
                    onChange={onChangeYear}
                    maxLength={4}
                    size={4}
                    className="w-0 flex-1 bg-inherit text-center text-sm placeholder:text-neutral-400 focus:outline-none focus:outline-0"
                    pattern="[0-9]*"
                    type="number"
                    inputMode="numeric"
                    placeholder="YYYY"
                    ref={objectRef["YYYY"]}
                    step={1}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
        {error && (
          <span className="mt-1 block text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

export default Input;

import { Combobox, Transition } from "@headlessui/react";
import { IconCheck, IconChevronUp, IconInfoCircle } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { Fragment, forwardRef, useId, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Autocomplete<T> {
  value: T;
  onChange?: (value: T) => void;
  options: {
    value: T;
    label: string;
  }[];
  name?: string;
  onBlur?: () => void;
  label?: string;
  className?: string;
  error?: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  valid?: boolean;
  "aria-label"?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  theme?: "normal" | "dark";
}

export const AutoCompleteComp = <T extends string | undefined>(
  {
    options,
    value,
    onChange,
    className = "",
    label,
    placeholder,
    autoFocus = false,
    error,
    valid = false,
    tooltip,
    icon,
    theme = "normal",
    ...props
  }: Autocomplete<T>,
  ref: React.Ref<typeof Combobox.Input>
) => {
  const [query, setQuery] = useState("");
  const { t } = useTranslation("common");

  const filteredPeople = useMemo(
    () =>
      query === ""
        ? options
        : options.filter(
            (option) =>
              option.value &&
              (option.value
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, "")) ||
                option.label
                  .toString()
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(query.toLowerCase().replace(/\s+/g, "")))
          ),
    [query, options]
  );

  const id = useId();
  return (
    <div className={`w-full ${className}`}>
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
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden bg-white text-left ">
            <Combobox.Input
              className={twMerge(
                "w-full rounded-lg border-[1.5px] border-secondary px-4 py-[18px] text-sm font-medium placeholder:text-grey focus-within:outline-secondary focus-within:ring-1 focus-within:ring-secondary",
                theme === "dark" && "bg-[#8888941A] text-dark",
                valid &&
                  "border-primary bg-primary/5 focus-within:border-primary focus-within:outline-primary",
                icon && "pl-12"
              )}
              displayValue={(person: string) => {
                return options.find((o) => o.value === person)?.label ?? "";
              }}
              onChange={(event) => setQuery(event.target.value)}
              id={id}
              placeholder={placeholder}
              autoFocus={autoFocus}
              ref={ref as React.Ref<HTMLInputElement>}
              {...props}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <IconChevronUp
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            {icon && (
              <div className="absolute bottom-0 left-0 top-0 flex items-center pl-4 text-grey opacity-80">
                {icon}
              </div>
            )}
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border-[1.5px] border-[#8888941A] bg-white px-3 py-[14px] text-base focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  {t("no_result")}
                </div>
              ) : (
                filteredPeople.slice(0, 100).map((person) => {
                  return (
                    <Combobox.Option
                      key={person.value ? person.value.toString() : ""}
                      className={({ active }) =>
                        `relative flex cursor-default select-none justify-between rounded-md px-2 py-2 ${
                          active ? "bg-neutral-50" : "text-gray-900"
                        }`
                      }
                      value={person.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.label}
                          </span>
                          {selected ? (
                            <span className={` ${"text-secondary"}`}>
                              <IconCheck
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {error && (
        <span className="mt-1 block text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

const AutoComplete = forwardRef(AutoCompleteComp) as <
  T extends string | undefined
>(
  p: Autocomplete<T> & { ref?: React.Ref<typeof Combobox.Input> }
) => JSX.Element;

export default AutoComplete;

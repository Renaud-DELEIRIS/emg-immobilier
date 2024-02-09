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

interface Autocomplete {
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
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
}

export const AutoComplete = forwardRef<
  React.ElementRef<typeof Combobox.Input>,
  Autocomplete
>(
  (
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
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = useState("");
    const { t } = useTranslation("common");

    const filteredPeople = useMemo(
      () =>
        query === ""
          ? options
          : options.filter((option) =>
              option.value
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
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
                  valid &&
                    "border-primary bg-[#0CBCB014] focus-within:border-primary focus-within:outline-primary"
                )}
                displayValue={(person: string) => {
                  return options.find((o) => o.value === person)?.label ?? "";
                }}
                onChange={(event) => setQuery(event.target.value)}
                id={id}
                placeholder={placeholder}
                autoFocus={autoFocus}
                ref={ref}
                {...props}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <IconChevronUp
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border-2 border-secondary bg-[#EAEBEC] py-1 text-base text-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    {t("no_result")}
                  </div>
                ) : (
                  filteredPeople.slice(0, 100).map((person) => {
                    return (
                      <Combobox.Option
                        key={person.value.toString()}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-neutral-100" : "text-gray-900"
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
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
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
  }
);

export default AutoComplete;

import { Fragment, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { IconCheck, IconChevronUp } from "@tabler/icons-react";
import type DefaultProps from "~/types/DefaultProps";
import { type KeyValues } from "~/types/type";

interface Autocomplete {
  options: { key: number; value: string }[];
  value: { key: number; value: string };
  onChange: (value: { key: number; value: string }) => void;
  label?: string;
  className?: string;
}

export default function AutoComplete({
  options,
  value,
  onChange,
  className = "",
  label,
}: Autocomplete) {
  const [query, setQuery] = useState("");

  const filteredPeople = useMemo(
    () =>
      query === ""
        ? options
        : options.filter((option) =>
            option.value
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          ),
    [query, options]
  );

  const id = Math.random().toString(12);
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-normal text-neutral-800"
        >
          {label}
        </label>
      )}
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden bg-white text-left ">
            <Combobox.Input
              className="bg-dark-900 border-dark-600 block w-full rounded-lg border p-2.5 text-neutral-800 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none"
              displayValue={(person: KeyValues) => person.value}
              onChange={(event) => setQuery(event.target.value)}
              id={id}
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
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.slice(0, 100).map((person) => (
                  <Combobox.Option
                    key={person.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-neutral-100" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.value}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <IconCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

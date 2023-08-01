import { Listbox, Transition } from "@headlessui/react";
import { cva } from "class-variance-authority";
import { Fragment, useId } from "react";

const Select = ({
  value,
  onChange,
  options,
  error = "",
  icon,
  placeholder = "",
  required = false,
  label = "",
  className = "",
  widthFull = false,
  name = "",
  description = "",
  disabled = false,
  wrapperClassName = "",
  boldLabel = false,
}: {
  value: string;
  onChange?: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  error?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  widthFull?: boolean;
  name?: string;
  description?: string;
  wrapperClassName?: string;
  boldLabel?: boolean;
}) => {
  const computedClass = cva(
    "text-base rounded-lg block w-full focus:outline-none text-left bg-white " +
      className,
    {
      variants: {
        error: {
          true: "bg-red-600/10 border border-red-500 text-red-500 placeholder-red-300 focus:border-red-500 ",
          false:
            "bg-dark-900 border border-dark-600 text-neutral-800 focus:border-primary-500 placeholder:text-neutral-400 ",
        },
        disabled: {
          true: "opacity-50 cursor-not-allowed",
        },
        icon: {
          true: "pl-10 p-2.5",
          false: "p-2.5",
        },
      },
    }
  );

  const id = useId();

  return (
    <div className={"" + (widthFull ? " w-full " : " ") + wrapperClassName}>
      {label && (
        <label
          htmlFor={id}
          className={`mb-1 block ${
            boldLabel
              ? "text-base font-bold text-dark"
              : "text-sm font-normal text-neutral-800"
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={"relative" + (widthFull ? " w-full" : "")}>
        {icon && (
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 ${
              error ? "text-red-500" : "text-gray-400"
            } ${disabled ? "opacity-50" : ""}`}
          >
            {icon}
          </div>
        )}
        <Listbox value={value} onChange={onChange} disabled={disabled}>
          <div
            className={`relative flex items-center ${
              widthFull ? "w-full" : ""
            }`}
          >
            <Listbox.Button
              className={computedClass({
                error: error !== "",
                icon: icon !== undefined,
                disabled,
              })}
              title={placeholder}
              placeholder={placeholder}
              value={value}
              name={name}
              id={id}
            >
              {options.find((option) => option.value === value)?.label ??
                placeholder}
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute top-full z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-2 pr-4 text-gray-900 ${
                        active ? "bg-neutral-100" : ""
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {
          // Description
          description && (
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          )
        }
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;

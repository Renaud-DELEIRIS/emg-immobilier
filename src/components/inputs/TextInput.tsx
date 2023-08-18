import { cva } from "class-variance-authority";
import { useId } from "react";

const TextInput = ({
  value,
  onChange,
  error = "",
  icon,
  placeholder = "",
  type = "text",
  readonly = false,
  required = false,
  label = "",
  className = "",
  widthFull = true,
  autocomplete = "",
  name = "",
  description = "",
  disabled = false,
  wrapperClassName = "",
  rightPart,
  autofocus = false,
  boldLabel = false,
}: {
  value: string;
  onChange?: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  widthFull?: boolean;
  autocomplete?: string;
  name?: string;
  description?: string;
  wrapperClassName?: string;
  rightPart?: React.ReactNode;
  autofocus?: boolean;
  boldLabel?: boolean;
}) => {
  const computedClass = cva(
    "text-base rounded-xl block w-full focus:outline-none " + className,
    {
      variants: {
        error: {
          true: "bg-red-600/10 border border-red-500 text-red-500 placeholder-red-300 focus:border-red-500 ",
          false:
            "bg-[#EAEBEC] border-2 border-[#EAEBEC] text-dark focus:border-primary-500 focus:shadow-lg placeholder:text-neutral-400 ",
        },
        disabled: {
          true: "opacity-50 cursor-not-allowed",
        },
        icon: {
          true: "pl-10 py-2.5 px-5",
          false: "py-2.5 px-5",
        },
        rightPart: {
          true: "border-r-0 rounded-r-none ",
        },
      },
    }
  );

  const id = useId();

  return (
    <div className={(widthFull ? " w-full " : " ") + wrapperClassName}>
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
            className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ${
              error ? "text-red-500" : "text-gray-400"
            } ${disabled ? "opacity-50" : ""}`}
          >
            {icon}
          </div>
        )}
        <div className={`flex items-center ${widthFull ? "w-full" : ""}`}>
          {/* Keyboard numeric if typez number */}
          <input
            type={type}
            autoFocus={autofocus}
            className={computedClass({
              error: error !== "",
              icon: icon !== undefined,
              disabled,
              rightPart: rightPart !== undefined,
            })}
            required={required}
            disabled={disabled}
            title={placeholder}
            placeholder={placeholder}
            value={value}
            autoComplete={autocomplete}
            name={name}
            id={id}
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
            readOnly={readonly}
            inputMode={
              type === "number" || type === "tel" ? "numeric" : undefined
            }
          />
          {rightPart && (
            <div
              className={`h-full rounded-r-lg border bg-neutral-200 px-2 py-2.5 text-neutral-600 ${
                disabled ? "cursor-not-allowed opacity-50" : ""
              } ${error ? "border-red-500" : "border-dark-600"}`}
            >
              {rightPart}
            </div>
          )}
        </div>
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

export default TextInput;

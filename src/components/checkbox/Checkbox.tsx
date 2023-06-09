import React, {
  type CSSProperties,
  type FC,
  type FormEvent,
  type HTMLProps,
  type ReactNode,
} from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  checked?: boolean;
  id?: string;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
}

const Checkbox: FC<Props> = ({
  onChange,
  checked,
  children,
  style,
  className = "",
  disabled = false,
  id = "",
}) => {
  return (
    <label
      style={style}
      className={`flex items-center gap-1 ${className} ${
        disabled ? "cursor-default opacity-60" : "cursor-pointer"
      }`}
    >
      <input
        id={id}
        checked={checked}
        type="checkbox"
        onChange={onChange}
        disabled={disabled}
        className="relative h-4 w-4 cursor-pointer appearance-none border border-neutral-500 after:absolute after:left-1/2 after:top-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:transform after:bg-primary-600 after:transition-transform after:duration-200 after:ease-in-out after:checked:scale-100 disabled:cursor-default"
      />
      <span className="text-sm font-semibold text-neutral-600">
        {children ?? null}
      </span>
    </label>
  );
};

export default Checkbox;

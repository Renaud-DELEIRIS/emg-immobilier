import React, { forwardRef } from "react";

import AuthCode, { AuthCodeRef } from "react-auth-code-input";
import { twMerge } from "tailwind-merge";

export interface ICodeInput {
  onChange: (v: string) => void;
  allowedCharacters?: "numeric" | "alphanumeric" | "alpha" | undefined;
  length?: number;
  ariaLabel?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  placeholder?: string;
}

const CodeInput2: React.ForwardRefExoticComponent<
  ICodeInput & React.RefAttributes<AuthCodeRef>
> = forwardRef(
  (
    {
      onChange,
      allowedCharacters = "numeric",
      length = 4,
      ariaLabel = "",
      className: containerClassName = "",
      disabled = false,
      placeholder = "",
    },
    ref
  ) => {
    return (
      <>
        <AuthCode
          onChange={onChange}
          allowedCharacters={allowedCharacters}
          length={length}
          ref={ref}
          ariaLabel={ariaLabel}
          containerClassName={twMerge(
            "flex gap-4 justify-center",
            containerClassName
          )}
          inputClassName="w-10 border border-grey/60 rounded-xl text-lg px-2.5 py-2 text-center text-neutral-800  focus:border-primary focus:outline-none focus:outline-0 focus:ring-0 focus:ring-primary/20 focus:ring-offset-0"
          disabled={disabled}
          placeholder={placeholder}
        />
      </>
    );
  }
);

export default CodeInput2;

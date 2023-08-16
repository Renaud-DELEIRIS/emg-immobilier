import React from "react";

import AuthCode from "react-auth-code-input";

export interface ICodeInput {
  onChange: (v: string) => void;
  allowedCharacters?: "numeric" | "alphanumeric" | "alpha" | undefined;
  length?: number;
  ariaLabel?: string;
  containerClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}

const CodeInput2: React.FC<ICodeInput> = ({
  onChange,
  allowedCharacters = "numeric",
  length = 4,
  ariaLabel = "",
  containerClassName = "",
  disabled = false,
  placeholder = "",
  label = "",
}) => {
  return (
    <>
      {label && <label className="input-text-label">{label}</label>}
      <AuthCode
        onChange={onChange}
        allowedCharacters={allowedCharacters}
        length={length}
        ariaLabel={ariaLabel}
        containerClassName={containerClassName + " flex gap-4 justify-center"}
        inputClassName="w-10  border border-grey/60 rounded-xl text-lg px-2.5 py-2 text-center text-neutral-800  focus:border-primary focus:outline-none focus:outline-0 focus:ring-0 focus:ring-primary/20 focus:ring-offset-0"
        disabled={disabled}
        placeholder={placeholder}
      />
    </>
  );
};

export default CodeInput2;

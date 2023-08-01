import { useEffect, useId, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  boldLabel?: boolean;
}

function InputDate({
  value,
  onChange,
  className = "",
  label,
  boldLabel = false,
}: Props) {
  const [day, month, year] = value.split(".").map(Number);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const onBackSpace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    format: "DD" | "MM" | "YYYY"
  ) => {
    if (e.key !== "Backspace") return;
    // Focus the previous input if the current one is empty
    if (e.currentTarget.value === "") {
      e.preventDefault();
      switch (format) {
        case "DD":
          break;
        case "MM":
          dayRef.current?.focus();
          break;
        case "YYYY":
          monthRef.current?.focus();
          break;
      }
    }
  };

  const onChangeHandler = (e: string, format: "DD" | "MM" | "YYYY") => {
    const value = Number(e);
    if (isNaN(value)) return;
    switch (format) {
      case "DD":
        if (value > 31) return;
        if (e.length > 2) return;
        if (e.length === 2) {
          monthRef.current?.focus();
        }
        break;
      case "MM":
        if (value > 12) return;
        if (e.length > 2) return;
        if (e.length === 2) {
          yearRef.current?.focus();
        }
        break;
      case "YYYY":
        if (e.length > 4) return;
        break;
    }
    const [day, month, year] = [dayRef, monthRef, yearRef].map(
      (ref) => ref.current?.value
    );
    onChange(`${day || ""}.${month || ""}.${year || ""}`);
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`mb-1 block ${
            boldLabel
              ? "text-base font-bold text-dark"
              : "text-sm font-normal text-neutral-800"
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={
          "bg-dark-900 border-dark-600 flex rounded-md border bg-white  p-2.5 text-neutral-800 focus:border-primary-500 " +
          className
        }
      >
        <input
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="dd"
          id={id}
          className="w-0 flex-1 text-center placeholder:text-neutral-400 focus:outline-none focus:outline-0"
          value={day || ""}
          onChange={(e) => {
            onChangeHandler(e.target.value, "DD");
          }}
          onKeyDown={(e) => onBackSpace(e, "DD")}
          ref={dayRef}
          autoComplete="birthday-day"
        />
        <span className="text-neutral-400">.</span>
        <input
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="mm"
          className="w-0 flex-1 text-center placeholder:text-neutral-400 focus:outline-none focus:outline-0"
          value={month || ""}
          onChange={(e) => {
            onChangeHandler(e.target.value, "MM");
          }}
          onKeyDown={(e) => onBackSpace(e, "MM")}
          ref={monthRef}
          autoComplete="birthday-month"
        />
        <span className="text-neutral-400">.</span>
        <input
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="yyyy"
          className="w-0 flex-1 text-center placeholder:text-neutral-400 focus:outline-none focus:outline-0"
          value={year || ""}
          onChange={(e) => {
            onChangeHandler(e.target.value, "YYYY");
          }}
          onKeyDown={(e) => onBackSpace(e, "YYYY")}
          ref={yearRef}
          autoComplete="birthday-year"
        />
      </div>
    </div>
  );
}

export default InputDate;

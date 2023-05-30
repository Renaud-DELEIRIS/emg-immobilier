import type DefaultProps from "~/types/DefaultProps";
import { formatAmount } from "~/utils/formatAmount";
import { useCallback, useEffect, useRef, useState } from "react";

interface Slider extends DefaultProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  step?: number;
  label?: string;
  disabled?: boolean;
}

const Slider = ({
  min = 0,
  max = 100,
  value = 0,
  onChange,
  label,
  step = 1,
  className = "",
  disabled = false,
}: Slider) => {
  const id = Math.random().toString(36).substr(2, 9);
  // const percent takeIntoAccount the min and max
  const percentWidth = ((value - min) / (max - min)) * 100;

  const width = percentWidth < 0 ? 0 : percentWidth > 100 ? 100 : percentWidth;
  const inputRef = useRef<HTMLInputElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const hasChanged = useRef(false);

  const onRailClick = (
    event: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
  ) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = getClientX(event) - left;
    const percent = (x / width) * 100;
    const newValue = Math.round((max / 100) * percent);
    onChange?.(newValue < min ? min : newValue > max ? max : newValue);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getClientX = (
    event:
      | MouseEvent
      | TouchEvent
      | React.MouseEvent<HTMLSpanElement>
      | React.TouchEvent<HTMLSpanElement>
  ) => {
    if ("clientX" in event) {
      return event.clientX;
    }
    if ("touches" in event) {
      return (event.touches[0] as Touch).clientX;
    }
    return 0;
  };

  const onInputDrag = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      // Change the value of the input
      const rail = railRef.current;
      if (!rail) return;

      if (hasChanged.current) return;

      hasChanged.current = true;

      setTimeout(() => {
        hasChanged.current = false;
      }, 20);

      inputRef.current?.focus();

      const { left, width } = rail.getBoundingClientRect();
      // clientx
      const x = getClientX(event) - left;
      const percent = (x / width) * 100;
      const newValue = Math.round((max / 100) * percent);
      onChange?.(newValue < min ? min : newValue > max ? max : newValue);
    },
    [onChange, max, min, railRef]
  );

  const onEndDrag = () => {
    window.removeEventListener("mouseup", onEndDrag);
    window.removeEventListener("mousemove", onInputDrag);
    window.removeEventListener("touchend", onEndDrag);
    window.removeEventListener("touchmove", onInputDrag);
    // Restore userSelection
    document.body.style.userSelect = "auto";
  };

  const onStartDrag = () => {
    window.addEventListener("mouseup", onEndDrag);
    window.addEventListener("mousemove", onInputDrag);
    window.addEventListener("touchend", onEndDrag);
    window.addEventListener("touchmove", onInputDrag, { passive: false });
    // Cancel all userSelection
    document.body.style.userSelect = "none";
  };

  return (
    <div
      className={`flex w-full flex-col gap-2 ${className} ${
        disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""
      }`}
    >
      <span
        className="relative inline-block h-1 w-full cursor-pointer rounded-xl py-3"
        onMouseDown={(e) => {
          onRailClick(e);
          onStartDrag();
        }}
        onDragStart={onStartDrag}
        onTouchStart={(e) => {
          e.preventDefault();
          onRailClick(e);
          onStartDrag();
        }}
        ref={railRef}
      >
        <span className="absolute top-1/2 block h-[0.1875rem] w-full -translate-y-1/2 rounded-xl bg-[#f5f5f5]"></span>
        <span
          className="absolute left-0 top-1/2 block h-[0.1875rem] -translate-y-1/2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-75"
          style={{ width: `${width}%` }}
        ></span>
        <span
          style={{ left: `${width}%` }}
          className="no-repeat center/contain focus-within:shadowHighlight focus-within::outline-none bg-red absolute top-1/2 -mt-[0.05rem] flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[url('/slider.svg')] bg-contain transition-all duration-75 before:absolute before:h-full before:w-full before:rounded-full before:shadow after:absolute after:left-1/2 after:top-1/2 after:h-10 after:w-10 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[50%]"
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={onStartDrag}
          onTouchStart={(e) => {
            e.preventDefault();
            onStartDrag();
          }}
        >
          {" "}
          <input
            type="range"
            ref={inputRef}
            min={min}
            id={id}
            max={max}
            value={value}
            onChange={(event) => {
              onChange?.(Number(event.target.value));
            }}
            step={step}
            className="peer absolute -m-px h-full w-full overflow-hidden whitespace-nowrap border-0 p-0"
            style={{
              direction: "ltr",
              clip: "rect(0px, 0px, 0px, 0px)",
            }}
          />
        </span>
      </span>
      <div className="flex justify-between text-gray-400">
        <span className="text-sm">
          {formatAmount(min, {
            currency: "CHF",
            digit: 0,
            local: "de-CH",
          })
            .replace(" ", "")
            .replace("CHF", "")}
        </span>
        <span className="text-sm">
          {" "}
          {formatAmount(max, {
            currency: "CHF",
            digit: 0,
            local: "de-CH",
          })
            .replace(" ", "")
            .replace("CHF", "")}
        </span>
      </div>
    </div>
  );
};

export default Slider;

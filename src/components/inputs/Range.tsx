import React, { type CSSProperties, type FC } from "react";
import { Range } from "react-range";

interface Props {
  onChange: (v: number[]) => void;
  values: number[];
  step?: number;
  min?: number;
  max?: number;
  id?: string;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
}

const RangeSlider: FC<Props> = ({
  onChange,
  values,
  step = 1,
  min = 1,
  max = 100,
  style,
  className = "",
  disabled = false,
  id = "",
}) => {
  return (
    <div
      id={id}
      className={className}
      style={{ opacity: disabled ? 0.3 : 1, ...style }}
    >
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        rtl={false}
        disabled={disabled}
        onChange={onChange}
        renderMark={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "5px",
            }}
            className="bg-green-500"
          />
        )}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                alignSelf: "center",
              }}
              className="bg-green-200"
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
              }}
              className={isDragged ? "bg-primary-500" : "bg-primary-400"}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RangeSlider;

import type DefaultProps from "~/types/DefaultProps";
import React from "react";

export interface ProgressBar extends DefaultProps {
  now: number;
}

const ProgressBar: React.FC<ProgressBar> = ({ now, className = "", style }) => {
  return (
    <div
      className={`h-[4px] w-full bg-neutral-100 md:rounded-lg ${className}`
        .replace(/\s+/g, " ")
        .trim()}
      style={style}
    >
      <div
        className="h-full bg-primary transition-[width] md:rounded-lg "
        style={{ width: `${now * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;

import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const IconMale: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    {...props}
    viewBox="0 0 28 28"
  >
    <path
      stroke="#082623"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.062 15.568a7.698 7.698 0 1 1-15.396 0 7.698 7.698 0 0 1 15.396 0Z"
      clipRule="evenodd"
    />
    <path
      stroke="#082623"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m23.333 4.736-5.457 5.458m5.444-.584.01-4.876-4.877.01"
    />
  </svg>
);

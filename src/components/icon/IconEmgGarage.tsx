import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const IconEmgGarage: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    {...props}
    viewBox="0 0 28 28"
  >
    <path
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.167 17.5h11.667M8.167 21h11.667M8.167 24.5h11.667M19.834 24.5V14H8.167v10.5M11.667 10.5h4.667"
    />
    <path
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M24.5 9.333 14 3.5 3.5 9.333V24.5h21V9.333Z"
      clipRule="evenodd"
    />
  </svg>
);

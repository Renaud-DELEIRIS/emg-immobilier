import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const EmgConstructionPlan: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    {...props}
    viewBox="0 0 24 24"
  >
    <path
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 10.5V6a2 2 0 0 0-2-2H9M6 21h5M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
    <path
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 18V5a3 3 0 0 1 6 0v13"
    />
    <path
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 19.5v-3a1.5 1.5 0 0 1 .563-1.171l2.5-2a1.5 1.5 0 0 1 1.874 0l2.5 2A1.5 1.5 0 0 1 22 16.5v3a1.5 1.5 0 0 1-1.5 1.5h-5a1.5 1.5 0 0 1-1.5-1.5Z"
      clipRule="evenodd"
    />
  </svg>
);

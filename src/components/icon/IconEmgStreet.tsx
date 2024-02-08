import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const IconEmgStreet: React.FC<Props> = (props) => (
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
      d="M25.666 24.5H2.333M14 15.167h11.667M14 19.833h1.167M18.667 19.833h1.167M23.333 19.833H24.5M16.333 8.167l-1.947-2.904a1.086 1.086 0 0 0-1.938 0L10.5 8.167M7 17.5v7"
    />
    <ellipse
      cx={7}
      cy={16.333}
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      rx={3.5}
      ry={4.667}
    />
    <path
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m24.5 8.167-3.154-4.161a1.107 1.107 0 0 0-1.86 0l-3.153 4.16"
    />
  </svg>
);

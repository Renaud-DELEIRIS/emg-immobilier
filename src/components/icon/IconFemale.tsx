import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const IconFemale: React.FC<Props> = (props) => (
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
      d="M7.206 12.801a8.064 8.064 0 1 1 16.128 0 8.064 8.064 0 0 1-16.128 0Z"
      clipRule="evenodd"
    />
    <path
      stroke="#082623"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m4.667 23.262 4.832-4.832m-4.713 1.288 3.423 3.424"
    />
  </svg>
);

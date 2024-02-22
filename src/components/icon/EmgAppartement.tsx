import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const EmgAppartement: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#082623"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.003 14a4.002 4.002 0 1 1 0 8.004 4.002 4.002 0 0 1 0-8.003Z"
    />
    <path
      stroke="#082623"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m19.363 17.302-1.7 1.7-1.023-1.018"
    />
    <path
      stroke="#082623"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.891 20.523a9.016 9.016 0 1 1 5.632-5.632M12 6.998v2"
    />
    <path
      stroke="#082623"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.499 12v-2a1 1 0 0 1 1-1.001h3.002a1 1 0 0 1 1 1V12M6.998 19.486V13a1 1 0 0 1 1-1h8.004a1 1 0 0 1 1 1v1.13M9.499 15.001H12M9.499 17.502h1.5"
    />
  </svg>
);

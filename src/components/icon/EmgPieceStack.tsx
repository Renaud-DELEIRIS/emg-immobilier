import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const EmgPieceStack: React.FC<Props> = (props) => (
  <svg
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.00098 9C3.00098 10.105 5.23898 11 8.00098 11"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99998 15C5.23898 15 3.00098 14.105 3.00098 13"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.999 5H13V8"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.001 16C11.001 17.105 13.239 18 16.001 18C18.763 18 21.001 17.105 21.001 16"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.001 12C11.001 13.105 13.239 14 16.001 14C18.763 14 21.001 13.105 21.001 12"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 10C13.24 10 11 10.895 11.002 12"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.001 12V20C11.001 21.105 13.239 22 16.001 22"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 10C18.76 10 21 10.895 20.998 12"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12V20C21 21.105 18.762 22 16 22"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 19C5.239 19 3 18.105 3 17"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 7C10.7614 7 13 6.10457 13 5C13 3.89543 10.7614 3 8 3C5.23858 3 3 3.89543 3 5C3 6.10457 5.23858 7 8 7Z"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 5V17"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

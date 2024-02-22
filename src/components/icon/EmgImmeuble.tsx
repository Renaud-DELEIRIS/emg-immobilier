import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const EmgImmeuble: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    {...props}
    viewBox="0 0 24 24"
  >
    <path
      stroke="#061C3D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 21V4a1 1 0 0 0-1-1H7.5a1 1 0 0 0-1 1v4.298M21 21v-8.1a.9.9 0 0 0-.9-.9H16"
    />
    <path
      stroke="#061C3D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m11 21-.054-12.504a1.5 1.5 0 0 0-2.17-1.336l-4.67 2.335A2 2 0 0 0 3 11.284V21M22 21H2M6 14h2M6 17h2"
    />
  </svg>
);

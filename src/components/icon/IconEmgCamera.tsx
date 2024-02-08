import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const IconEmgCamera: React.FC<Props> = (props) => (
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
      d="m6.197 12.268 10.029 3.65a1.166 1.166 0 0 0 1.494-.696l1.113-3.06c.18-.496.675-.807 1.2-.755l4.476.44a.694.694 0 0 0 .72-.454l.396-1.086a.695.695 0 0 0-.415-.89L9.342 3.64a2.33 2.33 0 0 0-2.987 1.393L4.809 9.282a2.327 2.327 0 0 0 1.388 2.986ZM3.5 16.333h2.333c.645 0 1.167.523 1.167 1.167v4.667c0 .644-.522 1.166-1.167 1.166H3.5v-7Z"
      clipRule="evenodd"
    />
    <path
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.667 14.259v4.408c0 .644-.523 1.166-1.167 1.166H7M11.666 7.85 9.333 7M23.398 11.737l-.998 2.74a1.934 1.934 0 0 1-2.479 1.156l-2.076-.756"
    />
  </svg>
);

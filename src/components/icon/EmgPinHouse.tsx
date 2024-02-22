import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const EmgPinHouse: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M14.0007 16.0147V20.5035C14.0007 20.7797 14.2148 21.0038 14.4799 21.0038H19.525C19.7891 21.0038 20.0032 20.7797 20.0032 20.5035V15.9877"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0005 16.6689L17.0842 14.0008L21.0038 16.6689"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4555 12.8674C11.8274 12.8674 12.9395 11.7552 12.9395 10.3833C12.9395 9.01143 11.8274 7.89929 10.4555 7.89929C9.08358 7.89929 7.97144 9.01143 7.97144 10.3833C7.97144 11.7552 9.08358 12.8674 10.4555 12.8674Z"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.8916 10.9236C18.0216 8.86168 17.3053 6.75681 15.7297 5.18115C12.8164 2.26794 8.09446 2.26794 5.18125 5.18115C2.26804 8.09436 2.26804 12.8163 5.18125 15.7296L10.4555 21.0037"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

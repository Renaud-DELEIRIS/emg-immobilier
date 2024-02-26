import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
export const EmgHouseStar: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M19.7172 9.61101V3.99667C19.7172 3.44444 19.269 2.99625 18.7168 2.99625H16.859C16.3068 2.99625 15.8586 3.44444 15.8586 3.99667V6.30363"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.99634 10.7135L10.6976 4.11272C11.4469 3.47045 12.5523 3.47045 13.3016 4.11272L21.0038 10.7135"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.28271 9.611V19.0029C4.28271 20.1084 5.17808 21.0037 6.28354 21.0037H10.9995"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3456 20.0263L20.1014 20.9487C20.4435 21.1288 20.8427 20.8377 20.7776 20.4575L20.4425 18.5027L21.8631 17.1191C22.1402 16.85 21.9871 16.3798 21.605 16.3248L19.6422 16.0397L18.7648 14.2599C18.5937 13.9138 18.0995 13.9138 17.9295 14.2599L17.0521 16.0397L15.0893 16.3248C14.7071 16.3808 14.5541 16.85 14.8312 17.1191L16.2518 18.5027L15.9156 20.4585C15.8506 20.8387 16.2498 21.1288 16.5919 20.9497L18.3476 20.0273"
      stroke="#061C3D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

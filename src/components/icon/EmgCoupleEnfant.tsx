import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const EmgCoupleEnfant: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    {...props}
    viewBox="0 0 38 38"
  >
    <path
      fill="#404040"
      d="M27.734 11.458a3.68 3.68 0 1 0-4.745 0 5.017 5.017 0 0 0-3.668 2.41 5.016 5.016 0 0 0-4.31-4.19 3.678 3.678 0 1 0-4.745 0 5.012 5.012 0 0 0-4.37 4.963v4.58a3.018 3.018 0 0 0 2.812 3.008v10.386a2.193 2.193 0 0 0 3.932 1.338 2.19 2.19 0 0 0 3.396.095 1.895 1.895 0 0 0 2.956.096 1.895 1.895 0 0 0 2.964-.108 2.192 2.192 0 0 0 3.406-.084 2.193 2.193 0 0 0 3.931-1.338v-5.32h2.356a.457.457 0 0 0 .423-.626l-1.865-4.65a.464.464 0 0 0 .056-.02 3.011 3.011 0 0 0 1.842-2.777v-2.8a5.011 5.011 0 0 0-4.371-4.963Zm-5.14-2.808a2.767 2.767 0 1 1 5.534 0 2.767 2.767 0 0 1-5.533 0Zm-3.22 12.66a4.543 4.543 0 0 1-.76 0 2.215 2.215 0 1 1 .765 0h-.006Zm-9.5-14.44a2.766 2.766 0 1 1 5.533.001 2.766 2.766 0 0 1-5.535-.002h.001Zm4.502 27.026a1.283 1.283 0 0 1-1.281-1.281v-8.751a.456.456 0 1 0-.912 0v8.751a1.282 1.282 0 0 1-2.564 0V14.577a.456.456 0 0 0-.912 0v6.737a2.106 2.106 0 0 1-1.9-2.093v-4.58a4.098 4.098 0 0 1 4.094-4.094h3.474a4.098 4.098 0 0 1 4.093 4.094v1.406a3.129 3.129 0 0 0-1.9 1.105v-2.575a.456.456 0 1 0-.912 0v5.29a4.515 4.515 0 0 1-.94-1.537 1.71 1.71 0 0 0-3.216 1.163 7.993 7.993 0 0 0 4.156 4.516v8.671a1.283 1.283 0 0 1-1.28 1.216Zm7.038-.983a.984.984 0 0 1-1.968 0v-4.75a.456.456 0 1 0-.912 0v4.75a.984.984 0 0 1-1.967 0v-9.201a.456.456 0 0 0-.281-.421 7.078 7.078 0 0 1-3.927-4.109.798.798 0 1 1 1.5-.542 5.446 5.446 0 0 0 1.865 2.508.459.459 0 0 0 .304.212c.737.478 1.579.77 2.454.853.336.056.68.056 1.017 0a5.438 5.438 0 0 0 1.84-.51.457.457 0 0 0 .338-.177c1.133-.64 2-1.665 2.444-2.888a.796.796 0 0 1 1.3-.335.799.799 0 0 1 .2.878 7.074 7.074 0 0 1-3.927 4.108.457.457 0 0 0-.28.421v9.203Zm2.21.983a1.282 1.282 0 0 1-1.28-1.28v-5.32h2.561v5.32a1.282 1.282 0 0 1-1.281 1.28Zm4.757-1.281a1.282 1.282 0 0 1-2.564 0v-5.32h2.564v5.32Zm2.812-13.395a2.101 2.101 0 0 1-1.324 1.957l-1.065-2.664v-3.22a.456.456 0 1 0-.912 0V18.6c0 .058.011.116.033.17l3.053 7.61h-8.652V24.01a7.994 7.994 0 0 0 4.153-4.516 1.712 1.712 0 0 0-2.333-2.13 1.71 1.71 0 0 0-.882.967 4.5 4.5 0 0 1-.871 1.462l.407-1.02a.448.448 0 0 0 .033-.17v-3.31a.456.456 0 1 0-.912 0v2.753a3.136 3.136 0 0 0-2.375-1.992 4.099 4.099 0 0 1 4.076-3.724h3.475a4.098 4.098 0 0 1 4.093 4.094l.003 2.797Z"
    />
  </svg>
);
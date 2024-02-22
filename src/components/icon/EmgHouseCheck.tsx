export const EmgHouseCheck: React.FC<
  React.HTMLAttributes<HTMLOrSVGElement> & { size?: number }
> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <path
        d="M33.3337 28.3333L29.167 32.5L26.667 30"
        stroke="#061C3D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.6504 17.2478V23.3333C14.6531 24.2527 15.3977 24.9973 16.3171 25H23.8171C24.7376 25 25.4837 24.2538 25.4837 23.3333V17.359"
        stroke="#061C3D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.6667 34.8967C21.1138 34.9652 20.5572 34.9997 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5C28.2843 5 35 11.7157 35 20C34.9997 20.5572 34.9652 21.1138 34.8967 21.6667"
        stroke="#061C3D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.6663 18.3333L21.0595 13.7137C20.444 13.2065 19.5553 13.2065 18.9398 13.7137L13.333 18.3333"
        stroke="#061C3D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

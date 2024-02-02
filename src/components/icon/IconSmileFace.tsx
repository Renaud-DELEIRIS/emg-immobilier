export const IconSmileFace: React.FC<
  React.HTMLAttributes<HTMLOrSVGElement> & { size?: number }
> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      fill="none"
      {...props}
      viewBox="0 0 42 42"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.25 21C5.25 12.3 12.3 5.25 21 5.25S36.75 12.3 36.75 21M36.75 21c0 8.7-7.05 15.75-15.75 15.75S5.25 29.7 5.25 21M14.875 15.75v1.75M27.125 15.75v1.75"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M27.125 25.704S24.827 28 21 28c-3.829 0-6.125-2.296-6.125-2.296"
      />
    </svg>
  );
};

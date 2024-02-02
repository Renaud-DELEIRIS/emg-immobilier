export const IconClockTimer: React.FC<
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
        d="M17.5 3.5h7M15.75 17.5 21 22.75M35 8.75l-4.095 4.095M33.25 7l3.5 3.5M5.25 26.25H14M14 31.5H8.75M14 36.75h-1.75M7.469 19.25C9.023 13.216 14.479 8.75 21 8.75c7.732 0 14 6.268 14 14s-6.268 14-14 14"
      />
    </svg>
  );
};

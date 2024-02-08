export const IconMagnify: React.FC<
  React.HTMLAttributes<HTMLOrSVGElement> & { size?: number }
> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      fill="none"
      {...props}
      viewBox={`0 0 ${props.size} ${props.size}`}
    >
      <path
        d="M26.6667 26.6675L21.8351 21.8359"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33337 15.0002C5.33337 20.339 9.66129 24.6668 15 24.6668C20.3388 24.6668 24.6667 20.339 24.6667 15.0002C24.6667 9.66142 20.3388 5.3335 15 5.3335C9.66145 5.33388 5.33376 9.66158 5.33337 15.0002Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

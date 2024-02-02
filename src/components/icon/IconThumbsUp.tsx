export const IconThumbsUp: React.FC<
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
        d="M21.914 6.228V4.375M13.575 13.64h-1.853M32.105 13.64h-1.853M16.355 8.08l-1.31-1.31M27.472 8.08l1.31-1.31M16.187 21.676v14.199M25.67 21.676h3.934a3.727 3.727 0 0 1 3.64 4.529l-1.485 6.744a3.727 3.727 0 0 1-3.64 2.926"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M28.12 35.875H10.968a1.864 1.864 0 0 1-1.864-1.864V23.54c0-1.03.835-1.864 1.864-1.864h5.236M25.67 21.676v-5.171c0-.942-.531-1.802-1.373-2.223l-.629-.314a3.106 3.106 0 0 0-4.142 1.342l-3.321 6.366"
      />
    </svg>
  );
};

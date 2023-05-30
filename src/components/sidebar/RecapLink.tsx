export const a = 1;
// import type DefaultProps from "~/types/DefaultProps";
// import Link from "next/link";

// interface Props extends DefaultProps {
//   passed?: boolean;
//   active?: boolean;
//   first?: boolean;
//   last?: boolean;
//   noParent?: boolean;
//   onClick: () => void;
// }

// const RecapLink = ({
//   children,
//   passed = false,
//   active = false,
//   onClick: href,
//   first = false,
//   noParent = false,
//   last = false,
// }: Props) => {
//   return (
//     <div
//       className={`relative ml-[.25rem] flex flex-row items-center border-l-2 p-2 ${
//         passed ? "border-transparent" : "border-dotted"
//       }`}
//     >
//       {(passed || active) && (
//         <>
//           <span
//             className={`absolute -left-[1px] grid h-2 w-2 -translate-x-1/2 -translate-y-1/2 place-items-center`}
//           >
//             {active && (
//               <span className="absolute inline-flex h-5 w-5 rounded-full bg-primary-300 opacity-20"></span>
//             )}
//             <span
//               className={`relative inline-flex h-2 w-2 rounded-full bg-primary-300`}
//             ></span>
//           </span>
//           {!first && !noParent && (
//             <span
//               className={`absolute -left-[1px] bottom-[50%] grid h-[60%] w-0.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md bg-primary-300`}
//             />
//           )}
//         </>
//       )}
//       <button
//         onClick={href}
//         className={`${
//           passed
//             ? active
//               ? "pl-[0.775rem] text-primary"
//               : "pl-[0.775rem] text-neutral-800"
//             : " pl-[0.525rem] text-neutral-300"
//         } text-sm transition-colors`}
//         disabled={!passed}
//       >
//         {children}
//       </button>
//     </div>
//   );
// };

// export default RecapLink;

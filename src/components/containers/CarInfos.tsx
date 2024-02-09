// import { IconEdit } from "@tabler/icons-react";
// import { MouseEventHandler } from "react";
// import { ICarOption } from "../steps/CarModel";

// const CarInfos = ({
//   carOption,
//   onClick,
// }: {
//   carOption: ICarOption;
//   onClick: MouseEventHandler<HTMLDivElement>;
// }) => {
//   return (
//     <div className=" flex w-full flex-col rounded-[12px] border-[1.5px] border-solid border-[#8888941a] bg-white px-6 py-[14px]">
//       <div className="flex h-[60px] w-full items-center justify-between self-stretch py-[14px]">
//         <div className="flex justify-center gap-[10px]">
//           <img
//             className="w-[68px]"
//             src={`/images/car-brands/${carOption.brand
//               .replaceAll(" ", "_")
//               .replaceAll("-", "_")}.png`}
//           ></img>
//           <div className="flex flex-col justify-center gap-[3px]">
//             <span className="text-[16px] font-semibold uppercase text-[#082623]">
//               {carOption.label}
//             </span>
//             <span className="text-[14px] font-medium text-[#888894]">
//               Depuis {carOption.from}
//             </span>
//           </div>
//         </div>
//         <div
//           className="rounded-lg p-2 hover:cursor-pointer hover:bg-[#8888941a]"
//           onClick={onClick}
//         >
//           <IconEdit size={24} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarInfos;

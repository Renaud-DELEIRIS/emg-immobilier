import { IconCheck } from "@tabler/icons-react";

interface Tile {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  widthFull?: boolean;
  autoFocus?: boolean;
}

const Tile = ({
  selected,
  onClick,
  children,
  icon,
  widthFull = false,
  autoFocus = false,
}: Tile) => {
  return (
    <button
      onClick={onClick}
      autoFocus={autoFocus}
      className={`${
        !selected
          ? "border-[#D7D7D7] text-neutral-600 hover:bg-neutral-50"
          : "border-primary-500 text-primary-500 hover:bg-primary-500/5"
      } ${widthFull ? "w-full" : ""} 
      flex flex-row items-center gap-6 rounded-lg border bg-white p-2 px-4 text-left text-base font-bold
      `}
    >
      {icon && <div className="h-6 w-6">{icon}</div>}
      <span className="w-full text-sm">{children}</span>
      <div className="h-6 w-6">{selected && <IconCheck size={24} />}</div>
    </button>
  );
};

export default Tile;

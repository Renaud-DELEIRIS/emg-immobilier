import { IconCheck } from "@tabler/icons-react";

interface Tile {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Tile = ({ selected, onClick, children, icon }: Tile) => {
  return (
    <button
      onClick={onClick}
      className={`${
        !selected
          ? "border-[#D7D7D7] bg-white text-neutral-600 hover:bg-neutral-50"
          : "border-blue-500 text-blue-500 hover:bg-blue-500/5"
      } flex
      h-14 flex-row items-center gap-6 rounded-lg border px-6 py-8 text-left text-base font-bold
      `}
    >
      <div className="h-6 w-6">{icon}</div>
      <span className="w-full text-sm uppercase">{children}</span>
      <div className="h-6 w-6">{selected && <IconCheck size={24} />}</div>
    </button>
  );
};

export default Tile;

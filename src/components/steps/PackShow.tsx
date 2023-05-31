import { IconCheck, IconX } from "@tabler/icons-react";
import { type Prestation } from "~/data/Pack";

const PackShow = ({
  pack,
  prestation,
  onClick,
  selected,
  recommended,
}: {
  pack: string;
  prestation: Prestation[];
  onClick: () => void;
  selected: boolean;
  recommended: boolean;
}) => {
  return (
    <button
      className={`relative flex w-full flex-col items-center rounded-lg border-2 p-2 shadow-xl ${
        selected ? "border-primary-400" : "border-neutral-100"
      }`}
      onClick={onClick}
    >
      {recommended && (
        <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-md bg-primary-400 text-white">
          <span className="px-1 text-[10px] font-bold leading-3">
            Recommandé
          </span>
        </div>
      )}
      <h3 className="mt-4 text-2xl font-bold">{pack}</h3>
      <ul className="mt-2 space-y-1.5">
        {prestation.map((presta, i) => (
          <li key={i} className="flex items-center gap-2 text-left">
            {presta.status ? (
              <IconCheck className="h-5 w-5 text-primary-400" />
            ) : (
              <IconX className="h-5 w-5 text-neutral-400" />
            )}
            <span
              className={`text-base ${
                presta.status ? "text-primary" : "text-neutral-400"
              }`}
            >
              {presta.label}
            </span>
          </li>
        ))}
      </ul>
      <span className="mt-8 rounded-lg bg-primary-400 p-2 text-white hover:bg-primary-500">
        Sélectionner ce pack
      </span>
    </button>
  );
};

export default PackShow;

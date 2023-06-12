import { IconCheck } from "@tabler/icons-react";
import { type Prestation } from "~/data/Pack";

interface Props {
  pack: string;
  prestation: Prestation[];
  onClick: () => void;
  selected: boolean;
  recommended: boolean;
}

const PackBig = ({
  pack,
  prestation,
  onClick,
  selected,
  recommended,
}: Props) => {
  return (
    <div
      className={`w-full rounded-3xl py-6 ${
        recommended
          ? "border border-primary-900 bg-primary-600 text-neutral-200"
          : "text-neutral-800"
      }`}
    >
      <div
        className={`flex flex-col items-center ${recommended ? "w-full" : ""}`}
      >
        <h3 className="fond-bold mb-4 text-2xl">{pack}</h3>
        <ul
          className={`mt-2 flex flex-col ${
            recommended
              ? "w-full divide-y divide-neutral-900 rounded-t-lg border-b border-t border-neutral-900"
              : "divide-y divide-neutral-400 border-b border-t border-neutral-400"
          } `}
        >
          {prestation.map((presta, i) => (
            <li
              key={i}
              className={`flex items-center  py-1 text-center ${
                recommended ? "rounded-t-lg" : " even:bg-neutral-100"
              }`}
            >
              <span
                className={`w-full text-center text-base ${
                  presta.status ? "" : "opacity-40"
                }`}
              >
                {presta.label}
              </span>
            </li>
          ))}
        </ul>
        <div className=" mt-4 w-full px-4">
          <button
            onClick={onClick}
            className={`mx-auto flex w-44 items-center justify-center gap-1 rounded-3xl border-2 px-4 py-2 transition-colors ${
              recommended
                ? " border-neutral-200 text-neutral-200 hover:bg-neutral-200 hover:text-primary-600"
                : "border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-neutral-200"
            }`}
          >
            Sélectionner
            {selected && <IconCheck className="ml-2 h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackBig;

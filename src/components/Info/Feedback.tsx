import type DefaultProps from "~/types/DefaultProps";

const Feedback = ({ children, className = "" }: DefaultProps) => {
  return (
    <div className={`mt-8 flex w-full gap-3 ${className}`}>
      <div className="grid h-10 w-10 place-items-center rounded-full bg-neutral-200">
        ?
      </div>
      <div className="relative flex-1 rounded-md bg-neutral-100">
        {/* Add an arrow pointing left on top left */}
        <div className="absolute -left-2 top-2 border-[10px] border-l-0 border-r-[10px] border-neutral-100 border-b-transparent border-t-transparent"></div>
        <p className="p-4 py-2 text-base leading-relaxed text-gray-700">
          {children}
        </p>
      </div>
    </div>
  );
};

export default Feedback;

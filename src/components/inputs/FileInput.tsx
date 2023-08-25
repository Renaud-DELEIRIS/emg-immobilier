import { IconCircleCheck, IconUpload } from "@tabler/icons-react";
import { useId, useState } from "react";

interface Props {
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  boldLabel?: boolean;
  placeholder?: string;
  existing?: boolean;
}

const FileInput = ({
  onChange,
  className = "",
  label,
  boldLabel = false,
  placeholder = "",
  existing = false,
}: Props) => {
  const id = useId();
  const [fileName, setFileName] = useState<string>("");
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`mb-1 block ${
            boldLabel
              ? "text-base font-bold text-dark"
              : "text-sm font-normal text-neutral-800"
          }`}
        >
          {label}
        </label>
      )}
      <label
        htmlFor={id}
        className={
          "bg-dark-900 border-dark-600 group flex h-[46px] cursor-pointer overflow-hidden rounded-md border bg-white text-neutral-800 hover:bg-neutral-100 focus:border-primary-500" +
          className
        }
      >
        <div
          className={`mr-4 grid aspect-square h-full place-items-center ${
            fileName || existing
              ? "bg-green-500 text-white group-hover:bg-green-600"
              : "bg-primary text-white group-hover:bg-primary-600"
          }`}
        >
          {fileName || existing ? (
            <IconCircleCheck size={20} />
          ) : (
            <IconUpload size={20} />
          )}
        </div>
        <span className="flex  h-full items-center text-sm">
          {fileName || placeholder}
        </span>
        <input
          type={"file"}
          accept="image/*"
          className={"hidden"}
          value={""}
          id={id}
          onChange={(e) => {
            setFileName(((e.target.files as FileList)[0] as File).name || "");
            // Log base 64
            const reader = new FileReader();
            reader.onload = function (e) {
              onChange(e.target?.result as string);
            };
            reader.readAsDataURL((e.target.files as FileList)[0] as File);
            e.target.files = null;
          }}
        />
      </label>
    </div>
  );
};

export default FileInput;

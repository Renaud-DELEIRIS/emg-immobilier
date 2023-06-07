import { useEffect, useRef, useState } from "react";
import TextInput from "./TextInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
  accept?: "all" | "number";
  length?: number;
  onFilled?: () => void;
}

const CodeInput = ({
  value,
  onChange,
  accept = "all",
  length = 4,
  onFilled = () => null,
}: Props) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));
  const wrapper = useRef<HTMLDivElement>(null);
  const [hasBeenFilled, setHasBeenFilled] = useState(false);

  const handleChange = (index: number, key: string) => {
    // If key key is backspace or delete then delete the current input and focus the previous one if it exists
    if (key === "Backspace" || key === "Delete") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      onChange(newCode.join(""));
      if (wrapper.current?.children[index - 1])
        (wrapper.current?.children[index - 1] as HTMLInputElement).focus();
      return;
    }

    // If key is not a number and accept is number then return
    if (accept === "number" && isNaN(parseInt(key))) return;

    // If key is not a letter or a number and accept is all then return
    if (accept === "all" && !/^[a-zA-Z0-9]$/.test(key)) return;

    // Add the key to the current input and focus the next one if it exists
    const newCode = [...code];
    newCode[index] = key;
    onChange(newCode.join(""));
    setCode(newCode);
    if (wrapper.current?.children[index + 1])
      (wrapper.current?.children[index + 1] as HTMLInputElement).focus();

    // If all inputs are filled then call onFilled
    if (!hasBeenFilled && newCode.every((c) => c !== "")) {
      setHasBeenFilled(true);
      onFilled();
    }
  };

  return (
    <div className="flex gap-2" ref={wrapper}>
      {code.map((c, i) => (
        <input
          key={i}
          type="text"
          value={c}
          onKeyDown={(e) => handleChange(i, e.key)}
          onChange={(e) => null}
          className="h-12 w-12 rounded-md border text-center text-2xl text-neutral-800 focus:outline-primary"
        />
      ))}
    </div>
  );
};

export default CodeInput;

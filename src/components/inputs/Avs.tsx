import InputMask from "react-input-mask";

const AvsInput = ({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor="avs"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <InputMask
        mask="756.9999.9999.99"
        value={value}
        type="text"
        name="avs"
        id="avs"
        placeholder={placeholder}
        autoComplete="avs"
        className={`bg-dark-900 border-dark-600 text-nase block w-full  rounded-lg border p-2.5 text-neutral-800 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none`}
        onChange={(e) => onChange(e.target.value)}
      ></InputMask>
    </div>
  );
};

export default AvsInput;

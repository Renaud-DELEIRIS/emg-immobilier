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
          className="mb-1 block text-sm font-medium  text-gray-700"
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
        className={`block w-full rounded-xl border-2 border-[#EAEBEC] bg-[#EAEBEC] px-5 py-2.5 text-base text-dark placeholder:text-neutral-400 focus:border-primary-500 focus:shadow-lg focus:outline-none`}
        onChange={(e) => onChange(e.target.value)}
      ></InputMask>
    </div>
  );
};

export default AvsInput;

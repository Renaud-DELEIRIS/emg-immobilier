import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
  type MutableRefObject,
} from "react";
dayjs.extend(customParseFormat);
interface IProps {
  onChange: (v: string) => void;
  value: string;
  format: "DD.MM.YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY" | "YYYY";
  label?: string;
  boldLabel?: boolean;
  className?: string;
  defaultYear?: string;
}
const InputDate: FC<IProps> = ({
  value,
  format,
  onChange,
  label,
  boldLabel,
  className = "",
  defaultYear = "",
}) => {
  const separator =
    format.replace("DD", "").replace("MM", "").replace("YYYY", "").charAt(0) ||
    "reytayfhabh";
  const id = useId();
  const arrFormat = format.split(separator);
  const asDate =
    value && dayjs(value, "YYYY-MM-DD", true).isValid()
      ? dayjs(value, "YYYY-MM-DD")
      : undefined;
  const [day, setDay] = useState(asDate?.date().toString() ?? "");
  const [month, setMonth] = useState(
    asDate ? (asDate.month() + 1).toString() : ""
  );
  const [year, setYear] = useState(asDate?.year().toString() ?? defaultYear);
  const objectRef: Record<string, MutableRefObject<HTMLInputElement | null>> = {
    DD: useRef<HTMLInputElement | null>(null),
    MM: useRef<HTMLInputElement | null>(null),
    YYYY: useRef<HTMLInputElement | null>(null),
  };
  const onChangeDay = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 2);
    setDay(value);
    if (value.length === 2) {
      const indexinput = arrFormat.indexOf("DD");
      if (indexinput < arrFormat.length - 1) {
        const formatNextInput = arrFormat[indexinput + 1];
        if (formatNextInput) {
          const r = objectRef[formatNextInput];
          r?.current?.focus();
        }
      }
    }
  };
  const onChangeMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 2);
    setMonth(value);
    if (value.length === 2) {
      const indexinput = arrFormat.indexOf("MM");
      if (indexinput < arrFormat.length - 1) {
        const formatNextInput = arrFormat[indexinput + 1];
        if (formatNextInput) {
          const r = objectRef[formatNextInput];
          r?.current?.focus();
        }
      }
    }
  };
  const onChangeYear = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 4);
    setYear(value);
    if (value.length === 2) {
      const indexinput = arrFormat.indexOf("YYYY");
      if (indexinput < arrFormat.length - 1) {
        const formatNextInput = arrFormat[indexinput + 1];
        if (formatNextInput) {
          const r = objectRef[formatNextInput];
          r?.current?.focus();
        }
      }
    }
  };
  const onBackSpace = (
    e: KeyboardEvent<HTMLInputElement>,
    format: "DD" | "MM" | "YYYY"
  ) => {
    if (e.key === "Backspace") {
      const indexInput = arrFormat.indexOf(format);
      if (indexInput > 0) {
        const formatPrevInput = arrFormat[indexInput - 1];
        if (formatPrevInput && format === "DD" && day.length === 0) {
          objectRef[formatPrevInput]?.current?.focus();
        } else if (formatPrevInput && format === "MM" && month.length === 0) {
          objectRef[formatPrevInput]?.current?.focus();
        } else if (formatPrevInput && format === "YYYY" && year.length === 0) {
          objectRef[formatPrevInput]?.current?.focus();
        }
      }
    }
  };
  useEffect(() => {
    onChange(`${year}-${month}-${day}`);
  }, [day, month, year]);
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
      <div
        className={
          " flex rounded-md  border-2 border-[#EAEBEC] bg-[#EAEBEC]  p-2.5 text-dark focus-within:border-primary-500 " +
          className
        }
      >
        {arrFormat.map((m, i) => (
          <Fragment key={m}>
            {i > 0 && <span className="pb-2">{separator}</span>}
            {m === "DD" ? (
              <input
                value={day}
                onKeyUp={(e) => onBackSpace(e, "DD")}
                onChange={onChangeDay}
                maxLength={2}
                size={2}
                id={id}
                className="w-0 flex-1 bg-[#EAEBEC] text-center placeholder:text-neutral-400 focus:outline-none focus:outline-0"
                pattern="[0-9]*"
                type="number"
                inputMode="numeric"
                placeholder="DD"
                min={1}
                max={31}
                ref={objectRef["DD"]}
              />
            ) : m === "MM" ? (
              <input
                value={month}
                onKeyUp={(e) => onBackSpace(e, "MM")}
                onChange={onChangeMonth}
                maxLength={2}
                size={2}
                className="w-0 flex-1 bg-[#EAEBEC] text-center placeholder:text-neutral-400 focus:outline-none focus:outline-0"
                pattern="[0-9]*"
                type="number"
                inputMode="numeric"
                placeholder="MM"
                min={1}
                max={12}
                ref={objectRef["MM"]}
              />
            ) : (
              <input
                value={year}
                onKeyUp={(e) => onBackSpace(e, "YYYY")}
                onChange={onChangeYear}
                maxLength={4}
                size={4}
                className="w-0 flex-1 bg-[#EAEBEC] text-center placeholder:text-neutral-400 focus:outline-none focus:outline-0"
                pattern="[0-9]*"
                type="number"
                inputMode="numeric"
                placeholder="YYYY"
                ref={objectRef["YYYY"]}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
export default InputDate;

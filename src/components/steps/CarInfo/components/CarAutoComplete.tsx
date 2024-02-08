import { Combobox, Transition } from "@headlessui/react";
import { IconChevronUp } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import {
  Fragment,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useState,
} from "react";
import { api } from "~/utils/api";
import { IconMagnify } from "../../../icon/IconMagnify";
import { ICarOption } from "../CarModel";
import CustomAutoCompleteInput from "./CarAutoCompleteInput";

interface ICustomAutocomplete {
  car_brand: string;
  value?: string;
  onChange?: (carOption: ICarOption) => void;
  name?: string;
  onBlur?: () => void;
  label?: string;
  className?: string;
  error?: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  valid?: boolean;
  "aria-label"?: string;
  before?: ReactNode;
}

export const CustomAutoComplete = forwardRef<
  React.ElementRef<typeof Combobox.Input>,
  ICustomAutocomplete
>(
  (
    {
      car_brand,
      value,
      onChange,
      className = "",
      label,
      placeholder,
      autoFocus = false,
      error,
      valid = false,
      before,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = useState(value ?? "");
    const [carModels, setCarModels] = useState<ICarOption[]>([]);
    const { t } = useTranslation("common");
    const { data, isLoading } = api.getModele.useQuery(
      {
        marque: car_brand!,
        search: query,
      },
      {
        enabled: !!car_brand,
        // keep previous data
        keepPreviousData: true,
      }
    );

    useEffect(() => {
      console.log(data);
      if (data) {
        setCarModels(
          data.map((carInfo) => ({
            value: carInfo.typeId.toString(),
            brand: car_brand,
            from:
              carInfo.firstRegistrationYears[
                carInfo.firstRegistrationYears.length - 1
              ] ?? 0,
            to: carInfo.firstRegistrationYears[0] ?? 0,
            label: carInfo.description,
          }))
        );
      }
    }, [data]);

    const id = useId();

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            className="mb-[6px] block text-sm font-medium opacity-80"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <Combobox
          value={value}
          onChange={(value) =>
            onChange != null &&
            onChange(carModels.find((carModel) => carModel.label == value)!)
          }
        >
          <div className="relative rounded-xl bg-[#8888941a]">
            <div className="relative w-full cursor-default overflow-hidden text-left">
              <CustomAutoCompleteInput
                className="w-full bg-transparent"
                displayValue={(carModel: ICarOption) =>
                  `${carModel.brand} ${carModel.label}`
                }
                value={query}
                onChangeQuery={(newQuery) => setQuery(newQuery)}
                id={id}
                placeholder={placeholder}
                autoFocus={autoFocus}
                ref={ref}
                before={
                  <div className="flex flex-auto items-center">
                    <IconMagnify
                      size={32}
                      className="opacity-1 pr-[8px] text-[#082623]"
                    />
                    {before != null && before}
                  </div>
                }
              />
              <Combobox.Input className={"hidden"} />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <IconChevronUp
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border-2 border-secondary bg-white py-1 text-base text-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {(data?.length ?? 0) === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    {t("no_result")}
                  </div>
                ) : (
                  carModels.slice(0, 100).map((carModel) => (
                    <Combobox.Option
                      key={carModel.label}
                      className={({ active }) =>
                        `relative cursor-default select-none px-4 py-2 ${
                          active ? "bg-neutral-100" : "text-gray-900"
                        }`
                      }
                      value={carModel.label}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                className="mr-[10px] w-[42px]"
                                src={`/images/car-brands/${carModel.brand.replaceAll(
                                  " ",
                                  "_"
                                )}.png`}
                              />
                              <span>{carModel.label}</span>
                            </div>

                            <span className="text-[#888894]">
                              De {carModel.from} à {carModel.to}
                            </span>
                          </div>
                          {/* <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {carModel.label}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <IconCheck
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null} */}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        {error && (
          <span className="mt-1 block text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

export default CustomAutoComplete;

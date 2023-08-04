import {
  AddressAutofillSuggestion,
  MapboxAutofill,
  SessionToken,
} from "@mapbox/search-js-core";
import { IconLoader, IconMapPin } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { LeadData, useLead } from "../provider/LeadProvider";
import TextInput from "./TextInput";

interface Props {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  widthFull?: boolean;
  autocomplete?: string;
  name?: string;
  description?: string;
  autofocus?: boolean;
  boldLabel?: boolean;
}

const CompleteAddress = ({
  value,
  onChange,
  placeholder = "",
  readonly = false,
  required = false,
  disabled = false,
  label = "",
  className = "",
  widthFull = true,
  autocomplete = "",
  name = "",
  description = "",
  autofocus = false,
  boldLabel = false,
}: Props) => {
  const { lead, changeLead } = useLead();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [autofill, setAutofill] = useState<MapboxAutofill>();
  const sessionToken = useRef<SessionToken>(new SessionToken());
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<AddressAutofillSuggestion[]>(
    []
  );

  useEffect(() => {
    if (!autofill) {
      setAutofill(
        new MapboxAutofill({
          accessToken: process.env.NEXT_PUBLIC_MAPBOX,
          language: "fr",
          limit: 10,
        })
      );
    }
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const getSuggestion = async () => {
    if (!autofill) return;
    setLoading(true);
    const r = await autofill.suggest(lead.address || "", {
      sessionToken: sessionToken.current,
    });
    setLoading(false);
    setSuggestions(r.suggestions);
  };

  useEffect(() => {
    if (!lead.address) return;
    getSuggestion();
  }, [lead.address]);

  const streetRef = useRef<HTMLDivElement>(null);

  useClickAway(streetRef, () => {
    setIsFocused(false);
  });

  return (
    <form onSubmit={onSubmit} className="">
      <div
        className="relative col-span-6"
        onFocusCapture={() => setIsFocused(true)}
        ref={streetRef}
      >
        <TextInput
          boldLabel={boldLabel}
          label={label}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          value={lead.address || ""}
          onChange={(e) => {
            changeLead({
              address: e,
            });
          }}
          className={className}
          widthFull={widthFull}
          autocomplete={autocomplete}
          name={name}
          description={description}
          autofocus={autofocus}
          readonly={readonly}
          icon={<IconMapPin className="h-5 w-5 text-gray-500" />}
        />
        {isFocused &&
          lead.address &&
          lead.address.length > 4 &&
          (suggestions.length > 0 || loading) && (
            <div className="absolute z-10  mt-2 max-h-64 w-full overflow-auto rounded-md bg-white shadow-lg">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.full_address}
                  className="flex w-full flex-row items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    changeLead({
                      address: suggestion.full_address,
                    });
                    setTimeout(() => {
                      setIsFocused(false);
                    }, 100);
                  }}
                >
                  <IconMapPin className="h-6 w-6 text-gray-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {suggestion.address_line1}
                    </span>
                    <span className="text-xs text-gray-500">
                      {suggestion.full_address}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
      </div>
    </form>
  );
};

export default CompleteAddress;

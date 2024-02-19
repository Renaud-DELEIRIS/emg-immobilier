import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import localtion from "~/data/ch-locations.json";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import { IconMagnify } from "../icon/IconMagnify";
import AutoComplete from "../inputs/Autocomplete";
import StepContainer from "./StepContainer";

const Map = dynamic(() => import("../map/Map"), {
  ssr: false,
});

const CantonBien = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const showValidate = currentVisibleStep.id === "canton_bien";

  return (
    <StepContainer stepId="canton_bien">
      <div className="flex flex-col gap-4">
        <AutoComplete
          value={lead.canton_bien}
          icon={<IconMagnify />}
          onChange={(value) => {
            changeLead({
              canton_bien: value,
            });
          }}
          placeholder={t("canton_bien.placeholder")}
          name="locality"
          aria-label="Localité"
          options={localtion.map((loc) => ({
            value: loc.value,
            label: `${loc.value}`,
          }))}
          valid={lead.canton_bien !== undefined}
        ></AutoComplete>

        <div className="hidden h-[500px] overflow-hidden rounded-xl md:block">
          <Map neightborhood={lead.canton_bien}></Map>
        </div>

        {showValidate && (
          <Button
            onClick={() => {
              nextStep("canton_bien", {
                canton_bien: lead.canton_bien,
              });
            }}
            className="ml-auto w-fit"
            disabled={lead.canton_bien === undefined}
          >
            {t("canton_bien.validate")}
          </Button>
        )}
      </div>
    </StepContainer>
  );
};

export default CantonBien;

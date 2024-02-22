import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import { IconMagnify } from "../icon/IconMagnify";
import { SelectInput } from "../inputs/Select";
import StepContainer from "./StepContainer";

const Map = dynamic(() => import("../map/Map"), {
  ssr: false,
});

const ResearchZone = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const showValidate = currentVisibleStep.id === "research_zone";

  return (
    <StepContainer stepId="research_zone">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr,1fr]">
          <AutoComplete
            value={lead.research.npa}
            icon={<IconMagnify />}
            onChange={(value) => {
              changeLead({
                research: {
                  ...lead.research,
                  npa: value,
                },
              });
            }}
            placeholder={t("research_zone.placeholder")}
            name="locality"
            aria-label="Localité"
            options={localtion.map((loc) => ({
              value: loc.value,
              label: `${loc.value}`,
            }))}
            valid={lead.research.npa !== undefined}
          ></AutoComplete>

          <SelectInput
            value={lead.research.radius.toString()}
            onChange={(value) => {
              changeLead({
                research: {
                  ...lead.research,
                  radius: isNaN(parseInt(value)) ? 0 : parseInt(value),
                },
              });
            }}
            className="h-[58px]"
            placeholder={t("research_zone.distance")}
            options={[
              { value: "0", label: "0 Km" },
              { value: "1", label: "1 Km" },
              { value: "5", label: "5 Kms" },
              { value: "10", label: "10 Kms" },
              { value: "20", label: "20 Kms" },
              { value: "30", label: "30 Kms" },
              { value: "50", label: "50 Kms" },
              { value: "100", label: "100 Kms" },
              { value: "200", label: "200 Kms" },
            ]}
          ></SelectInput>
        </div>
        <div className="hidden h-[300px] overflow-hidden rounded-xl md:block">
          <Map
            neightborhood={lead.research.npa}
            radius={lead.research.radius ?? 50}
          ></Map>
        </div>
        {showValidate && (
          <Button
            onClick={() => {
              nextStep("research_zone", {
                research: lead.research,
              });
            }}
            className="ml-auto w-fit"
          >
            {t("next")}
          </Button>
        )}
      </div>
    </StepContainer>
  );
};

export default ResearchZone;

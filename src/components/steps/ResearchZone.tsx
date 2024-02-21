import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import { IconMagnify } from "../icon/IconMagnify";
import { Slider } from "../inputs/Slider";
import Input from "../inputs/input";
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

        <div className="hidden h-[500px] overflow-hidden rounded-xl md:block">
          <Map
            neightborhood={lead.research.npa}
            radius={lead.research.radius ?? 50}
          ></Map>
        </div>

        <Input
          value={lead.research.radius.toString()}
          onChange={(value) => {
            changeLead({
              research: {
                ...lead.research,
                radius: isNaN(parseInt(value)) ? 0 : parseInt(value),
              },
            });
          }}
          label={t("research_zone.distance")}
          insideText="KM"
        ></Input>

        <Slider
          value={[lead.research.radius]}
          onValueChange={(value) => {
            changeLead({
              research: {
                ...lead.research,
                radius: value[0]!,
              },
            });
          }}
          min={10}
          max={100}
          step={5}
        ></Slider>
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

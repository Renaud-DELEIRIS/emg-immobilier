import { useTranslation } from "next-i18next";
import AutoComplete from "~/components/inputs/Autocomplete";
import localtion from "~/data/ch-locations.json";
import { useFormStore } from "~/stores/form";
import StepContainer from "./StepContainer";

const CarParkPlace = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  return (
    <StepContainer
      title={t("car_park_place.title")}
      description={t("car_park_place.description")}
      stepId="car_park_place"
    >
      <AutoComplete
        value={lead.car_park_place}
        onChange={(value) => {
          changeLead({ car_park_place: value.toString() });
          nextStep("car_park_place");
        }}
        placeholder={t("car_park_place.placeholder")}
        name="locality"
        aria-label="Localité"
        options={localtion.map((loc) => ({
          value: loc.key.toString(),
          label: `${loc.value}`,
        }))}
        valid={lead.car_park_place !== undefined}
      ></AutoComplete>
    </StepContainer>
  );
};

export default CarParkPlace;

import { useTranslation } from "next-i18next";
import TileInput from "~/components/inputs/Tile";
import { useFormStore } from "~/stores/form";
import { IconEmgCamera } from "../icon/IconEmgCamera";
import { IconEmgGarage } from "../icon/IconEmgGarage";
import { IconEmgStreet } from "../icon/IconEmgStreet";
import StepContainer from "./StepContainer";

const CarParkType = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer
      title={t("car_park_type.title")}
      stepId="car_park_type"
      description={t("car_park_type.description")}
    >
      <TileInput
        value={lead.car_park_type}
        onChange={(value) => {
          changeLead({ car_park_type: value });
          nextStep("car_park_type");
        }}
        options={[
          {
            value: "close parking",
            label: t("car_park_type.close_parking"),
            icon: <IconEmgGarage size={28} />,
          },
          {
            value: "secure parking",
            label: t("car_park_type.secure_parking"),
            icon: <IconEmgCamera size={28} />,
          },
          {
            value: "street",
            label: t("car_park_type.street"),
            icon: <IconEmgStreet size={28} />,
          },
          {
            value: "other",
            label: t("car_park_type.other"),
          },
        ]}
      ></TileInput>
    </StepContainer>
  );
};

export default CarParkType;

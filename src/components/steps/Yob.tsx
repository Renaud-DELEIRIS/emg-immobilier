import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import Input from "../inputs/input";
import StepContainer from "./StepContainer";

const Yob = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  const year = dayjs(lead.yob, "YYYY").year();

  return (
    <StepContainer stepId="yob">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            lead.yob?.length === 4 &&
            year < dayjs().year() &&
            dayjs().year() - year <= 100
          )
            nextStep("yob");
        }}
      >
        <Input
          value={lead.yob}
          onChange={(value) => {
            changeLead({ yob: value.toString() });
            if (
              value?.length === 4 &&
              dayjs(value, "YYYY").year() < dayjs().year() &&
              dayjs().year() - dayjs(value, "YYYY").year() <= 100
            )
              nextStep("yob");
          }}
          placeholder={t("yob.placeholder")}
          name="locality"
          aria-label="Localité"
          valid={
            lead.yob?.length === 4 &&
            year < dayjs().year() &&
            dayjs().year() - year <= 100
          }
          error={
            lead.yob?.length !== 4
              ? undefined
              : dayjs().year() - year > 100
              ? t("yob.too_old")
              : year >= dayjs().year()
              ? t("yob.future")
              : undefined
          }
        ></Input>
        <button className="hidden" type="submit"></button>
      </form>
    </StepContainer>
  );
};

export default Yob;

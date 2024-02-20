import { useTranslation } from "next-i18next";
import { twMerge } from "tailwind-merge";
import { useFormStore } from "~/stores/form";
import { formatAmount, parseMoney } from "~/utils/money";
import { Button } from "../button/Button";
import { Slider } from "../inputs/Slider";
import Input from "../inputs/input";
import StepContainer from "./StepContainer";

const FondsPropre = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);

  return (
    <StepContainer stepId="fonds_propres">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          nextStep("fonds_propres");
        }}
      >
        <Input
          value={`${formatAmount(lead.fonds_propres.fonds_propres ?? 0)}`}
          label={t("fonds_propres.label")}
          onChange={(value) => {
            changeLead({
              fonds_propres: {
                ...lead.fonds_propres,
                fonds_propres: parseMoney(value),
              },
            });
          }}
          required
          placeholder={t("fonds_propres.placeholder")}
          insideText="CHF"
        ></Input>
        <Slider
          value={[lead.fonds_propres.fonds_propres ?? 0]}
          onValueChange={(value) => {
            changeLead({
              fonds_propres: {
                ...lead.fonds_propres,
                fonds_propres: value[0],
              },
            });
          }}
          min={25_000}
          max={500_000}
          step={5_000}
        ></Slider>

        <Input
          value={formatAmount(lead.fonds_propres.lpp)}
          onChange={(value) => {
            changeLead({
              fonds_propres: {
                ...lead.fonds_propres,
                lpp: parseMoney(value),
              },
            });
          }}
          label={t("fonds_propres.lpp")}
          placeholder={t("fonds_propres.placeholder")}
          insideText="CHF"
        ></Input>

        <Input
          value={formatAmount(lead.fonds_propres.pilier3)}
          onChange={(value) => {
            changeLead({
              fonds_propres: {
                ...lead.fonds_propres,
                pilier3: parseMoney(value),
              },
            });
          }}
          label={t("fonds_propres.pillier3")}
          placeholder={t("fonds_propres.placeholder")}
          insideText="CHF"
        ></Input>

        <Input
          value={formatAmount(lead.fonds_propres.donation)}
          onChange={(value) => {
            changeLead({
              fonds_propres: {
                ...lead.fonds_propres,
                donation: parseMoney(value),
              },
            });
          }}
          placeholder={t("fonds_propres.placeholder")}
          label={t("fonds_propres.donation")}
          insideText="CHF"
        ></Input>

        <Input
          value={formatAmount(lead.fonds_propres.autre)}
          onChange={(value) => {
            changeLead({
              fonds_propres: {
                ...lead.fonds_propres,
                autre: parseMoney(value),
              },
            });
          }}
          label={t("fonds_propres.autre")}
          placeholder={t("fonds_propres.placeholder")}
          insideText="CHF"
        ></Input>

        <Button type="submit" className={twMerge("ml-auto w-fit")}>
          {t("next")}
        </Button>
      </form>
    </StepContainer>
  );
};

export default FondsPropre;

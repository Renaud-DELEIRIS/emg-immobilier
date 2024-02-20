import { IconPlus, IconX } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { twMerge } from "tailwind-merge";
import { useFormStore } from "~/stores/form";
import { formatAmount, parseMoney } from "~/utils/money";
import { Button } from "../button/Button";
import { SelectInput } from "../inputs/Select";
import { Slider } from "../inputs/Slider";
import Input from "../inputs/input";
import StepContainer, { StepTitle } from "./StepContainer";

const Revenue = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const showValidate = currentVisibleStep.id === "revenue";

  return (
    <StepContainer stepId="revenue">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          nextStep("revenue");
        }}
      >
        <Input
          value={`${formatAmount(lead.revenue ?? 0)}`}
          placeholder={t("revenue.placeholder")}
          onChange={(value) => {
            changeLead({
              revenue: parseMoney(value),
            });
          }}
          insideText="CHF"
        ></Input>
        <Slider
          value={[lead.revenue ?? 0]}
          onValueChange={(value) => {
            changeLead({
              revenue: value[0]!,
            });
          }}
          min={25_000}
          max={500_000}
          step={5_000}
        ></Slider>

        <div className="mt-4 flex flex-col gap-4">
          <StepTitle>{t("revenue.other.description")}</StepTitle>
          {lead.revenue_other.map((other_revenue, index) => (
            <div
              className="flex w-full flex-col items-end gap-2 md:flex-row"
              key={index}
            >
              <SelectInput
                value={other_revenue.type}
                onChange={(value) => {
                  changeLead({
                    revenue_other: lead.revenue_other.map((c, i) => {
                      if (i === index) {
                        return {
                          ...c,
                          type: value,
                        };
                      }
                      return c;
                    }),
                  });
                }}
                label={t("revenue.other.labelType")}
                placeholder={t("revenue.other.placeholderType")}
                options={[
                  {
                    value: "frais_de_representation",
                    label: t(
                      "revenue.other.optionType.frais_de_representation"
                    ),
                  },
                  {
                    value: "indemnites_employeur",
                    label: t("revenue.other.optionType.indemnites_employeur"),
                    detail: t(
                      "revenue.other.optionType.indemnites_employeurDetail"
                    ),
                  },
                  {
                    value: "rentes_et_pensions",
                    label: t("revenue.other.optionType.rentes_et_pensions"),
                    detail: t(
                      "revenue.other.optionType.rentes_et_pensionsDetail"
                    ),
                  },
                  {
                    value: "autre",
                    label: t("revenue.other.optionType.autre"),
                  },
                ]}
                className="w-full shrink-0 md:w-[220px]"
              />
              <Input
                value={
                  other_revenue.montant !== undefined
                    ? formatAmount(other_revenue.montant)
                    : ""
                }
                placeholder={t("revenue.other.placeholderMontant")}
                onChange={(value) => {
                  changeLead({
                    revenue_other: lead.revenue_other.map((c, i) => {
                      if (i === index) {
                        return {
                          ...c,
                          montant: parseMoney(value) ?? 0,
                        };
                      }
                      return c;
                    }),
                  });
                }}
                insideText="CHF"
                label={t("revenue.other.labelMontant")}
                wrapperClassName="w-full md:w-2/3"
              />

              <div className="mb-2 ml-auto">
                <button
                  className="flex w-fit items-center gap-2 rounded-full p-1 text-red-500 hover:bg-red-100"
                  onClick={() => {
                    changeLead({
                      revenue_other: lead.revenue_other.filter(
                        (c, i) => i !== index
                      ),
                    });
                  }}
                >
                  <span className="font-semibold md:hidden">
                    {t("revenue.other.delete")}
                  </span>
                  <IconX size={24} className="hidden md:block" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-2 flex w-full flex-col justify-between gap-4 md:flex-row">
            <button
              className="flex h-[46px] w-fit items-center gap-1.5 rounded-md bg-[rgba(200,189,192,0.1)] px-5 transition-colors duration-200 ease-in-out hover:bg-primary/5"
              type="button"
              onClick={() => {
                changeLead({
                  revenue_other: [...lead.revenue_other, {}],
                });
              }}
            >
              <IconPlus className="rounded-full border border-dark" size={20} />
              <span className="font-semibold">{t("revenue.other.add")}</span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <StepTitle>{t("revenue.charge.description")}</StepTitle>
          {lead.charge.map((charge, index) => (
            <div
              className="flex w-full flex-col items-end gap-2 md:flex-row"
              key={index}
            >
              <SelectInput
                value={charge.type}
                onChange={(value) => {
                  changeLead({
                    charge: lead.charge.map((c, i) => {
                      if (i === index) {
                        return {
                          ...c,
                          type: value,
                        };
                      }
                      return c;
                    }),
                  });
                }}
                label={t("revenue.charge.labelType")}
                placeholder={t("revenue.charge.placeholderType")}
                options={[
                  {
                    value: "credit_personnel",
                    label: t("revenue.charge.optionType.credit_personnel"),
                  },
                  {
                    value: "leasing",
                    label: t("revenue.charge.optionType.leasing"),
                  },
                  {
                    value: "loyer_actuel",
                    label: t("revenue.charge.optionType.loyer_actuel"),
                  },
                  {
                    value: "remboursement",
                    label: t("revenue.charge.optionType.remboursement"),
                  },
                  {
                    value: "rentes_pensions",
                    label: t("revenue.charge.optionType.rentes_pensions"),
                  },
                  {
                    value: "autre",
                    label: t("revenue.charge.optionType.autre"),
                  },
                ]}
                className="w-full shrink-0 md:w-[220px]"
              />
              <Input
                value={
                  charge.montant !== undefined
                    ? formatAmount(charge.montant)
                    : ""
                }
                placeholder={t("revenue.charge.placeholderMontant")}
                onChange={(value) => {
                  changeLead({
                    charge: lead.charge.map((c, i) => {
                      if (i === index) {
                        return {
                          ...c,
                          montant: parseMoney(value) ?? 0,
                        };
                      }
                      return c;
                    }),
                  });
                }}
                insideText="CHF"
                label={t("revenue.charge.labelMontant")}
                wrapperClassName="w-full md:w-2/3"
              />

              <div className="mb-2 ml-auto">
                <button
                  className="flex w-fit items-center gap-2 rounded-full p-1 text-red-500 hover:bg-red-100"
                  onClick={() => {
                    changeLead({
                      charge: lead.charge.filter((c, i) => i !== index),
                    });
                  }}
                >
                  <span className="font-semibold md:hidden">
                    {t("revenue.charge.delete")}
                  </span>
                  <IconX size={24} className="hidden md:block" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-2 flex w-full flex-col justify-between gap-4 md:flex-row">
            <button
              className="flex h-[46px] w-fit items-center gap-1.5 rounded-md bg-[rgba(200,189,192,0.1)] px-5 transition-colors duration-200 ease-in-out hover:bg-primary/5"
              type="button"
              onClick={() => {
                changeLead({
                  charge: [...lead.charge, {}],
                });
              }}
            >
              <IconPlus className="rounded-full border border-dark" size={20} />
              <span className="font-semibold">{t("revenue.charge.add")}</span>
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className={twMerge("ml-auto w-fit", !showValidate && "hidden")}
        >
          {t("next")}
        </Button>
      </form>
    </StepContainer>
  );
};

export default Revenue;

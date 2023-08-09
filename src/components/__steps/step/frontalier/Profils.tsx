import { IconCheck } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { FaChild } from "react-icons/fa";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import Button from "~/components/button/Button";
import { PackFrontalier } from "~/constants/frontalier.constant";
import { useFormStore } from "~/stores/form";
import formatAmount from "~/utils/formatAmount";
const Profils = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const pack = PackFrontalier.find(
    (p) => p.name === lead.selectedOfferFrontalier
  );
  const price = pack ? pack.price : () => 0;
  const { t } = useTranslation("frontalier");
  const { t: tCommon } = useTranslation("common");

  useEffect(() => {
    if (
      lead.adherent
        .filter((p) =>
          dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year"))
        )
        .filter((p) => p.travailSuisse).length === 1
    ) {
      changeLead({
        selectedAdherent: [0],
      });
      nextStep("profils");
    }
  }, []);

  const isValid = lead.selectedAdherent.length > 0;

  return (
    <div className="flex max-w-xl flex-col gap-2">
      <label className="font-bold">{t("FRONTALIER_TITLE")}</label>
      {lead.adherent.map((p, index) => {
        if (!dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year")))
          return null;
        if (p.travailSuisse === false) return null;
        const isSelected = lead.selectedAdherent.includes(index);
        return (
          <button
            key={index}
            className={
              "group mt-2 flex flex-row items-center justify-between rounded-md bg-white px-8 py-4 transition-colors hover:border-primary hover:text-primary " +
              (isSelected ? "border border-primary text-primary" : "border")
            }
            onClick={() => {
              if (isSelected) {
                changeLead({
                  selectedAdherent: lead.selectedAdherent.filter(
                    (i) => i !== index
                  ),
                });
              } else {
                changeLead({
                  selectedAdherent: [...lead.selectedAdherent, index],
                });
              }
            }}
          >
            <div className="flex flex-row items-center gap-2">
              {p.type === "child" ? (
                <FaChild size={28} className="mr-1" />
              ) : p.civility === "man" ? (
                <IoIosMan size={32} />
              ) : (
                <IoIosWoman size={32} />
              )}
              <span className="font-bold">
                {p.type === "main"
                  ? t("FRONTALIER_TITLE_MAIN")
                  : p.type === "partner"
                  ? p.civility === "female"
                    ? t("FRONTALIER_TITLE_SPOUSE_FEMALE")
                    : t("FRONTALIER_TITLE_SPOUSE_MALE")
                  : t("FRONTALIER_TITLE_CHILD", {
                      year: p.year || "",
                    })}
                :
                <span className="text-primary">
                  {" "}
                  {formatAmount(
                    price(
                      dayjs().diff(dayjs(p.year, "YYYY"), "year"),
                      !!p.couverture
                    ) *
                      (lead.paymentFrequency === "semester"
                        ? 0.995
                        : lead.paymentFrequency === "year"
                        ? 0.99
                        : 1)
                  )}{" "}
                </span>
                /{" "}
                {lead.paymentFrequency === "month"
                  ? t("BY_MONTH")
                  : lead.paymentFrequency === "semester"
                  ? t("BY_SEMESTER")
                  : t("BY_YEAR")}
              </span>
            </div>
            <div
              className={
                "grid aspect-square w-6 place-items-center rounded-sm border transition-colors group-hover:border-primary " +
                (isSelected ? "bg-primary text-white" : "")
              }
            >
              {isSelected && <IconCheck size={20} />}
            </div>
          </button>
        );
      })}
      <Button
        disabled={!isValid}
        onClick={() => {
          nextStep("profils");
        }}
        className="mt-6 w-52"
      >
        {tCommon("CONTINUE")}
      </Button>
    </div>
  );
};

export default Profils;

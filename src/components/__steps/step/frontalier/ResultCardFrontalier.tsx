import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react";
import { useState } from "react";
import Button from "~/components/button/Button";

import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { Adherent } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";
import { recallResident } from "~/utils/api/recallResident";

interface Props {
  adhrerent: Adherent;
  monthPrice: boolean;
  className?: string;
  profilId: number;
  price: (age: number, couverture: boolean) => number;
  hash: string;
  name: string;
  withDetails?: boolean;
  recommended?: boolean;
}

const ResultCardFrontalier = ({
  adhrerent,
  monthPrice,
  className = "",
  profilId,
  price,
  hash,
  name,
  withDetails = false,
  recommended = false,
}: Props) => {
  const [show, setShow] = useState(false);
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t: tCommon } = useTranslation("common");
  const { t } = useTranslation("frontalier");

  const age = dayjs().diff(dayjs(adhrerent.year, "YYYY"), "year");
  const couverture = adhrerent.couverture;

  const prestation = [
    {
      label: "PRESTATION_SEJOURS_HOSPITALIERS_EN_SUISSE_LABEL",
      value: "PRESTATION_SEJOURS_HOSPITALIERS_EN_SUISSE_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_PROTECTION_A_L_ETRANGER_LABEL",
      value: "PRESTATION_PROTECTION_A_L_ETRANGER_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_TRANSPORT_ET_SAUVETAGE_EN_SUISSE_LABEL",
      value: "PRESTATION_TRANSPORT_ET_SAUVETAGE_EN_SUISSE_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_MEDICAMENTS_LABEL",
      value: "PRESTATION_MEDICAMENTS_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_TRAITEMENTS_AMBULATOIRES_MEDECINE_ACADEMIQUE_LABEL",
      value: "PRESTATION_TRAITEMENTS_AMBULATOIRES_MEDECINE_ACADEMIQUE_VALUE",
      status: true,
    },
    {
      label:
        "PRESTATION_TRAITEMENTS_AMBULATOIRES_MEDECINE_COMPLEMENTAIRE_LABEL",
      value:
        "PRESTATION_TRAITEMENTS_AMBULATOIRES_MEDECINE_COMPLEMENTAIRE_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_PREVENTION_PREVENTION_MEDICALE_LABEL",
      value: "PRESTATION_PREVENTION_PREVENTION_MEDICALE_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_MOYENS_ET_APPAREILS_LABEL",
      value: "PRESTATION_MOYENS_ET_APPAREILS_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_GROSSESSE_LABEL",
      value: "PRESTATION_GROSSESSE_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_SOINS_LABEL",
      value: "PRESTATION_SOINS_VALUE",
      status: true,
    },
    {
      label: "PRESTATION_CURES_BALNEAIRES_LABEL",
      value: "PRESTATION_CURES_BALNEAIRES_VALUE",
      status: true,
    },
  ];

  const beCalled = () => {
    void recallResident(lead.phone || "")
      .then(() => {
        toast.success(tCommon("CALLED_SUCCESS"));
      })
      .catch(() => {
        toast.error(tCommon("CALLED_ERROR"));
      });
  };

  const onSubscribe = () => {
    setShow(false);
    changeLead({
      ...lead,
      selectedAdherent: [profilId],
      selectedOfferFrontalier: name,
    });
    nextStep("result-frontalier");
  };

  return (
    <div className={" compare-shadow flex flex-col  " + className}>
      {recommended && (
        <div className="flex items-center gap-2 rounded-t-lg border border-primary bg-primary-700/20 px-2 py-2 pb-1 text-sm font-semibold text-primary-600">
          <IconCircleCheckFilled size={24} />
          <span>{t("RECOMMENDED")}</span>
        </div>
      )}
      <div
        className={
          " rounded-b-lg border bg-white " + (recommended ? "" : "rounded-t-lg")
        }
      >
        <div className="flex w-full flex-col items-center justify-center p-4 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2">
            <div className="grid aspect-square max-w-[126px] place-items-center rounded-xl border border-neutral-100 p-1">
              <img
                src={`/images/${hash}.png`}
                alt={"Icon de l'assurance Helsana"}
              ></img>
            </div>
          </div>
          <div className="flex flex-col items-center gap-px">
            <div className="flex items-end text-[#2A3775]">
              <h2 className="text-[40px] font-bold ">
                {new Intl.NumberFormat("de-CH", {
                  style: "currency",
                  currency: "CHF",
                  maximumFractionDigits: 0,
                }).format(
                  monthPrice
                    ? price(age, !!couverture)
                    : price(age, !!couverture) * 12 * 0.99
                )}
              </h2>
              <span className="text-[24px] ">
                /{monthPrice ? t("MONTH") : t("ANNUAL")}
              </span>
            </div>
            {withDetails && (
              <span className="text-lg font-semibold text-neutral-500">
                {t(name)}
              </span>
            )}
            {withDetails && (
              <button
                onClick={() => setShow(!show)}
                className="mt-2 flex items-center gap-2 rounded-lg border-2 p-2 text-sm font-semibold text-neutral-400"
              >
                {show ? t("HIDE") : t("SHOW")} {t("DETAILS")}
                <IconChevronDown
                  className={`transform ${show ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>
          <div className="mt-4 flex min-w-[12rem] flex-col gap-4 md:mt-0">
            <Button widthFull onClick={onSubscribe}>
              {tCommon("CARD_SUBSCRIBE")}
            </Button>
            <Button widthFull intent={"outline"} onClick={beCalled}>
              {tCommon("CARD_BECALLED")}
            </Button>
          </div>
        </div>
        {withDetails && (
          <div
            className={`grid ${
              show ? "grid-rows-[1fr] border-t py-4" : "grid-rows-[0fr]"
            } transition-[grid-template-rows,padding]`}
          >
            <div className={`overflow-hidden ${show ? "" : ""}`}>
              <div className="grid grid-cols-[repeat(2,1fr)] gap-5 p-4">
                <span className="px-1 text-xl font-bold text-[#2F3946]">
                  {tCommon("CARD_PRESTATION")}
                </span>
                <span className="px-1 text-xl font-bold text-[#2F3946]">
                  {tCommon("CARD_DETAILS")}
                </span>
              </div>
              <div className="">
                {prestation.map((p, i) => (
                  <div
                    className={`grid grid-cols-[repeat(2,1fr)] gap-5 px-4 py-2 ${
                      i === 0 ? "pt-2" : ""
                    } ${i % 2 === 0 ? "bg-[#f7fcff]" : ""}`}
                    key={i}
                  >
                    <div className="py-2 text-[#2f3946]">
                      <span className="px-1 text-base">{t(p.label)}</span>
                    </div>
                    <div className="px-2 text-[#2f3946]">
                      <div className="relative flex items-center gap-4">
                        <span className="w-full " key={i}>
                          {t(p.value)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCardFrontalier;

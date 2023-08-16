import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "~/components/button/Button";
import { Adherent } from "~/constants/lead.constant";
import insurance_hash from "~/data/ch-insurances-hash.json";
import { useFormStore } from "~/stores/form";
import { type Lamal } from "~/types/comparatif";
import { recallFrontalier } from "~/utils/api/recallFrontalier";
import ModalSouscrireLamal from "./ModalSouscrireLamal";

interface Props {
  recommended?: boolean;
  info: Lamal;
  monthPrice: boolean;
  className?: string;
  adherent: Adherent;
}

const ResultCardLamal = ({
  recommended = false,
  info,
  monthPrice,
  className = "",
  adherent,
}: Props) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const lead = useFormStore((state) => state.data);
  const { t } = useTranslation("result");

  const comparaison = parseFloat(info.comparaison);

  const hash = Object.keys(insurance_hash).find((key) => {
    const index = key as "57";
    return insurance_hash[index] === info.caisse;
  }) as string;

  const beCalled = () => {
    void recallFrontalier(lead.phone || "")
      .then(() => {
        toast.success(t("BECALLED_SUCCESS"));
      })
      .catch(() => {
        toast.error(t("BECALLED_ERROR"));
      });
  };

  const onSubscribe = () => {
    setShow(false);
    setOpen(true);
  };

  return (
    <div className={" compare-shadow flex flex-col  " + className}>
      {recommended && (
        <div className="flex items-center gap-2 rounded-t-lg border border-primary bg-primary-700/20 px-2 py-2 pb-1 text-sm font-semibold text-primary-600">
          <IconCircleCheckFilled size={24} />
          <span>{t("CARD_RECOMMENDED")}</span>
        </div>
      )}
      <div
        className={
          " rounded-b-lg border bg-white " + (recommended ? "" : "rounded-t-lg")
        }
      >
        <div className="flex w-full flex-col items-center justify-center p-6 md:flex-row md:justify-between">
          <div className="grid aspect-square max-w-[126px] place-items-center rounded-xl border border-neutral-100 p-1">
            <img
              src={`/images/${hash}.png`}
              alt={"Icon de l'assurance Helsana"}
            ></img>
          </div>
          <div className="flex flex-col items-center gap-px">
            <span className="text-[#2A3775]">
              <h2 className="inline text-[40px] font-bold">
                {new Intl.NumberFormat("de-CH", {
                  style: "currency",
                  currency: "CHF",
                  maximumFractionDigits: 0,
                }).format(
                  monthPrice ? parseInt(info.mois) : parseInt(info.annee)
                )}
              </h2>{" "}
              <span className="text-[24px] ">
                / {monthPrice ? t("MONTH") : t("YEAR")}
              </span>
            </span>
            <span className="text-lg font-semibold text-neutral-500">
              {info.modele}
            </span>
            {!isNaN(comparaison) && (
              <button
                onClick={() => setShow(!show)}
                className="mt-2 flex items-center gap-2 rounded-lg border-2 p-2 text-sm font-semibold text-neutral-400"
              >
                {show ? t("HIDE_DETAILS") : t("SHOW_DETAILS")}
                <IconChevronDown
                  className={`transform ${show ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>
          <div className="mt-4 flex w-full flex-col gap-4 md:mt-0 md:max-w-[340px]">
            <Button widthFull onClick={beCalled}>
              {t("BE_CALLED_BACK")}
            </Button>
            <Button widthFull intent={"outline"} onClick={onSubscribe}>
              {t("SUBSCRIBE")}
            </Button>
          </div>
        </div>
        <div
          className={`grid ${
            show ? "grid-rows-[1fr] border-t p-4" : "grid-rows-[0fr]"
          } transition-[grid-template-rows,padding]`}
        >
          <div className={`overflow-hidden ${show ? "" : ""}`}>
            <span className="text-sm font-semibold text-neutral-600">
              {comparaison > 0 ? (
                <span>
                  {t("SURCOUT")}{" "}
                  <span className="text-red-600">
                    {comparaison}/{t("MONTH")}
                  </span>
                  .
                </span>
              ) : (
                <span>
                  {t("ECONOMIES")}{" "}
                  <span className="text-green-600">
                    {comparaison * -1}/{t("MONTH")}
                  </span>
                  .
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
      <ModalSouscrireLamal
        open={open}
        onClose={() => setOpen(false)}
        lamal={info}
        adherent={adherent}
      />
    </div>
  );
};

export default ResultCardLamal;

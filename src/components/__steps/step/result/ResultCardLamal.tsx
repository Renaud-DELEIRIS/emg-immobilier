import { IconPhoneCall } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { Button } from "~/components/button/Button";
import { IconAgent } from "~/components/icon/IconAgent";
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
    <div
      className={twMerge(
        "relative flex flex-col gap-5 rounded-xl border-[1.5px] border-[#8888941A] px-4 py-[34px]",
        className
      )}
    >
      <span className="ml-auto text-right text-xs">{t("nb_ppl_choose")}</span>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:justify-between md:gap-[30px]">
        <div className="grid aspect-square h-full max-w-[126px] place-items-center rounded-lg border border-[#8888941A] p-1">
          <img
            src={`/images/${hash}.png`}
            alt={"Icon de l'assurance " + info.caisse}
            width={80}
            height={80}
          ></img>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[24px] font-bold">
            {new Intl.NumberFormat("de-CH", {
              style: "currency",
              currency: "CHF",
              maximumFractionDigits: 0,
            }).format(monthPrice ? parseInt(info.mois) : parseInt(info.annee))}
          </span>
          <span className="text-[16px] text-grey">
            /{monthPrice ? t("MONTH") : t("YEAR")}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between">
        <span className="flex items-center gap-2 text-sm font-medium">
          <IconAgent size={34} />
          {t("talk_agent")}
        </span>
        <div className="flex items-center gap-2.5">
          <Button onClick={beCalled} variant={"ghost"} size={"xs"}>
            {t("free_devis")}
          </Button>
          <Button
            onClick={onSubscribe}
            variant={"thirdy"}
            size={"xs"}
            className="gap-2"
          >
            <IconPhoneCall size={24} />
            {t("BE_CALLED_BACK")}
          </Button>
        </div>
      </div>
      {/* <div
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
        </div> */}
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

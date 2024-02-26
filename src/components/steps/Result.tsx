import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useFormStore } from "~/stores/form";
import { formatAmount } from "~/utils/money";
import { Alert, AlertTitle } from "../feedback/alert";
import EmgLoader from "../icon/EmgLoader";
import ResultModal from "../modal/resultModal";
import { useHypoCalculateur } from "../provider/ResultProvider";
import ResultCard, { Offre } from "./result/ResultCard";
import useResult from "./result/useResult";

const Result: React.FC = () => {
  const { t } = useTranslation("step");
  const lead = useFormStore((state) => state.data);
  const isLoading = false;
  const {
    prixDachat,
    fondsPropres,
    revenuAnnuels,
    toFinance,
    tauxInteretCalculatoire,
    ammortissement,
    fraisAnnexes,
    percent,
    graphData,
    fraisMensuels,
    tauxInteretRetenu,
    tauxDentement,
  } = useHypoCalculateur();
  const [filter, setFilter] = useState<"taux_croissant" | "frais_croissant">();
  const [openRecall, setOpenRecall] = useState<Offre | null>(null);
  const { data: offres } = useResult();

  const onRecall = (offre: Offre) => {
    setOpenRecall(offre);
  };

  return (
    <>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5">
        <div
          aria-hidden="true"
          className="fixed top-0 z-10 h-[107px] w-full bg-[var(--background-color)]"
        />

        {(tauxDentement > 0.33 || parseFloat(graphData[0]) < 20) && (
          <div className="flex flex-col gap-4">
            {tauxDentement > 0.33 && (
              <Alert variant={"danger"} noTitle>
                <AlertTitle>{t`result.alert_endetement.title`}</AlertTitle>
                <p>{t`result.alert_endetement.content`}</p>
              </Alert>
            )}
            {parseFloat(graphData[0]) < 20 && (
              <Alert variant={"danger"} noTitle>
                <AlertTitle>{t`result.alert_fond.title`}</AlertTitle>
                <p>{t`result.alert_fond.content`}</p>
              </Alert>
            )}
          </div>
        )}
        <div className="flex gap-5">
          <div className="sticky top-[106px] z-20 hidden h-fit w-[250px] shrink-0 flex-col gap-4 md:flex">
            <div className="flex flex-col gap-2.5 rounded-lg border border-[#E6E8EC] bg-white p-4">
              <span className="text-lg font-semibold">{t`result.recap.title`}</span>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.recap.price`}</p>
                  <p className="text-base font-semibold">
                    CHF {formatAmount(fraisMensuels)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.recap.investment`}</p>
                  <p className="text-base font-semibold">
                    CHF {formatAmount(fondsPropres)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.recap.taux_interet`}</p>
                  <p className="text-base font-semibold">
                    {tauxInteretRetenu}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.recap.interet`}</p>
                  <p className="text-base font-semibold">
                    CHF {formatAmount(tauxInteretCalculatoire)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.recap.ammortissement`}</p>
                  <p className="text-base font-semibold">
                    CHF {formatAmount(ammortissement)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.recap.frais_annexes`}</p>
                  <p className="text-base font-semibold">
                    CHF {formatAmount(fraisAnnexes)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.info.projet`}</p>
                  <p className="text-base font-semibold">
                    CHF {formatAmount(prixDachat)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 rounded-lg border border-[#E6E8EC] bg-white p-4">
              <span className="text-lg font-semibold">{t`result.info.title`}</span>

              {lead.which_step && (
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm">{t`result.info.statut.title`}</p>
                    <p className="text-base font-semibold">
                      {t("result.info.statut." + (lead.which_step ?? ""))}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.info.salaire`}</p>
                  <p className="text-base font-semibold">
                    CHF {formatAmount(revenuAnnuels)}
                  </p>
                </div>
              </div>

              {lead.bien_type && (
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm">{t`result.info.bien_type.title`}</p>
                    <p className="text-base font-semibold">
                      {t("result.info.bien_type." + (lead.bien_type ?? ""))}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm">{t`result.info.canton`}</p>
                  <p className="text-base font-semibold">
                    {lead.which_step === "recherche bien"
                      ? lead.research.npa
                      : lead.canton_bien}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <div className="sticky top-[106px] z-10 mb-3.5 flex flex-col gap-2 bg-[var(--background-color)] py-2">
              <p className=" text-[20px] font-bold">
                {t(`result.title`, {
                  nb: offres?.length ?? 4,
                })}
              </p>
              <div className="flex flex-nowrap items-center gap-2.5 overflow-auto">
                <span className="font-semibold">
                  {t("result.filter.title")}:
                </span>
                {["frais_croissant", "taux_croissant"].map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setFilter((prev) =>
                        prev === item ? undefined : (item as typeof prev)
                      )
                    }
                    className={twMerge(
                      `shrink-0 rounded-[36px] border border-grey px-3 py-2 text-[12px] font-medium hover:border-primary`,
                      item === filter && "border-primary bg-primary/10"
                    )}
                  >
                    {t(`result.filter.${item}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-7">
              {isLoading || !offres ? (
                <div className="mt-4">
                  <EmgLoader />
                </div>
              ) : (
                offres
                  .sort((a, b) => {
                    if (
                      filter === "taux_croissant" &&
                      a.interest &&
                      b.interest
                    ) {
                      return a.interest - b.interest;
                    }
                    if (
                      filter === "frais_croissant" &&
                      a.mensual_payment &&
                      b.mensual_payment
                    ) {
                      return a.mensual_payment - b.mensual_payment;
                    }
                    return 0;
                  })
                  .map((offre, index) => (
                    <ResultCard
                      key={index}
                      offre={offre}
                      openRecall={onRecall}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
      <ResultModal
        open={!!openRecall}
        onClose={() => setOpenRecall(null)}
        offre={openRecall!}
      />
    </>
  );
};

export default Result;

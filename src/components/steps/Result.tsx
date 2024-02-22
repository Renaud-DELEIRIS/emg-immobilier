import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import { formatAmount } from "~/utils/money";
import EmgLoader from "../icon/EmgLoader";
import ResultModal from "../modal/resultModal";
import { useHypoCalculateur } from "../provider/ResultProvider";
import ResultCard, { Offre } from "./result/ResultCard";

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
  } = useHypoCalculateur();
  const [filter, setFilter] = useState("");
  const [openRecall, setOpenRecall] = useState<Offre | null>(null);
  const { data: offres } = api.getOffers.useQuery(
    {
      apport:
        (lead.fonds_propres.fonds_propres ?? 0) +
        (lead.fonds_propres.lpp ?? 0) +
        (lead.fonds_propres.pilier3 ?? 0),
      revenues:
        (lead.revenue ?? 0) +
        (lead.revenue_other.reduce((acc, cur) => acc + (cur.montant ?? 0), 0) ??
          0),
      totalPret:
        lead.which_step === "recherche bien"
          ? lead.research.budget[1] ?? 0
          : lead.bien_price,
    },
    {
      staleTime: 1000 * 60 * 15,
    }
  );

  const onRecall = (offre: Offre) => {
    setOpenRecall(offre);
  };

  return (
    <>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-row gap-5">
        <div
          aria-hidden="true"
          className="fixed top-0 z-10 h-[107px] w-full bg-[var(--background-color)]"
        />

        <div className="sticky top-[106px] hidden h-fit w-[250px] shrink-0 flex-col gap-4 md:flex">
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
                <p className="text-base font-semibold">{tauxInteretRetenu}%</p>
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
                <p className="text-base font-semibold">{lead.canton_bien}</p>
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
        </div>
        <div className="relative w-full">
          <div className="sticky top-[106px] z-10 mb-3.5 flex flex-col gap-2 bg-[var(--background-color)] py-2">
            <p className=" text-[20px] font-bold">
              {t(`result.title`, {
                nb: 24,
              })}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {["bank", "insurance"].map((item, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setFilter((prev) => (prev === item ? "" : item))
                  }
                  className={twMerge(
                    `rounded-[36px] border border-grey px-3 py-2 text-[12px] font-medium hover:border-primary`,
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
              offres.map((offre, index) => (
                <ResultCard key={index} offre={offre} openRecall={onRecall} />
              ))
            )}
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

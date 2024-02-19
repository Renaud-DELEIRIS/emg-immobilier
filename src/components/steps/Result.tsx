import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import { formatAmount } from "~/utils/money";
import EmgLoader from "../icon/EmgLoader";
import {
  HypoCalculateurProvider,
  useHypoCalculateur,
} from "../provider/ResultProvider";

const ResultComp: React.FC = () => {
  const { t } = useTranslation("step");
  const lead = useFormStore((state) => state.data);
  const isLoading = true;
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
  } = useHypoCalculateur();

  console.log(fraisMensuels);

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-row gap-5">
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
              <p className="text-sm">{t`result.recap.remboursement`}</p>
              <p className="text-base font-semibold">
                CHF {formatAmount(fraisMensuels)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 rounded-lg border border-[#E6E8EC] bg-white p-4">
          <span className="text-lg font-semibold">{t`result.info.title`}</span>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm">{t`result.info.hypotheque`}</p>
              <p className="text-base font-semibold">
                CHF {formatAmount(fraisMensuels)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm">{t`result.info.statut.title`}</p>
              <p className="text-base font-semibold">
                {t("result.info.statut." + lead.which_step)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm">{t`result.info.salaire`}</p>
              <p className="text-base font-semibold">
                CHF {formatAmount(revenuAnnuels)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm">{t`result.info.bien_type.title`}</p>
              <p className="text-base font-semibold">
                {t("result.info.bien_type." + lead.bien_type)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm">{t`result.info.projet.title`}</p>
              <p className="text-base font-semibold">
                CHF {formatAmount(prixDachat)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[200vh] w-full">
        <p className="mb-3.5 text-[20px] font-bold">
          {t(`result.title`, {
            nb: 24,
          })}
        </p>
        <div className="flex flex-col items-center gap-7">
          {isLoading ? (
            <div className="mt-4">
              <EmgLoader />
            </div>
          ) : (
            <div className="h-[500px] w-full bg-gray-200"></div>
          )}
        </div>
      </div>
    </div>
  );
};

const Result = () => {
  return (
    <HypoCalculateurProvider>
      <ResultComp />
    </HypoCalculateurProvider>
  );
};

export default Result;

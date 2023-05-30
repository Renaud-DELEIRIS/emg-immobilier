import { formatAmount } from "~/utils/formatAmount";
import {
  IconChevronDown,
  IconChevronUp,
  IconInfoOctagon,
  IconQuestionMark,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLead } from "../provider/LeadProvider";
const tauxInteretRetenu = 5;

const Mensualites = ({}) => {
  const { lead, tauxDentement } = useLead();
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation("steps");

  const toFinance = useMemo(() => lead.acquerirPrice - lead.fondPropre, [lead]);
  const tauxInteretCalculatoire = useMemo(
    () => toFinance * (tauxInteretRetenu / 100),
    [toFinance, tauxInteretRetenu]
  );
  const ammortissement = useMemo(() => lead.acquerirPrice / 15 / 15, [lead]);
  const fraisAnnexes = useMemo(() => lead.acquerirPrice * 0.01, [lead]);

  const fraisMensuel = useMemo(
    () => (tauxInteretCalculatoire + ammortissement + fraisAnnexes) / 12,
    [tauxInteretCalculatoire, ammortissement, fraisAnnexes]
  );
  return (
    <div className="max-w-lg">
      <h5 className="text-2xl font-bold">{t("result.mensualite.title")}</h5>
      <div className="mb-4 mt-4 flex items-end gap-2">
        <h6 className="text-blue text-5xl font-bold">
          {formatAmount(fraisMensuel, {
            currency: "CHF",
            digit: 0,
            local: "de-CH",
          }).replace("CHF", "")}
        </h6>
        <p className="text-blue text-lg">{t("result.mensualite.per")}</p>
      </div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1"
      >
        {t("result.mensualite.detail")}
        <IconChevronUp
          className={`text-gray-500 duration-200 ${open ? "" : "rotate-180"}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mt-4 flex flex-col last:border-b [&>*]:border-t">
          <div className="flex items-center justify-between gap-5 p-4 px-4">
            <div className="flex items-center gap-2 font-bold">
              {t("result.mensualite.tauxInteret")}
              <div data-tooltip={t("result.mensualite.helpTauxInteret")}>
                <IconInfoOctagon className="text-blue" size={20} />
              </div>
            </div>
            <div className="text-right">{tauxInteretRetenu}%</div>
          </div>
          <div className="flex items-center justify-between gap-5 bg-gray-100/80 p-4 px-4">
            <div className="flex items-center gap-2 font-bold">
              {t("result.mensualite.interet")}
              <div data-tooltip={t("result.mensualite.helpInteret")}>
                <IconInfoOctagon className="text-blue" size={20} />
              </div>
            </div>
            <div className="text-right">
              {formatAmount(tauxInteretCalculatoire)}
            </div>
          </div>
          <div className="flex items-center justify-between gap-5 p-4 px-4">
            <div className="flex items-center gap-2 font-bold">
              {t("result.mensualite.ammortissement")}
              <div data-tooltip={t("result.mensualite.helpAmmortissement")}>
                <IconInfoOctagon className="text-blue" size={20} />
              </div>
            </div>
            <div className="text-right">{formatAmount(ammortissement)}</div>
          </div>
          <div className="flex items-center justify-between gap-5 bg-gray-100/80 p-4 px-4">
            <div className="flex items-center gap-2 font-bold">
              {t("result.mensualite.fraisAnnexes")}
              <div data-tooltip={t("result.mensualite.helpFraisAnnexes")}>
                <IconInfoOctagon className="text-blue" size={20} />
              </div>
            </div>
            <div className="text-right">{formatAmount(fraisAnnexes)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensualites;

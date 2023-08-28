import dayjs from "dayjs";
import { useState } from "react";
import ReactSwitch from "react-switch";

import { Trans, useTranslation } from "next-i18next";
import { PackFrontalier } from "~/constants/frontalier.constant";
import { useFormStore } from "~/stores/form";
import StepContainer from "../../StepContainer";
import ResultCardFrontalier from "./ResultCardFrontalier";

const ResultFrontalier = () => {
  const lead = useFormStore((state) => state.data);
  const [monthlyPrice, setMonthlyPrice] = useState<boolean>(true);
  const { t } = useTranslation("frontalier");
  return (
    <StepContainer
      description={<Trans i18nKey="RESULT_TITLE" t={t} />}
      title="Sélectionnez l'offre à laquelle souscrire :"
      stepId="result-frontalier"
    >
      <div className="flex flex-row items-center gap-2">
        <ReactSwitch
          checked={!monthlyPrice}
          onChange={(e) => setMonthlyPrice(!e)}
          onColor="#00C49B"
          checkedIcon={false}
          uncheckedIcon={false}
          height={24}
          width={48}
          handleDiameter={24}
        />
        <p className="block text-base text-dark">{t("RESULT_YEAR_SWITCH")}</p>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {lead.adherent.map((data, index) => {
          // if not 18+
          if (dayjs().diff(dayjs(data.year, "YYYY"), "year") < 18) return null;
          if (data.travailSuisse === false) return null;
          return (
            <div key={index}>
              <h1 className="mb-4 text-base font-extrabold leading-[1.6] text-dark md:leading-[1.4]">
                {data.type === "main"
                  ? t("RESULT_TITLE_MAIN")
                  : data.type === "partner"
                  ? data.civility === "female"
                    ? t("RESULT_TITLE_SPOUSE_FEMALE")
                    : t("RESULT_TITLE_SPOUSE_MALE")
                  : t("RESULT_TITLE_CHILD", {
                      year: data.year,
                    })}
                :
              </h1>
              <div className="flex flex-col gap-4">
                {PackFrontalier.map((pack, indexPack) => {
                  return (
                    <ResultCardFrontalier
                      key={indexPack}
                      adhrerent={data}
                      monthPrice={monthlyPrice}
                      profilId={index}
                      hash={pack.hash}
                      name={pack.name}
                      price={pack.price}
                      withDetails={pack.name === "LAMal Helsana Bilas"}
                      recommended={pack.name === "LAMal Helsana Bilas"}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </StepContainer>
  );
};

export default ResultFrontalier;

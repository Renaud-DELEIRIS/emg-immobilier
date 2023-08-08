import dayjs from "dayjs";
import { useState } from "react";
import ReactSwitch from "react-switch";

import StepContainer from "../../StepContainer";
import ResultCardFrontalier from "./ResultCardFrontalier";
import { PackFrontalier } from "~/constants/frontalier.constant";
import { useFormStore } from "~/stores/form";

const ResultFrontalier = () => {
  const lead = useFormStore((state) => state.data);
  const [monthlyPrice, setMonthlyPrice] = useState<boolean>(true);
  return (
    <StepContainer
      description={
        <span>
          Merci !<br />
          Grâce à ces informations, je suis parvenu à trouver à trouver la
          meilleur offre pour vous et votre famille.
        </span>
      }
      title="Sélectionnez l'offre à laquelle souscrire :"
      stepId="result-frontalier"
    >
      <div className="flex flex-row items-center gap-2">
        <ReactSwitch
          checked={monthlyPrice}
          onChange={setMonthlyPrice}
          onColor="#00C49B"
          checkedIcon={false}
          uncheckedIcon={false}
          height={24}
          width={48}
          handleDiameter={24}
        />
        <p className="block text-base text-dark">
          Afficher le prix à l&apos;année (1% de rabais)
        </p>
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
                  ? "Pour vous"
                  : data.type === "partner"
                  ? data.civility === "female"
                    ? "Pour votre conjointe"
                    : "Pour votre conjoint"
                  : "Pour votre enfant née en " + (data.year || "")}
                :
              </h1>
              <div className="flex flex-col gap-4">
                {PackFrontalier.map((pack, index) => {
                  return (
                    <ResultCardFrontalier
                      key={index}
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

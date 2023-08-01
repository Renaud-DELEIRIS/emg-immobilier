import Image from "next/image";
import { useState } from "react";
import Button from "~/components/button/Button";
import { type Lca } from "~/types/comparatif";
import insurance_hash from "~/data/ch-insurances-hash.json";
import {
  IconChevronDown,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconCircleX,
  IconHelp,
} from "@tabler/icons-react";
import Checkbox from "~/components/checkbox/Checkbox";
import { Adherent, useLead } from "~/components/provider/LeadProvider";
import { recallResident } from "~/utils/api/recallResident";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSteps } from "~/components/provider/StepsProvider";

interface Props {
  adhrerent: Adherent;
  monthPrice: boolean;
  className?: string;
}

const ResultCardFrontalier = ({
  adhrerent,
  monthPrice,
  className = "",
}: Props) => {
  const [show, setShow] = useState(false);
  const { increaseStep } = useSteps();
  const { lead } = useLead();

  const age = dayjs().diff(dayjs(adhrerent.dob, "DD.MM.YYYY"), "year");
  const couverture = adhrerent.couverture;
  const price =
    age < 19
      ? couverture
        ? 43.7
        : 40.7
      : age < 26
      ? couverture
        ? 157.5
        : 146.5
      : couverture
      ? 175
      : 162.8;

  const hash = "1562";

  const prestation = [
    {
      label: "Séjours hospitaliers en Suisse",
      value:
        "Les coûts du séjour, des soins et du traitement en division commune (chambre à plusieurs lits) sont remboursés.",
      status: true,
    },
    {
      label: "Protection à l'étranger",
      value:
        "En cas d’urgence, vous bénéficiez dans les pays membres de l’UE/AELE du tarif social correspondant. Dans tous les autres pays, Helsana rembourse au maximum le double du montant assuré en Suisse.",
      status: true,
    },
    {
      label: "Transport et sauvetage en Suisse",
      value:
        "Helsana rembourse 50% des coûts de transport, mais au max. 500 francs par année civile. Pour les opérations de sauvetage, Helsana rembourse 50% des coûts, mais au max. 5000 francs par année civile.",
      status: true,
    },
    {
      label: "Médicaments",
      value:
        "Helsana rembourse le coût des médicaments prescrits par un médecin figurant sur la liste des spécialités. Si plusieurs médicaments sont répertoriés avec les mêmes substances actives, la quote-part peut s’élever à 20%. La participation aux coûts s’applique uniquement si vous achetez les médicaments en Suisse.",
      status: true,
    },
    {
      label: "Traitements ambulatoires - médecine académique",
      value:
        "Les coûts sont remboursés dans toute la Suisse sur la base du tarif spécialiste reconnu.",
      status: true,
    },
    {
      label: "Traitements ambulatoires - médecine complémentaire",
      value:
        "Les coûts sont remboursés dans toute la Suisse sur la base du tarif spécialiste reconnu.",
      status: true,
    },
    {
      label: "Prévention (prévention médicale)",
      value:
        "Helsana rembourse les coûts de certains examens et mesures de prévention.",
      status: true,
    },
    {
      label: "Moyens et appareils",
      value:
        "Helsana rembourse à concurrence du montant maximal fixé par la loi pour les moyens et appareils prescrits par un médecin.",
      status: true,
    },
    {
      label: "Grossesse",
      value:
        "Helsana rembourse les coûts pour des examens et mesures de préparation à l’accouchement. ",
      status: true,
    },
    {
      label: "Soins",
      value:
        "Vous recevez une contribution aux coûts des soins prodigués à domicile (Spitex) et dans un établissement médico-social.",
      status: true,
    },
    {
      label: "Cures balnéaires",
      value:
        "Helsana rembourse 10 francs par jour pour des cures balnéaires dans un établissement balnéaire reconnu en Suisse.",
      status: true,
    },
  ];

  const beCalled = () => {
    void recallResident(lead.phone || "")
      .then(() => {
        toast.success("Nous vous rappellerons dans les plus brefs délais");
      })
      .catch(() => {
        toast.error("Une erreur est survenue, veuillez réessayer plus tard");
      });
  };

  const onSubscribe = () => {
    setShow(false);
    increaseStep("result-frontalier");
  };

  return (
    <div className={" compare-shadow flex flex-col  " + className}>
      <div className={" rounded-b-lg rounded-t-lg border bg-white"}>
        <div className="flex w-full flex-col items-center justify-center p-4 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={`/images/${hash}.png`}
              alt={"Icon de l'assurance Helsana"}
              width={96}
              height={96}
              className="h-24 w-24 rounded-xl border border-neutral-100 object-contain"
            ></Image>
          </div>
          <div className="flex flex-col items-center gap-px">
            <div className="flex items-end text-[#2A3775]">
              <h2 className="text-[40px] font-bold ">
                CHF {monthPrice ? price : price * 12 * 0.99}
              </h2>
              <span className="text-[24px] ">
                /{monthPrice ? "mois" : "an"}
              </span>
            </div>
            <span className="text-lg font-semibold text-neutral-500">
              LAMal Helsana Bilas
            </span>
            <button
              onClick={() => setShow(!show)}
              className="mt-2 flex items-center gap-2 rounded-lg border-2 p-2 text-sm font-semibold text-neutral-400"
            >
              {show ? "Masquer" : "Afficher"} les détails
              <IconChevronDown
                className={`transform ${show ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className="mt-4 flex min-w-[12rem] flex-col gap-4 md:mt-0">
            <Button widthFull onClick={onSubscribe}>
              Souscrire
            </Button>
            <Button widthFull intent={"outline"} onClick={beCalled}>
              Être rappelé
            </Button>
          </div>
        </div>
        <div
          className={`grid ${
            show ? "grid-rows-[1fr] border-t py-4" : "grid-rows-[0fr]"
          } transition-[grid-template-rows,padding]`}
        >
          <div className={`overflow-hidden ${show ? "" : ""}`}>
            <div className="grid grid-cols-[repeat(2,1fr)] gap-5 p-4">
              <span className="px-1 text-xl font-bold text-[#2F3946]">
                Prestations
              </span>
              <span className="px-1 text-xl font-bold text-[#2F3946]">
                Détails
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
                    <span className="px-1 text-base">{p.label}</span>
                  </div>
                  <div className="px-2 text-[#2f3946]">
                    <div className="relative flex items-center gap-4">
                      <span className="w-full " key={i}>
                        {p.value}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCardFrontalier;

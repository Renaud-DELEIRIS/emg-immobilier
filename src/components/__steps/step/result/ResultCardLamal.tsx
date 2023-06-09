import Image from "next/image";
import { useState } from "react";
import Button from "~/components/button/Button";
import { type Lamal } from "~/types/comparatif";
import insurance_hash from "~/data/ch-insurances-hash.json";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useLead } from "~/components/provider/LeadProvider";
import { recallFrontalier } from "~/utils/api/recallFrontalier";
import { toast } from "react-toastify";

interface Props {
  recommended?: boolean;
  info: Lamal;
  monthPrice: boolean;
}

const ResultCardLamal = ({ recommended = false, info, monthPrice }: Props) => {
  const [show, setShow] = useState(false);
  const { lead } = useLead();

  const comparaison = parseFloat(info.comparaison);

  const hash = Object.keys(insurance_hash).find((key) => {
    const index = key as "57";
    return insurance_hash[index] === info.caisse;
  }) as string;

  const beCalled = () => {
    void recallFrontalier(lead.phone || "")
      .then(() => {
        toast.success("Nous vous rappelons dans quelques minutes.");
      })
      .catch(() => {
        toast.error("Une erreur est survenue, veuillez réessayer.");
      });
  };

  return (
    <div className="flex w-full flex-col rounded-lg border bg-white">
      {recommended && (
        <div className="flex items-center gap-2 rounded-t-lg bg-primary-100 px-2 py-2 text-sm font-semibold text-primary-600">
          <IconCircleCheckFilled size={24} />
          <span>Meilleur rapport qualité prix</span>
        </div>
      )}
      <div className="flex w-full flex-col items-center justify-center p-4 md:flex-row md:justify-between">
        <Image
          src={`/images/${hash}.png`}
          alt={"Icon de l'assurance " + info.caisse}
          width={96}
          height={96}
          className="h-24 w-24 rounded-xl border border-neutral-100 object-contain"
        ></Image>
        <div className="flex flex-col items-center gap-px">
          <div className="flex items-end">
            <h2 className="text-[28px] font-bold text-primary">
              {monthPrice ? info.mois : info.annee}
            </h2>
            <span className="text-[18px] text-primary-700">
              /{monthPrice ? "mois" : "an"}
            </span>
          </div>
          <span className="text-lg font-semibold text-neutral-500">
            {info.modele}
          </span>
          {!isNaN(comparaison) && (
            <button
              onClick={() => setShow(!show)}
              className="mt-2 rounded-lg border p-1 text-sm font-semibold text-primary-600 hover:text-primary-800"
            >
              {show ? "Masquer" : "Afficher"} les détails
            </button>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-4 md:mt-0">
          <Button widthFull onClick={beCalled}>
            Être rappelé
          </Button>
          <Button widthFull intent={"outline"}>
            Souscrire en ligne
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
                Soit un surcout de{" "}
                <span className="text-red-600">{comparaison}/mois</span>.
              </span>
            ) : (
              <span>
                Soit une économie de{" "}
                <span className="text-green-600">{comparaison * -1}/mois</span>.
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultCardLamal;

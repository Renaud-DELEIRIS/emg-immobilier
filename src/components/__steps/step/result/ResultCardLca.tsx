import Image from "next/image";
import { useState } from "react";
import Button from "~/components/button/Button";
import { type Lca } from "~/types/comparatif";
import insurance_hash from "~/data/ch-insurances-hash.json";
import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconCircleX,
  IconHelp,
} from "@tabler/icons-react";
import Checkbox from "~/components/checkbox/Checkbox";
import { useLead } from "~/components/provider/LeadProvider";
import { recallResident } from "~/utils/api/recallResident";
import { toast } from "react-toastify";
import ModalSouscrireLca from "./ModalSouscrireLca";

interface Props {
  recommended?: boolean;
  info: Lca;
  monthPrice: boolean;
  canCompare: boolean;
  onCompare: (id: string) => void;
  compare: boolean;
}

const ResultCardLca = ({
  recommended = false,
  info,
  monthPrice,
  canCompare,
  onCompare,
  compare,
}: Props) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { lead } = useLead();

  const month = info.prix.toFixed(2);
  const year = (info.prix * 12).toFixed(2);

  const hash = Object.keys(insurance_hash).find((key) => {
    const index = key as "57";
    return insurance_hash[index] === info.nom;
  }) as string;

  const groupPrestations: Record<string, string[]> = {
    Ambulatoire: [
      "Médicaments",
      "Lunettes et verre de contact",
      "Moyens auxiliaires",
      "Prévention, check-up",
      "Frais de transport et sauvetage",
      "Fitness",
      "Étranger",
    ],
    Hospitalisation: [
      "Hospitalisation",
      "Libre choix du médecin",
      "Aide-ménagère et soins à domicile",
      "Rooming-in",
      "Capital hospitalier",
    ],
    "Médecines complémentaires": ["Médecine complémentaire"],
    Dentaires: ["Traitements orthodontiques", "Soins dentaire"],
  };

  const tooltipsPrestations: Record<string, string> = {
    Médicaments: "Médicaments non pris en charge dans l'assurance de base.",
    "Lunettes et verre de contact":
      "Verre de contact, lunettes et parfois montures sont prises en charge par la complémentaire.",
    "Moyens auxiliaires":
      "Frais d'achat ou de location pour les moyens auxiliraires.",
    "Prévention, check-up":
      "Examens gynécologique de préventions, bilan de santé, vaccins etc.",
    "Médecine complémentaire":
      "Prise en charge des coûts, en général sans ordonnance pour les thérapeutes reconnues par les compagnies pour les médecines complémentaires p.ex. osthéopathie, massage, biorésonance..",
    "Frais de transport et sauvetage":
      "Sauvetage, transport d'urgence p.ex. ambulance, héliportage etc.",
    Fitness:
      "Les complémentaires peuvent prendre en charge les activités sportive p.ex. école du dos, salles de fitness.",
    Hospitalisation: "Division dans laquelle la personne est hospitalisée.",
    "Traitements orthodontiques":
      "Prise en charge des couts d'un appareil orthodontique par la compagnie d'assurance.",
    "Soins dentaire":
      "Soins courant de type dentaire, p.ex. pivot, carie, bridge, implants...",
    Étranger:
      "Soins médicaux d'urgence à l'étranger, rappatriemnt, annulation de voyage, vol de bagage etc.",
    "Libre choix du médecin":
      "Possibilité de choisir le spécialiste pour une opération chirurgicale, sans délai.",
    "Aide-ménagère et soins à domicile":
      "Soins à domicile et aide ménagère sont des montants accordés en remboursement pour de l'aide à domicile lors d'une hospitalisation.",
    "Rooming-in":
      "Prise en charge d'une personne accompagnante lors d'un séjour hospitalier (chambre, déjeuner...)",
    "Capital hospitalier":
      "Lors d'une hospitalisation de plus de 24h, un montant définie est versé à la personne pour p.ex. aider à payer la franchise de la LAMal.",
  };

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
    setOpen(true);
  };

  return (
    <div className="flex flex-col rounded-lg border bg-white">
      {recommended && (
        <div className="flex items-center gap-2 rounded-t-lg bg-primary-100 px-2 py-2 pb-1 text-sm font-semibold text-primary-600">
          <IconCircleCheckFilled size={24} />
          <span>Meilleur rapport qualité prix</span>
        </div>
      )}
      <div className="flex w-full flex-col items-center justify-center p-4 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={`/images/${hash}.png`}
            alt={"Icon de l'assurance " + info.nom}
            width={96}
            height={96}
            className="h-24 w-24 rounded-xl border border-neutral-100 object-contain"
          ></Image>
          <div className="flex items-center gap-1">
            <span className="text-base font-semibold text-neutral-500">
              {info.note} / 6
            </span>
            <IconCircleCheckFilled size={20} className="text-primary-600" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-px">
          <div className="flex items-end">
            <h2 className="text-[28px] font-bold text-primary">
              CHF {monthPrice ? month : year}
            </h2>
            <span className="text-[18px] text-primary-700">
              /{monthPrice ? "mois" : "an"}
            </span>
          </div>
          <span className="text-lg font-semibold text-neutral-500">
            {info.produit}
          </span>
          <button
            onClick={() => setShow(!show)}
            className="mt-2 rounded-lg border p-1 text-sm font-semibold text-primary-600 hover:text-primary-800"
          >
            {show ? "Masquer" : "Afficher"} les détails
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-4 md:mt-0">
          <Button widthFull onClick={beCalled}>
            Être rappelé
          </Button>
          <Button widthFull intent={"outline"} onClick={onSubscribe}>
            Souscrire en ligne
          </Button>
        </div>
      </div>
      <div className="mb-3 px-4">
        <Checkbox
          id={info.id.toString()}
          checked={compare}
          disabled={!canCompare}
          onChange={() => onCompare(info.id.toString())}
        >
          Comparer
        </Checkbox>
      </div>
      <div
        className={`grid ${
          show ? "grid-rows-[1fr] border-t p-4" : "grid-rows-[0fr]"
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
          <div className="px-4">
            {Object.entries(groupPrestations).map(([group, prestations]) => (
              <>
                <span className="py-3 text-lg font-bold text-[#2F3946]">
                  {group}
                </span>
                {info.prestations
                  .filter((p) => prestations.includes(p.label))
                  .map((p, i) => (
                    <div
                      className={`grid grid-cols-[repeat(2,1fr)] gap-5 ${
                        i === 0 ? "pt-2" : ""
                      } ${i % 2 === 0 ? "bg-[#f7fcff]" : ""}`}
                      key={i}
                    >
                      <div className="py-2 text-[#2f3946]">
                        <div className="relative flex items-center gap-4">
                          {p.status ? (
                            <IconCircleCheck
                              size={24}
                              className="text-primary-600"
                            />
                          ) : (
                            <IconCircleX size={24} className="text-red-600" />
                          )}
                          <span className="px-1 text-base">{p.label}</span>
                        </div>
                      </div>
                      <div className="px-2 text-[#2f3946]">
                        <div className="relative flex items-center gap-4">
                          <span data-tooltip={tooltipsPrestations[p.label]}>
                            <IconHelp size={24} className="text-blue-600" />
                          </span>
                          {p.details.map((d, i) => {
                            if (!d.status) return null;
                            return (
                              <span
                                className="w-full font-extrabold"
                                data-tooltip={`Franchise: ${d.franchise}`}
                                key={i}
                              >
                                {d.value}{" "}
                                <span className="text-sm font-normal text-neutral-500">
                                  ({d.produit})
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ))}
          </div>
        </div>
      </div>
      <ModalSouscrireLca
        open={open}
        onClose={() => setOpen(false)}
        lca={info}
      />
    </div>
  );
};

export default ResultCardLca;
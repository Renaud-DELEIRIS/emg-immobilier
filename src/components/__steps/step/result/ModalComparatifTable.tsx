import { IconCircleCheck, IconCircleX, IconHelp } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import Button from "~/components/button/Button";
import FlatModal from "~/components/modal/FlatModal";
import { type Adherent } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";
import { type Lca } from "~/types/comparatif";
import { recallResident } from "~/utils/api/recallResident";
import ModalSouscrireLca from "./ModalSouscrireLca";

interface Props {
  open: boolean;
  onClose: () => void;
  offres: Lca[];
  adherent: Adherent;
}

const ModalComparatifTable = ({ open, onClose, offres, adherent }: Props) => {
  const [souscrireOpenIndex, setSouscrireOpenIndex] = useState<number | null>(
    null
  );
  const { t } = useTranslation("result");

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

  const lead = useFormStore((state) => state.data);

  const beCalled = () => {
    void recallResident(lead.phone || "")
      .then(() => {
        toast.success(t("BECALLED_SUCCESS"));
      })
      .catch(() => {
        toast.error(t("BECALLED_ERROR"));
      });
  };

  return (
    <FlatModal open={open} onClose={onClose}>
      <table className="bg-white">
        <thead>
          <tr>
            <th className="px-2 py-4 text-xl font-extrabold" />
            {offres.map((lca, i) => (
              <th className="px-2 py-4 text-xl font-extrabold" key={i}>
                <div className="flex max-w-xs flex-col justify-between gap-4 rounded-lg p-4 shadow">
                  <div className="flex items-center justify-around gap-2">
                    <Image
                      src={`/images/${lca.nom}.png`}
                      alt={lca.nom}
                      className="h-16 w-16 object-contain"
                      width={64}
                      height={64}
                    />
                    <div className="flex flex-col items-center justify-between">
                      <span className="text-xl text-primary">
                        <strong>{Math.round(lca.prix)} CHF</strong>
                      </span>
                      <span className="text-base font-extrabold">
                        {lca.nom}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-1">
                    <Button onClick={beCalled} size="small" widthFull>
                      {t("BE_CALLED_BACK")}
                    </Button>
                    <Button
                      onClick={() => setSouscrireOpenIndex(i)}
                      size="small"
                      widthFull
                      intent={"outline"}
                    >
                      {t("COMPARATIF_SUBSCRIBE")}
                    </Button>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupPrestations).map(([group, prestations], z) => (
            <Fragment key={z}>
              <tr>
                <td className="px-4 py-5 text-lg font-extrabold">{t(group)}</td>
              </tr>
              {prestations.map((prestation, i) => (
                <tr className="even:bg-[#2bffd311]" key={i}>
                  <td className="px-6 py-2 text-[#2f3946]">
                    <div className="relative flex w-full items-center justify-between gap-5">
                      {t(prestation)}
                      <span
                        className="text-blue-600"
                        data-tooltip={tooltipsPrestations[prestation]}
                      >
                        <IconHelp />
                      </span>
                    </div>
                  </td>
                  {offres.map((lca, y) => (
                    <td className="px-6 py-2 text-[#2f3946]" key={y}>
                      <div className="relative flex items-center gap-4">
                        {lca.prestations
                          .filter((p) => p.label === prestation)
                          .map((offre, v) => (
                            <div key={v}>
                              <span className="text-primary">
                                {offre.status ? (
                                  <IconCircleCheck
                                    size={24}
                                    className="text-primary-600"
                                  />
                                ) : (
                                  <IconCircleX
                                    size={24}
                                    className="text-red-600"
                                  />
                                )}
                              </span>
                              {offre.details.map((detail, w) => {
                                if (detail.value)
                                  return (
                                    <span
                                      className="w-full font-bold"
                                      data-tooltip={`Franchise: ${detail.franchise}`}
                                      key={w}
                                    >
                                      {t(detail.value)}
                                      <span className="font-normal">
                                        ({t(detail.produit)})
                                      </span>
                                    </span>
                                  );
                              })}
                            </div>
                          ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      {souscrireOpenIndex !== null && (
        <ModalSouscrireLca
          open={souscrireOpenIndex !== null}
          onClose={() => setSouscrireOpenIndex(null)}
          lca={offres[souscrireOpenIndex] as Lca}
          adherent={adherent}
        />
      )}
    </FlatModal>
  );
};

export default ModalComparatifTable;

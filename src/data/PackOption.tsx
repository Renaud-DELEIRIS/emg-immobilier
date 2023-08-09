import { type Prestation } from "./Pack";

const optionMedecineAlternative: Prestation[][] = [
  [
    {
      label: "STEP_PACK_OPTION_MEDECINE_ALTERNATIVE_LISTE_ETENDUE",
      status: true,
    },
    {
      label: "STEP_PACK_OPTION_MEDECINE_ALTERNATIVE_MEDICAMENTS",
      status: true,
    },
  ],
];

const optionTraitementsDentaires: Prestation[][] = [
  [
    {
      label:
        "STEP_PACK_OPTION_TRAITEMENTS_DENTAIRES_PREVENTIONS_PIVOTS_PROTHESES",
      status: true,
    },
    {
      label: "STEP_PACK_OPTION_TRAITEMENTS_DENTAIRES_TRAITEMENTS_ORTHODONTIE",
      status: true,
    },
  ],
  [
    {
      label:
        "STEP_PACK_OPTION_TRAITEMENTS_DENTAIRES_PREVENTIONS_PIVOTS_PROTHESES",
      status: true,
    },
    {
      label: "STEP_PACK_OPTION_TRAITEMENTS_DENTAIRES_TRAITEMENTS_ORTHODONTIE",
      status: true,
    },
  ],
  [
    {
      label:
        "STEP_PACK_OPTION_TRAITEMENTS_DENTAIRES_PREVENTIONS_PIVOTS_PROTHESES",
      status: true,
    },
    {
      label: "STEP_PACK_OPTION_TRAITEMENTS_DENTAIRES_TRAITEMENTS_ORTHODONTIE",
      status: true,
    },
  ],
];

const optionCapitalHospitalier: Prestation[][] = [
  [{ label: "STEP_PACK_OPTION_CAPITAL_HOSPITALIER_VERSEMENT", status: true }],
  [
    {
      label:
        "STEP_PACK_OPTION_TRAITEMENTS_DENTAIRES_PREVENTIONS_PIVOTS_PROTHESES",
      status: true,
    },
  ],
  [
    {
      label:
        "STEP_PACK_OPTION_TRAITEMENTS_DENTAIRES_PREVENTIONS_PIVOTS_PROTHESES",
      status: true,
    },
  ],
];

const optionHospitalisation: Prestation[][] = [
  [
    {
      label: "STEP_PACK_OPTION_HOSPITALISATION_PRIVEE_PARTICIPATION",
      status: true,
    },
  ],
  [
    {
      label: "STEP_PACK_OPTION_HOSPITALISATION_LIBRE_CHOIX_MEDECIN",
      status: true,
    },
    {
      label: "STEP_PACK_OPTION_HOSPITALISATION_CHAMBRE_DEUX_LIT",
      status: true,
    },
  ],
  [
    {
      label: "STEP_PACK_OPTION_HOSPITALISATION_LIBRE_CHOIX_MEDECIN",
      status: true,
    },
    {
      label: "STEP_PACK_OPTION_HOSPITALISATION_CHAMBRE_UN_LIT_MONDE_ENTIER",
      status: true,
    },
    { label: "STEP_PACK_OPTION_HOSPITALISATION_ROOMING_IN", status: true },
  ],
];

export const packOptionById = (id: number) =>
  id === 1
    ? optionMedecineAlternative
    : id === 2
    ? optionTraitementsDentaires
    : id === 3
    ? optionCapitalHospitalier
    : optionHospitalisation;

export {
  optionCapitalHospitalier,
  optionHospitalisation,
  optionMedecineAlternative,
  optionTraitementsDentaires,
};

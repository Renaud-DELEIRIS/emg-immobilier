import { type Prestation } from "./Pack";

const optionMedecineAlternative: Prestation[][] = [
  [
    {
      label: "Liste étendue de thérapies médecines douces",
      status: true,
    },
    {
      label: "Médicaments de la médecine complémentaire",
      status: true,
    },
  ],
];

const optionTraitementsDentaires: Prestation[][] = [
  [
    {
      label: "Traitements dentaires (préventions, pivots, prothèses)",
      status: true,
    },
    {
      label: "Traitements orthodontie",
      status: true,
    },
  ],
  [
    {
      label: "Traitements dentaires (préventions, pivots, prothèses)",
      status: true,
    },
    {
      label: "Traitements orthodontie",
      status: true,
    },
  ],
  [
    {
      label: "Traitements dentaires (préventions, pivots, prothèses)",
      status: true,
    },
    {
      label: "Traitements orthodontie",
      status: true,
    },
  ],
];

const optionCapitalHospitalier: Prestation[][] = [
  [
    {
      label: "Versement d'un capital en cas d'hospitalisation",
      status: true,
    },
  ],
  [
    {
      label: "Traitements dentaires (préventions, pivots, prothèses)",
      status: true,
    },
  ],
  [
    {
      label: "Traitements dentaires (préventions, pivots, prothèses)",
      status: true,
    },
  ],
];

const optionHospitalisation: Prestation[][] = [
  [
    {
      label: "Privée avec partcipation",
      status: true,
    },
  ],
  [
    {
      label: "Libre choix du médecin",
      status: true,
    },
    {
      label: "Chambre à deux lit",
      status: true,
    },
  ],
  [
    {
      label: "Libre choix du médecin",
      status: true,
    },
    {
      label: "Chambre à un lit dans le monde entier",
      status: true,
    },
    {
      label: "Rooming-in",
      status: true,
    },
  ],
];

export {
  optionMedecineAlternative,
  optionTraitementsDentaires,
  optionCapitalHospitalier,
  optionHospitalisation,
};

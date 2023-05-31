export type Prestation = {
  label: string;
  status: boolean;
  important?: boolean;
};

const prestationsEssentials: Prestation[] = [
  { label: "Chambre commune", status: true },
  { label: "Lunettes", status: true },
  { label: "Maternité", status: true },
  { label: "Transports", status: true },
  { label: "Couverture monde", status: true },
  { label: "Moyens auxiliaires", status: true },
  { label: "Médicaments", status: true },
  { label: "Prévention, check-up", status: false },
  { label: "Fitness", status: false },
  { label: "Traitements orthodontie", status: false },
  { label: "Aide à domicile", status: false },
  { label: "Traitements dentaire", status: false },
];

const prestationsEssentialsShort: Prestation[] = [
  { label: "Chambre commune", status: true },
  { label: "Lunettes", status: true },
  { label: "Maternité", status: true },
  { label: "Transports", status: true },
  { label: "Couverture monde", status: true },
  { label: "Moyens auxiliaires", status: true },
  { label: "Médicaments", status: true },
];

const prestationsConfort: Prestation[] = [
  { label: "Hospitalisation flexible", status: true },
  { label: "Lunettes", status: true },
  { label: "Maternité", status: true },
  { label: "Transports", status: true },
  { label: "Couverture monde", status: true },
  { label: "Moyens auxiliaires", status: true },
  { label: "Médicaments", status: true },
  { label: "Prévention, check-up", status: true },
  { label: "Fitness", status: true },
  { label: "Traitements orthodontie", status: false },
  { label: "Aide à domicile", status: false },
  { label: "Traitements dentaire", status: false },
];

const prestationsConfortShort: Prestation[] = [
  {
    label: "Tout les avantages du pack essentiel",
    status: true,
    important: true,
  },
  { label: "Hospitalisation flexible", status: true },
  { label: "Prévention, check-up", status: true },
  { label: "Fitness", status: true },
];

const prestationsPremium: Prestation[] = [
  { label: "Chambre semi-privée", status: true },
  { label: "Lunettes", status: true },
  { label: "Maternité", status: true },
  { label: "Transports", status: true },
  { label: "Couverture monde", status: true },
  { label: "Moyens auxiliaires", status: true },
  { label: "Médicaments", status: true },
  { label: "Prévention, check-up", status: true },
  { label: "Fitness", status: true },
  { label: "Traitements orthodontie", status: true },
  { label: "Aide à domicile", status: true },
  { label: "Traitements dentaire", status: true },
];

const prestationsPremiumShort: Prestation[] = [
  {
    label: "Tout les avantages du pack confort",
    status: true,
    important: true,
  },
  { label: "Chambre semi-privée", status: true },
  { label: "Traitements orthodontie", status: true },
  { label: "Aide à domicile", status: true },
  { label: "Traitements dentaire", status: true },
];

export {
  prestationsEssentials,
  prestationsEssentialsShort,
  prestationsConfort,
  prestationsConfortShort,
  prestationsPremium,
  prestationsPremiumShort,
};

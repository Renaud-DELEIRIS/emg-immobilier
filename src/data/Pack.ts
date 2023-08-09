export type Prestation = {
  label: string;
  status: boolean;
  important?: boolean;
};

export const packById = (id: number) =>
  id === 1 ? "Essentials" : id === 2 ? "Confort" : "Premium";

const prestationsEssentials: Prestation[] = [
  { label: "STEP_PACK_PRESTATION_CHAMBRE_COMMUNE", status: true },
  { label: "STEP_PACK_PRESTATION_LUNETTES", status: true },
  { label: "STEP_PACK_PRESTATION_MATERNITE", status: true },
  { label: "STEP_PACK_PRESTATION_TRANSPORTS", status: true },
  { label: "STEP_PACK_PRESTATION_COUVERTURE_MONDE", status: true },
  { label: "STEP_PACK_PRESTATION_MOYENS_AUXILIAIRES", status: true },
  { label: "STEP_PACK_PRESTATION_MEDICAMENTS", status: true },
  { label: "STEP_PACK_PRESTATION_PREVENTION_CHECKUP", status: false },
  { label: "STEP_PACK_PRESTATION_FITNESS", status: false },
  { label: "STEP_PACK_PRESTATION_TRAITEMENTS_ORTHODONTIE", status: false },
  { label: "STEP_PACK_PRESTATION_AIDE_DOMICILE", status: false },
  { label: "STEP_PACK_PRESTATION_TRAITEMENTS_DENTAIRE", status: false },
];

const prestationsConfort: Prestation[] = [
  { label: "STEP_PACK_PRESTATION_HOSPITALISATION_FLEXIBLE", status: true },
  { label: "STEP_PACK_PRESTATION_LUNETTES", status: true },
  { label: "STEP_PACK_PRESTATION_MATERNITE", status: true },
  { label: "STEP_PACK_PRESTATION_TRANSPORTS", status: true },
  { label: "STEP_PACK_PRESTATION_COUVERTURE_MONDE", status: true },
  { label: "STEP_PACK_PRESTATION_MOYENS_AUXILIAIRES", status: true },
  { label: "STEP_PACK_PRESTATION_MEDICAMENTS", status: true },
  { label: "STEP_PACK_PRESTATION_PREVENTION_CHECKUP", status: true },
  { label: "STEP_PACK_PRESTATION_FITNESS", status: true },
  { label: "STEP_PACK_PRESTATION_TRAITEMENTS_ORTHODONTIE", status: false },
  { label: "STEP_PACK_PRESTATION_AIDE_DOMICILE", status: false },
  { label: "STEP_PACK_PRESTATION_TRAITEMENTS_DENTAIRE", status: false },
];

const prestationsPremium: Prestation[] = [
  { label: "STEP_PACK_PRESTATION_CHAMBRE_SEMI_PRIVEE", status: true },
  { label: "STEP_PACK_PRESTATION_LUNETTES", status: true },
  { label: "STEP_PACK_PRESTATION_MATERNITE", status: true },
  { label: "STEP_PACK_PRESTATION_TRANSPORTS", status: true },
  { label: "STEP_PACK_PRESTATION_COUVERTURE_MONDE", status: true },
  { label: "STEP_PACK_PRESTATION_MOYENS_AUXILIAIRES", status: true },
  { label: "STEP_PACK_PRESTATION_MEDICAMENTS", status: true },
  { label: "STEP_PACK_PRESTATION_PREVENTION_CHECKUP", status: true },
  { label: "STEP_PACK_PRESTATION_FITNESS", status: true },
  { label: "STEP_PACK_PRESTATION_TRAITEMENTS_ORTHODONTIE", status: true },
  { label: "STEP_PACK_PRESTATION_AIDE_DOMICILE", status: true },
  { label: "STEP_PACK_PRESTATION_TRAITEMENTS_DENTAIRE", status: true },
];

export { prestationsConfort, prestationsEssentials, prestationsPremium };

export interface LcaPrestation {
  details: {
    franchise: string;
    produit: string;
    status: boolean;
    value: string;
  }[];
  label: string;
  status: boolean;
}

export interface LcaProduct {
  "Aide-ménagère et soins à domicile": string;
  "Capital hospitalier": string;
  Compagnie: string;
  "Fitness ": string;
  "Frais de transport et sauvetage ": string;
  Franchise: string;
  Hospitalisation: string;
  "Libre choix du médecin": string;
  "Lunettes et verre de contact": string;
  "Moyens auxiliaires": string;
  "Médecine complémentaire": string;
  Médicaments: string;
  Prix: number;
  Produit: string;
  "Prévention, check-up": string;
  Rang: number;
  "Rooming-in": string;
  Sexe: string;
  "Soins dentaire": string;
  TA: string;
  "Traitements orthodontiques": string;
  Type: string;
  Étranger: string;
  _id: string;
}
export interface Lca {
  bestChoice: boolean;
  canCompare: boolean;
  id: string | number;
  listeproduits: string[];
  main: boolean;
  nom: string;
  note: number;
  prestations: LcaPrestation[];
  prix: number;
  products: LcaProduct[];
  produit: string;
}

export interface Lamal {
  annee: string;
  caisse: string;
  comparaison: string;
  modele: string;
  mois: string;
}

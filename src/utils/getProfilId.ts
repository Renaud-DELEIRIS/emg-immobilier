import { type Adherent } from "~/constants/lead.constant";

export const getProfilId = (profil: Adherent, index = 0) => {
  return profil.type === "main" ? 1 : profil.type === "partner" ? 2 : 3 + index;
};

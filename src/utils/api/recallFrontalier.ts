import { env } from "~/env.mjs";

export const recallFrontalier = async (telephone: string, source = "") => {
  if (!telephone) return Promise.reject("Erreur téléphone manquant");
  const _url = `${
    env.NEXT_PUBLIC_APIV2_ROOT
  }/recallasap?site=COMPAREA-Frontalier-${source}&client=${telephone.replace(
    "+",
    "%2B"
  )}`;
  try {
    const response = await fetch(_url);
    if (response.status === 404) {
      throw new Error("Ressource non trouvée");
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject("Erreur appel serveur");
  }
};

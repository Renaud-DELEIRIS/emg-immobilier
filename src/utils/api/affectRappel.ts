import { env } from "~/env.mjs";

export default async function affectRappel(leadId: string) {
  const _url = `${env.NEXT_PUBLIC_APIV2_ROOT}/comparea/affectrappel?leadId=${leadId}`;
  try {
    const response = await fetch(_url);
    if (response.status === 404) {
      throw new Error("Ressource non trouvée");
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject("Erreur appel serveur");
  }
}

import { type Adherent } from "~/constants/lead.constant";
import { env } from "~/env.mjs";
import { getProfilId } from "../getProfilId";

export default async function sendDocuments({
  adherents,
  ...rest
}: {
  leadId?: string;
  startInsurance: string;
  paymentFrequency: string;
  address?: string;
  adherents: Adherent[];
  documents: {
    profilId: number;
    type: string;
    name: string;
    url: string;
  }[];
  completed: boolean;
  iban: string;
}) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_APIV2_ROOT}/comparea/subscribelamal`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...rest,
          adherents: adherents.map((a, i) => ({
            id: getProfilId(a, i),
            firstname: a.prenom,
            name: a.nom,
            dob: a.dob,
            nationality: a.nationality,
            cover: a.couverture,
          })),
        }),
      }
    );
    if (!response.ok) {
      const data = (await response.json()) as { message: string };
      return Promise.reject(data.message);
    }
    const data = (await response.json()) as { code: string };
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject("Erreur appel serveur");
  }
}

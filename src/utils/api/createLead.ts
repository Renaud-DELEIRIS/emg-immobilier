import { type Adherent, type schemaData } from "~/constants/lead.constant";
import { packOptionById } from "~/data/PackOption";
import { env } from "~/env.mjs";
import { getProfilId } from "../getProfilId";

export const sendLeadComparea = async (
  data: schemaData,
  gtmParams: Record<string, string>,
  versionId: string,
  id?: string,
  verified?: boolean
): Promise<string> => {
  if (!data.phone) return Promise.reject("Erreur téléphone manquant");
  const { adherent, ...restdata } = data;

  const main = adherent.find((p) => p.type === "main");
  const partner = adherent.find((p) => p.type === "partner");

  if (!main) return Promise.reject("Erreur principal manquant");

  const createProfile = (p: Adherent, index = 0) => ({
    ddn: p.year,
    id: getProfilId(p, index),
    civilite: {
      key: p.civility === "female" ? 1 : 2,
      value: p.civility === "female" ? "Femme" : "Homme",
    },
    franchise: p.franchise
      ? {
          key: p.franchise,
          value: p.franchise,
        }
      : {
          key: "300",
          value: "300",
        },
    couverture: {
      key: p.couverture ? 1 : p.couvertureAccident === "oui" ? 1 : 2,
      value:
        p.couverture === true
          ? "Avec couverture"
          : p.couvertureAccident === "oui"
          ? "Avec couverture accident"
          : "Sans couverture accident",
    },

    packselected: !!p.pack,
    completed: true,
    ...(p.pack
      ? {
          pack: {
            id: p.pack.id,
            name: p.pack.principal,
            ...(p.pack.options
              ? {
                  options: [
                    ...p.pack.options.map((option) => ({
                      id: option.id,
                      label: option.label,
                      niveau: option.level,
                      prestations: packOptionById(option.id)[
                        option.level - 1
                      ]!.map((prestation) => ({
                        label: prestation.label,
                        status: prestation.status,
                      })),
                    })),
                  ],
                }
              : {}),
          },
        }
      : {}),
  });
  const body = {
    _id: id,
    profilprincipal: createProfile(main),
    ...(partner ? { profilconjoint: createProfile(partner) } : {}),
    profilsenfants: adherent
      .map((p, index) => {
        if (p.type === "child") return createProfile(p, index);
      })
      .filter((p) => !!p),
    adherents: {
      key:
        restdata.for === "you"
          ? 1
          : restdata.for === "you and your partner"
          ? 2
          : restdata.for === "you and your kids"
          ? 3
          : 4,
      value: restdata.for,
    },
    idtracking: versionId,
    economieimpots: {
      key: restdata.economieimpots ? 1 : 2,
      value: restdata.economieimpots ? "Oui" : "Non",
    },
    npa: restdata.npa,
    assuranceactuelle: restdata.hasInsurance,
    ...(restdata.situation
      ? {
          nouveauresident: {
            key: restdata.situation === "frontalier" ? 1 : 2,
            value: restdata.situation,
          },
        }
      : {}),
    email: restdata.email,
    nom: restdata.nom,
    prenom: restdata.prenom,
    telephone: "+" + data.phone,
    gtmparams: gtmParams,
    verified: verified,
  };
  const response = await fetch(
    `${env.NEXT_PUBLIC_APIV2_ROOT}/createleadcomparea`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    const result = (await response.json()) as { message: string };
    return Promise.reject(result.message);
  }
  const result = (await response.json()) as string;
  return Promise.resolve(result);
};

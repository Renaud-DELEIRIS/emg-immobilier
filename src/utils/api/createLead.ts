import { Adherent, schemaData } from "~/constants/lead.constant";
import { packOptionById } from "~/data/PackOption";
import { env } from "~/env.mjs";

export const sendLeadComparea = async (
  data: schemaData,
  gtmParams: Record<string, string>,
  id?: string,
  verified?: boolean
): Promise<string> => {
  if (!data.phone) return Promise.reject("Erreur téléphone manquant");
  const { adherent, ...restdata } = data;

  const main = adherent.find((p) => p.type === "main");
  const partner = adherent.find((p) => p.type === "partner");
  const children = adherent.filter((p) => p.type === "child");

  if (!main) return Promise.reject("Erreur principal manquant");

  const createProfile = (p: Adherent) => ({
    ddn: p.year,
    id: 1,
    civilite: {
      key: p.civility === "female" ? 1 : 2,
      value: p.civility,
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
      key: p.couvertureAccident === "oui" ? 1 : 2,
      value:
        p.couvertureAccident === "oui"
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
                      prestations: packOptionById(option.id)[option.level]!.map(
                        (prestation) => ({
                          label: prestation.label,
                          status: prestation.status,
                        })
                      ),
                    })),
                  ],
                }
              : {}),
          },
        }
      : {}),
  });
  const body = {
    profilprincipal: createProfile(main),
    ...(partner ? createProfile(partner) : {}),
    profilsenfants: children.map((p) => createProfile(p)),
    npa: restdata.npa,
    assuranceactuelle: restdata.actualInsurance,
    nouveauresident: {
      key: restdata.situation === "frontalier" ? 1 : 2,
      value: restdata.situation,
    },
    ...restdata,
    telephone: "+" + data.phone,
    gtmparams: gtmParams,
    verified: true,
  };
  const response = await fetch(`${env.NEXT_PUBLIC_APIV2}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const result = await response.json();
    return Promise.reject(result.message);
  }
  const result = await response.json();
  return Promise.resolve(result);
};

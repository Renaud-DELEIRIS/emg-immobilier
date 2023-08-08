import { schemaData } from "~/constants/lead.constant";
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

  const body = {
    profilprincipal: {
      ddn: main.year,
      id: 1,
      civilite: {
        key: main.civility === "female" ? 1 : 2,
        value: main.civility,
      },
      franchise: {
        key: main.franchise,
        value: main.franchise,
      },
      couverture: {
        key: main.couvertureAccident === "oui" ? 1 : 2,
        value:
          main.couvertureAccident === "oui"
            ? "Avec couverture accident"
            : "Sans couverture accident",
      },
      packselected: !!main.pack,
      completed: true,
      ...(main.pack
        ? {
            pack: {
              id: main.pack.id,
              name: main.pack.principal,
              ...(main.pack.options
                ? {
                    options: [
                      ...main.pack.options.map((option) => ({
                        id: option.id,
                        label: option.label,
                        niveau: option.level,
                        prestations: packOptionById(option.id)[
                          option.level
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
    },
    ...(partner
      ? {
          profilconjoint: {
            ddn: partner.year,
            id: 1,
            civilite: {
              key: partner.civility === "female" ? 1 : 2,
              value: partner.civility,
            },
            franchise: {
              key: partner.franchise,
              value: partner.franchise,
            },
            couverture: {
              key: partner.couvertureAccident === "oui" ? 1 : 2,
              value:
                partner.couvertureAccident === "oui"
                  ? "Avec couverture accident"
                  : "Sans couverture accident",
            },
            packselected: !!partner.pack,
            completed: true,
            ...(partner.pack
              ? {
                  pack: {
                    id: partner.pack.id,
                    name: partner.pack.principal,
                    ...(partner.pack.options
                      ? {
                          options: [
                            ...partner.pack.options.map((option) => ({
                              id: option.id,
                              label: option.label,
                              niveau: option.level,
                              prestations: packOptionById(option.id)[
                                option.level
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
          },
        }
      : {}),
    profilsenfants: children.map((p) => ({
      profilconjoint: {
        ddn: p.year,
        id: 1,
        civilite: {
          key: p.civility === "female" ? 1 : 2,
          value: p.civility,
        },
        franchise: {
          key: p.franchise,
          value: p.franchise,
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
                          prestations: packOptionById(option.id)[
                            option.level
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
      },
    })),
    npa: restdata.npa,
    assuranceactuelle: restdata.actualInsurance,
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

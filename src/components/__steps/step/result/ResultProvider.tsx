import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";
import { Adherent } from "~/constants/lead.constant";
import {
  optionHospitalisation,
  optionCapitalHospitalier,
  optionMedecineAlternative,
  optionTraitementsDentaires,
} from "~/data/PackOption";
import { env } from "~/env.mjs";
import { useFormStore } from "~/stores/form";
import { type Lamal, type Lca } from "~/types/comparatif";

interface ResultContext {
  lcaItems: Lca[];
  lamalItems: Lamal[];
  profilIndex: number;
  setProfileIndex: (profil: number) => void;
  loading: boolean;
}

const context = createContext<ResultContext>({
  lcaItems: [],
  lamalItems: [],
  profilIndex: 0,
  setProfileIndex: () => null,
  loading: false,
});

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const lead = useFormStore((state) => state.data);
  const [profilIndex, setProfileIndex] = useState<number>(0);
  const profil = lead.adherent[profilIndex] as Adherent;
  const [lcaItems, setLcaItems] = useState<Lca[]>([]);
  const [lamalItems, setLamalItems] = useState<Lamal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDataLamal = async () => {
    if (!profil) {
      return;
    }
    const p = new URLSearchParams({
      location: lead.npa?.key.toString() || "",
      yob: profil.year || "",
      franchise: profil.franchise?.replaceAll("'", "") || "",
      coverage: profil.couvertureAccident === "non" ? "0" : "1",
      insurer: lead.actualInsurance?.key.toString() || "",
    });
    const r = await fetch(`${env.NEXT_PUBLIC_SCRAPPER}?${p.toString()}`);
    const d = (await r.json()) as { data: Lamal[] };
    setLamalItems(d.data);
  };

  const fetchDataLca = async () => {
    if (!profil) {
      return;
    }
    const p = new URLSearchParams({
      age: (
        dayjs().year() - +dayjs(profil.year || "", "YYYY").year()
      ).toString(),
      sexe: profil.civility === "female" ? "Femme" : "Homme",
      pack: !profil.pack?.principal
        ? ""
        : JSON.stringify({
            id:
              profil.pack.principal === "Confort"
                ? 2
                : profil.pack.principal === "Essentiel"
                ? 1
                : 3,
            name: profil.pack.principal,
            options: profil.pack.options
              ? profil.pack.options.map((o) => {
                  return {
                    id:
                      o.label === "Hospitalisation"
                        ? 4
                        : o.label === "Capital hospitalier"
                        ? 3
                        : o.label === "Traitements dentaires"
                        ? 2
                        : 1,
                    label: o.label,
                    prestation:
                      o.label === "Hospitalisation"
                        ? optionHospitalisation[o.level - 1]
                        : o.label === "Capital hospitalier"
                        ? optionCapitalHospitalier[o.level - 1]
                        : o.label === "Traitements dentaires"
                        ? optionTraitementsDentaires[o.level - 1]
                        : optionMedecineAlternative[o.level - 1],
                  };
                })
              : undefined,
          }),
    });
    const r = await fetch(`${env.NEXT_PUBLIC_LCA || ""}?${p.toString()}`);
    const d = (await r.json()) as Lca[];
    setLcaItems(d);
  };

  useEffect(() => {
    const promises = [fetchDataLca(), fetchDataLamal()];
    setLoading(true);
    void Promise.all(promises).finally(() => setLoading(false));
  }, [profil]);

  return (
    <context.Provider
      value={{
        lcaItems,
        lamalItems,
        profilIndex: profilIndex,
        setProfileIndex: setProfileIndex,
        loading,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useResult = () => {
  return useContext(context);
};

import React, { useContext, useMemo, useState } from "react";
import { useFormStore } from "~/stores/form";

interface HypoCalculateurContext {
  prixDachat: number;
  fondsPropres: number;
  revenuAnnuels: number;
  toFinance: number;
  tauxInteretCalculatoire: number;
  ammortissement: number;
  fraisAnnexes: number;
  percent: number;
  graphData: [string, string];
  fraisMensuels: number;
  tauxInteretRetenu: number;
  tauxDentement: number;
}

const HypoCalculateurContext = React.createContext<HypoCalculateurContext>({
  prixDachat: 0,
  fondsPropres: 0,
  revenuAnnuels: 0,
  toFinance: 0,
  tauxInteretCalculatoire: 0,
  ammortissement: 0,
  fraisAnnexes: 0,
  percent: 0,
  graphData: ["0", "0"],
  fraisMensuels: 0,
  tauxInteretRetenu: 0,
  tauxDentement: 0,
});

const HypoCalculateurProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const lead = useFormStore((state) => state.data);

  const prixDachat =
    lead.which_step === "recherche bien"
      ? lead.research.budget[0]!
      : lead.bien_price;
  type FondsPropres = keyof typeof lead.fonds_propres;
  const fondsPropres = Object.keys(lead.fonds_propres).reduce(
    (acc, key) => acc + (lead.fonds_propres[key as FondsPropres] ?? 0),
    0
  );
  const revenuAnnuels =
    (lead.revenue ?? 0) +
    (lead.revenue_other.reduce((acc, value) => acc + (value.montant ?? 0), 0) ??
      0) -
    (lead.charge.reduce((acc, value) => acc + (value.montant ?? 0), 0) ?? 0);

  const [tauxInteretRetenu, setTauxInteretRetenu] = useState(5);

  const toFinance = useMemo(
    () => prixDachat - fondsPropres,
    [prixDachat, fondsPropres]
  );

  const tauxInteretCalculatoire = useMemo(
    () => toFinance * (tauxInteretRetenu / 100),
    [toFinance, tauxInteretRetenu]
  );
  const ammortissement = useMemo(() => prixDachat / 15 / 15, [prixDachat]);
  const fraisAnnexes = useMemo(() => prixDachat * 0.01, [prixDachat]);
  const percent = useMemo(() => {
    const calc =
      ((tauxInteretCalculatoire + ammortissement + fraisAnnexes) /
        revenuAnnuels) *
      100;
    if (calc > 100) return 100;
    if (calc < 0) return 0;
    return calc;
  }, [tauxInteretCalculatoire, ammortissement, fraisAnnexes, revenuAnnuels]);
  const graphData = useMemo<[string, string]>(() => {
    let fondsPropsPercent = (fondsPropres / prixDachat) * 100;
    let hypoPercent = 100 - fondsPropsPercent;
    // If value are < 0, return 0 or > 100 make them 100
    if (fondsPropsPercent < 0) fondsPropsPercent = 0;
    if (fondsPropsPercent > 100) fondsPropsPercent = 100;
    if (hypoPercent < 0) hypoPercent = 0;
    if (hypoPercent > 100) hypoPercent = 100;
    return [fondsPropsPercent.toFixed(2), hypoPercent.toFixed(2)];
  }, [fondsPropres, prixDachat]);
  const fraisMensuels = useMemo(
    () =>
      Math.round(
        (tauxInteretCalculatoire + ammortissement + fraisAnnexes) / 12
      ),
    [tauxInteretCalculatoire, ammortissement, fraisAnnexes]
  );

  const tauxDentement = useMemo(() => {
    const total = tauxInteretCalculatoire + ammortissement + fraisAnnexes;
    if (revenuAnnuels <= 0) return 1;
    const tauxEndetement = total / revenuAnnuels;
    return tauxEndetement > 1 ? 1 : tauxEndetement;
  }, [lead]);

  return (
    <HypoCalculateurContext.Provider
      value={{
        prixDachat,
        fondsPropres,
        revenuAnnuels,
        toFinance,
        tauxInteretCalculatoire,
        ammortissement,
        fraisAnnexes,
        percent,
        graphData,
        fraisMensuels,
        tauxInteretRetenu,
        tauxDentement,
      }}
    >
      {children}
    </HypoCalculateurContext.Provider>
  );
};

const useHypoCalculateur = () => useContext(HypoCalculateurContext);

export { HypoCalculateurProvider, useHypoCalculateur };

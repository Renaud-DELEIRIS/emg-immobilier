import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";
import { Prestation } from "~/data/Pack";

export interface LeadData {
  for?:
    | "you"
    | "you and your partner"
    | "you and your kids"
    | "you, your partner and your kids";
  adherent: {
    dob?: string;
    type?: "main" | "partner" | "child";
    civility?: "man" | "female";
    franchise?:
      | "300"
      | "500"
      | "1000"
      | "1500"
      | "2000"
      | "2500"
      | "0"
      | "100"
      | "200"
      | "400"
      | "600";
    couvertureAccident?: "oui" | "non";
    pack?: {
      principal: "Essentiel" | "Confort" | "Premium" | undefined | null;
      options: {
        label:
          | "Médecine alternative"
          | "Traitements dentaires"
          | "Hospitalisation"
          | "Capital hospitalier";
        level: number;
      }[];
    };

    travailSuisse?: boolean;
    couverture?: boolean;

    nom?: string;
    prenom?: string;
    nationality?: string;
  }[];
  email?: string;
  phone?: string;
  npa?: {
    key: number;
    value: string;
  };
  actualInsurance?: {
    key: number;
    value: string;
  };
  prenom?: string;
  nom?: string;
  verified?: boolean;

  situation?: "frontalier" | "future resident";

  startInsurance: string;
  paymentFrequency: "month" | "semester" | "year";
  address?: string;

  selectedAdherent: number[];
}

export type Adherent = LeadData["adherent"][0];

interface LeadContext {
  lead: LeadData;
  changeLead: (lead: Partial<LeadData>) => void;
}

const LeadContext = createContext<LeadContext>({
  lead: {
    startInsurance: `..${dayjs().year().toString()}`,
    paymentFrequency: "month",
    adherent: [],
    selectedAdherent: [],
  },
  changeLead: () => null,
});

const LeadProvider = ({ children }: { children: React.ReactNode }) => {
  const [lead, setLead] = useState<LeadData>({
    startInsurance: `..${dayjs().year().toString()}`,
    paymentFrequency: "month",
    adherent: [],
    selectedAdherent: [],
  });
  const [hasBeenSet, setHasBeenSet] = useState(false);

  useEffect(() => {
    const lead = sessionStorage.getItem("lead");
    if (lead) {
      setLead(JSON.parse(lead) as LeadData);
    }
  }, []);

  useEffect(() => {
    // If lead is empty
    if (hasBeenSet) {
      sessionStorage.setItem("lead", JSON.stringify(lead));
    }
  }, [lead, hasBeenSet]);

  const changeLead = (lead: Partial<LeadData>) => {
    setHasBeenSet(true);
    setLead((prevLead) => ({ ...prevLead, ...lead }));
  };

  return (
    <LeadContext.Provider value={{ lead, changeLead }}>
      {children}
    </LeadContext.Provider>
  );
};

const useLead = () => {
  return useContext(LeadContext);
};

export { LeadProvider, useLead };

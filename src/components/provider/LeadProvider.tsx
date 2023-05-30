import { createContext, useContext, useEffect, useState } from "react";

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
  }[];
  npa?: {
    key: number;
    value: string;
  };
  actualInsurance?: {
    key: number;
    value: string;
  };

  situation?: "frontalier" | "future resident";
}

interface LeadContext {
  lead: LeadData;
  changeLead: (lead: Partial<LeadData>) => void;
}

const LeadContext = createContext<LeadContext>({
  lead: {
    adherent: [],
  },
  changeLead: () => null,
});

const LeadProvider = ({ children }: { children: React.ReactNode }) => {
  const [lead, setLead] = useState<LeadData>({
    adherent: [],
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

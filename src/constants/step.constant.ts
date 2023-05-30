import { type LeadData } from "~/components/provider/LeadProvider";

export interface Step {
  id: StepId;
  next: (lead: LeadData) => StepId;
  previous: (lead: LeadData) => StepId | null;
  disabled: (lead: LeadData) => boolean;
  stepInfo: (lead: LeadData) => [number, number];
  bis?: boolean;
}

export type StepId =
  | "for-who"
  | "adherent"
  | "npa"
  | "situation"
  | "assurance-actuelle"
  | "franchise"
  | "package";

export const STEPS: Step[] = [
  {
    id: "for-who",
    next: (lead) => {
      return "adherent";
    },
    previous: (lead) => {
      return "for-who";
    },
    disabled: (lead) => {
      return false;
    },
    stepInfo: (lead) => {
      return [1, STEPS.length];
    },
  },
  {
    id: "adherent",
    next: (lead) => {
      return "npa";
    },
    previous: (lead) => {
      return "for-who";
    },
    disabled: (lead) => {
      if (lead.for === "you") {
        return lead.adherent.length < 1;
      }
      if (lead.for === "you and your partner") {
        return lead.adherent.length < 2;
      }
      if (lead.for === "you and your kids") {
        return lead.adherent.length < 2;
      }
      if (lead.for === "you, your partner and your kids") {
        return lead.adherent.length < 3;
      }
      return false;
    },
    stepInfo: (lead) => {
      return [2, STEPS.length];
    },
  },
  {
    id: "npa",
    next: (lead) => {
      return lead.npa?.key === -1 ? "situation" : "assurance-actuelle";
    },
    previous: (lead) => {
      return "adherent";
    },
    disabled: (lead) => {
      return lead.npa === undefined;
    },
    stepInfo: (lead) => {
      return [3, STEPS.length];
    },
  },
  {
    id: "situation",
    next: (lead) => {
      return "franchise";
    },
    previous: (lead) => {
      return "npa";
    },
    disabled: (lead) => {
      return lead.situation === undefined;
    },
    stepInfo: (lead) => {
      return [4, STEPS.length];
    },
  },
  {
    id: "assurance-actuelle",
    next: (lead) => {
      return "franchise";
    },
    previous: (lead) => {
      return "npa";
    },
    disabled: (lead) => {
      return lead.actualInsurance === undefined;
    },
    stepInfo: (lead) => {
      return [4, STEPS.length];
    },
  },
  {
    id: "franchise",
    next: (lead) => {
      return "package";
    },
    previous: (lead) => {
      return lead.npa?.key === -1 ? "situation" : "assurance-actuelle";
    },
    disabled: (lead) => {
      const main = lead.adherent.find((a) => a.type === "main");
      if (lead.for === "you") {
        return (
          main?.franchise === undefined ||
          main?.couvertureAccident === undefined
        );
      }
      const coinjoint = lead.adherent.find((a) => a.type === "partner");
      if (lead.for === "you and your partner") {
        return (
          main?.franchise === undefined ||
          main?.couvertureAccident === undefined ||
          coinjoint?.franchise === undefined ||
          coinjoint?.couvertureAccident === undefined
        );
      }
      const kids = lead.adherent.filter((a) => a.type === "child");
      if (lead.for === "you and your kids") {
        return (
          main?.franchise === undefined ||
          main?.couvertureAccident === undefined ||
          kids.some((k) => k.franchise === undefined)
        );
      }
      if (lead.for === "you, your partner and your kids") {
        return (
          main?.franchise === undefined ||
          main?.couvertureAccident === undefined ||
          coinjoint?.franchise === undefined ||
          coinjoint?.couvertureAccident === undefined ||
          kids.some((k) => k.franchise === undefined)
        );
      }
      return false;
    },
    stepInfo: (lead) => {
      return [5, STEPS.length];
    },
  },
];

export const getNextStep = (step: Step, lead: LeadData) => {
  return getStepById(step.next(lead));
};

export const isDisabled = (step: Step, lead: LeadData) => {
  return step.disabled(lead);
};

export const getStepById = (id: string) => {
  return STEPS.find((step) => step.id === id) as Step;
};

export const getPreviousStep = (step: Step, lead: LeadData) => {
  const prev = step.previous(lead);
  if (prev) {
    return getStepById(prev);
  }
  return null;
};

export const getStepInfo = (step: Step, lead: LeadData) => {
  return step.stepInfo(lead);
};

export const getActualStep = (step: Step, lead: LeadData) => {
  return getStepInfo(step, lead)[0];
};

export const getTotalStep = (step: Step, lead: LeadData) => {
  return getStepInfo(step, lead)[1];
};

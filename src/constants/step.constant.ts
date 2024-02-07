import { z } from "zod";
import { type schemaData } from "./lead.constant";

export interface Step {
  id: StepId;
  next: (lead: schemaData) => StepId;
  previous: (lead: schemaData) => StepId | null;
  disabled: (lead: schemaData) => boolean;
  stepInfo: (lead: schemaData) => [number, number];
  bis?: boolean;
}

export type StepId =
  | "car-possesion"
  | "car-brand"
  | "car-model"
  | "car-version"
  | "car-buy-date"
  | "car-distance"
  | "car-use-case"
  | "car-parking"
  | "car-donnee-personnelle"
  | "car-nationalite"
  | "car-leasing"
  | "car-cover"
  | "car-donnee-personnelle-contact"
  | "car-result"
  | "for-who"
  | "adherent"
  | "npa"
  | "situation"
  | "assurance-actuelle"
  | "franchise"
  | "work-hours"
  | "package"
  | "name"
  | "economies"
  | "loader"
  | "result-frontalier"
  | "recap-frontalier"
  | "profils"
  | "souscrire"
  | "donnee-personnelle"
  | "documents"
  | "result";

export const STEPS: Step[] = [
  {
    id: "car-possesion",
    next: (lead) => {
      return "car-brand";
    },
    previous: (lead) => {
      return "car-possesion";
    },
    disabled: (lead) => {
      return false;
    },
    stepInfo: (lead) => {
      return [1, 5];
    },
  },
  {
    id: "car-brand",
    next: (lead) => {
      return "car-model";
    },
    previous: (lead) => {
      return "car-brand";
    },
    disabled: (lead) => {
      return false;
    },
    stepInfo: (lead) => {
      return [2, 5];
    },
  },
  {
    id: "car-model",
    next: (lead) => {
      return "car-version";
    },
    previous: (lead) => {
      return "car-brand";
    },
    disabled: (lead) => {
      return false;
    },
    stepInfo: (lead) => {
      return [3, 5];
    },
  },
  {
    id: "car-version",
    next: (lead) => {
      return "car-buy-date";
    },
    previous: (lead) => {
      return "car-model";
    },
    disabled: (lead) => {
      return false;
    },
    stepInfo: (lead) => {
      return [4, 5];
    },
  },
  {
    id: "car-buy-date",
    next: (lead) => {
      return "car-distance";
    },
    previous: (lead) => {
      return "car-version";
    },
    disabled: (lead) => {
      return false;
    },
    stepInfo: (lead) => {
      return [5, 5];
    },
  },
  {
    id: "loader",
    next: (lead) => {
      return lead.situation == "frontalier" && lead.npa && lead.npa.key === -1
        ? "result-frontalier"
        : "result";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return "name";
    },
    stepInfo: (lead) => {
      if (lead.situation === "frontalier") {
        return [6, 11];
      }
      return [6, 11];
    },
  },
  {
    id: "result",
    next: (lead) => {
      return "result";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return "name";
    },
    stepInfo: (lead) => {
      return [7, 11];
    },
  },
];

export const getNextStep = (step: Step, lead: schemaData) => {
  return getStepById(step.next(lead));
};

export const isStepDisabled = (step: Step, lead: schemaData) => {
  return step.disabled(lead);
};

export const getStepById = (id: string) => {
  console.log(STEPS.find((step) => step.id === id));
  return STEPS.find((step) => step.id === id) as Step;
};

export const getPreviousStep = (step: Step, lead: schemaData) => {
  const prev = step.previous(lead);
  if (prev) {
    return getStepById(prev);
  }
  return null;
};

export const getStepInfo = (step: Step, lead: schemaData) => {
  return step.stepInfo(lead);
};

export const getActualStep = (step: Step, lead: schemaData) => {
  return getStepInfo(step, lead)[0];
};

export const getTotalStep = (step: Step, lead: schemaData) => {
  return getStepInfo(step, lead)[1];
};

export const schemaStep = z.object({
  id: z.string(),
  stepNumber: z.number(),
  lastStep: z.number(),
});

export type schemaStep = z.infer<typeof schemaStep>;

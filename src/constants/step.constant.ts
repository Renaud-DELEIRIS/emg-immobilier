import dayjs from "dayjs";
import { z } from "zod";
import { type Adherent, type schemaData } from "./lead.constant";

export interface Step {
  id: StepId;
  next: (lead: schemaData) => StepId;
  previous: (lead: schemaData) => StepId | null;
  disabled: (lead: schemaData) => boolean;
  stepInfo: (lead: schemaData) => [number, number];
  bis?: boolean;
}

export type StepId =
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
      return [1, 8];
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
      return [2, 8];
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
      return [3, 8];
    },
  },
  {
    id: "situation",
    next: (lead) => {
      return lead.situation === "future resident" ? "franchise" : "work-hours";
    },
    previous: (lead) => {
      return "npa";
    },
    disabled: (lead) => {
      return lead.situation === undefined;
    },
    stepInfo: (lead) => {
      return [4, 8];
    },
  },
  {
    id: "work-hours",
    next: (lead) => {
      return "name";
    },
    previous: (lead) => {
      return "situation";
    },
    disabled: (lead) => {
      return false;
    },
    stepInfo: (lead) => {
      return [5, 11];
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
      return [4, 8];
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
      return [5, 8];
    },
  },
  {
    id: "package",
    next: (lead) => {
      if (lead.verified && lead.nom && lead.prenom) {
        return "loader";
      }
      return "name";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return "franchise";
    },
    stepInfo: (lead) => {
      return [6, 8];
    },
  },
  {
    id: "name",
    next: (lead) => {
      if (lead.situation == "frontalier" && lead.npa && lead.npa.key === -1)
        return "loader";
      const main = lead.adherent.find((a) => a.type === "main") as Adherent;
      const age = dayjs(main.year || "", "YYYY").diff(dayjs(), "year") * -1;
      if (age >= 25 && age <= 50) {
        return "economies";
      }
      return "loader";
    },
    disabled: (lead) => {
      return (
        lead.prenom === undefined ||
        lead.nom === undefined ||
        lead.prenom === "" ||
        lead.nom === ""
      );
    },
    previous: (lead) => {
      return lead.situation == "frontalier" && lead.npa && lead.npa.key === -1
        ? "work-hours"
        : "package";
    },
    stepInfo: (lead) => {
      return [7, 8];
    },
  },
  {
    id: "economies",
    next: (lead) => {
      return "loader";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return "name";
    },
    stepInfo: (lead) => {
      return [7, 8];
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
      return [8, 8];
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
      return [9, 9];
    },
  },
  {
    id: "result-frontalier",
    next: (lead) => {
      return "recap-frontalier";
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
  {
    id: "recap-frontalier",
    next: (lead) => {
      return "profils";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return "result-frontalier";
    },
    stepInfo: (lead) => {
      return [8, 11];
    },
  },
  {
    id: "profils",
    next: (lead) => {
      return "souscrire";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return "recap-frontalier";
    },
    stepInfo: (lead) => {
      return [8, 11];
    },
  },
  {
    id: "souscrire",
    next: (lead) => {
      return "donnee-personnelle";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return lead.adherent
        .filter((p) =>
          dayjs(p.year, "YYYY").isBefore(dayjs().subtract(18, "year"))
        )
        .filter((p) => p.travailSuisse !== undefined).length === 1
        ? "recap-frontalier"
        : "profils";
    },
    stepInfo: (lead) => {
      return [9, 11];
    },
  },
  {
    id: "donnee-personnelle",
    next: (lead) => {
      return "documents";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return "souscrire";
    },
    stepInfo: (lead) => {
      return [10, 11];
    },
  },
  {
    id: "documents",
    next: (lead) => {
      return "loader";
    },
    disabled: (lead) => {
      return false;
    },
    previous: (lead) => {
      return "donnee-personnelle";
    },
    stepInfo: (lead) => {
      return [11, 11];
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

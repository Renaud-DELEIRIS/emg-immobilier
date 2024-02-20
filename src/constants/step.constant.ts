import dayjs from "dayjs";
import { z } from "zod";
import { isValidDate } from "~/utils/validation/date.validation";
import { type Data } from "./lead.constant";

export interface Step {
  id: StepId;
  next: (lead: Data) => StepId | null;
  disabled: (lead: Data) => boolean;
  group: StepGroupId;
  bis?: boolean;
  newTab?: boolean;
}

export type StepId =
  | "project"
  | "which_step"
  | "residence_type"
  | "bien_type"
  | "research_zone"
  | "research_budget"
  | "canton_bien"
  | "financement_actuel"
  | "bien_price"
  | "do_work"
  | "emprunteur"
  | "ddn"
  | "revenue"
  | "fonds_propres"
  | "loader"
  | "verif"
  | "result";

// Groups needs to be ordered
export const stepGroupId = ["project", "bien", "info"] as const;
export type StepGroupId = (typeof stepGroupId)[number];

// Steps needs to start with the first step

export const STEPS: Step[] = [
  {
    id: "project",
    next: (lead) => {
      if (lead.project === "renouveller hypothèque") return "canton_bien";
      if (lead.project === "capacité d'emprunt") return "emprunteur";
      return "which_step";
    },
    disabled: (lead) => lead.project === undefined,
    group: "project",
  },
  {
    id: "which_step",
    next: (lead) => {
      return lead.which_step === "recherche bien"
        ? "research_zone"
        : "residence_type";
    },
    disabled: (lead) => lead.which_step === undefined,
    group: "project",
  },
  {
    id: "research_zone",
    next: (lead) => {
      return "research_budget";
    },
    disabled: (lead) => lead.research.npa === undefined,
    group: "bien",
  },
  {
    id: "research_budget",
    next: (lead) => {
      return "emprunteur";
    },
    disabled: (lead) => lead.research.budget === undefined,
    group: "bien",
  },
  {
    id: "residence_type",
    next: (lead) => {
      return "bien_type";
    },
    disabled: (lead) => lead.residence_type === undefined,
    group: "bien",
  },
  {
    id: "bien_type",
    next: (lead) => {
      return "canton_bien";
    },
    disabled: (lead) => lead.bien_type === undefined,
    group: "bien",
  },
  {
    id: "canton_bien",
    next: (lead) => {
      return "bien_price";
    },
    disabled: (lead) => lead.canton_bien === undefined,
    group: "bien",
  },
  {
    id: "bien_price",
    next: (lead) => {
      if (lead.project === "renouveller hypothèque")
        return "financement_actuel";
      return "do_work";
    },
    disabled: (lead) => lead.bien_price === undefined,
    group: "bien",
  },
  {
    id: "financement_actuel",
    next: (lead) => {
      return "emprunteur";
    },
    disabled: (lead) => lead.financement_actuel === undefined,
    group: "bien",
  },
  {
    id: "do_work",
    next: (lead) => {
      return "emprunteur";
    },
    disabled: (lead) => lead.do_work === undefined,
    group: "bien",
  },
  {
    id: "emprunteur",
    next: (lead) => {
      return "ddn";
    },
    disabled: (lead) => lead.emprunteur === undefined,
    group: "info",
    newTab: true,
  },
  {
    id: "ddn",
    next: (lead) => {
      return "revenue";
    },
    disabled: (lead) =>
      lead.emprunteur === "deux"
        ? lead.ddn === undefined ||
          lead.ddn_2eme_emprunteur === undefined ||
          !!isValidDate(dayjs(lead.ddn, "YYYY-MM-DD"), {
            inPast: true,
          }) ||
          !!isValidDate(dayjs(lead.ddn_2eme_emprunteur, "YYYY-MM-DD"), {
            inPast: true,
          })
        : lead.ddn === undefined,
    group: "info",
  },
  {
    id: "revenue",
    next: (lead) => {
      return "fonds_propres";
    },
    disabled: (lead) => lead.revenue === undefined,
    group: "info",
  },
  {
    id: "fonds_propres",
    next: (lead) => {
      return "loader";
    },
    disabled: (lead) => false,
    group: "info",
  },
  {
    id: "loader",
    next: (lead) => (!lead.verified ? "verif" : "result"),
    disabled: (lead) => false,
    group: "info",
    newTab: true,
  },
  {
    id: "verif",
    next: (lead) => "result",
    disabled: (lead) => false,
    group: "info",
    newTab: true,
  },
  {
    id: "result",
    next: (lead) => null,
    disabled: (lead) => false,
    group: "info",
    newTab: true,
  },
];

export const getNextStep = (step: Step, lead: Data) => {
  return getStepById(step.next(lead) ?? step.id);
};

export const isStepDisabled = (step: StepId, lead: Data) => {
  return getStepById(step).disabled(lead);
};

export const getStepById = (id: StepId) => {
  return STEPS.find((step) => step.id === id) as Step;
};

export const getPreviousStep = (step: Step, lead: Data) => {
  let activeStep = STEPS[0]!;
  let previousStep = activeStep;
  while (activeStep.id !== step.id) {
    previousStep = activeStep;
    activeStep = getNextStep(activeStep, lead);
  }

  return previousStep;
};

export const getPreviousStepList = (step: Step, lead: Data) => {
  let activeStep = STEPS[0]!;
  const previousStepList: Step[] = [];
  let count = 0;
  while (activeStep.id !== step.id) {
    previousStepList.push(activeStep);
    activeStep = getNextStep(activeStep, lead);
    count++;
    if (count > 100) {
      console.error("Infinite loop in steps.constant.ts getPreviousStepList");
      break;
    }
  }

  return previousStepList.length > 0 ? previousStepList : [activeStep];
};

export const getStepListBetweenSteps = (
  step1: Step,
  step2: Step,
  lead: Data
) => {
  let activeStep = step1;
  const stepList: Step[] = [];
  let count = 0;
  while (activeStep.id !== step2.id) {
    stepList.push(activeStep);
    activeStep = getNextStep(activeStep, lead);
    count++;
    if (count > 100) {
      console.error(
        "Infinite loop in steps.constant.ts getStepListBetweenSteps"
      );
      break;
    }
  }

  stepList.push(step2);

  return stepList;
};

export const getStepInfo = (step: Step, lead: Data): [number, number] => {
  let stepCalc = STEPS[0]!;
  let stepNumber = 1;
  let maxStep = 1;

  while (stepCalc.next(lead) !== null) {
    stepCalc = getNextStep(stepCalc, lead);
    maxStep++;
    if (stepCalc.id === step.id) {
      stepNumber = maxStep;
    }

    if (maxStep > 100) {
      console.error("Infinite loop in steps.constant.ts getStepInfo");
      break;
    }
  }
  return [stepNumber, maxStep];
};

export const getFirstStepOfGroup = (group: StepGroupId, lead: Data) => {
  let actualStep = STEPS[0]!;
  let count = 0;
  while (actualStep.group !== group) {
    actualStep = getNextStep(actualStep, lead);
    count++;
    if (count > 100) {
      console.warn("No step found in group", group);
      return undefined;
    }
  }
  return actualStep;
};

const getMappedDisplay = (lead: Data) => {
  const mappedStepDisplay: StepId[][] = [];
  let startStep = STEPS[0]!;
  let count = 0;

  let tempMap: StepId[] = [];
  while (startStep.next(lead) !== null) {
    if (startStep.newTab) {
      mappedStepDisplay.push(tempMap);

      tempMap = [];
    }
    tempMap.push(startStep.id);

    startStep = getNextStep(startStep, lead);

    count++;
    if (count > 100) {
      throw new Error(
        "Infinite loop in steps.constant.ts getComponentToDisplay"
      );
    }
  }
  if (startStep.newTab) {
    mappedStepDisplay.push(tempMap);
    tempMap = [startStep.id];
    mappedStepDisplay.push(tempMap);
  } else {
    tempMap.push(startStep.id);
    mappedStepDisplay.push(tempMap);
  }

  return mappedStepDisplay;
};

export const isLastStepDisplayed = (
  visibleStepId: StepId,
  maxStepId: StepId,
  lead: Data
) => {
  const mappedStepDisplay: StepId[][] = getMappedDisplay(lead);
  const getContainedArray = (stepId: StepId) =>
    mappedStepDisplay.find((array) => array.includes(stepId));

  let stepContainedArray = getContainedArray(visibleStepId);

  if (stepContainedArray?.includes(maxStepId)) {
    stepContainedArray = stepContainedArray.slice(
      0,
      stepContainedArray.indexOf(maxStepId) + 1
    );
  }

  const isLastStep = stepContainedArray?.[stepContainedArray.length - 1];
  return isLastStep === visibleStepId;
};

export const getComponentToDisplay = (
  visibleStepId: StepId,
  maxStepId: StepId,
  lead: Data
) => {
  const mappedStepDisplay: StepId[][] = getMappedDisplay(lead);

  // Find the array in mappedStepDisplay that contains the visibleStepId
  const visibleStepIndex = mappedStepDisplay.findIndex((stepArray) =>
    stepArray.includes(visibleStepId)
  );
  let arrayToDisplay = mappedStepDisplay[visibleStepIndex];

  if (!arrayToDisplay) {
    return [];
  }

  // If maxStepId is in the array, we slice the array to display only the steps before maxStepId
  if (arrayToDisplay.includes(maxStepId)) {
    const maxStepIndex = arrayToDisplay.indexOf(maxStepId);
    arrayToDisplay = arrayToDisplay.slice(0, maxStepIndex + 1);
  }

  return arrayToDisplay;
};

export const schemaStep = z.object({
  id: z.string(),
  stepNumber: z.number(),
  lastStep: z.number(),
});

export type schemaStep = z.infer<typeof schemaStep>;

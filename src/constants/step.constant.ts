import { z } from "zod";
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
  | "pays_residence"
  | "canton_work"
  | "regime_assurance_maladie"
  | "nationality"
  | "permis_type"
  | "npa"
  | "situation_marital"
  | "yob"
  | "children"
  | "info"
  | "situation_professionnelle"
  | "salary_brut"
  | "salary_above_120k"
  | "owner"
  | "situation"
  | "loader"
  | "result";

// Groups needs to be ordered
export const stepGroupId = [
  "residence",
  "info",
  "professional",
  "situation",
] as const;
export type StepGroupId = (typeof stepGroupId)[number];

// Steps needs to start with the first step

export const STEPS: Step[] = [
  {
    id: "pays_residence",
    next: (lead) => {
      if (lead.pays_residence === "suisse") {
        return "nationality";
      }
      return "canton_work";
    },
    disabled: (lead) => lead.pays_residence === undefined,
    group: "residence",
  },
  {
    id: "canton_work",
    next: (lead) => "regime_assurance_maladie",
    disabled: (lead) => lead.canton_work === undefined,
    group: "residence",
  },
  {
    id: "regime_assurance_maladie",
    next: (lead) => "situation_marital",
    disabled: (lead) => lead.regime_assurance_maladie_frontalier === undefined,
    group: "residence",
  },
  {
    id: "nationality",
    next: (lead) => (lead.nationality === "suisse" ? "npa" : "permis_type"),
    disabled: (lead) => lead.nationality === undefined,
    group: "residence",
  },
  {
    id: "permis_type",
    next: (lead) => "npa",
    disabled: (lead) => lead.permis_type === undefined,
    group: "residence",
  },
  {
    id: "npa",
    next: (lead) => "situation_marital",
    disabled: (lead) => lead.npa === undefined,
    group: "residence",
  },
  {
    id: "situation_marital",
    next: (lead) => "yob",
    disabled: (lead) => lead.situation_marital === undefined,
    group: "info",
  },
  {
    id: "yob",
    next: (lead) => "children",
    disabled: (lead) => lead.yob === undefined || lead.yob.length !== 4,
    group: "info",
  },
  {
    id: "children",
    next: (lead) => "info",
    disabled: (lead) => lead.child_nb === undefined,
    group: "info",
  },
  {
    id: "info",
    next: () => "situation_professionnelle",
    disabled: (lead) => !lead.nom,
    group: "info",
  },
  {
    id: "situation_professionnelle",
    next: (lead) =>
      lead.permis_type === "B" ? "salary_above_120k" : "salary_brut",
    disabled: (lead) => lead.situation_professionnelle === undefined,
    group: "professional",
    newTab: true,
  },
  {
    id: "salary_brut",
    next: (lead) => "owner",
    disabled: (lead) => lead.salary_brut === undefined,
    group: "professional",
  },
  {
    id: "salary_above_120k",
    next: (lead) => "owner",
    disabled: (lead) => lead.is_salary_above_120k === undefined,
    group: "professional",
  },
  {
    id: "owner",
    next: (lead) => "situation",
    disabled: (lead) => lead.is_owner_property === undefined,
    group: "professional",
  },
  {
    id: "situation",
    next: (lead) => "loader",
    disabled: (lead) => lead.situation === undefined,
    group: "situation",
  },
  {
    id: "loader",
    next: (lead) => "result",
    disabled: (lead) => false,
    group: "situation",
  },
  {
    id: "result",
    next: (lead) => null,
    disabled: (lead) => false,
    group: "situation",
  },
];

export const getNextStep = (step: Step, lead: Data) => {
  return getStepById(step.next(lead) ?? step.id);
};

export const isStepDisabled = (step: Step, lead: Data) => {
  return step.disabled(lead);
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
  let arrayToDisplay = mappedStepDisplay[visibleStepIndex] as StepId[];

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

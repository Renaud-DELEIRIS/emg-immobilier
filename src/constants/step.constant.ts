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

export type StepId = "for-who" | "npa" | "name";

// Groups needs to be ordered
export const stepGroupId = ["my_car", "needs"] as const;
export type StepGroupId = (typeof stepGroupId)[number];

// Steps needs to start with the first step

export const STEPS: Step[] = [
  {
    id: "for-who",
    group: "my_car",
    next: (lead) => {
      return "npa";
    },
    disabled: (lead) => {
      return false;
    },
  },
  {
    id: "npa",
    group: "my_car",
    next: (lead) => {
      return "name";
    },
    disabled: (lead) => {
      return false;
    },
  },
  {
    id: "name",
    group: "needs",
    newTab: true,
    next: (lead) => {
      return null;
    },
    disabled: (lead) => {
      return false;
    },
  },
];

export const getNextStep = (step: Step, lead: Data) => {
  return getStepById(step.next(lead) ?? step.id);
};

export const isStepDisabled = (step: Step, lead: Data) => {
  return step.disabled(lead);
};

export const getStepById = (id: string) => {
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
      throw new Error("Infinite loop in steps.constant.ts getStepInfo");
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

export const isLastStepDisplayed = (visibleStepId: StepId, lead: Data) => {
  const mappedStepDisplay: StepId[][] = getMappedDisplay(lead);
  const getContainedArray = (stepId: StepId) =>
    mappedStepDisplay.find((array) => array.includes(stepId));

  const stepContainedArray = getContainedArray(visibleStepId);
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

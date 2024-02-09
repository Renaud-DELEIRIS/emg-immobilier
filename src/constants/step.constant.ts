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
  | "car_type"
  | "car_info"
  | "car_distance"
  | "car_usage"
  | "car_park_place"
  | "car_park_type"
  | "civility"
  | "dob"
  | "nationality"
  | "residency_type"
  | "eco_assurance_menage"
  | "car_leasing"
  | "needs"
  | "contract_start"
  | "already_assure"
  | "info"
  | "loader"
  | "result";

// Groups needs to be ordered
export const stepGroupId = [
  "my_car",
  "car_usage",
  "my_info",
  "my_needs",
  "my_contact",
] as const;
export type StepGroupId = (typeof stepGroupId)[number];

// Steps needs to start with the first step

export const STEPS: Step[] = [
  {
    id: "car_type",
    next: (lead) => {
      return "car_info";
    },
    disabled: (lead) => lead.car_type === undefined,
    group: "my_car",
  },
  {
    id: "car_info",
    next: (lead) => {
      return "car_distance";
    },
    disabled: (lead) => false,
    group: "my_car",
  },
  {
    id: "car_distance",
    next: (lead) => {
      return "car_usage";
    },
    disabled: (lead) => lead.car_distance === undefined,
    group: "car_usage",
  },
  {
    id: "car_usage",
    next: (lead) => {
      return "car_park_place";
    },
    disabled: (lead) => lead.car_usage === undefined,
    group: "car_usage",
  },
  {
    id: "car_park_place",
    next: (lead) => {
      return "car_park_type";
    },
    disabled: (lead) => lead.car_park_place === undefined,
    group: "car_usage",
  },
  {
    id: "car_park_type",
    next: (lead) => {
      return "civility";
    },
    disabled: (lead) => lead.car_park_type === undefined,
    group: "car_usage",
  },
  {
    id: "civility",
    next: (lead) => {
      return "dob";
    },
    disabled: (lead) => lead.civility === undefined,
    group: "my_info",
    newTab: true,
  },
  {
    id: "dob",
    next: (lead) => {
      return "nationality";
    },
    disabled: (lead) =>
      isValidDate(dayjs(lead.dob), { inPast: true, today: true }) !== undefined,
    group: "my_info",
  },
  {
    id: "nationality",
    next: (lead) => {
      return "residency_type";
    },
    disabled: (lead) => lead.nationality === undefined,
    group: "my_info",
  },
  {
    id: "residency_type",
    next: (lead) => {
      return "eco_assurance_menage";
    },
    disabled: (lead) => lead.residency_type === undefined,
    group: "my_info",
  },
  {
    id: "eco_assurance_menage",
    next: (lead) => {
      return "car_leasing";
    },
    disabled: (lead) => lead.eco_assurance_menage === undefined,
    group: "my_info",
  },
  {
    id: "car_leasing",
    next: (lead) => {
      return "needs";
    },
    disabled: (lead) => lead.car_leasing === undefined,
    group: "my_needs",
    newTab: true,
  },
  {
    id: "needs",
    next: (lead) => {
      return "contract_start";
    },
    disabled: (lead) => lead.needs === undefined,
    group: "my_needs",
  },
  {
    id: "contract_start",
    next: (lead) => {
      return "already_assure";
    },
    disabled: (lead) =>
      isValidDate(dayjs(lead.contract_start), { inPast: true }) !== undefined,
    group: "my_needs",
  },
  {
    id: "already_assure",
    next: (lead) => {
      return "info";
    },
    disabled: (lead) => lead.already_assure === undefined,
    group: "my_needs",
  },
  {
    id: "info",
    next: (lead) => {
      return "loader";
    },
    disabled: (lead) => false,
    group: "my_contact",
    newTab: true,
  },
  {
    id: "loader",
    next: (lead) => {
      return "result";
    },
    disabled: (lead) => false,
    group: "my_contact",
    newTab: true,
  },
  {
    id: "result",
    next: (lead) => {
      return null;
    },
    disabled: (lead) => false,
    group: "my_contact",
    newTab: true,
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

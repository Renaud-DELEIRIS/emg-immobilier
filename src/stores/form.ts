/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Router from "next/router";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { initialData, schemaData } from "~/constants/lead.constant";
import { STEPS, Step, StepId, getStepById } from "~/constants/step.constant";
import { trcpProxyClient } from "~/utils/api";
import getParamsUrl from "~/utils/client/getParamsUrl";
import { getStepComponent } from "./getComponent";
import { useSessionStore } from "./session";

interface FormState {
  currentStep: Step;
  currentVisibleStep: Step;
  previousStep: Step | null;
  previousVisibleStep: Step | null;
  nextStep: (stepId: StepId, data?: schemaData) => void;
  backStep: () => void;
  getStepComponent: () => JSX.Element;
  getNextStep: (stepId: StepId, data?: schemaData) => Step | undefined;
  initStep: () => void;
  restoreCurrentStep: (stepId: string) => void;
  setVisibleStep: (stepId: string) => void;
  isVisibleStepValid: () => {
    success: boolean;
    errors?: { path: string; error: string }[];
  };
  isStepValid: (step: Step) => {
    success: boolean;
    errors?: { path: string; error: string }[];
  };
  data: schemaData;
  setData: (d: Partial<schemaData>) => void;
  errors: Record<string, string>;
  versionId: string | null;
  setVersionId: (versionId: string) => void;
  trackDurationStep: (step: Step, duration: number) => void;
}

let refTimeout: NodeJS.Timeout | null = null;

export const useFormStore = create<FormState>()(
  devtools(
    persist(
      (set, get) => ({
        versionId: null,
        setVersionId: (v) => set({ versionId: v }),
        trackDurationStep: (step, duration) => {
          const versionId = get().versionId;
          if (versionId) {
            void trcpProxyClient.trackDurationStep.mutate({
              versionId: versionId,
              stepId: step.id,
              duration,
            });
          }
        },
        previousStep: null,
        previousVisibleStep: null,
        currentStep: STEPS[0]!,
        currentVisibleStep: STEPS[0]!,
        nextStep: (stepId: StepId, newData) => {
          const nextStep = get().getNextStep(stepId, newData);
          const { success, errors } = get().isStepValid(getStepById(stepId));
          if (success) {
            setTimeout(() => {
              if (!nextStep) return;
              const element = document.getElementById(nextStep.id);
              if (element) {
                const offsetTop =
                  element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                  top: offsetTop - 100,
                  behavior: "smooth",
                });
              }
            }, 100);

            set((state) => ({
              ...state,
              errors: {},
              previousStep: get().currentStep,
              previousVisibleStep: get().currentVisibleStep,
              currentStep: nextStep ?? get().currentStep,
              currentVisibleStep: nextStep ?? get().currentStep,
            }));
            const sessionId = useSessionStore.getState().sessionId;
            const versionId = get().versionId;
            if (sessionId && versionId) {
              void trcpProxyClient.updateSession.mutate({
                sessionId: sessionId,
                versionId: versionId,
                data: get().data,
                currentStep: {
                  id: nextStep?.id || "",
                  stepNumber: nextStep?.stepInfo(get().data)[0] || 0,
                  lastStep: nextStep?.stepInfo(get().data)[1] || 0,
                },
              });
            }
            const queryParams = getParamsUrl();
            void Router.push(
              {
                query: {
                  ...queryParams,
                  step: nextStep?.id,
                },
              },
              undefined,
              {
                shallow: true,
              }
            );
          } else if (errors) {
            set((state) => ({
              ...state,
              errors: {
                ...state.errors,
                ...errors.reduce(
                  (acc, { path, error }) => ({ ...acc, [path]: error }),
                  {}
                ),
              },
            }));
          }
        },

        getStepComponent: () => {
          return getStepComponent(
            get().currentVisibleStep.id,
            get().backStep,
            get().data
          );
        },
        backStep() {
          const prevStepId = get().currentVisibleStep.previous(get().data);
          if (!prevStepId) return;

          const previousStep = getStepById(prevStepId);

          set((state) => ({
            ...state,
            errors: {},
            currentVisibleStep: previousStep ?? get().currentStep,
          }));
        },

        setVisibleStep: (stepId) => {
          const selectedStep = STEPS.find((s) => s.id === stepId)!;
          const { success, errors } = get().isVisibleStepValid();
          if (success || selectedStep.id < get().currentStep.id) {
            set((state) => ({
              ...state,
              errors: {},
              previousVisibleStep: get().currentVisibleStep,
              currentVisibleStep: selectedStep,
            }));

            const queryParams = getParamsUrl();
            void Router.push(
              {
                query: {
                  ...queryParams,
                  step: selectedStep.id || "",
                },
              },
              undefined,
              {
                shallow: true,
              }
            );
          } else if (errors) {
            set((state) => ({
              ...state,
              errors: {
                ...state.errors,
                ...errors.reduce(
                  (acc, { path, error }) => ({ ...acc, [path]: error }),
                  {}
                ),
              },
            }));
          }
        },
        restoreCurrentStep: (stepId) => {
          const selectedStep = STEPS.find((s) => s.id === stepId)!;
          set((state) => ({
            ...state,
            errors: {},
            currentStep: selectedStep,
            currentVisibleStep: selectedStep,
          }));
        },
        data: initialData,
        errors: {},
        setData: (d) => {
          const nextData: schemaData = { ...get().data, ...d };
          set((state) => ({ ...state, data: nextData, errors: {} }));
          if (refTimeout) clearTimeout(refTimeout);
          refTimeout = setTimeout(() => {
            const sessionId = useSessionStore.getState().sessionId;
            const versionId = get().versionId;
            if (sessionId && versionId) {
              void trcpProxyClient.updateSession.mutate({
                sessionId: sessionId,
                versionId: versionId,
                data: nextData,
                currentStep: {
                  id: get().currentStep.id,
                  stepNumber: get().currentStep.stepInfo(nextData)[0],
                  lastStep: get().currentStep.stepInfo(nextData)[1],
                },
              });
            }
          }, 1500);
        },
        isVisibleStepValid: () => {
          return get().isStepValid(get().currentVisibleStep);
        },
        isStepValid: (step) => {
          return { success: !step.disabled(get().data) };
        },
        initStep() {
          const currentStep = STEPS.find((s) => s.id === get().currentStep.id)!;
          const currentVisibleStep = STEPS.find(
            (s) => s.id === get().currentVisibleStep.id
          )!;
          set((state) => ({
            ...state,
            currentStep: currentStep,
            currentVisibleStep: currentVisibleStep,
          }));
        },
        getNextStep: (stepId: StepId, newData) =>
          getStepById(getStepById(stepId).next(newData ? newData : get().data)),
      }),
      {
        name: "form-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);

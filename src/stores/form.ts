import {
  getPreviousStep,
  getPreviousStepList,
  getStepListBetweenSteps,
} from "./../constants/step.constant";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { i18n } from "next-i18next";
import Router from "next/router";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Data, initialData } from "~/constants/lead.constant";
import {
  STEPS,
  Step,
  StepId,
  getStepById,
  getStepInfo,
} from "~/constants/step.constant";
import { trcpProxyClient } from "~/utils/api";
import getParamsUrl from "~/utils/client/getParamsUrl";
import { useSessionStore } from "./session";

interface SetStepOpts {
  scrollToNextStep?: boolean;
  bypassSameStep?: boolean;
}

interface FormState {
  currentStep: Step;
  currentVisibleStep: Step;
  nextStep: (stepId: StepId, data?: Partial<Data>, opts?: SetStepOpts) => void;
  backStep: (from?: StepId) => void;
  getNextStep: (stepId: StepId, data?: Data) => Step;
  resetStep: () => void;
  initStep: () => void;
  onRouterChange: () => void;
  setVisibleStep: (stepId: StepId, opts?: SetStepOpts) => void;
  data: Data;
  stepWithError: StepId[];
  setData: (d: Partial<Data>) => void;

  versionId: string | null;
  setVersionId: (versionId: string) => void;
  trackDurationStep: (step: Step, duration: number) => void;

  loaded: boolean;
}

let refTimeout: NodeJS.Timeout | null = null;

export const useFormStore = create<FormState>()(
  devtools(
    persist(
      (set, get) => ({
        versionId: null,
        data: initialData,
        stepWithError: [],
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
        currentStep: STEPS[0]!,
        currentVisibleStep: STEPS[0]!,
        loaded: false,
        nextStep: (
          stepId: StepId,
          newData,
          opts = {
            scrollToNextStep: true,
          }
        ) => {
          const nextStep = get().getNextStep(stepId, {
            ...get().data,
            ...newData,
          });

          // Probably the last step of the form
          if (nextStep.id === stepId) return;

          get().setVisibleStep(nextStep.id, opts);
        },

        setVisibleStep: (
          stepId: StepId,
          opts = {
            scrollToNextStep: true,
            bypassSameStep: false,
          }
        ) => {
          const nextStep = getStepById(stepId);
          if (!nextStep) return;

          // If there is newTab between nextStep and previousStep
          const listBetweenStep = getStepListBetweenSteps(
            getPreviousStepList(
              getStepById(get().currentVisibleStep.id),
              get().data
            )[0]!,
            nextStep,
            get().data
          );

          const hasNewTab = listBetweenStep.some((step) => step.newTab);

          if (hasNewTab) {
            const previouStepList = getPreviousStepList(nextStep, get().data);
            // Check if some step before nextStep is not completed
            // Check for disabled steps
            const disabledStep = previouStepList.filter((step) =>
              step.disabled(get().data)
            );
            if (disabledStep.length > 0) {
              set((state) => ({
                ...state,
                stepWithError: disabledStep.map((s) => s.id),
              }));
              get().setVisibleStep(disabledStep[0]!.id, {
                scrollToNextStep: true,
                bypassSameStep: true,
              });
              toast.error(i18n?.t("common:please_complete_previous_steps"));
              return;
            }
          }

          if (
            get().currentVisibleStep.id === nextStep.id &&
            !opts.bypassSameStep
          )
            return;

          const stepInfo = getStepInfo(nextStep, get().data);
          const currentStepInfo = getStepInfo(get().currentStep, get().data);
          if (opts.scrollToNextStep)
            setTimeout(() => {
              const element = document.getElementById(nextStep.id);
              if (element) {
                const offsetTop =
                  element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                  top: offsetTop - 100,
                  behavior: "smooth",
                });

                // Focus on first focusable element
                const focusableElement = element.querySelector(
                  "input, select, textarea, button"
                ) as HTMLElement;
                if (focusableElement) {
                  focusableElement.focus({
                    preventScroll: true,
                  });
                }
              }
            }, 100);
          set((state) => ({
            ...state,
            errors: {},
            currentStep:
              stepInfo[0] > currentStepInfo[0] ? nextStep : state.currentStep,
            currentVisibleStep: nextStep,
          }));

          const sessionId = useSessionStore.getState().sessionId;
          const versionId = get().versionId;
          if (sessionId && versionId) {
            void trcpProxyClient.updateSession.mutate({
              sessionId: sessionId,
              versionId: versionId,
              data: get().data,
              currentStep: {
                id: nextStep.id,
                stepNumber: getStepInfo(nextStep, get().data)[0],
                lastStep: getStepInfo(nextStep, get().data)[1],
              },
            });
          }
          const queryParams = getParamsUrl();
          void Router.push(
            {
              query: {
                ...queryParams,
                step: nextStep.id,
              },
            },
            undefined,
            {
              shallow: true,
            }
          );
        },

        backStep(from) {
          const prevStep = from
            ? getPreviousStep(getStepById(from), get().data)
            : getPreviousStep(get().currentVisibleStep, get().data);
          if (!prevStep) return;

          get().setVisibleStep(prevStep.id);
        },

        setData: (d) => {
          const nextData: Data = { ...get().data, ...d };
          set((state) => ({ ...state, data: nextData, errors: {} }));
          const newStepWithError = get()
            .stepWithError.map((stepId) => {
              const step = getStepById(stepId);
              return step.disabled(nextData) ? stepId : null;
            })
            .filter(Boolean) as StepId[];
          set((state) => ({ ...state, stepWithError: newStepWithError }));
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
                  stepNumber: getStepInfo(get().currentStep, nextData)[0],
                  lastStep: getStepInfo(get().currentStep, nextData)[1],
                },
              });
            }
          }, 1500);
        },
        resetStep() {
          set((state) => ({
            backStep: state.backStep,
            currentStep: STEPS[0]!,
            loaded: true,
            currentVisibleStep: STEPS[0]!,
            data: initialData,
            getNextStep: state.getNextStep,
            initStep: state.initStep,
            nextStep: state.nextStep,
            resetStep: state.resetStep,
            setData: state.setData,
            setVersionId: state.setVersionId,
            setVisibleStep: state.setVisibleStep,
            trackDurationStep: state.trackDurationStep,
            versionId: state.versionId,
          }));
        },
        initStep() {
          const currentStep = STEPS.find((s) => s.id === get().currentStep.id)!;

          // get step from router if it exists
          const queryParams = getParamsUrl();
          const stepId = queryParams.step as StepId;
          const stepFromRouter = getStepById(stepId);

          let validStepFromRouter = false;

          if (stepFromRouter) {
            validStepFromRouter =
              getStepInfo(stepFromRouter, get().data)[0] <=
              getStepInfo(currentStep, get().data)[0];
          }

          const currentVisibleStep = STEPS.find(
            (s) => s.id === get().currentVisibleStep.id
          )!;

          get().setVisibleStep(
            validStepFromRouter ? stepFromRouter.id : currentVisibleStep.id,
            {
              scrollToNextStep: true,
              bypassSameStep: true,
            }
          );

          set((state) => ({
            ...state,
            loaded: true,
          }));
        },
        onRouterChange() {
          const queryParams = getParamsUrl();
          const stepId = queryParams.step as StepId;
          const stepFromRouter = getStepById(stepId);
          if (stepFromRouter) {
            get().setVisibleStep(stepFromRouter.id, {
              scrollToNextStep: true,
              bypassSameStep: false,
            });
          }
        },
        getNextStep: (stepId: StepId, newData) => {
          const next = getStepById(stepId).next(newData ? newData : get().data);
          if (!next) return getStepById(stepId);
          return getStepById(next);
        },
      }),
      {
        name: "form-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);

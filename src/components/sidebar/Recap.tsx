export const a = 1;

// import { type Step } from "~/constants/step.constant";
// import { useMemo } from "react";
// import { useSteps } from "../provider/StepsProvider";
// import RecapLink from "./RecapLink";
// import RecapTitle from "./RecapTitle";

// interface ParsedSteps extends Step {
//   type: "title" | "link";
//   id: number;
//   passed: boolean;
//   active: boolean;
//   steps?: ParsedSteps[];
// }

// const Recap = () => {
//   const { steps, currentStep, activeStep, setActiveStep } = useSteps();

//   const titles = useMemo(() => {
//     const titles: ParsedSteps[] = [];
//     steps.forEach((step, index) => {
//       if (titles.find((title) => title.name === step.parent)) return;
//       if (step.parent) {
//         titles.push({
//           type: "title",
//           passed: index <= currentStep,
//           active: index === activeStep,
//           id: steps.length + index + 1,
//           name: step.parent,
//         });
//       }
//     });
//     return titles;
//   }, [steps, activeStep, currentStep]);

//   const parsedSteps: ParsedSteps[] = useMemo(() => {
//     const parsedSteps: ParsedSteps[] = [];
//     steps.forEach((step, index) => {
//       if (step.parent) {
//         const title = titles.find((title) => title.name === step.parent);
//         if (title) {
//           if (!title.steps) {
//             title.steps = [];
//           }
//           title.steps.push({
//             ...step,
//             type: "link",
//             passed: index <= currentStep,
//             active: index === activeStep,
//             id: index,
//           });
//           if (!parsedSteps.find((parsedStep) => parsedStep.name === title.name))
//             parsedSteps.push(title);
//         }
//       } else {
//         parsedSteps.push({
//           ...step,
//           type: "link",
//           passed: index <= currentStep,
//           active: index === activeStep,
//           id: index,
//         });
//       }
//     });
//     return parsedSteps;
//   }, [steps, currentStep, activeStep, titles]);

//   return (
//     <nav className="flex flex-col gap-6">
//       {parsedSteps.map((step) => {
//         if (step.type === "link") {
//           return (
//             <div key={step.id} className="pl-4">
//               <RecapLink
//                 passed={step.passed}
//                 active={step.active}
//                 noParent
//                 onClick={() => {
//                   setActiveStep(step.id);
//                 }}
//               >
//                 {step.name}
//               </RecapLink>
//             </div>
//           );
//         } else {
//           return (
//             <div key={step.id}>
//               <RecapTitle passed={step.passed}>{step.name}</RecapTitle>
//               <div className="flex flex-col pl-2">
//                 {step.steps?.map((innerStep, i) => {
//                   return (
//                     <div key={innerStep.id} className="pl-2">
//                       <RecapLink
//                         passed={innerStep.passed}
//                         active={innerStep.active}
//                         first={i === 0}
//                         last={i === step.steps!.length - 1}
//                         onClick={() => {
//                           setActiveStep(innerStep.id);
//                         }}
//                       >
//                         {innerStep.name}
//                       </RecapLink>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         }
//       })}
//     </nav>
//   );
// };

// export default Recap;

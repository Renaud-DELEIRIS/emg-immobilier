import { useEffect, useId, useState } from "react";

interface StepLoaderProps {
  timePerStep: number;
  children: React.ReactNode[];
  onFinished?: () => void;
  timeBeforeFirstStep?: number;
}

const StepLoader = ({
  timePerStep,
  children,
  onFinished,
  timeBeforeFirstStep = 100,
}: StepLoaderProps) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const id = useId();

  useEffect(() => {
    let internal = currentStep;
    console.log(internal);
    let interval: NodeJS.Timeout;
    if (internal === -1) {
      interval = setTimeout(() => {
        setCurrentStep((currentStep) => currentStep + 1);
        internal++;
        interval = setInterval(() => {
          setCurrentStep((currentStep) => currentStep + 1);
          internal++;
          if (internal === children.length) {
            if (onFinished) onFinished();
            clearInterval(interval);
          }
        }, timePerStep);
      }, timeBeforeFirstStep);
    } else {
      interval = setInterval(() => {
        setCurrentStep((currentStep) => currentStep + 1);
        internal++;
        if (internal === children.length - 1 && onFinished) {
          onFinished();
        }
        if (internal === children.length - 1) {
          clearInterval(interval);
        }
      }, timePerStep);
    }
    return () => clearInterval(interval);
  }, [timePerStep]);

  return (
    <div className="flex flex-col gap-4">
      {children.map((child, index) => (
        <div
          key={index}
          style={index <= currentStep ? { opacity: 1 } : { opacity: 0.2 }}
          className="flex items-center gap-2 transition-opacity  duration-500 md:gap-8"
        >
          <div className="h-10 w-10 flex-shrink-0">
            {index <= currentStep && (
              // Display the check loader when the step is active at /load.mp4
              <img
                src={"/load.gif?t=" + index.toString() + id}
                alt="load"
                width={40}
                height={40}
              />
            )}
          </div>
          <span className="text-xl text-gray-600">{child}</span>
        </div>
      ))}
    </div>
  );
};

export default StepLoader;

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import { IconInfoCircle } from "@tabler/icons-react";
import { cn } from "~/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    wrapperClassName?: string;
    label?: string;
    tooltip?: string;
  }
>(({ className, wrapperClassName, label, tooltip, ...props }, ref) => {
  const id = React.useId();
  return (
    <div className={twMerge("w-full", wrapperClassName)}>
      {label && (
        <label
          className="mb-[10px] block text-sm font-medium opacity-80"
          htmlFor={id}
        >
          {label}
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <IconInfoCircle size={16} />
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </label>
      )}
      <div className="flex w-full flex-col">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          id={id}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-md bg-[#EAE9EA]">
            <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary/70 to-primary" />
          </SliderPrimitive.Track>
          {
            // Create a thumb for each value
            props.value &&
              props.value.map((value, i) => (
                <SliderPrimitive.Thumb
                  key={i}
                  className="block h-6 w-6 rounded-full bg-primary bg-[url('/slider.svg')] bg-contain bg-center bg-no-repeat ring-offset-white transition-colors focus:ring-4 focus:ring-primary/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                />
              ))
          }
        </SliderPrimitive.Root>
        <div className="mt-4 flex justify-between">
          {props.min && (
            <span className="text-xs font-medium opacity-80">
              {props.min.toLocaleString()}
            </span>
          )}
          {props.max && (
            <span className="text-xs font-medium opacity-80">
              {props.max.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

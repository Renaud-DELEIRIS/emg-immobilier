import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { useTranslation } from "next-i18next";
import { cn } from "~/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-xl py-[14px] px-[24px] [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50",
        destructive:
          "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900",
        info: "bg-[#EBF5FF] !text-[#2D50E6] [&>svg]:text-[#2D50E6]",
        danger: "bg-[#FCEEF1] !text-[#730000] [&>svg]:text-[#730000]",
        success: "bg-[#F6FAFB] !text-secondary [&>svg]:text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> & {
      noTitle?: boolean;
    }
>(({ className, variant, children, noTitle = false, ...props }, ref) => {
  const { t } = useTranslation("common");

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex flex-col gap-0.5">
        {!noTitle && (
          <span className="text-lg font-bold tracking-[-0.36px]">
            {t("alert." + (variant ?? ""))}
          </span>
        )}
        <span>{children}</span>
      </div>
    </div>
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };

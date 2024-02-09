import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[56px] text-base font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-center",
  {
    variants: {
      variant: {
        default: "bg-[#60dcd499] text-dark hover:bg-[#60DCD4]",
        "outline-thirdy": "border-2 border-thirdy text-dark hover:bg-thirdy/5",
        thirdy: "bg-thirdy text-white hover:bg-thirdy/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        ghost: "text-secondary bg-[#0CBCB026] hover:bg-[#0CBCB044]",
      },
      size: {
        default: "h-[56px] px-[26px]",
        xs: "h-[40px] px-[21px]",
        sm: "h-[50px] px-[21px]",
        lg: "h-11 rounded-md px-8",
        icon: "h-11 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, disabled, loading, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    if (Comp !== "button") {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        ></Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        <>
          {props.children}
          {loading && (
            <IconLoader2
              className="ml-2 animate-spin"
              size={20}
              strokeWidth={2}
            />
          )}
        </>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

import { IconLoader } from "@tabler/icons-react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { type ReactNode } from "react";
import type DefaultProps from "~/types/DefaultProps";

interface ButtonProps extends DefaultProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonClass = cva(
  "border-2 active:scale-105 scale-100 duration-150 disabled:opacity-50 disabled:pointer-events-none text-center font-semibold",
  {
    variants: {
      intent: {
        primary: [
          "bg-primary ",
          "hover:bg-primary-600 border-primary-500/80",
          "text-white",
        ],
        secondary: ["text-neutral-500 border-transparent"],
        outline: [
          "bg-transparent",
          "hover:bg-primary border-[#E0E2E4] bg-white",
          "text-primary hover:text-white hover:border-primary-500/80",
        ],

        none: [""],
      },
      rounded: {
        xs: ["rounded-xs"],
        sm: ["rounded-sm"],
        md: ["rounded-md"],
        lg: ["rounded-lg"],
        xl: ["rounded-xl"],
      },
      size: {
        small: ["text-sm", "", "px-3 py-2"],
        medium: ["text-base", "py-4", "px-4"],
        large: ["text-lg", "py-2", "px-6", "h-16"],
      },
      widthFull: {
        true: ["w-full"],
        false: ["w-fit"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
      rounded: "md",
    },
  }
);

const Button = ({
  children,
  className = "",
  onClick,
  disabled = false,
  loading = false,
  href,
  iconRight,
  iconLeft,
  type = "button",
  ...props
}: VariantProps<typeof ButtonClass> & ButtonProps) => {
  const Inside = () => (
    <div className="relative flex w-full items-center justify-center">
      {iconLeft && (
        <div className={loading ? "pr-2 text-transparent" : "pr-2"}>
          {iconLeft}
        </div>
      )}
      <div className={loading ? "text-transparent" : ""}>{children}</div>
      {loading && (
        <div className="absolute">
          <IconLoader className="animate-spin text-white" />
        </div>
      )}
      {iconRight && (
        <div className={loading ? "pl-2 text-transparent" : "pl-2"}>
          {iconRight}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        onClick={onClick}
        href={href}
        className={ButtonClass({ ...props }) + " " + className}
      >
        <Inside />
      </Link>
    );
  }
  return (
    <button
      className={ButtonClass({ ...props }) + " " + className}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      <Inside />
    </button>
  );
};

export default Button;

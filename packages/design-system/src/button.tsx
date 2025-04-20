import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@todo-app/utils/cn";
import Spinner from "./spinner";

export const buttonVariants = cva(
  "inline-flex gap-x-2 text-primary items-center justify-center rounded-sm px-2 py-1 cursor-pointer relative transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-action-text font-semibold hover:text-action-text-hover tracking-[-0.17px] md:!tracking-[-0.19px]",
        ghost: "bg-transparent text-white hover:bg-white/10",
        auth: "bg-primary text-white hover:bg-button-hover",
      },
      size: {
        default: "h-9 sm:h-11",
        icon: "h-auto w-auto",
        sm: "h-8",
        lg: "h-12",
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
  disabled?: boolean;
  isSubmitting?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type,
    disabled = false,
    isSubmitting = false,
    className,
    children,
    variant,
    size,
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={cn(
        buttonVariants({ variant, size, className }),
        (disabled || isSubmitting) &&
          "cursor-not-allowed opacity-50 pointer-events-none"
      )}
      ref={ref}
      {...rest}
    >
      {children ?? "Button"}
      {isSubmitting && <Spinner className="size-5 text-white" />}
    </button>
  );
});

Button.displayName = "Button";

export { Button };

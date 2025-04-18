import { forwardRef } from "react";

import { cn } from "@todo-app/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

export const circleVariants = cva(
  "inline-flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "text-white",
      },
      active: {
        true: "bg-gradient-to-br from-sky-blue-crayola to-medium-orchid",
        false: "bg-transparent hover:border-primary border border-border",
      },
      size: {
        default: "min-w-6 min-h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CircleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circleVariants> {
  active?: boolean;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>((props, ref) => {
  const { variant, size, active = false, className, ...rest } = props;

  return (
    <div
      className={cn(circleVariants({ variant, size, active, className }))}
      ref={ref}
      {...rest}
    >
      {active && <Check size={16} />}
    </div>
  );
});

Circle.displayName = "Circle";

export { Circle };

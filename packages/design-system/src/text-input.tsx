import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

export const textInputVariants = cva("w-full h-full flex", {
  variants: {
    variant: {
      default:
        "text-input-background placeholder-input-placeholder text-input-text caret-primary",
      auth: "bg-input-background text-input-text rounded-sm border px-4 ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    },
    error: {
      true: "border-input-error ring-input-error focus-visible:ring-input-error",
      false: "border-border focus-visible:ring-primary",
    },
    size: {
      sm: "text-sm",
      default: "text-sm md:text-lg tracking-[-0.17px] md:tracking-[-0.25px]",
      lg: "h-12 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof textInputVariants> {
  className?: string;
  error?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { className, variant, size, error = false, ...rest } = props;

  return (
    <input
      ref={ref}
      className={textInputVariants({ variant, size, className, error })}
      {...rest}
    />
  );
});

TextInput.displayName = "TextInput";

export { TextInput };

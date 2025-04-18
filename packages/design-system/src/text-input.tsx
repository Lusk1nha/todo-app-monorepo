import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

export const textInputVariants = cva("w-full h-full flex", {
  variants: {
    variant: {
      default:
        "text-input-background placeholder-input-placeholder text-input-text caret-primary",
    },
    size: {
      sm: "text-sm",
      default: "text-sm md:text-lg tracking-[-0.17px] md:tracking-[-0.25px]",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof textInputVariants> {
  className?: string;
  error?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { className, variant, size, error, ...rest } = props;

  return (
    <input
      ref={ref}
      className={textInputVariants({ variant, size, className })}
      {...rest}
    />
  );
});

TextInput.displayName = "TextInput";

export { TextInput };

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

export const bannerColorVariants = cva(
  "absolute top-0 left-0 w-full h-[200px] md:h-[300px] z-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-l from-purple-x11 to-blueberry-90 dark:from-fandango dark:to-interdimensional-blue",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BannerColorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerColorVariants> {
  className?: string;
}

const BannerColor = forwardRef<HTMLDivElement, BannerColorProps>(
  (props, ref) => {
    const { variant, className, ...rest } = props;

    return (
      <div
        className={bannerColorVariants({ variant, className })}
        ref={ref}
        {...rest}
      />
    );
  }
);

BannerColor.displayName = "BannerColor";

export { BannerColor };

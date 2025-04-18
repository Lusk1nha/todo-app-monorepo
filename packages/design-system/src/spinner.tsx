"use client";

import { Loader2 } from "lucide-react";
import React, { forwardRef, memo } from "react";
import { cn } from "@todo-app/utils/cn";

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <span className="flex" {...rest} ref={ref}>
      <Loader2 className={cn("animate-spin text-primary size-8", className)} />
      {children}
    </span>
  );
});

Spinner.displayName = "Spinner";

export default memo(Spinner);

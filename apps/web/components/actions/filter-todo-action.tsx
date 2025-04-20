"use client";

import { Button, ButtonProps } from "@todo-app/design-system/button";
import { cn } from "@todo-app/utils/cn";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TodoFilterType } from "../todo-render/todo-filters";
import { useCallback } from "react";

interface FilterTodoActionProps extends ButtonProps {
  filter: TodoFilterType;
}

export function FilterTodoAction(props: Readonly<FilterTodoActionProps>) {
  const { filter, ...buttonProps } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("filter") ?? "all";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Button
      className={cn("text-sm", currentFilter === filter && "text-primary")}
      onClick={() => {
        router.push(pathname + "?" + createQueryString("filter", filter));
      }}
      {...buttonProps}
    />
  );
}

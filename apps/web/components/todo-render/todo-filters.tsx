"use client";

import { cn } from "@todo-app/utils/cn";
import { FilterTodoAction } from "../actions/filter-todo-action";

export enum TodoFilterType {
  All = "all",
  Active = "active",
  Completed = "completed",
}

interface TodoFiltersProps {
  className?: string;
}

export function TodoFilters(props: Readonly<TodoFiltersProps>) {
  const { className } = props;

  return (
    <div className={cn("flex items-center gap-x-4.5", className)}>
      <FilterTodoAction filter={TodoFilterType.All}>All</FilterTodoAction>
      <FilterTodoAction filter={TodoFilterType.Active}>Active</FilterTodoAction>
      <FilterTodoAction filter={TodoFilterType.Completed}>
        Completed
      </FilterTodoAction>
    </div>
  );
}

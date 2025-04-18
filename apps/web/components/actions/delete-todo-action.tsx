"use client";

import { Button } from "@todo-app/design-system/button";
import { X } from "lucide-react";
import { UID } from "../../entities/uid/uid";

interface DeleteTodoActionProps {
  todoId: UID;
  className?: string;
}

export function DeleteTodoAction(props: Readonly<DeleteTodoActionProps>) {
  const { todoId, className } = props;

  async function handleClick() {
    console.log("Delete todo", todoId.value);
  }

  return (
    <Button
      onClick={handleClick}
      type="button"
      variant="ghost"
      size="icon"
      className={"text-text px-1"}
    >
      <X strokeWidth={1} />
    </Button>
  );
}

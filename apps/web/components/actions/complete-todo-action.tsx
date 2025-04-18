import { Button } from "@todo-app/design-system/button";
import { Circle } from "@todo-app/design-system/circle";
import { UID } from "../../entities/uid/uid";

interface CompleteTodoActionProps {
  todoId: UID;
  active: boolean;
}

export function CompleteTodoAction(props: Readonly<CompleteTodoActionProps>) {
  const { todoId, active } = props;

  async function handleClick() {
    console.log("Complete todo", todoId.value);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size={"icon"}
      onClick={handleClick}
      className="hover:bg-transparent p-0"
    >
      <Circle active={active} />
    </Button>
  );
}

import { Button, ButtonProps } from "@todo-app/design-system/button";

interface DeleteCompletedTodosActionProps extends ButtonProps {
  userId: string;
}

export function DeleteCompletedTodosAction(
  props: Readonly<DeleteCompletedTodosActionProps>
) {
  const { userId, ...rest } = props;

  async function handleDeleteCompletedTodos() {
    console.log("Delete completed todos action triggered", userId);
  }

  return (
    <Button
      className="text-xs md:text-sm"
      onClick={handleDeleteCompletedTodos}
      {...rest}
    />
  );
}

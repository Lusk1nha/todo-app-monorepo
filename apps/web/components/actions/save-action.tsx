import { Button, ButtonProps } from "@todo-app/design-system/button";

interface SaveActionProps extends ButtonProps {
  children: React.ReactNode;
}

export function SaveAction(props: Readonly<SaveActionProps>) {
  const { isSubmitting, disabled } = props;

  return (
    <Button
      type="submit"
      variant="auth"
      className="w-full"
      disabled={isSubmitting || disabled}
      {...props}
    />
  );
}

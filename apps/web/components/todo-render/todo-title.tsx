import { cn } from "@todo-app/utils/cn";

interface TodoTitleProps {
  children: React.ReactNode;
  active: boolean;
}

export function TodoTitle(props: Readonly<TodoTitleProps>) {
  const { children, active } = props;

  return (
    <p
      className={cn(
        "w-full truncate overflow-hidden text-ellipsis text-sm md:text-lg tracking-[-0.17px] md:tracking-[-0.25px]",
        active && "text-placeholder line-through decoration-1"
      )}
    >
      {children}
    </p>
  );
}

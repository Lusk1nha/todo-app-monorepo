import { TodoEntity } from "../../app/shared/entities/todo.entity";
import { TodoItem } from "./todo-item";

interface TodoWrapperItemsProps {
  todos: TodoEntity[];
}

export function TodoWrapperItems(props: Readonly<TodoWrapperItemsProps>) {
  const { todos } = props;

  if (todos.length === 0) {
    return (
      <div className="flex flex-col overflow-hidden">
        <div className="bg-input-background w-full h-13 md:!h-16 flex items-center justify-center px-5 md:px-6 flex-wrap">
          <h6 className="text-xs md:text-sm text-center text-action-text">
            <span className="hidden md:!inline-block">
              No todos available. Please add a new todo to get started.
            </span>

            <span className="md:!hidden inline-block">No todos available.</span>
          </h6>
        </div>
      </div>
    );
  }

  return (
    <ul className="flex flex-col overflow-hidden">
      {todos.map((todo) => (
        <TodoItem key={todo.uid} todo={todo} />
      ))}
    </ul>
  );
}

"use client";

import { Todo } from "../../app/shared/entities/todo.entity";
import { TodoMockup } from "../../app/shared/mocks/todo.mock";
import { TodoItem } from "./todo-item";

interface TodoRenderProps {
  todos: Todo[];
}

export function TodoRender(props: Readonly<TodoRenderProps>) {
  const todos = new TodoMockup().generateMany(10);

  return (
    <div className="bg-input-background w-full flex flex-col rounded-[5px] shadow-sm overflow-hidden">
      {todos.map((todo) => (
        <TodoItem key={todo.uid} todo={todo} />
      ))}
    </div>
  );
}

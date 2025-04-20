"use client";

import { Todo } from "../../app/shared/entities/todo.entity";
import { TodoMockup } from "../../app/shared/mocks/todo.mock";
import { TodoWrapperItems } from "./todo-wrapper-items";

import { TodoFilters } from "./todo-filters";
import { TodoActions } from "./todo-actions";

interface TodoRenderProps {
  todos: Todo[];
}

export function TodoRender(props: Readonly<TodoRenderProps>) {
  const todos = new TodoMockup().generateMany(5);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex flex-col shadow-lg rounded-[5px] overflow-hidden">
        <TodoWrapperItems todos={todos} />
        <TodoActions />
      </div>

      <section className="w-full flex flex-col">
        <div className="flex bg-input-background w-full h-12 md:!hidden items-center shadow-lg justify-center px-5 md:px-6 rounded-[5px]">
          <TodoFilters />
        </div>

        <DragPlaceholderText />
      </section>
    </div>
  );
}

function DragPlaceholderText() {
  return (
    <p className="text-center text-sm text-action-text mt-10">
      Drag and drop to reorder list
    </p>
  );
}

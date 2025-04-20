"use client";

import { TodoEntity } from "../../app/shared/entities/todo.entity";
import { DeleteTodoAction } from "../actions/delete-todo-action";
import { UID } from "../../entities/uid/uid";
import { CompleteTodoAction } from "../actions/complete-todo-action";
import { TodoTitle } from "./todo-title";

interface TodoItemProps {
  todo: TodoEntity;
}

export function TodoItem(props: Readonly<TodoItemProps>) {
  const { todo } = props;

  const uid = new UID(todo.uid);

  return (
    <li className="bg-input-background w-full h-13 md:!h-16 flex overflow-hidden border-b border-border items-center justify-between px-5 md:px-6 gap-x-6 last:border-0 group">
      <div className="w-full flex items-center gap-x-6">
        <CompleteTodoAction todoId={uid} active={todo.completed} />
        <TodoTitle active={todo.completed}>{todo.title}</TodoTitle>
      </div>

      <div className="hidden group-hover:flex transition-all duration-200 ease-in-out">
        <DeleteTodoAction todoId={uid} />
      </div>
    </li>
  );
}

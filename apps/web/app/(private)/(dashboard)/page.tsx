"use client";

import { useEffect } from "react";
import { NewTodoForm } from "../../../components/forms/new-todo-form/new-todo-form";
import { TodoRender } from "../../../components/todo-render/todo-render";
import { useCurrentUser } from "../../../hooks/use-current-user.hook";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const data = useSession();

  console.log("Session data", data);

  return (
    <main className="w-full h-full flex flex-col z-10 px-6 md:px-0 gap-y-4 md:!gap-y-6">
      <NewTodoForm />
      <TodoRender todos={[]} />
    </main>
  );
}

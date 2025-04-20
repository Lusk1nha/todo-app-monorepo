import { NewTodoForm } from "../../../components/forms/new-todo-form/new-todo-form";
import { TodoRender } from "../../../components/todo-render/todo-render";

export default function DashboardPage() {
  return (
    <main className="w-full h-full flex flex-col z-10 px-6 md:px-0 gap-y-4 md:!gap-y-6">
      <NewTodoForm />
      <TodoRender todos={[]} />
    </main>
  );
}

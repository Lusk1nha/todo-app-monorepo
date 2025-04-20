import { DeleteCompletedTodosAction } from "../actions/delete-completed-todos-action";
import { TodoFilters } from "./todo-filters";

export function TodoActions() {
  return (
    <div className="bg-input-background w-full h-auto min-h-13 flex items-center justify-between px-5 md:px-6 gap-x-4 border-t border-border">
      <h6 className="text-xs md:text-sm text-action-text">5 items left</h6>

      <div className="hidden md:flex items-center gap-x-4">
        <TodoFilters />
      </div>

      <DeleteCompletedTodosAction userId={"123"}>
        Clear Completed
      </DeleteCompletedTodosAction>
    </div>
  );
}

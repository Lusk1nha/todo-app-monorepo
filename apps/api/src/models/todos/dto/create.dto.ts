import { TodoEntity } from '../entity/todos.entity';

export class CreateTodoDto implements Partial<TodoEntity> {
  title: string;
  content?: string | null;
  completed?: boolean;
}

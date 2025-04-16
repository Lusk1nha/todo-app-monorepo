import { Todo } from '@prisma/client';

export class UpdateTodoDto implements Partial<Todo> {
  title?: string;
  content?: string | null;
  completed?: boolean;
}

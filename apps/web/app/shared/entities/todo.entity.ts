export interface Todo {
  uid: string;

  title: string;
  content: string | null;

  completed: boolean;
  position: number;

  userId: string;

  createdAt: Date;
  updatedAt: Date;
}

export class TodoEntity implements Todo {
  uid: string;

  title: string;
  content: string | null;

  completed: boolean;
  position: number;

  userId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(todo: Todo) {
    this.uid = todo.uid;
    this.title = todo.title;
    this.content = todo.content;
    this.completed = todo.completed;
    this.position = todo.position;
    this.userId = todo.userId;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
  }
}

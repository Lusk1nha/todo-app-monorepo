import { Injectable } from '@nestjs/common';
import { UID } from 'src/common/entities/uid/uid';

import { CreateTodoDto } from './dto/create.dto';
import { Todo } from '@prisma/client';
import { TodosRepository } from './todos.repository';
import { UpdateTodoDto } from './dto/update.dto';

@Injectable()
export class TodosService {
  constructor(private readonly repository: TodosRepository) {}

  async getUserTodos(userId: UID): Promise<Todo[]> {
    return this.repository.getAll({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTodoById(id: UID): Promise<Todo | null> {
    return this.repository.get({
      where: {
        uid: id.value,
      },
    });
  }

  async createTodo(payload: CreateTodoDto, userId: UID): Promise<Todo> {
    const id = new UID();

    return this.repository.create({
      data: {
        uid: id.value,
        title: payload.title,
        content: payload.content,
        completed: payload.completed ?? false,
        User: {
          connect: { uid: userId.value },
        },
      },
    });
  }

  async completeTodo(id: UID): Promise<Todo> {
    return this.repository.update(id.value, {
      completed: true,
    });
  }

  async updateTodo(id: UID, payload: UpdateTodoDto): Promise<Todo> {
    return this.repository.update(id.value, {
      ...payload,
    });
  }

  async deleteTodo(id: UID): Promise<void> {
    return this.repository.delete(id.value);
  }
}

import { Injectable } from '@nestjs/common';
import { UID } from 'src/common/entities/uid/uid';

import { CreateTodoDto } from './dto/create.dto';
import { Todo } from '@prisma/client';
import { TodosRepository } from './todos.repository';
import { UpdateTodoDto } from './dto/update.dto';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';
import { TodoQueryDto } from './dto/query.dto';

@Injectable()
export class TodosService {
  constructor(private readonly repository: TodosRepository) {}

  async getUserTodos(userId: UID, params?: TodoQueryDto): Promise<Todo[]> {
    return this.repository.getAll({
      ...params,
      where: {
        userId: userId.value,
      },
    });
  }

  async getTodoById(id: UID): Promise<Todo | null> {
    return this.repository.get({
      where: {
        uid: id.value,
      },
    });
  }

  async createTodo(userId: UID, payload: CreateTodoDto, tx?: PrismaTransaction): Promise<Todo> {
    const id = new UID();

    return this.repository.create(
      {
        data: {
          uid: id.value,
          title: payload.title,
          content: payload.content,
          completed: payload.completed ?? false,
          userId: userId.value,
        },
      },
      tx,
    );
  }

  async createDefaultTodos(userId: UID, tx?: PrismaTransaction): Promise<Todo[]> {
    const welcomeTodo = await this.createTodo(
      userId,
      {
        title: 'Welcome to Todo App!',
        content: 'This is your first todo',
        completed: false,
      },
      tx,
    );

    const tutorialTodo = await this.createTodo(
      userId,
      {
        title: 'Learn the basics',
        content: 'Check out how to use this app',
        completed: false,
      },
      tx,
    );

    return [welcomeTodo, tutorialTodo];
  }

  async completeTodo(id: UID, tx?: PrismaTransaction): Promise<Todo> {
    return this.repository.update(
      id.value,
      {
        completed: true,
      },
      tx,
    );
  }

  async updateTodo(id: UID, payload: UpdateTodoDto, tx?: PrismaTransaction): Promise<Todo> {
    return this.repository.update(
      id.value,
      {
        ...payload,
      },
      tx,
    );
  }

  async deleteTodo(id: UID, tx?: PrismaTransaction): Promise<Todo> {
    return this.repository.delete(id.value, tx);
  }
}

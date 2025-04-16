import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

interface GetParams {
  where?: Prisma.TodoWhereInput;
  orderBy?: Prisma.TodoOrderByWithRelationInput;
  skip?: number;
  take?: number;
  cursor?: Prisma.TodoWhereUniqueInput;
}

interface GetOneParams {
  where: Prisma.TodoWhereUniqueInput;
}

interface CreateParams {
  data: Prisma.TodoCreateInput;
}

@Injectable()
export class TodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(params: GetParams): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      ...params,
    });
  }

  async get(params: GetOneParams): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      ...params,
    });
  }

  async create(params: CreateParams): Promise<Todo> {
    const { data } = params;

    return this.prisma.todo.create({
      data,
    });
  }

  async update(id: string, data: Prisma.TodoUpdateInput): Promise<Todo> {
    return this.prisma.todo.update({
      where: { uid: id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.todo.delete({
      where: { uid: id },
    });
  }
}

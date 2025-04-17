import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';

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
  data: Prisma.XOR<Prisma.TodoCreateInput, Prisma.TodoUncheckedCreateInput>;
}

@Injectable()
export class TodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  private getClient(tx?: PrismaTransaction) {
    return tx ?? this.prisma;
  }

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

  async create(params: CreateParams, tx?: PrismaTransaction): Promise<Todo> {
    return this.getClient(tx).todo.create({
      data: params.data,
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

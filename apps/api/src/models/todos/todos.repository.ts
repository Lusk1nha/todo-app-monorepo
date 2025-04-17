import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';
import { BaseRepository } from 'src/common/repositories/common.repository';
import { TodoQueryDto } from './dto/query.dto';

interface GetOneParams {
  where: Prisma.TodoWhereUniqueInput;
}

interface CreateParams {
  data: Prisma.XOR<Prisma.TodoCreateInput, Prisma.TodoUncheckedCreateInput>;
}

@Injectable()
export class TodosRepository extends BaseRepository<Todo> {
  protected readonly modelName = 'todo';

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async getAll(params: TodoQueryDto, tx?: PrismaTransaction): Promise<Todo[]> {
    return super.getAll(params, tx);
  }

  async get(params: GetOneParams, tx?: PrismaTransaction): Promise<Todo | null> {
    return super.get(params.where, tx);
  }

  async create(params: CreateParams, tx?: PrismaTransaction): Promise<Todo> {
    return super.create(params.data, tx);
  }

  async update(id: string, data: Prisma.TodoUpdateInput, tx?: PrismaTransaction): Promise<Todo> {
    return super.update(id, data, tx);
  }

  async delete(id: string, tx?: PrismaTransaction): Promise<Todo> {
    return super.delete(id, tx);
  }
}

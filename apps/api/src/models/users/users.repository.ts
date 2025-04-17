import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';
import { UserQueryDto } from './dto/query.dto';
import { BaseRepository } from 'src/common/repositories/common.repository';

interface GetOneParams {
  where: Prisma.UserWhereInput;
}

interface CreateParams {
  data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
}

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  protected readonly modelName = 'user';

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async getAll(params: UserQueryDto, tx?: PrismaTransaction): Promise<User[]> {
    return super.getAll(params, tx);
  }

  async get(params: GetOneParams, tx?: PrismaTransaction): Promise<User | null> {
    return super.get(params.where, tx);
  }

  async create(params: CreateParams, tx?: PrismaTransaction): Promise<User> {
    return super.create(params.data, tx);
  }

  async update(id: string, data: Prisma.UserUpdateInput, tx?: PrismaTransaction): Promise<User> {
    return super.update(id, data, tx);
  }

  async delete(id: string, tx?: PrismaTransaction): Promise<User> {
    return super.delete(id, tx);
  }
}

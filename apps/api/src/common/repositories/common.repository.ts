import { PrismaClient } from '@prisma/client';
import { PrismaTransaction } from '../prisma/prisma.type';
import { PrismaService } from '../prisma/prisma.service';

export abstract class BaseRepository<T> {
  constructor(private readonly prisma: PrismaService) {}

  abstract getAll(args: any, tx?: PrismaTransaction): Promise<T[]>;
  abstract get(args: any, tx?: PrismaTransaction): Promise<T | null>;
  abstract create(args: any, tx?: PrismaTransaction): Promise<T>;
  abstract update(id: string, data: any, tx?: PrismaTransaction): Promise<T>;
  abstract delete(id: string, tx?: PrismaTransaction): Promise<T>;

  protected getClient(tx?: PrismaTransaction) {
    return tx ?? this.prisma;
  }
}

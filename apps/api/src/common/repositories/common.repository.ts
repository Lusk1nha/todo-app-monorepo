import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';
import { GetPrismaParams } from './common.types';

@Injectable()
export abstract class BaseRepository<T extends { uid: string }> {
  protected abstract readonly modelName: keyof PrismaClient;

  constructor(protected readonly prisma: PrismaService) {}

  protected getDelegate(tx?: PrismaTransaction) {
    const client = tx || this.prisma;
    return client[this.modelName] as any;
  }

  async getAll<W>(params: GetPrismaParams<W>, tx?: PrismaTransaction): Promise<T[]> {
    const { skip, take, sortBy, order, where = {} } = params;
    const delegate = this.getDelegate(tx);

    const searchWhere = this._getWhereContent(params);

    return delegate.findMany({
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
      orderBy: sortBy ? { [sortBy]: order || 'asc' } : undefined,
      where: searchWhere ? { ...where, ...searchWhere } : where,
    });
  }

  async get(where: unknown, tx?: PrismaTransaction): Promise<T | null> {
    return this.getDelegate(tx).findFirst({ where });
  }

  async create(data: unknown, tx?: PrismaTransaction): Promise<T> {
    return this.getDelegate(tx).create({ data });
  }

  async update(id: string, data: unknown, tx?: PrismaTransaction): Promise<T> {
    return this.getDelegate(tx).update({
      where: { uid: id },
      data,
    });
  }

  async delete(id: string, tx?: PrismaTransaction): Promise<T> {
    return this.getDelegate(tx).delete({
      where: { uid: id },
    });
  }

  private _getWhereContent<W>(params: GetPrismaParams<W>): W {
    const { searchBy, search, where } = params;

    if (searchBy && search) {
      where[searchBy] = {
        contains: search,
        mode: 'insensitive',
      };
    }

    return where as W;
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';
import { UserQueryDto } from './dto/query.dto';

interface GetOneParams {
  where: Prisma.UserWhereInput;
}

interface CreateParams {
  data: Prisma.UserCreateInput;
}

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  private getClient(tx?: PrismaTransaction) {
    return tx ?? this.prisma;
  }

  /**
   * Busca múltiplos usuários com paginação, ordenação e filtro de busca
   * @param params Parâmetros de consulta
   * @param tx Transação opcional do Prisma
   * @returns Lista de usuários com metadados de paginação
   */
  async getAll(params: UserQueryDto, tx?: PrismaTransaction): Promise<User[]> {
    const { skip, take, sortBy, order, searchBy, search } = params;
    const client = this.getClient(tx);

    const where: Prisma.UserWhereInput = {};

    if (searchBy && search) {
      where[searchBy] = {
        contains: search,
        mode: 'insensitive',
      };
    }

    return client.user.findMany({
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
      orderBy: sortBy ? { [sortBy]: order || 'asc' } : undefined,
      where,
    });
  }

  /**
   * Busca um único usuário pelo identificador único
   * @param params Parâmetros contendo cláusula where
   * @param tx Transação opcional do Prisma
   * @returns Um usuário ou null se não encontrado
   */
  async get(params: GetOneParams, tx?: PrismaTransaction): Promise<User | null> {
    return this.getClient(tx).user.findFirst({
      where: params.where,
    });
  }

  /**
   * Cria um novo usuário
   * @param params Parâmetros com dados do usuário
   * @param tx Transação opcional do Prisma
   * @returns O usuário criado
   */
  async create(params: CreateParams, tx?: PrismaTransaction): Promise<User> {
    return this.getClient(tx).user.create({
      data: params.data,
    });
  }

  /**
   * Atualiza um usuário existente
   * @param id ID do usuário (uid)
   * @param data Dados parciais para atualização
   * @param tx Transação opcional do Prisma
   * @returns O usuário atualizado
   */
  async update(id: string, data: Prisma.UserUpdateInput, tx?: PrismaTransaction): Promise<User> {
    return this.getClient(tx).user.update({
      where: { uid: id },
      data,
    });
  }

  /**
   * Remove um usuário permanentemente
   * @param id ID do usuário (uid)
   * @param tx Transação opcional do Prisma
   * @returns O usuário deletado
   */
  async delete(id: string, tx?: PrismaTransaction): Promise<User> {
    return this.getClient(tx).user.delete({
      where: { uid: id },
    });
  }
}

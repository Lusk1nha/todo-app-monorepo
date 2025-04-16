import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dto/update.dto';
import { UID } from 'src/common/entities/uid/uid';
import { Email } from 'src/common/entities/email/email';

import { PrismaTransaction } from 'src/common/prisma/prisma.type';
import { UsersRepository } from './users.repository';
import { UserQueryDto } from './dto/query.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(params?: UserQueryDto, tx?: PrismaTransaction) {
    return this.usersRepository.getAll(params, tx);
  }

  async getUserById(uid: UID, tx?: PrismaTransaction) {
    const user = await this._findUserByUid(uid.value, tx);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserByCredentialsEmail(email: Email, tx?: PrismaTransaction) {
    return this.usersRepository.get(
      {
        where: {
          Credentials: { email: email.value },
        },
      },
      tx,
    );
  }

  async createUser(payload: CreateUserDto, tx?: PrismaTransaction) {
    const { name, provider } = payload;

    const uid = new UID();

    return this.usersRepository.create(
      {
        data: {
          uid: uid.value,
          name: name,
          AuthProvider: {
            create: {
              type: provider,
            },
          },
        },
      },
      tx,
    );
  }

  async updateById(uid: UID, payload: UpdateUserDto, tx?: PrismaTransaction) {
    await this.getUserById(uid);
    return this.usersRepository.update(uid.value, payload, tx);
  }

  async removeById(uid: UID, tx?: PrismaTransaction) {
    await this.getUserById(uid);
    return this.usersRepository.delete(uid.value, tx);
  }

  private async _findUserByUid(uid: string, tx?: PrismaTransaction) {
    return this.usersRepository.get(
      {
        where: { uid },
      },
      tx,
    );
  }
}

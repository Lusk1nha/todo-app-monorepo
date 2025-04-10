import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/update.dto';
import { UID } from 'src/common/entities/uid/uid';
import { Email } from 'src/common/entities/email/email';

import { PrismaTransaction } from 'src/common/prisma/prisma.type';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(prisma?: PrismaTransaction) {
    return (prisma ?? this.prisma).user.findMany();
  }

  async getUserById(uid: UID, prisma?: PrismaTransaction) {
    const user = await this._findUserByUid(uid.value, prisma);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserByCredentialsEmail(email: Email, prisma?: PrismaTransaction) {
    return await (prisma ?? this.prisma).user.findFirst({
      where: {
        Credentials: { email: email.value },
      },
    });
  }

  async createUser(payload: CreateUserDto, prisma?: PrismaTransaction) {
    const { name, provider } = payload;

    const uid = new UID();

    return (prisma ?? this.prisma).user.create({
      data: {
        uid: uid.value,
        name: name,
        AuthProvider: {
          create: {
            type: provider,
          },
        },
      },
    });
  }

  async updateById(uid: UID, payload: UpdateUserDto, prisma?: PrismaTransaction) {
    await this.getUserById(uid);
    return (prisma ?? this.prisma).user.update({
      where: { uid: uid.value },
      data: payload,
    });
  }

  async removeById(uid: UID, prisma?: PrismaTransaction) {
    await this.getUserById(uid);

    return (prisma ?? this.prisma).user.delete({
      where: { uid: uid.value },
    });
  }

  private async _findUserByUid(uid: string, prisma?: PrismaTransaction) {
    return (prisma ?? this.prisma).user.findUnique({
      where: { uid },
    });
  }
}

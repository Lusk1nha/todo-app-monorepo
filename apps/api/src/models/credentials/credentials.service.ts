import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Email } from 'src/entities/email';
import { CreateCredentialsDto } from './dto/create.dto';
import { hashPassword } from 'src/helpers/password';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';

@Injectable()
export class CredentialsService {
  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: Email, prisma?: PrismaTransaction) {
    const emailAsString = email.raw;

    return (prisma ?? this.prisma).credentials.findUnique({
      where: { email: emailAsString },
    });
  }

  async create(payload: CreateCredentialsDto, prisma?: PrismaTransaction) {
    const { uid, email, password } = payload;

    const emailAsString = email.raw;
    const passwordHash = hashPassword(password);

    return (prisma ?? this.prisma).credentials.create({
      data: {
        uid,
        email: emailAsString,
        passwordHash,
      },
    });
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Email } from 'src/common/entities/email/email';
import { CreateCredentialsDto } from './dto/create.dto';
import { hashPassword } from 'src/helpers/password';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';
import { UID } from 'src/common/entities/uid/uid';
import { Credentials } from '@prisma/client';

@Injectable()
export class CredentialsService {
  private readonly logger = new Logger(CredentialsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: Email, prisma?: PrismaTransaction): Promise<Credentials> {
    this.logger.log(`Fetching credentials for email: ${email.value}`);
    return await this._getCredentialsByEmail(email, prisma);
  }

  async create(payload: CreateCredentialsDto, prisma?: PrismaTransaction) {
    this.logger.log(`Creating credentials for UID: ${payload.uid}`);
    const { uid, email, password } = payload;

    const emailAsString = email.value.trim().toLowerCase();
    const passwordHash = hashPassword(password);

    return (prisma ?? this.prisma).credentials.create({
      data: {
        uid,
        email: emailAsString,
        passwordHash,
      },
    });
  }

  async update(id: UID, email?: Email, password?: string) {
    this.logger.log(`Updating credentials for UID: ${id.value}`);

    const credentials = await this._getCredentialsByUid(id.value);

    return this.prisma.$transaction(async (prisma) => {
      if (password) {
        await this._updatePassword(credentials.uid, password, prisma);
      }

      if (email) {
        await this._updateEmail(credentials.uid, email, prisma);
      }

      return credentials;
    });
  }

  private async _updatePassword(uid: string, password: string, prisma?: PrismaTransaction) {
    const passwordHash = hashPassword(password);

    return (prisma ?? this.prisma).credentials.update({
      where: { uid },
      data: { passwordHash },
    });
  }

  private async _updateEmail(uid: string, email: Email, prisma?: PrismaTransaction) {
    const emailAsString = email.value;

    return (prisma ?? this.prisma).credentials.update({
      where: { uid },
      data: { email: emailAsString },
    });
  }

  private async _getCredentialsByUid(
    uid: string,
    prisma?: PrismaTransaction,
  ): Promise<Credentials | null> {
    return (prisma ?? this.prisma).credentials.findUnique({
      where: { uid },
    });
  }

  private async _getCredentialsByEmail(
    email: Email,
    prisma?: PrismaTransaction,
  ): Promise<Credentials | null> {
    return (prisma ?? this.prisma).credentials.findUnique({
      where: { email: email.value },
    });
  }
}

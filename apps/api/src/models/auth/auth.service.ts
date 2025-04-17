import {
  LoginWithCredentialsOutput,
  RegisterWithCredentialsInput,
  RegisterWithCredentialsOutput,
} from './dto/create.dto';

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { comparePassword } from 'src/helpers/password';

import { CredentialsService } from '../credentials/credentials.service';
import { Email } from 'src/common/entities/email/email';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { Logger } from '@nestjs/common';
import { AuthProviderType, User } from '@prisma/client';

import { createJWTPayload } from 'src/helpers/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaTransaction } from 'src/common/prisma/prisma.type';
import { TodosService } from '../todos/todos.service';
import { UID } from 'src/common/entities/uid/uid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtAlgorithm = 'HS256';

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly credentialsService: CredentialsService,
    private readonly todosService: TodosService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: RegisterWithCredentialsInput): Promise<RegisterWithCredentialsOutput> {
    this.logger.log(`Starting registration for email: ${data.email}`);

    const { name, password, email } = this.validateRegistrationInput(data);
    await this.verifyEmailAvailability(email);

    try {
      return await this.prisma.$transaction(async (tx: PrismaTransaction) => {
        const user = await this.createUserWithCredentials({ name, email, password }, tx);

        await this.todosService.createTodoTutorial(new UID(user.uid), tx);

        this.logger.log(`User registered successfully: ${user.uid}`);
        return user;
      });
    } catch (error) {
      this.logger.error(`Registration failed for ${email.value}: ${error.message}`);
      throw new ConflictException('Registration failed. Please try again.');
    }
  }

  async validateCredentials(email: Email, password: string): Promise<User> {
    const user = await this.usersService.getUserByCredentialsEmail(email);

    if (!user) {
      this.logger.warn(`Login attempt for non-existing email: ${email.value}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const credentials = await this.credentialsService.getByEmail(email);
    const isValid = await comparePassword(password, credentials.passwordHash);

    if (!isValid) {
      this.logger.warn(`Invalid password attempt for user: ${credentials.uid}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async signInWithCredentials(user: User): Promise<LoginWithCredentialsOutput> {
    const payload = createJWTPayload(user);
    const token = await this.generateJwtToken(payload);

    this.logger.log(`User authenticated successfully: ${user.uid}`);
    return {
      userId: user.uid,
      token: {
        accessToken: token,
        tokenType: 'Bearer',
        expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      },
    };
  }

  private async generateJwtToken(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload, {
      algorithm: this.jwtAlgorithm,
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  private validateRegistrationInput(data: RegisterWithCredentialsInput) {
    return {
      name: data.name.trim(),
      password: data.password,
      email: new Email(data.email),
    };
  }

  private async verifyEmailAvailability(email: Email): Promise<void> {
    const existing = await this.credentialsService.getByEmail(email);

    if (existing) {
      this.logger.warn(`Duplicate registration attempt: ${email.value}`);
      throw new ConflictException('Email already registered');
    }
  }

  private async createUserWithCredentials(
    data: { name: string; email: Email; password: string },
    tx: PrismaTransaction,
  ): Promise<User> {
    const user = await this.usersService.createUser(
      {
        name: data.name,
        provider: AuthProviderType.CREDENTIALS,
      },
      tx,
    );

    await this.credentialsService.create(
      {
        uid: user.uid,
        email: data.email,
        password: data.password,
      },
      tx,
    );

    return user;
  }
}

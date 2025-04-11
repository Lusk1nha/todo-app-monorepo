import { LoginWithCredentialsInput, RegisterWithCredentialsInput } from './dto/create.dto';

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { comparePassword } from 'src/helpers/password';

import { CredentialsService } from '../credentials/credentials.service';
import { Email } from 'src/common/entities/email/email';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { Logger } from '@nestjs/common';
import { AuthProviderType, User } from '@prisma/client';
import { JWT_EXPIRATION } from 'src/common/constants/secrets';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly credentialsService: CredentialsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: RegisterWithCredentialsInput) {
    this.logger.log('Registering user with credentials...');

    const name = data.name.trim();
    const password = data.password;
    const email = new Email(data.email);
    const provider = AuthProviderType.CREDENTIALS;

    const userExists = await this.credentialsService.getByEmail(email);

    if (userExists) {
      this.logger.warn(`Registration attempt with existing email: ${email.value}`);
      throw new BadRequestException('User already exists with this email.');
    }

    const registeredUser = await this.prisma.$transaction(async (prisma) => {
      const user = await this.usersService.createUser(
        {
          name,
          provider,
        },
        prisma,
      );

      await this.credentialsService.create(
        {
          uid: user.uid,
          email,
          password,
        },
        prisma,
      );

      return user;
    });

    this.logger.log(`User registered successfully: ${registeredUser.uid}`);
    return registeredUser;
  }

  async validateCredentials(email: Email, password: string): Promise<User> {
    const user = await this.usersService.getUserByCredentialsEmail(email);

    if (!user) {
      this.logger.warn(`Login attempt with non-existing email: ${email.value}`);
      throw new UnauthorizedException('Invalid email or password.');
    }

    const credentials = await this.credentialsService.getByEmail(email);
    const isPasswordMatch = comparePassword(password, credentials.passwordHash);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return user;
  }

  async signIn(user: User): Promise<{ token: string }> {
    const payload = {
      uid: user.uid,
      sub: user.uid,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      algorithm: 'HS256',
      expiresIn: JWT_EXPIRATION,
    });

    return { token: accessToken };
  }
}

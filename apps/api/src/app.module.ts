import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './models/users/users.module';
import { AuthModule } from './models/auth/auth.module';
import { CredentialsModule } from './models/credentials/credentials.module';

const MAX_AGE = 24 * 60 * 60;

@Module({
  imports: [
    // Global Modules
    ConfigModule.forRoot(),
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),

    // Routes Modules
    AuthModule,
    UsersModule,
    CredentialsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

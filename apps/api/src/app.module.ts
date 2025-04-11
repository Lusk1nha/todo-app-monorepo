import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './models/users/users.module';
import { AuthModule } from './models/auth/auth.module';
import { CredentialsModule } from './models/credentials/credentials.module';
import { JWT_SECRET, JWT_EXPIRATION } from './common/constants/secrets';
import { RolesModule } from './models/roles/roles.module';

@Module({
  imports: [
    // Global Modules
    ConfigModule.forRoot(),
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION },
    }),

    // Routes Modules
    AuthModule,
    UsersModule,
    CredentialsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

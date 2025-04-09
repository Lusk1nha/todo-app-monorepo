import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CredentialsModule } from '../credentials/credentials.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [CredentialsModule, UsersModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
  imports: [UsersModule],
})
export class RolesModule {}

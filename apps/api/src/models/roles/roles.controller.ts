import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { checkRowLevelPermission } from 'src/common/auth/auth.utils';
import { UID } from 'src/common/entities/uid/uid';
import { UIDParam } from 'src/common/entities/uid/uid.decorator';
import { GetUserType } from 'src/common/types';
import { UsersService } from 'src/models/users/users.service';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @Get(':id')
  async getMyRoles(@UIDParam('id') id: UID, @GetUser() currentUser: GetUserType) {
    const user = await this.usersService.getUserById(id);
    checkRowLevelPermission(currentUser, user.uid);

    return this.rolesService.getUserRoles(id);
  }
}

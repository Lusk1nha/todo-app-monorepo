import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { checkRowLevelPermission } from 'src/common/auth/auth.utils';
import { UID } from 'src/common/entities/uid/uid';
import { UIDParam } from 'src/common/entities/uid/uid.decorator';
import { UserAuthType } from 'src/common/types';
import { UsersService } from 'src/models/users/users.service';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('Roles')
@AllowAuthenticated()
@ApiBearerAuth()
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/me')
  @ApiOperation({
    summary: 'Get my roles',
    description: 'Allows authenticated users to get their roles',
  })
  async getMyRoles(@GetUser() currentUser: UserAuthType) {
    return this.rolesService.getUserRoles(new UID(currentUser.sub));
  }

  @Get('/user/:id')
  @ApiOperation({
    summary: 'Get user roles',
    description: "Allows authenticated users to get another user's roles",
  })
  async getUserRoles(@UIDParam('id') id: UID, @GetUser() currentUser: UserAuthType) {
    const user = await this.usersService.getUserById(id);
    checkRowLevelPermission(currentUser, user.uid);

    return this.rolesService.getUserRoles(id);
  }
}

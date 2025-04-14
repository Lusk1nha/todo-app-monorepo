import { Body, Controller, Delete, Get, Patch, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserEntity } from './entity/users.entity';
import { UID } from '../../common/entities/uid/uid';
import { UIDParam } from '../../common/entities/uid/uid.decorator';

import { AllowAuthenticated, GetUser } from '../../common/auth/auth.decorator';
import { UserAuthType } from '../../common/types';
import { checkRowLevelPermission } from '../../common/auth/auth.utils';
import { Role } from 'src/common/roles/roles.utils';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@AllowAuthenticated()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all registered users (authenticated access required)',
  })
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: 'Successfully retrieved list of users',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Valid authentication token required',
  })
  @AllowAuthenticated(Role.Admin)
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Retrieves the profile of the currently authenticated user',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Successfully retrieved current user profile',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Valid authentication token required',
  })
  async findMe(@GetUser() currentUser: UserAuthType): Promise<UserEntity> {
    const uid = new UID(currentUser.sub);
    return this.usersService.getUserById(uid);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a specific user profile by their unique identifier',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Successfully retrieved user profile',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found with the specified ID',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Valid authentication token required',
  })
  async findOne(@UIDParam('id') id: UID): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user profile',
    description:
      'Updates the profile information of a specific user (requires ownership or admin privileges)',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Successfully updated user profile',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Insufficient permissions to update this user',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found with the specified ID',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Valid authentication token required',
  })
  async update(
    @UIDParam('id') id: UID,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() currentUser: UserAuthType,
  ): Promise<UserEntity> {
    const user = await this.usersService.getUserById(id);
    checkRowLevelPermission(currentUser, user.uid);

    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user account',
    description: 'Permanently deletes a user account (requires ownership or admin privileges)',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Successfully deleted user account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Insufficient permissions to delete this user',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found with the specified ID',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Valid authentication token required',
  })
  async remove(@UIDParam('id') id: UID, @GetUser() currentUser: UserAuthType): Promise<UserEntity> {
    const user = await this.usersService.getUserById(id);
    checkRowLevelPermission(currentUser, user.uid);

    return this.usersService.removeById(id);
  }
}

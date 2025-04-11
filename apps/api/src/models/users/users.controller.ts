import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/users.entity';
import { UID } from 'src/common/entities/uid/uid';
import { UIDParam } from 'src/common/entities/uid/uid.decorator';

import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/auth.utils';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get('/')
  async findAll() {
    return this.usersService.getAllUsers();
  }

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Get('me')
  async findMe(@GetUser() currentUser: GetUserType) {
    let uid = new UID(currentUser.sub);
    return this.usersService.getUserById(uid);
  }

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  async findOne(@UIDParam('id') id: UID) {
    return this.usersService.getUserById(id);
  }

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Patch(':id')
  async update(
    @UIDParam('id') id: UID,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() currentUser: GetUserType,
  ) {
    const user = await this.usersService.getUserById(id);
    checkRowLevelPermission(currentUser, user.uid);

    return this.usersService.updateById(id, updateUserDto);
  }

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Delete(':id')
  async remove(@UIDParam('id') id: UID, @GetUser() currentUser: GetUserType) {
    const user = await this.usersService.getUserById(id);
    checkRowLevelPermission(currentUser, user.uid);

    return this.usersService.removeById(id);
  }
}

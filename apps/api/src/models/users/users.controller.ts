import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/users.entity';
import { UID } from 'src/common/entities/uid/uid';
import { UIDParam } from 'src/common/entities/uid/uid.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@UIDParam('id') id: UID) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(@UIDParam('id') id: UID, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@UIDParam('id') id: UID) {
    return this.usersService.removeById(id);
  }
}

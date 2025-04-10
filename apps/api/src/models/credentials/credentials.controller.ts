import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UID } from 'src/common/entities/uid/uid';
import { UpdateCredentialsDto } from './dto/update.dto';
import { Email } from 'src/common/entities/email/email';
import { CredentialsResponseDto } from './dto/create.dto';

import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';

@Controller('credentials')
@ApiTags('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @Patch()
  @ApiOperation({ summary: 'Update user credentials' })
  @ApiResponse({
    status: 200,
    description: 'Credentials updated successfully',
    type: CredentialsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Credentials not found' })
  async update(@Body() payload: UpdateCredentialsDto, @GetUser() user: GetUserType) {
    const id = new UID(user.uid);

    const email = payload.email ? new Email(payload.email) : undefined;
    const password = payload.password;

    return this.credentialsService.update(id, email, password);
  }
}

import { Body, Controller, Patch, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UID } from '../../common/entities/uid/uid';
import { UpdateCredentialsDto } from './dto/update.dto';
import { Email } from '../../common/entities/email/email';
import { CredentialsResponseDto } from './dto/create.dto';

import { AllowAuthenticated, GetUser } from '../../common/auth/auth.decorator';
import { UserAuthType } from '../../common/types';

@Controller('credentials')
@ApiTags('Credentials')
@ApiBearerAuth()
@AllowAuthenticated()
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Patch()
  @ApiOperation({
    summary: 'Update user credentials',
    description: 'Allows authenticated users to update their email and/or password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Credentials updated successfully',
    type: CredentialsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing authentication token',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User credentials not found',
  })
  async update(@Body() payload: UpdateCredentialsDto, @GetUser() user: UserAuthType) {
    const id = new UID(user.sub);
    const email = payload.email ? new Email(payload.email) : undefined;
    const { password } = payload;

    return await this.credentialsService.update(id, email, password);
  }
}

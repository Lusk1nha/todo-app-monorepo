import { ApiProperty } from '@nestjs/swagger';
import { Email } from 'src/common/entities/email/email';

export class CreateCredentialsDto {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  email: Email;

  @ApiProperty()
  password: string;
}

export class CredentialsResponseDto {
  @ApiProperty({ description: 'User unique identifier' })
  uid: string;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Email } from 'src/entities/email';

export class CreateCredentialsDto {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  email: Email;

  @ApiProperty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';

import { IsEmail } from 'class-validator';

export class UpdateCredentialsDto {
  @ApiProperty({ required: false })
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  password?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class RegisterWithCredentialsInput {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class RegisterWithCredentialsOutput {
  @ApiProperty()
  @IsUUID()
  uid: string;

  @ApiProperty()
  @IsAlphanumeric()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  image?: string;
}

export class LoginWithCredentialsInput {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

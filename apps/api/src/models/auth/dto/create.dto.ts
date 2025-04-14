import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class TokenResponse {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  tokenType: 'Bearer';

  @ApiProperty()
  @IsNumberString()
  expiresIn: string | number;
}
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

export class RegisterWithCredentialsOutput implements User {
  @ApiProperty()
  @IsUUID('4')
  uid: string;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

export class LoginWithCredentialsInput {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginWithCredentialsOutput {
  @ApiProperty()
  @IsUUID('4')
  userId: string;

  @ApiProperty()
  token: TokenResponse;
}

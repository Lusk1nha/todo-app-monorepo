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
import { UserEntity } from 'src/models/users/entity/users.entity';

export class TokenResponse {
  @ApiProperty()
  @IsString()
  refreshToken: string;

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
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginWithCredentialsOutput {
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  token: TokenResponse;
}

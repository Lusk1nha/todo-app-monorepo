import { ApiProperty } from '@nestjs/swagger';
import { Credentials } from '@prisma/client';
import { IsDate, IsEmail, IsUUID } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class CredentialsEntity implements RestrictProperties<CredentialsEntity, Credentials> {
  constructor(credentials: Credentials) {
    this.uid = credentials.uid;
    this.email = credentials.email;
    this.passwordHash = credentials.passwordHash;
    this.createdAt = credentials.createdAt;
    this.updatedAt = credentials.updatedAt;
  }

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  passwordHash: string;

  @ApiProperty()
  @IsUUID('4')
  uid: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

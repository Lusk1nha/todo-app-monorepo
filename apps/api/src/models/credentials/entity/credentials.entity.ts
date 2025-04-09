import { ApiProperty } from '@nestjs/swagger';
import { Credentials } from '@prisma/client';

export class CredentialsEntity implements Credentials {
  @ApiProperty()
  email: string;

  @ApiProperty()
  passwordHash: string;

  @ApiProperty()
  uid: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

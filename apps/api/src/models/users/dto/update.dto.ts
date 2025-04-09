import { ApiProperty } from '@nestjs/swagger';
import { AuthProviderType } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  provider: AuthProviderType;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  image?: string;
}

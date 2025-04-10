import { IsDate, IsUrl, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  constructor(user: User) {
    this.uid = user.uid;
    this.name = user.name;
    this.image = user.image;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  @ApiProperty()
  @IsUUID('4')
  uid: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  @IsUrl()
  image: string | null;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

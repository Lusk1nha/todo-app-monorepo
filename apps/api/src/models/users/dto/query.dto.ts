import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class UserQueryDto extends BaseQueryDto<Prisma.UserWhereInput> {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  searchBy?: string;
}

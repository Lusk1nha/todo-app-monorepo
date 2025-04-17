import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class TodoQueryDto extends BaseQueryDto<Prisma.TodoWhereInput> {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  searchBy?: string;
}

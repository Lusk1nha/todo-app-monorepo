import { IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class UserQueryDto extends BaseQueryDto {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  searchBy?: string;
}

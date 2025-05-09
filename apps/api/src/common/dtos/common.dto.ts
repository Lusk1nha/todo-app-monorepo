import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class BaseQueryDto<W> {
  @IsNumberString()
  @IsOptional()
  skip?: number;

  @IsNumberString()
  @IsOptional()
  take?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  where?: W;
}

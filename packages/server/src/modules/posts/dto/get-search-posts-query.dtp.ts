import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetSearchPostsQueryDto {
  @ApiProperty()
  @IsString()
  keyword: string;
}

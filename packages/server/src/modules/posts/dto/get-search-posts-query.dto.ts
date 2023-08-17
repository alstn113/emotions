import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class GetSearchPostsQueryDto {
  @ApiProperty()
  @IsString()
  keyword: string;
}

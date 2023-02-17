import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

@ApiTags('/posts')
export class GetPostsQueryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  cursor?: string;
}

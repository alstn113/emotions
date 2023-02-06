import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

@ApiTags('/posts')
export class GetPostsQueryDto {
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  cursor?: string;
}

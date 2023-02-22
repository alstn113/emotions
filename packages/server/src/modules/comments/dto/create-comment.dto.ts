import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@ApiTags('comments')
export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  parentCommentId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mentionUserId?: string;
}

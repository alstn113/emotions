import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/posts')
export class CreatePostDto {
  @ApiProperty({
    type: String,
    description: 'The title of the post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'The content of the post',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
